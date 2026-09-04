import { Hono } from 'hono';
import { Env, FileRecord } from '../types';
import { generateR2PresignedDownloadUrl } from '../utils/s3';
import { createDownloadTicket, verifyDownloadTicket } from '../utils/auth';

export const downloadApp = new Hono<{ Bindings: Env }>();

const DEFAULT_JWT_SECRET = 'fd_jwt_secret_default_filedontol_key';

downloadApp.get('/file/:code', async (c) => {
  const code = c.req.param('code');
  if (!code) {
    return c.json({ error: 'Share code is required.' }, 400);
  }

  const file = await c.env.DB.prepare(
    'SELECT id, user_id, share_code, file_name, file_size, mime_type, download_count, last_downloaded_at, expires_at, status, created_at FROM files WHERE share_code = ?'
  )
    .bind(code)
    .first<FileRecord>();

  if (!file) {
    return c.json({ error: 'File tidak ditemukan.' }, 404);
  }

  if (file.status === 'blocked' || file.status === 'deleted') {
    return c.json(
      { error: 'File telah dihapus / diblokir karena laporan pelanggaran Hak Cipta (DMCA) atau permintaan pemilik.' },
      403
    );
  }

  const now = new Date();
  const expiresAt = new Date(file.expires_at.endsWith('Z') ? file.expires_at : file.expires_at + 'Z');

  if (file.status === 'expired' || expiresAt.getTime() < now.getTime()) {
    return c.json({ error: 'File telah kadaluarsa.' }, 410);
  }

  // Generate a short-lived presigned download ticket (valid for 10 minutes)
  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const ticket = await createDownloadTicket(file.share_code, jwtSecret, 600);

  const downloadUrl = `/api/download/${file.share_code}?ticket=${encodeURIComponent(ticket)}`;

  return c.json({
    success: true,
    presignedDownloadUrl: downloadUrl,
    file: {
      shareCode: file.share_code,
      fileName: file.file_name,
      fileSize: file.file_size,
      mimeType: file.mime_type,
      downloadCount: file.download_count,
      lastDownloadedAt: file.last_downloaded_at,
      expiresAt: file.expires_at,
      createdAt: file.created_at,
      isMemberFile: file.user_id !== null,
    },
  });
});

downloadApp.get('/download/:code', async (c) => {
  const code = c.req.param('code');
  if (!code) {
    return c.json({ error: 'Share code is required.' }, 400);
  }

  const file = await c.env.DB.prepare('SELECT * FROM files WHERE share_code = ?')
    .bind(code)
    .first<FileRecord>();

  if (!file) {
    return c.json({ error: 'File tidak ditemukan.' }, 404);
  }

  if (file.status === 'blocked' || file.status === 'deleted') {
    return c.json(
      { error: 'File telah dihapus / diblokir karena laporan pelanggaran Hak Cipta (DMCA) atau permintaan pemilik.' },
      403
    );
  }

  const now = new Date();
  const expiresAt = new Date(file.expires_at.endsWith('Z') ? file.expires_at : file.expires_at + 'Z');

  if (file.status === 'expired' || expiresAt.getTime() < now.getTime()) {
    return c.json({ error: 'File telah kadaluarsa.' }, 410);
  }

  // Always verify short-lived HMAC download ticket for anti-hotlinking
  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const ticket = c.req.query('ticket');

  if (!ticket) {
    return c.json({ error: 'Tautan unduhan tidak valid atau belum dipresigned.' }, 401);
  }

  const verification = await verifyDownloadTicket(ticket, jwtSecret);
  if (!verification.valid || verification.shareCode !== file.share_code) {
    return c.json({ error: 'Tautan unduhan telah kadaluarsa. Silakan muat ulang halaman.' }, 403);
  }

  const newDownloadCount = (file.download_count || 0) + 1;
  // Non-stacking rule: If file reaches at least 15 downloads, reset expiration date to exactly 30 days from current download timestamp
  const shouldResetExpiration = newDownloadCount >= 15;

  if (shouldResetExpiration) {
    const newExpiresAtDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const newExpiresAtStr = newExpiresAtDate.toISOString().replace('T', ' ').substring(0, 19);

    c.executionCtx.waitUntil(
      c.env.DB.prepare(
        `UPDATE files
         SET download_count = download_count + 1,
             last_downloaded_at = CURRENT_TIMESTAMP,
             expires_at = ?
         WHERE id = ?`
      )
        .bind(newExpiresAtStr, file.id)
        .run()
    );
  } else {
    c.executionCtx.waitUntil(
      c.env.DB.prepare(
        `UPDATE files
         SET download_count = download_count + 1,
             last_downloaded_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
        .bind(file.id)
        .run()
    );
  }

  // If R2 S3 API keys are set, generate short-lived S3 Presigned GET URL and 302 Redirect (Anti-Hotlink)
  if (c.env.R2_ACCESS_KEY_ID && c.env.R2_SECRET_ACCESS_KEY) {
    try {
      const presignedDownloadUrl = await generateR2PresignedDownloadUrl(
        c.env.ACCOUNT_ID,
        'filedontol-storage',
        file.r2_key,
        file.file_name,
        c.env.R2_ACCESS_KEY_ID,
        c.env.R2_SECRET_ACCESS_KEY,
        600 // 10 minutes
      );
      return c.redirect(presignedDownloadUrl, 302);
    } catch (err) {
      console.error('Error generating presigned download URL:', err);
    }
  }

  // Stream binary object from Worker
  const object = await c.env.STORAGE.get(file.r2_key);
  if (!object) {
    return c.json({ error: 'Objek file tidak ditemukan di penyimpanan.' }, 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set(
    'Content-Disposition',
    `attachment; filename="${encodeURIComponent(file.file_name)}"`
  );
  if (file.mime_type) {
    headers.set('Content-Type', file.mime_type);
  }

  return new Response(object.body, {
    headers,
  });
});
