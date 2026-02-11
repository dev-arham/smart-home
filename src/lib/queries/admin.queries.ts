import {
  eq,
  and,
  sql,
  asc,
  desc,
  ilike,
  or,
  inArray,
  type SQL,
} from "drizzle-orm";
import { db } from "@/lib/db";
import {
  products,
  categories,
  brands,
  attributes,
  categoryAttributes,
  productAttributes,
  user,
  userProfile,
} from "@/lib/db/schema";

// ── Dashboard ────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [
    [{ count: totalProducts }],
    [{ count: activeProducts }],
    [{ count: totalCategories }],
    [{ count: totalBrands }],
    [{ count: totalUsers }],
    [{ count: lowStockCount }],
    [{ count: featuredCount }],
  ] = await Promise.all([
    db.select({ count: sql<number>`COUNT(*)::int` }).from(products),
    db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(products)
      .where(eq(products.isActive, true)),
    db.select({ count: sql<number>`COUNT(*)::int` }).from(categories),
    db.select({ count: sql<number>`COUNT(*)::int` }).from(brands),
    db.select({ count: sql<number>`COUNT(*)::int` }).from(user),
    db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(products)
      .where(sql`${products.stockUnits} <= ${products.lowStockThreshold}`),
    db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(products)
      .where(eq(products.isFeatured, true)),
  ]);

  return {
    totalProducts,
    activeProducts,
    totalCategories,
    totalBrands,
    totalUsers,
    lowStockCount,
    featuredCount,
  };
}

// ── Low-stock products ───────────────────────────────────────────────

export async function getLowStockProducts(limit = 10) {
  return db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      stockUnits: products.stockUnits,
      lowStockThreshold: products.lowStockThreshold,
      sellType: products.sellType,
      thumbnailUrl: products.thumbnailUrl,
    })
    .from(products)
    .where(sql`${products.stockUnits} <= ${products.lowStockThreshold}`)
    .orderBy(asc(products.stockUnits))
    .limit(limit);
}

// ── Recent products ──────────────────────────────────────────────────

export async function getRecentProducts(limit = 5) {
  return db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      price: products.price,
      isActive: products.isActive,
      createdAt: products.createdAt,
    })
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

// ── Admin products (paginated + filtered) ────────────────────────────

interface AdminProductFilters {
  search?: string;
  categoryId?: string;
  brandId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
}

