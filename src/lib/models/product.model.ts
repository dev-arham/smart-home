import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { products } from "@/lib/db/schema";

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export type ProductWithRelations = Product & {
  category: { id: string; name: string; slug: string } | null;
  brand: { id: string; name: string; slug: string } | null;
  productAttributes: Array<{
    id: string;
    value: string;
    attribute: { id: string; name: string; dataType: string };
  }>;
};

export type ProductFilters = {
  categorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Record<string, string[]>;
  isActive?: boolean;
  isFeatured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "price_asc" | "price_desc" | "newest" | "name_asc";
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type StockInfo = {
  stockUnits: number;
  sellType: "unit" | "box" | "carton";
  unitsPerBox: number;
  boxesPerCarton: number;
  availableInSellUnits: number;
  isLowStock: boolean;
};
