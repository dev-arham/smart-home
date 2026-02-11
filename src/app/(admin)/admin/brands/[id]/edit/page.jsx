import { notFound } from "next/navigation"

import { getAdminBrandById } from "@/lib/queries/admin.queries"
import { PageHeader } from "@/components/admin/page-header"
import { BrandForm } from "@/components/admin/forms/brand-form"

export default async function EditBrandPage({ params }) {
  const { id } = await params
  const brand = await getAdminBrandById(id)

  if (!brand) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Edit Brand"
        description={`Editing ${brand.name}`}
      />
      <BrandForm brand={brand} />
    </div>
  )
}