export async function getAdminProducts(filters: AdminProductFilters = {}) {
  const {
    search,
    categoryId,
    brandId,
    isActive,
    isFeatured,
    page = 1,
    pageSize = 10,
    sortBy = "newest",
  } = filters;

  const conditions: SQL[] = [];

  if (search) {
    conditions.push(
      or(
        ilike(products.name, `%${search}%`),
        ilike(products.sku, `%${search}%`)
      )!
    );
  }

  if (categoryId) {
    conditions.push(eq(products.categoryId, categoryId));
  }

  if (brandId) {
    conditions.push(eq(products.brandId, brandId));
  }

  if (isActive !== undefined) {
    conditions.push(eq(products.isActive, isActive));
  }

  if (isFeatured !== undefined) {
    conditions.push(eq(products.isFeatured, isFeatured));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Total count
  const [{ count: total }] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(products)
    .where(whereClause);

  // Determine sort order
  let orderBy;
  switch (sortBy) {
    case "oldest":
      orderBy = asc(products.createdAt);
      break;
    case "name_asc":
      orderBy = asc(products.name);
      break;
    case "name_desc":
      orderBy = desc(products.name);
      break;
    case "price_asc":
      orderBy = asc(products.price);
      break;
    case "price_desc":
      orderBy = desc(products.price);
      break;
    case "newest":
    default:
      orderBy = desc(products.createdAt);
      break;
  }

  // Fetch the page of IDs (maintains sort order)
  const offset = (page - 1) * pageSize;
  const idRows = await db
    .select({ id: products.id })
    .from(products)
    .where(whereClause)
    .orderBy(orderBy)
    .limit(pageSize)
    .offset(offset);

  const ids = idRows.map((r) => r.id);

  if (ids.length === 0) {
    return { data: [], total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  // Fetch full product rows with relations
  const rows = await db.query.products.findMany({
    where: inArray(products.id, ids),
    with: {
      category: true,
      brand: true,
    },
  });

  // Preserve the original sort order from the ID query
  const idOrder = new Map(ids.map((id, idx) => [id, idx]));
  rows.sort((a, b) => (idOrder.get(a.id) ?? 0) - (idOrder.get(b.id) ?? 0));

  return {
    data: rows,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ── Admin categories (recursive CTE) ────────────────────────────────

export async function getAdminCategories() {
  const result = await db.execute(sql`
    WITH RECURSIVE category_tree AS (
      SELECT
        c.id,
        c.name,
        c.slug,
        c.parent_id,
        c.is_active,
        c.sort_order,
        0 AS depth,
        c.name::text AS path_name,
        NULL::text AS parent_name
      FROM ${categories} c
      WHERE c.parent_id IS NULL

      UNION ALL

      SELECT
        c.id,
        c.name,
        c.slug,
        c.parent_id,
        c.is_active,
        c.sort_order,
        ct.depth + 1,
        (ct.path_name || ' > ' || c.name)::text AS path_name,
        ct.name::text AS parent_name
      FROM ${categories} c
      INNER JOIN category_tree ct ON ct.id = c.parent_id
    )
    SELECT
      ct.id,
      ct.name,
      ct.slug,
      ct.parent_id,
      ct.is_active,
      ct.sort_order,
      ct.depth,
      ct.path_name,
      ct.parent_name,
      COALESCE(pc.product_count, 0)::int AS product_count
    FROM category_tree ct
    LEFT JOIN (
      SELECT category_id, COUNT(*)::int AS product_count
      FROM ${products}
      GROUP BY category_id
    ) pc ON pc.category_id = ct.id
    ORDER BY ct.path_name, ct.sort_order
  `);

  return result.rows;
}

// ── Admin brands ─────────────────────────────────────────────────────

export async function getAdminBrands() {
  const result = await db.execute(sql`
    SELECT
      b.id,
      b.name,
      b.slug,
      b.description,
      b.logo_url,
      b.is_active,
      b.created_at,
      b.updated_at,
      COALESCE(pc.product_count, 0)::int AS product_count
    FROM ${brands} b
    LEFT JOIN (
      SELECT brand_id, COUNT(*)::int AS product_count
      FROM ${products}
      GROUP BY brand_id
    ) pc ON pc.brand_id = b.id
    ORDER BY b.name
  `);

  return result.rows;
}

// ── Admin attributes ─────────────────────────────────────────────────

export async function getAdminAttributes() {
  const result = await db.execute(sql`
    SELECT
      a.id,
      a.name,
      a.data_type,
      a.created_at,
      a.updated_at,
      COALESCE(cc.category_count, 0)::int AS category_count,
      COALESCE(pc.product_count, 0)::int AS product_count
    FROM ${attributes} a
    LEFT JOIN (
      SELECT attribute_id, COUNT(*)::int AS category_count
      FROM ${categoryAttributes}
      GROUP BY attribute_id
    ) cc ON cc.attribute_id = a.id
    LEFT JOIN (
      SELECT attribute_id, COUNT(*)::int AS product_count
      FROM ${productAttributes}
      GROUP BY attribute_id
    ) pc ON pc.attribute_id = a.id
    ORDER BY a.name
  `);

  return result.rows;
}

// ── Admin users (paginated + filtered) ───────────────────────────────

interface AdminUserFilters {
  search?: string;
  role?: "customer" | "admin" | "seller";
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export async function getAdminUsers(filters: AdminUserFilters = {}) {
  const {
    search,
    role,
    isActive,
    page = 1,
    pageSize = 10,
  } = filters;

  const conditions: SQL[] = [];

  if (search) {
    conditions.push(
      or(
        ilike(user.name, `%${search}%`),
        ilike(user.email, `%${search}%`)
      )!
    );
  }

  if (role) {
    conditions.push(eq(userProfile.role, role));
  }

  if (isActive !== undefined) {
    conditions.push(eq(userProfile.isActive, isActive));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Total count
  const [{ count: total }] = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(user)
    .leftJoin(userProfile, eq(userProfile.userId, user.id))
    .where(whereClause);

  // Paginated rows
  const offset = (page - 1) * pageSize;
  const data = await db
    .select()
    .from(user)
    .leftJoin(userProfile, eq(userProfile.userId, user.id))
    .where(whereClause)
    .orderBy(desc(user.createdAt))
    .limit(pageSize)
    .offset(offset);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ── Single-record lookups ────────────────────────────────────────────

export async function getAdminProductById(id: string) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      brand: true,
      productAttributes: {
        with: {
          attribute: true,
        },
      },
    },
  });
}

export async function getAdminCategoryById(id: string) {
  return db.query.categories.findFirst({
    where: eq(categories.id, id),
  });
}

export async function getAdminBrandById(id: string) {
  return db.query.brands.findFirst({
    where: eq(brands.id, id),
  });
}

export async function getAdminAttributeById(id: string) {
  return db.query.attributes.findFirst({
    where: eq(attributes.id, id),
    with: {
      categoryAttributes: {
        with: {
          category: true,
        },
      },
    },
  });
}
