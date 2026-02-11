import { PageHeader } from "@/components/admin/page-header"
import { BrandForm } from "@/components/admin/forms/brand-form"

export default function NewBrandPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="New Brand"
        description="Add a new brand to your catalog."
      />
      <BrandForm />
    </div>
  )
}
