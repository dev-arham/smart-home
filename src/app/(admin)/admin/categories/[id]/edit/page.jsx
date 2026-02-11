import { notFound } from "next/navigation"

import { getAdminCategoryById, getAdminCategories } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { CategoryForm } from "@/components/admin/forms/category-form"

export default async function EditCategoryPage({ params }) {
  const { id } = await params
  const [category, categories] = await Promise.all([
    getAdminCategoryById(id),
    getAdminCategories(),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Edit Category"
        description={`Editing ${category.name}`}
      />
      <CategoryForm category={category} categories={categories} />
    </div>
  )
}
