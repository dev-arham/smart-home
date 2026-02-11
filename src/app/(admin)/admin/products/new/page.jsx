import { getAdminCategories, getAdminBrands } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { ProductForm } from "@/components/admin/forms/product-form"

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    getAdminCategories(),
    getAdminBrands(),
  ])

  // Build category-attributes mapping for the form
  const categoryAttributes = await getCategoryAttributesMap(categories)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="New Product"
        description="Add a new product to your catalog."
      />
      <ProductForm
        categories={categories}
        brands={brands}
        categoryAttributes={categoryAttributes}
      />
    </div>
  )
}

async function getCategoryAttributesMap(categories) {
  // Import here to avoid circular deps
  const { db } = await import("@/lib/db")
  const { categoryAttributes, attributes } = await import("@/lib/db/schema")
  const { eq } = await import("drizzle-orm")

  const rows = await db.query.categoryAttributes.findMany({
    with: { attribute: true },
  })

  return rows.map((row) => ({
    categoryId: row.categoryId,
    attributeId: row.attributeId,
    attributeName: row.attribute.name,
    dataType: row.attribute.dataType,
    isRequired: row.isRequired,
  }))
}
