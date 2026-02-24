import { relations } from "drizzle-orm";
import {
  pgTable, text, timestamp, boolean, index, uuid, varchar, pgEnum,
  integer, numeric, uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  orders: many(orders),
  shippingAddresses: many(shippingAddresses),
  profile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const appRoleEnum = pgEnum("app_role", [
  "customer",
  "admin",
  "seller",
]);

export const sellTypeEnum = pgEnum("sell_type", ["unit", "box", "carton"]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "delivered",
  "cancelled",
]);

/**
 * User profile extension table
 */
export const userProfile = pgTable("user_profile", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),

  // Profile
  fullName: varchar("full_name", { length: 150 }),
  phone: varchar("phone", { length: 20 }),
  avatarUrl: text("avatar_url"),

  // App-specific role & status
  role: appRoleEnum("role").notNull().default("customer"),
  isActive: boolean("is_active").notNull().default(true),

  // Preferences / flags
  marketingOptIn: boolean("marketing_opt_in").notNull().default(false),

  // Audit
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});


export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    parentId: uuid("parent_id").references(() => categories.id, { onDelete: "set null" }),
    description: text("description"),
    imageUrl: text("image_url"),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("categories_parentId_idx").on(table.parentId),
  ],
);

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  logoUrl: text("logo_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    brandId: uuid("brand_id").references(() => brands.id, { onDelete: "set null" }),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 150 }).notNull().unique(),
    sku: varchar("sku", { length: 50 }).notNull().unique(),
    description: text("description"),

    // Pricing
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),

    // Media
    thumbnailUrl: text("thumbnail_url"),
    images: text("images").array(),

    // Status
    isActive: boolean("is_active").notNull().default(true),
    isFeatured: boolean("is_featured").notNull().default(false),

    // Inventory (base-unit strategy)
    stockUnits: integer("stock_units").notNull().default(0),
    unitsPerBox: integer("units_per_box").notNull().default(1),
    boxesPerCarton: integer("boxes_per_carton").notNull().default(1),
    sellType: sellTypeEnum("sell_type").notNull().default("unit"),
    lowStockThreshold: integer("low_stock_threshold").notNull().default(10),

    // Audit
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_categoryId_idx").on(table.categoryId),
    index("products_brandId_idx").on(table.brandId),
    index("products_isActive_idx").on(table.isActive),
  ],
);

export const attributes = pgTable("attributes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  dataType: varchar("data_type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const categoryAttributes = pgTable(
  "category_attributes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "cascade" }),
    attributeId: uuid("attribute_id").references(() => attributes.id, { onDelete: "cascade" }),
    isRequired: boolean("is_required").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("categoryAttributes_categoryId_attributeId_idx")
      .on(table.categoryId, table.attributeId),
  ],
);

export const productAttributes = pgTable(
  "product_attributes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    attributeId: uuid("attribute_id").references(() => attributes.id, { onDelete: "cascade" }),
    value: text("value").notNull(),
  },
  (table) => [
    uniqueIndex("productAttributes_productId_attributeId_idx")
      .on(table.productId, table.attributeId),
  ],
);

// ---------------------------------------------------------------------------
// Order Tables
// ---------------------------------------------------------------------------

export const shippingAddresses = pgTable("shipping_addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  customerName: varchar("customer_name", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    shippingAddressId: uuid("shipping_address_id")
      .notNull()
      .references(() => shippingAddresses.id, { onDelete: "restrict" }),
    status: orderStatusEnum("status").notNull().default("pending"),
    subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
    shippingFee: numeric("shipping_fee", { precision: 10, scale: 2 }).notNull().default("0"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("orders_userId_idx").on(table.userId),
    index("orders_status_idx").on(table.status),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    sellType: sellTypeEnum("sell_type").notNull(),
    quantity: integer("quantity").notNull(),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
    snapshotUnitsPerBox: integer("snapshot_units_per_box").notNull().default(1),
    snapshotBoxesPerCarton: integer("snapshot_boxes_per_carton").notNull().default(1),
    lineTotal: numeric("line_total", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("orderItems_orderId_idx").on(table.orderId),
    index("orderItems_productId_idx").on(table.productId),
  ],
);

// ---------------------------------------------------------------------------
// Catalog Relations
// ---------------------------------------------------------------------------

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categoryParentChild",
  }),
  children: many(categories, {
    relationName: "categoryParentChild",
  }),
  products: many(products),
  categoryAttributes: many(categoryAttributes),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  productAttributes: many(productAttributes),
  orderItems: many(orderItems),
}));

export const attributesRelations = relations(attributes, ({ many }) => ({
  categoryAttributes: many(categoryAttributes),
  productAttributes: many(productAttributes),
}));

export const categoryAttributesRelations = relations(categoryAttributes, ({ one }) => ({
  category: one(categories, {
    fields: [categoryAttributes.categoryId],
    references: [categories.id],
  }),
  attribute: one(attributes, {
    fields: [categoryAttributes.attributeId],
    references: [attributes.id],
  }),
}));

export const productAttributesRelations = relations(productAttributes, ({ one }) => ({
  product: one(products, {
    fields: [productAttributes.productId],
    references: [products.id],
  }),
  attribute: one(attributes, {
    fields: [productAttributes.attributeId],
    references: [attributes.id],
  }),
}));

// ---------------------------------------------------------------------------
// Order Relations
// ---------------------------------------------------------------------------

export const shippingAddressesRelations = relations(shippingAddresses, ({ one, many }) => ({
  user: one(user, {
    fields: [shippingAddresses.userId],
    references: [user.id],
  }),
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
  shippingAddress: one(shippingAddresses, {
    fields: [orders.shippingAddressId],
    references: [shippingAddresses.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));