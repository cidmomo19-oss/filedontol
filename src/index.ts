import { Hono } from 'hono';
import { Env } from './types';
import { authApp } from './routes/auth';
import { uploadApp } from './routes/upload';
import { downloadApp } from './routes/download';
import { adminApp } from './routes/admin';
import { handleScheduled } from './cron';
import { getIndexHtml, getDashboardPageHtml, getDownloadPageHtml, getDmcaPageHtml, getNotFoundPageHtml } from './views/pages';

const app = new Hono<{ Bindings: Env }>();

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

app.use('*', async (c, next) => {
  await next();
  c.header('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudflare.com https://*.workers.dev; img-src 'self' data: https:; object-src 'none';");
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

app.use('/api/auth/*', async (c, next) => {
  const ip = c.req.header('cf-connecting-ip') || '127.0.0.1';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 50;

  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count++;
  rateLimitMap.set(ip, record);

  if (record.count > maxRequests) {
    return c.json({ error: 'Terlalu banyak permintaan. Silakan coba lagi beberapa menit lagi.' }, 429);
  }

  await next();
});

// API routes
app.route('/api/auth', authApp);
app.route('/api/upload', uploadApp);
app.route('/api/admin', adminApp);
app.route('/api', downloadApp);

// Frontend HTML Pages
app.get('/', (c) => c.html(getIndexHtml()));
app.get('/dashboard', (c) => c.html(getDashboardPageHtml()));
app.get('/f/:code', (c) => c.html(getDownloadPageHtml(c.req.param('code'))));
app.get('/dmca', (c) => c.html(getDmcaPageHtml()));

// Custom 404 handler
app.notFound((c) => c.html(getNotFoundPageHtml(), 404));

export default {
  fetch: app.fetch,
  scheduled: handleScheduled,
};
