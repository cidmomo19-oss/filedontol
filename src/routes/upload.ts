import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { Env, BlacklistedHash, User } from '../types';
import { parseCookies, verifyJWT } from '../utils/auth';
import { generateR2PresignedUrl } from '../utils/s3';

export const uploadApp = new Hono<{ Bindings: Env }>();

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5 GB

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
      presignedUrl = `/api/upload/direct?key=${encodeURIComponent(r2Key)}`;
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
  const r2Key = c.req.query('key');
  if (!r2Key) {
    return c.json({ error: 'Missing r2Key' }, 400);
  }

  const contentType = c.req.header('Content-Type') || 'application/octet-stream';
  await c.env.STORAGE.put(r2Key, c.req.raw.body, {
    httpMetadata: { contentType },
  });

  return c.json({ success: true, key: r2Key });
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

    const cookies = parseCookies(c.req.header('Cookie') || null);
    const token = cookies['auth_token'];
    let userId: string | null = null;

    if (token) {
      const payload = await verifyJWT(token, c.env.JWT_SECRET);
      if (payload) {
        userId = payload.sub;
      }
    }

    const expirationDays = userId ? 60 : 14;
    const expiresAtDate = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
    const expiresAtStr = expiresAtDate.toISOString().replace('T', ' ').substring(0, 19);

    const shareCode = nanoid(8);
    const fileId = `file_${nanoid(16)}`;

    await c.env.DB.prepare(
      `INSERT INTO files (
        id, user_id, share_code, file_name, file_size, mime_type, file_hash, r2_key, download_count, last_downloaded_at, expires_at, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, ?, 'active')`
    )
      .bind(
        fileId,
        userId,
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
        isMember: !!userId,
      },
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Gagal menyimpan metadata file.' }, 500);
  }
});
