import { eq, and, sql, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { brands, products } from "@/lib/db/schema";
import type { Brand, BrandWithProductCount } from "@/lib/models/brand.model";

/**
 * Fetch all active brands, ordered alphabetically.
 */
export async function getBrands(): Promise<Brand[]> {
  return db.query.brands.findMany({
    where: eq(brands.isActive, true),
    orderBy: asc(brands.name),
  });
}

/**
 * Fetch a single brand by slug, including its active product count.
 */
export async function getBrandBySlug(slug: string): Promise<BrandWithProductCount | null> {
  const brand = await db.query.brands.findFirst({
    where: and(eq(brands.slug, slug), eq(brands.isActive, true)),
  });

  if (!brand) return null;

  const [row] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(products)
    .where(and(eq(products.brandId, brand.id), eq(products.isActive, true)));

  return { ...brand, productCount: row?.count ?? 0 };
}
