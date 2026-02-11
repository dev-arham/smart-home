import { getAdminBrands } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { BrandsTable } from "./brands-table"
import { Card, CardContent } from "@/components/ui/card"

export default async function BrandsPage() {
  const brands = await getAdminBrands()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brands"
        description="Manage your product brands."
        action={{ href: "/admin/brands/new", label: "Add Brand" }}
      />
      <Card>
        <CardContent className="p-0">
          <BrandsTable data={brands} />
        </CardContent>
      </Card>
    </div>
  )
}
