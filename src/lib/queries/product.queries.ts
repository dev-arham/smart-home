import { eq, and, gte, lte, inArray, sql, asc, desc, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, brands, categories, productAttributes, categoryAttributes, attributes } from "@/lib/db/schema";
import { getDescendantCategoryIds } from "./category.queries";
import type { ProductFilters, PaginatedResult, ProductWithRelations } from "@/lib/models/product.model";
import type { AttributeFilterOption } from "@/lib/models/attribute.model";

/**
 * Fetch products with full filtering, pagination, and sorting.
 * All filtering is database-level (category tree via recursive CTE, brand, price, attributes).
 */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResult<ProductWithRelations>> {
  const {
    categorySlug,
    brandSlug,
    minPrice,
    maxPrice,
    attributes: attrFilters,
    isActive = true,
    isFeatured,
    search,
    page = 1,
    pageSize = 12,
    sortBy = "newest",
  } = filters;

  const conditions: SQL[] = [];

  if (isActive !== undefined) {
    conditions.push(eq(products.isActive, isActive));
  }

  if (isFeatured !== undefined) {
    conditions.push(eq(products.isFeatured, isFeatured));
  }

  // Category filter — resolve slug to all descendant IDs via recursive CTE
  if (categorySlug) {
    const categoryIds = await getDescendantCategoryIds(categorySlug);
    if (categoryIds.length === 0) {
      return { data: [], total: 0, page, pageSize, totalPages: 0 };
    }
    conditions.push(inArray(products.categoryId, categoryIds));
  }

  // Brand filter
  if (brandSlug) {
    const brand = await db
      .select({ id: brands.id })
      .from(brands)
      .where(eq(brands.slug, brandSlug))
      .limit(1);
    if (brand.length === 0) {
      return { data: [], total: 0, page, pageSize, totalPages: 0 };
    }
    conditions.push(eq(products.brandId, brand[0].id));
  }

  // Price range (numeric columns compared as strings in Drizzle)
  if (minPrice !== undefined) {
    conditions.push(gte(products.price, String(minPrice)));
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(products.price, String(maxPrice)));
  }

  // Text search on name and description
  if (search) {
    conditions.push(
      sql`(${products.name} ILIKE ${"%" + search + "%"} OR ${products.description} ILIKE ${"%" + search + "%"})`
    );
  }

  // EAV attribute filters — each attribute adds a subquery condition
  if (attrFilters && Object.keys(attrFilters).length > 0) {
    for (const [attrId, allowedValues] of Object.entries(attrFilters)) {
      if (allowedValues.length === 0) continue;
      conditions.push(
        sql`${products.id} IN (
          SELECT product_id FROM product_attributes
          WHERE attribute_id = ${attrId}
          AND value IN (${sql.join(
            allowedValues.map((v) => sql`${v}`),
            sql`, `
          )})
        )`
      );
    }
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Sort
  const orderByClause = (() => {
    switch (sortBy) {
      case "price_asc":
        return asc(products.price);
      case "price_desc":
        return desc(products.price);
      case "name_asc":
        return asc(products.name);
      case "newest":
      default:
        return desc(products.createdAt);
    }
  })();

  // Count total matching products
  const [countRow] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(products)
    .where(whereClause);

  const total = countRow?.count ?? 0;
  const totalPages = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;

  if (total === 0) {
    return { data: [], total, page, pageSize, totalPages };
  }

  // Fetch page of product IDs (lightweight query for pagination)
  const productRows = await db
    .select({ id: products.id })
    .from(products)
    .where(whereClause)
    .orderBy(orderByClause)
    .limit(pageSize)
    .offset(offset);

  const productIds = productRows.map((r) => r.id);

  if (productIds.length === 0) {
    return { data: [], total, page, pageSize, totalPages };
  }

  // Full relational query for the page of products
  const fullProducts = await db.query.products.findMany({
    where: inArray(products.id, productIds),
    with: {
      category: true,
      brand: true,
      productAttributes: {
        with: { attribute: true },
      },
    },
  });

  // Maintain the sort order from the ID query
  const idOrder = new Map(productIds.map((id, i) => [id, i]));
  fullProducts.sort((a, b) => (idOrder.get(a.id) ?? 0) - (idOrder.get(b.id) ?? 0));

  return {
    data: fullProducts as unknown as ProductWithRelations[],
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Fetch a single product by slug with all relations.
 */
export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: {
      category: true,
      brand: true,
      productAttributes: {
        with: { attribute: true },
      },
    },
  });
  return (product as unknown as ProductWithRelations) ?? null;
}

/**
 * Fetch a single product by ID with all relations.
 */
export async function getProductById(id: string): Promise<ProductWithRelations | null> {
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, id), eq(products.isActive, true)),
    with: {
      category: true,
      brand: true,
      productAttributes: {
        with: { attribute: true },
      },
    },
  });
  return (product as unknown as ProductWithRelations) ?? null;
}

/**
 * Fetch featured products for the homepage.
 */
export async function getFeaturedProducts(limit: number = 6) {
  return db.query.products.findMany({
    where: and(eq(products.isActive, true), eq(products.isFeatured, true)),
    orderBy: desc(products.createdAt),
    limit,
    with: { brand: true, category: true },
  });
}

/**
 * Fetch related products in the same category, excluding the current product.
 */
export async function getRelatedProducts(productId: string, limit: number = 4) {
  const product = await db
    .select({ categoryId: products.categoryId })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product[0]?.categoryId) return [];

  return db.query.products.findMany({
    where: and(
      eq(products.categoryId, product[0].categoryId),
      eq(products.isActive, true),
      sql`${products.id} != ${productId}`
    ),
    limit,
    with: { brand: true },
  });
}

/**
 * Get available attribute filters for a category (including descendants).
 * Returns each attribute with its distinct values across matching products.
 */
export async function getAttributeFiltersForCategory(
  categorySlug: string
): Promise<AttributeFilterOption[]> {
  const categoryIds = await getDescendantCategoryIds(categorySlug);
  if (categoryIds.length === 0) return [];

  const rows = await db.execute<{
    attribute_id: string;
    attribute_name: string;
    data_type: string;
    is_required: boolean;
    values: string[] | null;
  }>(sql`
    SELECT
      a.id AS attribute_id,
      a.name AS attribute_name,
      a.data_type,
      ca.is_required,
      ARRAY_AGG(DISTINCT pa.value) FILTER (WHERE pa.value IS NOT NULL) AS values
    FROM category_attributes ca
    INNER JOIN attributes a ON ca.attribute_id = a.id
    LEFT JOIN product_attributes pa ON pa.attribute_id = a.id
      AND pa.product_id IN (
        SELECT id FROM products
        WHERE category_id = ANY(${categoryIds})
        AND is_active = true
      )
    WHERE ca.category_id = ANY(${categoryIds})
    GROUP BY a.id, a.name, a.data_type, ca.is_required
    ORDER BY a.name
  `);

  return rows.rows.map((row) => ({
    attributeId: row.attribute_id,
    attributeName: row.attribute_name,
    dataType: row.data_type,
    values: row.values ?? [],
    isRequired: row.is_required,
  }));
}
