import { notFound } from "next/navigation";

import {
  getAdminAttributeById,
  getAdminCategories,
} from "@/lib/queries/admin.queries";
import { PageHeader } from "@/components/admin/page-header";
import { AttributeForm } from "@/components/admin/forms/attribute-form";
import { CategoryAssignment } from "@/components/admin/forms/category-assignment";

export default async function EditAttributePage({ params }) {
  const { id } = await params;

  const [attribute, categories] = await Promise.all([
    getAdminAttributeById(id),
    getAdminCategories(),
  ]);

  if (!attribute) {
    notFound();
  }

  // Transform categoryAttributes into the shape CategoryAssignment expects
  const assignments = attribute.categoryAttributes.map((ca) => ({
    id: ca.id,
    categoryId: ca.categoryId,
    categoryName: ca.category.name,
    isRequired: ca.isRequired,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit ${attribute.name}`}
        description="Update attribute details and manage category assignments."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <AttributeForm attribute={attribute} />
        </div>
        <div>
          <CategoryAssignment
            attributeId={attribute.id}
            assignments={assignments}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
