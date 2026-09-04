import { Hono } from 'hono';
import { Env, FileRecord } from '../types';
import { timingSafeEqual } from '../utils/auth';

export const adminApp = new Hono<{ Bindings: Env }>();

const DEFAULT_ADMIN_SECRET = 'fd_adm_9x7Kp2Mv8Q4wL1tY6bZ3nR5sC0jE8uA2';

adminApp.post('/delete', async (c) => {
  const authHeader = c.req.header('Authorization');
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else {
    // Fallback to query param or body for backward compatibility during migration
    token = c.req.query('secret') || '';
  }

  const adminSecret = c.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;
  const isSecretValid = await timingSafeEqual(token, adminSecret);

  if (!isSecretValid) {
    return c.text('Forbidden: Invalid admin secret key.', 403);
  }

  let code = c.req.query('code');
  if (!code) {
    try {
      const body = await c.req.json<{ code?: string }>();
      code = body.code;
    } catch {}
  }

  if (!code) {
    return c.text('Bad Request: Parameter code required.', 400);
  }

  const file = await c.env.DB.prepare('SELECT * FROM files WHERE share_code = ?')
    .bind(code)
    .first<FileRecord>();

  if (!file) {
    return c.text(`Error: File dengan share_code '${code}' tidak ditemukan.`, 404);
  }

  try {
    await c.env.STORAGE.delete(file.r2_key);
  } catch (err) {
    console.error(`Gagal menghapus dari R2 key ${file.r2_key}:`, err);
  }

  if (file.file_hash) {
    await c.env.DB.prepare(
      'INSERT OR IGNORE INTO blacklisted_hashes (file_hash, reason) VALUES (?, ?)'
    )
      .bind(file.file_hash.toLowerCase(), 'Takedown via Admin Endpoint (DMCA / Violation)')
      .run();
  }

  await c.env.DB.prepare("UPDATE files SET status = 'blocked' WHERE id = ?")
    .bind(file.id)
    .run();

  return c.html(`Sukses: File ${code} telah dihapus permanen dari R2 dan di-blacklist.`);
});
