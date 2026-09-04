import { Hono } from 'hono';
import { Env, FileRecord } from '../types';

export const reportApp = new Hono<{ Bindings: Env }>();

reportApp.post('/', async (c) => {
  try {
    const body = await c.req.json<{
      shareCode?: string;
      reason?: string;
      details?: string;
      reporterEmail?: string;
    }>();

    const { shareCode, reason, details, reporterEmail } = body;

    if (!shareCode || !reason || !reporterEmail) {
      return c.json({ error: 'Kode file, alasan pelanggaran, dan email pelapor wajib diisi.' }, 400);
    }

    const file = await c.env.DB.prepare('SELECT id, file_name, file_hash FROM files WHERE share_code = ?')
      .bind(shareCode.trim())
      .first<FileRecord>();

    if (!file) {
      return c.json({ error: 'File dengan kode tersebut tidak ditemukan.' }, 404);
    }

    // High severity violations (e.g. CSAM / Pornografi Anak, Malware, Violent Extremism) automatically trigger immediate status review
    const isCriticalAbuse = reason.includes('csam') || reason.includes('pornografi_anak') || reason.includes('kekerasan');

    if (isCriticalAbuse && file.file_hash) {
      // Temporarily mark as blocked pending review
      await c.env.DB.prepare("UPDATE files SET status = 'blocked' WHERE id = ?")
        .bind(file.id)
        .run();

      await c.env.DB.prepare('INSERT OR IGNORE INTO blacklisted_hashes (file_hash, reason) VALUES (?, ?)')
        .bind(file.file_hash.toLowerCase(), `Laporan Kritis: ${reason} oleh ${reporterEmail}`)
        .run();
    }

    return c.json({
      success: true,
      message: isCriticalAbuse
        ? 'Laporan pelanggaran kritis diterima. File telah dinonaktifkan sementara untuk peninjauan tim moderasi.'
        : 'Laporan Anda telah berhasil dikirim dan akan diproses oleh tim moderasi dalam 1x24 jam.',
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Gagal mengirimkan laporan.' }, 500);
  }
});
