import { getAdminCategories } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { CategoryForm } from "@/components/admin/forms/category-form"

export default async function NewCategoryPage() {
  const categories = await getAdminCategories()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="New Category"
        description="Add a new category to your catalog."
      />
      <CategoryForm categories={categories} />
    </div>
  )
}
