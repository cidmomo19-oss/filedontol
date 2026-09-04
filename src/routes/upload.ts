import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { Env, BlacklistedHash } from '../types';
import { parseCookies, verifyJWT, createUploadTicket, verifyUploadTicket } from '../utils/auth';
import { generateR2PresignedUrl } from '../utils/s3';
import { getApiUploadPageHtml } from '../views/pages';

export const uploadApp = new Hono<{ Bindings: Env }>();

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5 GB
const DEFAULT_JWT_SECRET = 'fd_jwt_secret_default_filedontol_key';

// GET /api/upload - Render Dedicated API Upload Status & Usage Documentation Page
uploadApp.get('/', (c) => {
  const userAgent = c.req.header('user-agent') || '';
  if (userAgent.toLowerCase().includes('curl') || userAgent.toLowerCase().includes('wget')) {
    const host = c.req.header('host') || 'filedontol.com';
    const protocol = c.req.header('x-forwarded-proto') || 'https';
    return c.text(
      `filedontol API Status: ACTIVE 🟢\n\nUsage:\n  curl -F "file=@yourfile.png" ${protocol}://${host}/api/upload\n  curl -T "yourfile.png" ${protocol}://${host}/api/upload\n  curl --upload-file "yourfile.png" ${protocol}://${host}/api/upload\n\nLimits: Max 5 GB per file, 30 days active retention (resets to 30 days on 15+ downloads).\n`
    );
  }

  return c.html(getApiUploadPageHtml());
});

// Helper function to handle cURL / Wget / CLI Uploads for both POST & PUT methods
async function handleCurlUpload(c: any) {
  try {
    let fileName = 'file';
    let fileSize = 0;
    let mimeType = 'application/octet-stream';
    let fileBody: ReadableStream | ArrayBuffer | Blob | null = null;

    const contentType = c.req.header('Content-Type') || '';
    const contentDisposition = c.req.header('Content-Disposition') || '';

    // Extract file name from Content-Disposition if present
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^";]+)"?/i);
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await c.req.parseBody();
      const uploadedFile = formData['file'] || formData['upload'] || formData['f'] || formData['data'];

      if (!uploadedFile || !(uploadedFile instanceof File)) {
        return c.text('Error: No file field found in multipart/form-data. Use curl -F "file=@yourfile.ext" https://<domain>/api/upload\n', 400);
      }

      fileName = uploadedFile.name || fileName;
      fileSize = uploadedFile.size;
      mimeType = uploadedFile.type || 'application/octet-stream';
      fileBody = uploadedFile;
    } else {
      // Direct binary body (curl --upload-file file.ext or curl -T file.ext)
      const headerFileName = c.req.header('X-File-Name');
      if (headerFileName) {
        fileName = decodeURIComponent(headerFileName);
      } else if (fileName === 'file') {
        const pathSegments = c.req.path.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment && lastSegment !== 'upload') {
          fileName = decodeURIComponent(lastSegment);
        }
      }

      mimeType = contentType || 'application/octet-stream';
      const arrayBuffer = await c.req.arrayBuffer();
      fileSize = arrayBuffer.byteLength;
      fileBody = arrayBuffer;
    }

    if (!fileBody || fileSize === 0) {
      return c.text('Error: File body is empty.\n', 400);
    }

    if (fileSize > MAX_FILE_SIZE) {
      return c.text('Error: File size exceeds 5 GB limit.\n', 400);
    }

    const r2Key = `files/${Date.now()}_${nanoid(10)}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    await c.env.STORAGE.put(r2Key, fileBody, {
      httpMetadata: { contentType: mimeType },
    });

    const expirationDays = 30;
    const expiresAtDate = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
    const expiresAtStr = expiresAtDate.toISOString().replace('T', ' ').substring(0, 19);

    const shareCode = nanoid(8);
    const fileId = `file_${nanoid(16)}`;

    await c.env.DB.prepare(
      `INSERT INTO files (
        id, user_id, share_code, file_name, file_size, mime_type, file_hash, r2_key, download_count, last_downloaded_at, expires_at, status
      ) VALUES (?, NULL, ?, ?, ?, ?, NULL, ?, 0, CURRENT_TIMESTAMP, ?, 'active')`
    )
      .bind(fileId, shareCode, fileName, fileSize, mimeType, r2Key, expiresAtStr)
      .run();

    const host = c.req.header('host') || 'filedontol.com';
    const protocol = c.req.header('x-forwarded-proto') || 'https';
    const downloadUrl = `${protocol}://${host}/f/${shareCode}\n`;

    const userAgent = c.req.header('user-agent') || '';
    if (userAgent.toLowerCase().includes('curl') || userAgent.toLowerCase().includes('wget')) {
      return c.text(downloadUrl);
    }

    return c.json({
      success: true,
      shareCode,
      downloadUrl: downloadUrl.trim(),
      file: { id: fileId, fileName, fileSize, expiresAt: expiresAtStr },
    });
  } catch (err: any) {
    return c.text(`Error: ${err.message || 'Failed to upload file via cURL.'}\n`, 500);
  }
}

