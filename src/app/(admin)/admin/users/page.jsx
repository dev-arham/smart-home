import { getAdminUsers } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { UsersTable } from "./users-table"
import { Card, CardContent } from "@/components/ui/card"

export default async function UsersPage({ searchParams }) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const search = params?.search || ""

  const { data: users, total, totalPages } = await getAdminUsers({
    page,
    search,
    pageSize: 10,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description={`${total} registered user${total !== 1 ? "s" : ""}.`}
      />
      <Card>
        <CardContent className="p-0">
          <UsersTable data={users} />
        </CardContent>
      </Card>
    </div>
  )
}
