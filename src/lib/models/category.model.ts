import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { categories } from "@/lib/db/schema";

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

export type CategoryTreeNode = Category & {
  children: CategoryTreeNode[];
  productCount?: number;
};

export type CategoryCTERow = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  depth: number;
  path: string;
  product_count: number;
};

export type BreadcrumbSegment = {
  id: string;
  name: string;
  slug: string;
};
