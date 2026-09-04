import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { Env, User } from '../types';
import { hashPassword, verifyPassword, signJWT, verifyJWT, parseCookies } from '../utils/auth';

export const authApp = new Hono<{ Bindings: Env }>();

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

    const token = await signJWT({ sub: userId, email }, c.env.JWT_SECRET);

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

    const token = await signJWT({ sub: user.id, email: user.email }, c.env.JWT_SECRET);

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

  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ authenticated: false, user: null });
  }

  return c.json({
    authenticated: true,
    user: { id: payload.sub, email: payload.email },
  });
});
