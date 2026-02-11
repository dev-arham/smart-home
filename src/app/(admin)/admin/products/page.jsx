import Link from "next/link"
import { getAdminProducts } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { ProductsTable } from "./products-table"
import { Card, CardContent } from "@/components/ui/card"

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const search = params?.search || ""

  const { data: products, total, totalPages } = await getAdminProducts({
    page,
    search,
    pageSize: 10,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description={`${total} product${total !== 1 ? "s" : ""} in your catalog.`}
        action={{ href: "/admin/products/new", label: "Add Product" }}
      />
      <Card>
        <CardContent className="p-0">
          <ProductsTable data={products} />
        </CardContent>
      </Card>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/products?page=${page - 1}${search ? `&search=${search}` : ""}`}
              className="text-sm underline">
              Previous
            </Link>
          )}
          <span className="text-muted-foreground text-sm">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/products?page=${page + 1}${search ? `&search=${search}` : ""}`}
              className="text-sm underline">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
