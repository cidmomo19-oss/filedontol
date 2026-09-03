import { Hono } from 'hono';
import { Env } from './types';
import { authApp } from './routes/auth';
import { uploadApp } from './routes/upload';
import { downloadApp } from './routes/download';
import { adminApp } from './routes/admin';
import { handleScheduled } from './cron';
import { getIndexHtml, getDownloadPageHtml, getDmcaPageHtml } from './views/pages';

const app = new Hono<{ Bindings: Env }>();

app.route('/api/auth', authApp);
app.route('/api/upload', uploadApp);
app.route('/api/admin', adminApp);
app.route('/api', downloadApp);

app.get('/', (c) => c.html(getIndexHtml()));
app.get('/f/:code', (c) => c.html(getDownloadPageHtml(c.req.param('code'))));
app.get('/dmca', (c) => c.html(getDmcaPageHtml()));

export default {
  fetch: app.fetch,
  scheduled: handleScheduled,
};
