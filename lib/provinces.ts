import { getPool } from "@/lib/db";
import { PROVINCE_SEED, slugifyProvinceName } from "@/lib/province-seed";

export type Province = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  featured: boolean;
};

export async function ensureProvincesTable(): Promise<void> {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS provinces (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      slug VARCHAR(255) NOT NULL UNIQUE,
      sort_order INT NOT NULL DEFAULT 0,
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    ALTER TABLE provinces ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;
  `);
  await pool.query(`
    ALTER TABLE provinces ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
  `);
  await pool.query(`
    ALTER TABLE provinces ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
  `);
}

export async function seedProvincesIfEmpty(): Promise<void> {
  await ensureProvincesTable();
  const pool = getPool();

  const countResult = await pool.query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM provinces",
  );
  const count = parseInt(countResult.rows[0]?.count ?? "0", 10);
  if (count > 0) {
    await syncProvinceMetadata();
    return;
  }

  for (let i = 0; i < PROVINCE_SEED.length; i++) {
    const { name, featured } = PROVINCE_SEED[i];
    await pool.query(
      `INSERT INTO provinces (name, slug, sort_order, featured)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (name) DO UPDATE SET
         slug = EXCLUDED.slug,
         sort_order = EXCLUDED.sort_order,
         featured = EXCLUDED.featured`,
      [name, slugifyProvinceName(name), i, featured],
    );
  }
}

/** Cập nhật sort_order / featured cho bảng đã có dữ liệu từ schema cũ. */
async function syncProvinceMetadata(): Promise<void> {
  const pool = getPool();

  for (let i = 0; i < PROVINCE_SEED.length; i++) {
    const { name, featured } = PROVINCE_SEED[i];
    await pool.query(
      `UPDATE provinces
       SET sort_order = $2, featured = $3
       WHERE name = $1`,
      [name, i, featured],
    );
  }
}

export async function getAllProvinces(): Promise<Province[]> {
  await seedProvincesIfEmpty();
  const pool = getPool();
  const result = await pool.query<Province>(
    `SELECT id, name, slug, sort_order, featured
     FROM provinces
     ORDER BY sort_order ASC, name ASC`,
  );
  return result.rows.map(normalizeProvinceRow);
}

export async function getFeaturedProvinces(limit = 5): Promise<Province[]> {
  await seedProvincesIfEmpty();
  const pool = getPool();
  const result = await pool.query<Province>(
    `SELECT id, name, slug, sort_order, featured
     FROM provinces
     WHERE featured = true
     ORDER BY sort_order ASC, name ASC
     LIMIT $1`,
    [limit],
  );
  return result.rows.map(normalizeProvinceRow);
}

function normalizeProvinceRow(row: Province): Province {
  return {
    ...row,
    featured: Boolean(row.featured),
    sort_order: Number(row.sort_order ?? 0),
  };
}
