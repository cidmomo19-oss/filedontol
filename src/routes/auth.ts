import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { Env, User, FileRecord } from '../types';
import { hashPassword, verifyPassword, signJWT, verifyJWT, parseCookies } from '../utils/auth';

export const authApp = new Hono<{ Bindings: Env }>();

const DEFAULT_JWT_SECRET = 'fd_jwt_secret_default_filedontol_key';

authApp.post('/register', async (c) => {
  try {
    const body = await c.req.json<{ email?: string; password?: string }>();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required.' }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters long.' }, 400);
    }

    const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first<User>();

    if (existing) {
      return c.json({ error: 'User with this email already exists.' }, 400);
    }

    const userId = `usr_${nanoid(16)}`;
    const passwordHash = await hashPassword(password);

    await c.env.DB.prepare('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)')
      .bind(userId, email, passwordHash)
      .run();

    const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
    const token = await signJWT({ sub: userId, email }, jwtSecret);

    c.header('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 86400}`);

    return c.json({
      success: true,
      user: { id: userId, email },
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Registration failed.' }, 500);
  }
});

authApp.post('/login', async (c) => {
  try {
    const body = await c.req.json<{ email?: string; password?: string }>();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required.' }, 400);
    }

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first<User>();

    if (!user) {
      return c.json({ error: 'Invalid email or password.' }, 401);
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return c.json({ error: 'Invalid email or password.' }, 401);
    }

    const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
    const token = await signJWT({ sub: user.id, email: user.email }, jwtSecret);

    c.header('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 86400}`);

    return c.json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    return c.json({ error: err.message || 'Login failed.' }, 500);
  }
});

authApp.post('/logout', (c) => {
  c.header('Set-Cookie', 'auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return c.json({ success: true, message: 'Logged out successfully.' });
});

authApp.get('/me', async (c) => {
  const cookies = parseCookies(c.req.header('Cookie') || null);
  const token = cookies['auth_token'];
  if (!token) {
    return c.json({ authenticated: false, user: null });
  }

  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const payload = await verifyJWT(token, jwtSecret);
  if (!payload) {
    return c.json({ authenticated: false, user: null });
  }

  return c.json({
    authenticated: true,
    user: { id: payload.sub, email: payload.email },
  });
});

// GET /api/user/files - List files owned by logged in user
authApp.get('/files', async (c) => {
  const cookies = parseCookies(c.req.header('Cookie') || null);
  const token = cookies['auth_token'];
  if (!token) {
    return c.json({ error: 'Tidak terautentikasi.' }, 401);
  }

  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const payload = await verifyJWT(token, jwtSecret);
  if (!payload) {
    return c.json({ error: 'Sesi telah berakhir. Silakan login kembali.' }, 401);
  }

  const userFiles = await c.env.DB.prepare(
    `SELECT id, share_code, file_name, file_size, mime_type, download_count, last_downloaded_at, expires_at, status, created_at
     FROM files
     WHERE user_id = ? AND status != 'deleted' AND status != 'blocked'
     ORDER BY created_at DESC`
  )
    .bind(payload.sub)
    .all<FileRecord>();

  const results = userFiles.results || [];
  const totalFiles = results.length;
  const totalStorage = results.reduce((acc, f) => acc + (f.file_size || 0), 0);
  const totalDownloads = results.reduce((acc, f) => acc + (f.download_count || 0), 0);

  return c.json({
    success: true,
    stats: {
      totalFiles,
      totalStorage,
      totalDownloads,
    },
    files: results,
  });
});

// DELETE /api/user/files/:id - Soft delete file owned by logged in user
authApp.delete('/files/:id', async (c) => {
  const fileId = c.req.param('id');
  const cookies = parseCookies(c.req.header('Cookie') || null);
  const token = cookies['auth_token'];

  if (!token) {
    return c.json({ error: 'Tidak terautentikasi.' }, 401);
  }

  const jwtSecret = c.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const payload = await verifyJWT(token, jwtSecret);
  if (!payload) {
    return c.json({ error: 'Sesi telah berakhir.' }, 401);
  }

  const file = await c.env.DB.prepare('SELECT * FROM files WHERE id = ? AND user_id = ?')
    .bind(fileId, payload.sub)
    .first<FileRecord>();

  if (!file) {
    return c.json({ error: 'File tidak ditemukan atau Anda tidak memiliki akses.' }, 404);
  }

  try {
    await c.env.STORAGE.delete(file.r2_key);
  } catch (err) {
    console.error(`Gagal menghapus R2 key ${file.r2_key}:`, err);
  }

  await c.env.DB.prepare("UPDATE files SET status = 'deleted' WHERE id = ?")
    .bind(file.id)
    .run();

  return c.json({ success: true, message: 'File berhasil dihapus.' });
});
