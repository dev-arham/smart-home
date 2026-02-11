import { notFound } from "next/navigation"

import { getAdminProductById, getAdminCategories, getAdminBrands } from "@/lib/queries/admin.queries"
import { db } from "@/lib/db"
import { PageHeader } from "@/components/admin/page-header"
import { ProductForm } from "@/components/admin/forms/product-form"

export default async function EditProductPage({ params }) {
  const { id } = await params
  const [product, categories, brands] = await Promise.all([
    getAdminProductById(id),
    getAdminCategories(),
    getAdminBrands(),
  ])

  if (!product) {
    notFound()
  }

  // Build category-attributes mapping
  const catAttrRows = await db.query.categoryAttributes.findMany({
    with: { attribute: true },
  })

  const categoryAttributes = catAttrRows.map((row) => ({
    categoryId: row.categoryId,
    attributeId: row.attributeId,
    attributeName: row.attribute.name,
    dataType: row.attribute.dataType,
    isRequired: row.isRequired,
  }))

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Edit Product"
        description={`Editing ${product.name}`}
      />
      <ProductForm
        product={product}
        categories={categories}
        brands={brands}
        categoryAttributes={categoryAttributes}
      />
    </div>
  )
}
