import { Hono } from 'hono';
import { Env, FileRecord } from '../types';

export const adminApp = new Hono<{ Bindings: Env }>();

adminApp.get('/delete', async (c) => {
  const code = c.req.query('code');
  const secret = c.req.query('secret');

  if (!secret || secret !== c.env.ADMIN_SECRET) {
    return c.text('Forbidden: Invalid secret key.', 403);
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
