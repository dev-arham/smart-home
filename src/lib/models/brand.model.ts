import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { brands } from "@/lib/db/schema";

export type Brand = InferSelectModel<typeof brands>;
export type NewBrand = InferInsertModel<typeof brands>;

export type BrandWithProductCount = Brand & {
  productCount: number;
};
