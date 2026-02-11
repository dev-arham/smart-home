import { PageHeader } from "@/components/admin/page-header";
import { AttributeForm } from "@/components/admin/forms/attribute-form";

export default function NewAttributePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New Attribute"
        description="Create a new product attribute."
      />
      <div className="max-w-2xl">
        <AttributeForm />
      </div>
    </div>
  );
}
