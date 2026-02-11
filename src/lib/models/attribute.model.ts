import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { attributes, categoryAttributes, productAttributes } from "@/lib/db/schema";

export type Attribute = InferSelectModel<typeof attributes>;
export type NewAttribute = InferInsertModel<typeof attributes>;

export type CategoryAttribute = InferSelectModel<typeof categoryAttributes>;
export type NewCategoryAttribute = InferInsertModel<typeof categoryAttributes>;

export type ProductAttribute = InferSelectModel<typeof productAttributes>;
export type NewProductAttribute = InferInsertModel<typeof productAttributes>;

export type AttributeFilterOption = {
  attributeId: string;
  attributeName: string;
  dataType: string;
  values: string[];
  isRequired: boolean;
};
