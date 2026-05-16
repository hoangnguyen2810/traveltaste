import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString,
  ssl:
    process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});

const statements = [
  `
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
`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(255);`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram VARCHAR(255);`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS website VARCHAR(500);`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`,
  `ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;`,
];

try {
  for (const sql of statements) {
    await pool.query(sql);
  }
  console.log("users table ready (with profile columns)");
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await pool.end();
}
