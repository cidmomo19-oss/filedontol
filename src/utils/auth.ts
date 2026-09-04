import { JWTPayload } from '../types';

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);

  if (aBuf.byteLength !== bBuf.byteLength) return false;

  const aKey = await crypto.subtle.importKey('raw', aBuf, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bKey = await crypto.subtle.importKey('raw', bBuf, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);

  const zeroBuf = new Uint8Array(1);
  const aSig = await crypto.subtle.sign('HMAC', aKey, zeroBuf);
  const bSig = await crypto.subtle.sign('HMAC', bKey, zeroBuf);

  const aBytes = new Uint8Array(aSig);
  const bBytes = new Uint8Array(bSig);

  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

export async function createUploadTicket(r2Key: string, secret: string, expiresInSec = 1800): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInSec;
  const payloadStr = `${r2Key}:${exp}`;

  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(payloadStr));
  const encodedSig = arrayBufferToBase64Url(signature);

  return `${btoa(payloadStr)}.${encodedSig}`;
}

export async function verifyUploadTicket(ticket: string, secret: string): Promise<{ valid: boolean; r2Key?: string }> {
  try {
    const parts = ticket.split('.');
    if (parts.length !== 2) return { valid: false };

    const [encodedPayload, encodedSig] = parts;
    const payloadStr = atob(encodedPayload);
    const [r2Key, expStr] = payloadStr.split(':');
    const exp = parseInt(expStr, 10);

    const now = Math.floor(Date.now() / 1000);
    if (!exp || exp < now) return { valid: false };

    const encoder = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = new Uint8Array(
      base64UrlDecode(encodedSig).split('').map((c) => c.charCodeAt(0))
    );

    const isValid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, encoder.encode(payloadStr));

    if (!isValid) return { valid: false };
    return { valid: true, r2Key };
  } catch {
    return { valid: false };
  }
}

export async function createDownloadTicket(shareCode: string, secret: string, expiresInSec = 600): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInSec;
  const payloadStr = `${shareCode}:${exp}`;

  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(payloadStr));
  const encodedSig = arrayBufferToBase64Url(signature);

  return `${btoa(payloadStr)}.${encodedSig}`;
}

export async function verifyDownloadTicket(ticket: string, secret: string): Promise<{ valid: boolean; shareCode?: string }> {
  try {
    const parts = ticket.split('.');
    if (parts.length !== 2) return { valid: false };

    const [encodedPayload, encodedSig] = parts;
    const payloadStr = atob(encodedPayload);
    const [shareCode, expStr] = payloadStr.split(':');
    const exp = parseInt(expStr, 10);

    const now = Math.floor(Date.now() / 1000);
    if (!exp || exp < now) return { valid: false };

    const encoder = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = new Uint8Array(
      base64UrlDecode(encodedSig).split('').map((c) => c.charCodeAt(0))
    );

    const isValid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, encoder.encode(payloadStr));

    if (!isValid) return { valid: false };
    return { valid: true, shareCode };
  } catch {
    return { valid: false };
  }
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );

  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const combined = new Uint8Array(salt.length + exportedKey.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(exportedKey), salt.length);

  return arrayBufferToBase64Url(combined.buffer);
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const combined = new Uint8Array(
    base64UrlDecode(storedHash).split('').map((c) => c.charCodeAt(0))
  );

  if (combined.length !== 48) return false;

  const salt = combined.slice(0, 16);
  const expectedKeyBytes = combined.slice(16);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );

  const derivedKeyBytes = new Uint8Array(await crypto.subtle.exportKey('raw', key));

  if (derivedKeyBytes.length !== expectedKeyBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < derivedKeyBytes.length; i++) {
    diff |= derivedKeyBytes[i] ^ expectedKeyBytes[i];
  }
  return diff === 0;
}

export async function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>, secret: string, expiresInSec = 30 * 86400): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSec,
  };

  const encoder = new TextEncoder();
  const encodedHeader = arrayBufferToBase64Url(encoder.encode(JSON.stringify(header)).buffer);
  const encodedPayload = arrayBufferToBase64Url(encoder.encode(JSON.stringify(fullPayload)).buffer);

  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(dataToSign));
  const encodedSignature = arrayBufferToBase64Url(signature);

  return `${dataToSign}.${encodedSignature}`;
}

export async function verifyJWT(token: string, secret: string): Promise<JWTPayload | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signatureBytes = new Uint8Array(
    base64UrlDecode(encodedSignature).split('').map((c) => c.charCodeAt(0))
  );

  const isValid = await crypto.subtle.verify(
    'HMAC',
    cryptoKey,
    signatureBytes,
    encoder.encode(dataToSign)
  );

  if (!isValid) return null;

  try {
    const payloadJson = base64UrlDecode(encodedPayload);
    const payload: JWTPayload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.split('=');
    if (name && rest) {
      cookies[name.trim()] = rest.join('=').trim();
    }
  });
  return cookies;
}
