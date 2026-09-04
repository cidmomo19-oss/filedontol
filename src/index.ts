import { Hono } from 'hono';
import { Env } from './types';
import { uploadApp } from './routes/upload';
import { downloadApp } from './routes/download';
import { adminApp } from './routes/admin';
import { reportApp } from './routes/report';
import { handleScheduled } from './cron';
import {
  getIndexHtml,
  getDownloadPageHtml,
  getDmcaPageHtml,
  getReportPageHtml,
  getNotFoundPageHtml,
} from './views/pages';

const app = new Hono<{ Bindings: Env }>();

app.use('*', async (c, next) => {
  await next();
  c.header(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudflare.com https://*.workers.dev; img-src 'self' data: https:; object-src 'none';"
  );
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

// API routes
app.route('/api/upload', uploadApp);
app.route('/api/admin', adminApp);
app.route('/api/report', reportApp);
app.route('/api', downloadApp);

// Root route: Always serve the Homepage
app.get('/', (c) => {
  return c.html(getIndexHtml());
});
app.get('/f/:code', (c) => c.html(getDownloadPageHtml(c.req.param('code'))));
app.get('/dmca', (c) => c.html(getDmcaPageHtml()));
app.get('/report', (c) => c.html(getReportPageHtml()));

// Custom 404 handler
app.notFound((c) => c.html(getNotFoundPageHtml(), 404));

export default {
  fetch: app.fetch,
  scheduled: handleScheduled,
};
