import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const priceRegex = /^\d+(\.\d{1,2})?$/;

// ── Product ──────────────────────────────────────────────────────────

export const createProductSchema = z.object({
  name: z.string().min(1).max(150),
  slug: z.string().min(1).max(150).regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens"),
  sku: z.string().min(1).max(50),
  description: z.string().optional().default(""),
  categoryId: z.string().uuid().nullable().default(null),
  brandId: z.string().uuid().nullable().default(null),
  price: z.string().regex(priceRegex, "Price must be a valid decimal (e.g. 9.99)"),
  compareAtPrice: z.string().regex(priceRegex, "Compare-at price must be a valid decimal").nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  images: z.array(z.string()).optional().default([]),
  isActive: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false),
  stockUnits: z.coerce.number().int().min(0).default(0),
  unitsPerBox: z.coerce.number().int().min(1).default(1),
  boxesPerCarton: z.coerce.number().int().min(1).default(1),
  sellType: z.enum(["unit", "box", "carton"]).default("unit"),
  lowStockThreshold: z.coerce.number().int().min(0).default(10),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().uuid(),
});

// ── Category ─────────────────────────────────────────────────────────

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens"),
  parentId: z.string().uuid().nullable().optional().default(null),
  description: z.string().optional().default(""),
  imageUrl: z.string().nullable().optional(),
  isActive: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().uuid(),
});

// ── Brand ────────────────────────────────────────────────────────────

export const createBrandSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().optional().default(""),
  logoUrl: z.string().nullable().optional(),
  isActive: z.coerce.boolean().default(true),
});

export const updateBrandSchema = createBrandSchema.partial().extend({
  id: z.string().uuid(),
});

// ── Attribute ────────────────────────────────────────────────────────

export const createAttributeSchema = z.object({
  name: z.string().min(1).max(100),
  dataType: z.enum(["text", "number", "boolean", "select"]),
});

export const updateAttributeSchema = createAttributeSchema.partial().extend({
  id: z.string().uuid(),
});

// ── Category–Attribute assignment ────────────────────────────────────

export const assignAttributeToCategorySchema = z.object({
  attributeId: z.string().uuid(),
  categoryId: z.string().uuid(),
  isRequired: z.coerce.boolean().default(false),
});

// ── Stock adjustment ─────────────────────────────────────────────────

export const adjustStockSchema = z.object({
  productId: z.string().uuid(),
  newStockUnits: z.coerce.number().int().min(0),
});

// ── User management ──────────────────────────────────────────────────

export const updateUserRoleSchema = z.object({
  profileId: z.string().uuid(),
  role: z.enum(["customer", "admin", "seller"]),
});

export const toggleUserActiveSchema = z.object({
  profileId: z.string().uuid(),
  isActive: z.coerce.boolean(),
});
