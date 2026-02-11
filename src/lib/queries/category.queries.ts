import { eq, and, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import type { Category, CategoryTreeNode, CategoryCTERow, BreadcrumbSegment } from "@/lib/models/category.model";

/**
 * Fetch the full category tree using a recursive CTE.
 * Returns root nodes with nested `children` arrays, unlimited depth.
 */
export async function getCategoryTree(): Promise<CategoryTreeNode[]> {
  const rows = await db.execute<CategoryCTERow>(sql`
    WITH RECURSIVE category_tree AS (
      SELECT id, name, slug, parent_id, image_url, is_active, sort_order,
             0 AS depth,
             slug::text AS path
      FROM categories
      WHERE parent_id IS NULL AND is_active = true

      UNION ALL

      SELECT c.id, c.name, c.slug, c.parent_id, c.image_url, c.is_active, c.sort_order,
             ct.depth + 1,
             ct.path || '/' || c.slug
      FROM categories c
      INNER JOIN category_tree ct ON c.parent_id = ct.id
      WHERE c.is_active = true AND ct.depth < 20
    )
    SELECT ct.*,
           COALESCE(pc.product_count, 0)::int AS product_count
    FROM category_tree ct
    LEFT JOIN (
      SELECT category_id, COUNT(*)::int AS product_count
      FROM products
      WHERE is_active = true
      GROUP BY category_id
    ) pc ON ct.id = pc.category_id
    ORDER BY ct.path, ct.sort_order
  `);

  return assembleTree(rows.rows);
}

/**
 * Assemble flat CTE rows into a nested tree structure.
 */
function assembleTree(rows: CategoryCTERow[]): CategoryTreeNode[] {
  const nodeMap = new Map<string, CategoryTreeNode>();
  const roots: CategoryTreeNode[] = [];

  for (const row of rows) {
    const node: CategoryTreeNode = {
      id: row.id,
      name: row.name,
      slug: row.slug,
      parentId: row.parent_id,
      description: null,
      imageUrl: row.image_url,
      isActive: row.is_active,
      sortOrder: row.sort_order,
      createdAt: new Date(),
      updatedAt: new Date(),
      children: [],
      productCount: row.product_count,
    };

    nodeMap.set(node.id, node);

    if (row.parent_id === null) {
      roots.push(node);
    } else {
      const parent = nodeMap.get(row.parent_id);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  return roots;
}

/**
 * Fetch a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await db
    .select()
    .from(categories)
    .where(and(eq(categories.slug, slug), eq(categories.isActive, true)))
    .limit(1);
  return result[0] ?? null;
}

/**
 * Get breadcrumb trail from root to the given category (ancestors + self).
 */
export async function getCategoryBreadcrumb(categoryId: string): Promise<BreadcrumbSegment[]> {
  const rows = await db.execute<{ id: string; name: string; slug: string }>(sql`
    WITH RECURSIVE ancestors AS (
      SELECT id, name, slug, parent_id
      FROM categories
      WHERE id = ${categoryId}

      UNION ALL

      SELECT c.id, c.name, c.slug, c.parent_id
      FROM categories c
      INNER JOIN ancestors a ON c.id = a.parent_id
    )
    SELECT id, name, slug FROM ancestors
  `);

  // CTE returns child-first; reverse for root-first breadcrumb order
  return rows.rows.reverse();
}

/**
 * Check whether a category is a leaf (has no children).
 * Products must only belong to leaf categories.
 */
export async function isLeafCategory(categoryId: string): Promise<boolean> {
  const children = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.parentId, categoryId))
    .limit(1);
  return children.length === 0;
}

/**
 * Get all active leaf categories (categories with no children).
 */
export async function getLeafCategories(): Promise<Category[]> {
  return db
    .select()
    .from(categories)
    .where(
      and(
        eq(categories.isActive, true),
        sql`${categories.id} NOT IN (
          SELECT DISTINCT parent_id FROM categories WHERE parent_id IS NOT NULL
        )`
      )
    );
}

/**
 * Get all descendant category IDs (inclusive) for a category slug.
 * Uses recursive CTE for unlimited depth traversal.
 */
export async function getDescendantCategoryIds(categorySlug: string): Promise<string[]> {
  const rows = await db.execute<{ id: string }>(sql`
    WITH RECURSIVE descendants AS (
      SELECT id FROM categories WHERE slug = ${categorySlug} AND is_active = true

      UNION ALL

      SELECT c.id FROM categories c
      INNER JOIN descendants d ON c.parent_id = d.id
      WHERE c.is_active = true
    )
    SELECT id FROM descendants
  `);
  return rows.rows.map((r) => r.id);
}
