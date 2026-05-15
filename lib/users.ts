import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

export type DbUser = {
  id: number;
  email: string;
  name: string | null;
  password_hash: string;
};

export async function ensureUsersTable(): Promise<void> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
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

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
}): Promise<{ id: number; email: string; name: string }> {
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
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  return { id: user.id, email: user.email, name: user.name };
}
