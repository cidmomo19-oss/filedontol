import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { Env, BlacklistedHash } from '../types';
import { parseCookies, verifyJWT, createUploadTicket, verifyUploadTicket } from '../utils/auth';
import { generateR2PresignedUrl } from '../utils/s3';

export const uploadApp = new Hono<{ Bindings: Env }>();

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5 GB
const DEFAULT_JWT_SECRET = 'fd_jwt_secret_default_filedontol_key';

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

    // Enforce single-use: Check if r2Key has already been registered in D1
    const existing = await c.env.DB.prepare('SELECT id FROM files WHERE r2_key = ?')
      .bind(r2Key)
      .first();

    if (existing) {
      return c.json({ error: 'Tiket upload ini sudah digunakan (single-use).' }, 400);
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