// POST & PUT /api/upload
uploadApp.post('/', handleCurlUpload);
uploadApp.put('/', handleCurlUpload);

uploadApp.post('/presigned', async (c) => {
  try {
    const body = await c.req.json<{
      fileName?: string;
      fileSize?: number;
      mimeType?: string;
      fileHash?: string;
    }>();

    const { fileName, fileSize, mimeType, fileHash } = body;

    if (!fileName || !fileSize) {
      return c.json({ error: 'fileName and fileSize are required.' }, 400);
    }

    if (fileSize > MAX_FILE_SIZE) {
      return c.json({ error: 'Ukuran file melebihi batas maksimal 5 GB.' }, 400);
    }

    if (fileHash) {
      const blacklisted = await c.env.DB.prepare(
        'SELECT file_hash, reason FROM blacklisted_hashes WHERE file_hash = ?'
      )
        .bind(fileHash.toLowerCase())
        .first<BlacklistedHash>();

      if (blacklisted) {
        return c.json(
          {
            error: `File ini telah diblokir karena pelanggaran (DMCA / Abuse). Alasan: ${
              blacklisted.reason || 'Sesuai kebijakan DMCA'
            }`,
          },
          403
        );
      }
    }

    const r2Key = `files/${Date.now()}_${nanoid(10)}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;

    let presignedUrl = '';
    let directR2Mode = false;

    if (c.env.R2_ACCESS_KEY_ID && c.env.R2_SECRET_ACCESS_KEY) {
      presignedUrl = await generateR2PresignedUrl(
        c.env.ACCOUNT_ID,
        'filedontol-storage',
        r2Key,
        mimeType || 'application/octet-stream',
        c.env.R2_ACCESS_KEY_ID,
        c.env.R2_SECRET_ACCESS_KEY
      );
    } else {
      // Issue signed ticket for direct fallback upload route
      const uploadTicket = await createUploadTicket(r2Key, jwtSecret);
      presignedUrl = `/api/upload/direct?ticket=${encodeURIComponent(uploadTicket)}`;
      directR2Mode = true;
    }

    return c.json({
      success: true,
      presignedUrl,
      r2Key,
      directR2Mode,
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Gagal memproses tiket upload.' }, 500);
  }
});

uploadApp.put('/direct', async (c) => {
  const ticket = c.req.query('ticket');
  if (!ticket) {
    return c.json({ error: 'Akses ditolak: Tiket upload tidak ditemukan.' }, 401);
  }

  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const verification = await verifyUploadTicket(ticket, jwtSecret);

  if (!verification.valid || !verification.r2Key) {
    return c.json({ error: 'Akses ditolak: Tiket upload tidak valid atau kadaluarsa.' }, 403);
  }

  const contentLengthHeader = c.req.header('Content-Length');
  if (contentLengthHeader) {
    const length = parseInt(contentLengthHeader, 10);
    if (length > MAX_FILE_SIZE) {
      return c.json({ error: 'Ukuran file melebihi batas maksimal 5 GB.' }, 400);
    }
  }

  const contentType = c.req.header('Content-Type') || 'application/octet-stream';
  await c.env.STORAGE.put(verification.r2Key, c.req.raw.body, {
    httpMetadata: { contentType },
  });

  return c.json({ success: true, key: verification.r2Key });
});

uploadApp.post('/complete', async (c) => {
  try {
    const body = await c.req.json<{
      r2Key?: string;
      fileName?: string;
      fileSize?: number;
      mimeType?: string;
      fileHash?: string;
    }>();

    const { r2Key, fileName, fileSize, mimeType, fileHash } = body;

    if (!r2Key || !fileName || !fileSize) {
      return c.json({ error: 'r2Key, fileName, and fileSize are required.' }, 400);
    }

    if (fileSize > MAX_FILE_SIZE) {
      return c.json({ error: 'Ukuran file melebihi batas maksimal 5 GB.' }, 400);
    }

    // All uploads are anonymous guest uploads active for 30 days
    const expirationDays = 30;
    const expiresAtDate = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
    const expiresAtStr = expiresAtDate.toISOString().replace('T', ' ').substring(0, 19);

    const shareCode = nanoid(8);
    const fileId = `file_${nanoid(16)}`;

    await c.env.DB.prepare(
      `INSERT INTO files (
        id, user_id, share_code, file_name, file_size, mime_type, file_hash, r2_key, download_count, last_downloaded_at, expires_at, status
      ) VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, ?, 'active')`
    )
      .bind(
        fileId,
        shareCode,
        fileName,
        fileSize,
        mimeType || 'application/octet-stream',
        fileHash ? fileHash.toLowerCase() : null,
        r2Key,
        expiresAtStr
      )
      .run();

    return c.json({
      success: true,
      shareCode,
      file: {
        id: fileId,
        shareCode,
        fileName,
        fileSize,
        expiresAt: expiresAtStr,
      },
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Gagal menyimpan metadata file.' }, 500);
  }
});
