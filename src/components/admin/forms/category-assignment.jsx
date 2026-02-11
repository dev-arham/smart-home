"use client"

import { useActionState, useState, useEffect } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"

import {
  assignAttributeToCategory,
  removeAttributeFromCategory,
} from "@/server/admin/attributes"
import { CategorySelect } from "@/components/admin/category-select"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const initialState = { success: false, error: null }

function CategoryAssignment({ attributeId, assignments, categories }) {
  const [state, formAction, isPending] = useActionState(
    assignAttributeToCategory,
    initialState
  )
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  const assignedCategoryIds = assignments.map((a) => a.categoryId)

  useEffect(() => {
    if (state?.success) {
      toast.success("Category assigned successfully.")
      setSelectedCategoryId("")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  async function handleRemove(categoryId) {
    const result = await removeAttributeFromCategory(attributeId, categoryId)
    if (result.success) {
      toast.success("Category removed.")
    } else {
      toast.error(result.error || "Failed to remove category.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Assignments</CardTitle>
        <CardDescription>
          Manage which categories use this attribute.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* List assigned categories */}
        {assignments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No categories assigned yet.
          </p>
        ) : (
          <div className="space-y-2">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between rounded-md border px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {assignment.categoryName}
                  </span>
                  {assignment.isRequired && (
                    <Badge variant="secondary" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>
                <ConfirmDialog
                  trigger={
                    <Button variant="ghost" size="icon" className="size-8">
                      <X className="size-4" />
                    </Button>
                  }
                  title="Remove category assignment?"
                  description={`This will remove the "${assignment.categoryName}" category from this attribute.`}
                  confirmLabel="Remove"
                  onConfirm={() => handleRemove(assignment.categoryId)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Add assignment form */}
        <form action={formAction} className="space-y-4 border-t pt-4">
          <input type="hidden" name="attributeId" value={attributeId} />

          <div className="space-y-2">
            <Label>Add Category</Label>
            <CategorySelect
              categories={categories}
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
              name="categoryId"
              excludeIds={assignedCategoryIds}
              placeholder="Select a category to assign..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="isRequired" name="isRequired" />
            <Label htmlFor="isRequired" className="text-sm font-normal">
              Required for products in this category
            </Label>
          </div>

          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={isPending || !selectedCategoryId}>
            {isPending ? "Assigning..." : "Assign Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export { CategoryAssignment }
