import { getAdminCategories } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { CategoriesTable } from "./categories-table"
import { Card, CardContent } from "@/components/ui/card"

export default async function CategoriesPage() {
  const categories = await getAdminCategories()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage your product category hierarchy."
        action={{ href: "/admin/categories/new", label: "Add Category" }}
      />
      <Card>
        <CardContent className="p-0">
          <CategoriesTable data={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
