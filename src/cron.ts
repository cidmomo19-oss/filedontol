import { Env, FileRecord } from './types';

export async function handleScheduled(
  event: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext
): Promise<void> {
  console.log('[Cron Garbage Collection] Starting cleanup for expired files...');

  try {
    const expiredFiles = await env.DB.prepare(
      "SELECT id, r2_key, share_code FROM files WHERE datetime(expires_at) < datetime('now') AND status = 'active'"
    ).all<FileRecord>();

    if (!expiredFiles.results || expiredFiles.results.length === 0) {
      console.log('[Cron Garbage Collection] No expired files found.');
      return;
    }

    console.log(`[Cron Garbage Collection] Found ${expiredFiles.results.length} expired file(s).`);

    for (const file of expiredFiles.results) {
      try {
        await env.STORAGE.delete(file.r2_key);
        console.log(`[Cron Garbage Collection] Deleted R2 key: ${file.r2_key}`);

        await env.DB.prepare("UPDATE files SET status = 'expired' WHERE id = ?")
          .bind(file.id)
          .run();
      } catch (err) {
        console.error(`[Cron Garbage Collection] Error cleaning up file ${file.share_code}:`, err);
      }
    }

    console.log('[Cron Garbage Collection] Completed cleanup successfully.');
  } catch (err) {
    console.error('[Cron Garbage Collection] Scheduled cleanup failed:', err);
  }
}
