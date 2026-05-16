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

const PROVINCE_SEED = [
  { name: "Hà Nội", featured: true },
  { name: "TP. Hồ Chí Minh", featured: true },
  { name: "Hải Phòng", featured: false },
  { name: "Đà Nẵng", featured: true },
  { name: "An Giang", featured: false },
  { name: "Bắc Ninh", featured: false },
  { name: "Cà Mau", featured: false },
  { name: "Cần Thơ", featured: false },
  { name: "Cao Bằng", featured: false },
  { name: "Đắk Lắk", featured: false },
  { name: "Điện Biên", featured: false },
  { name: "Đồng Nai", featured: false },
  { name: "Đồng Tháp", featured: false },
  { name: "Gia Lai", featured: false },
  { name: "Hà Tĩnh", featured: false },
  { name: "Hưng Yên", featured: false },
  { name: "Khánh Hòa", featured: true },
  { name: "Lai Châu", featured: false },
  { name: "Lâm Đồng", featured: true },
  { name: "Lạng Sơn", featured: false },
  { name: "Lào Cai", featured: false },
  { name: "Nghệ An", featured: false },
  { name: "Ninh Bình", featured: false },
  { name: "Phú Thọ", featured: false },
  { name: "Quảng Ngãi", featured: false },
  { name: "Quảng Ninh", featured: false },
  { name: "Quảng Trị", featured: false },
  { name: "Sóc Trăng", featured: false },
  { name: "Sơn La", featured: false },
  { name: "Tây Ninh", featured: false },
  { name: "Thái Nguyên", featured: false },
  { name: "Thanh Hóa", featured: false },
  { name: "Thừa Thiên Huế", featured: false },
  { name: "Tuyên Quang", featured: false },
  { name: "Vĩnh Long", featured: false },
];

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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
  `
CREATE TABLE IF NOT EXISTS provinces (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`,
  `ALTER TABLE provinces ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;`,
  `ALTER TABLE provinces ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;`,
  `ALTER TABLE provinces ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`,
];

try {
  for (const sql of statements) {
    await pool.query(sql);
  }
  console.log("users & provinces tables ready");

  for (let i = 0; i < PROVINCE_SEED.length; i++) {
    const { name, featured } = PROVINCE_SEED[i];
    await pool.query(
      `INSERT INTO provinces (name, slug, sort_order, featured)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (name) DO UPDATE SET
         slug = EXCLUDED.slug,
         sort_order = EXCLUDED.sort_order,
         featured = EXCLUDED.featured`,
      [name, slugify(name), i, featured],
    );
  }
  console.log(`seeded ${PROVINCE_SEED.length} provinces`);
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await pool.end();
}
