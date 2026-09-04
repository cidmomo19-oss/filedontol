export interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
  ADMIN_SECRET?: string;
  JWT_SECRET?: string;
  ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface FileRecord {
  id: string;
  user_id: string | null;
  share_code: string;
  file_name: string;
  file_size: number;
  mime_type: string | null;
  file_hash: string | null;
  r2_key: string;
  download_count: number;
  last_downloaded_at: string;
  expires_at: string;
  status: 'active' | 'blocked' | 'expired' | 'deleted';
  created_at: string;
}

export interface BlacklistedHash {
  file_hash: string;
  reason: string | null;
  blocked_at: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
