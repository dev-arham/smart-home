import { getAdminAttributes } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { AttributesTable } from "./attributes-table"

export default async function AttributesPage() {
  const attributes = await getAdminAttributes()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attributes"
        description="Manage product attributes and their category assignments."
        action={{ href: "/admin/attributes/new", label: "Add Attribute" }}
      />

      <Card>
        <CardContent className="p-0">
          <AttributesTable data={attributes} />
        </CardContent>
      </Card>
    </div>
  )
}
