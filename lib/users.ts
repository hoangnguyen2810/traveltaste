import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

export type DbUser = {
  id: number;
  email: string;
  name: string | null;
  password_hash: string | null;
};

export type UserProfile = {
  id: number;
  email: string;
  name: string | null;
  location: string | null;
  bio: string | null;
  instagram: string | null;
  website: string | null;
  avatar_url: string | null;
};

export type ProfileUpdateInput = {
  name: string;
  location?: string;
  bio?: string;
  instagram?: string;
  website?: string;
  avatarUrl?: string;
};

export async function ensureUsersTable(): Promise<void> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      password_hash VARCHAR(255),
      location VARCHAR(255),
      bio TEXT,
      instagram VARCHAR(255),
      website VARCHAR(500),
      avatar_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(255);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram VARCHAR(255);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS website VARCHAR(500);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
    ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
  `);
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const pool = getPool();
  const result = await pool.query<DbUser>(
    `SELECT id, email, name, password_hash
     FROM users
     WHERE LOWER(email) = LOWER($1)`,
    [email.trim()]
  );
  return result.rows[0] ?? null;
}

export async function getUserProfileByEmail(
  email: string
): Promise<UserProfile | null> {
  await ensureUsersTable();
  const pool = getPool();
  const result = await pool.query<UserProfile>(
    `SELECT id, email, name, location, bio, instagram, website, avatar_url
     FROM users
     WHERE LOWER(email) = LOWER($1)`,
    [email.trim()]
  );
  return result.rows[0] ?? null;
}

export async function upsertUserProfile(
  email: string,
  data: ProfileUpdateInput
): Promise<UserProfile> {
  await ensureUsersTable();
  const pool = getPool();
  const normalizedEmail = email.trim().toLowerCase();

  const result = await pool.query<UserProfile>(
    `INSERT INTO users (
       email, name, password_hash, location, bio, instagram, website, avatar_url, updated_at
     )
     VALUES ($1, $2, NULL, $3, $4, $5, $6, $7, NOW())
     ON CONFLICT (email) DO UPDATE SET
       name = EXCLUDED.name,
       location = EXCLUDED.location,
       bio = EXCLUDED.bio,
       instagram = EXCLUDED.instagram,
       website = EXCLUDED.website,
       avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
       updated_at = NOW()
     RETURNING id, email, name, location, bio, instagram, website, avatar_url`,
    [
      normalizedEmail,
      data.name.trim(),
      data.location?.trim() || null,
      data.bio?.trim() || null,
      data.instagram?.trim() || null,
      data.website?.trim() || null,
      data.avatarUrl?.trim() || null,
    ]
  );

  return result.rows[0];
}

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
}): Promise<{ id: number; email: string; name: string }> {
  await ensureUsersTable();
  const pool = getPool();
  const email = data.email.trim().toLowerCase();
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("EMAIL_EXISTS");
  }

  const password_hash = await bcrypt.hash(data.password, 12);
  const result = await pool.query<{ id: number; email: string; name: string }>(
    `INSERT INTO users (email, name, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, email, name`,
    [email, data.name.trim(), password_hash]
  );

  return result.rows[0];
}

export async function verifyUserCredentials(
  email: string,
  password: string
): Promise<{ id: number; email: string; name: string | null } | null> {
  const user = await findUserByEmail(email);
  if (!user?.password_hash) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  return { id: user.id, email: user.email, name: user.name };
}
