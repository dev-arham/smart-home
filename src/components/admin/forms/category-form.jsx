"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createCategory, updateCategory } from "@/server/admin/categories"
import { SlugInput } from "@/components/admin/slug-input"
import { ImageUpload } from "@/components/admin/image-upload"
import { CategorySelect } from "@/components/admin/category-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function CategoryForm({ category, categories = [] }) {
  const isEditing = !!category
  const action = isEditing ? updateCategory : createCategory
  const [state, formAction, isPending] = useActionState(action, null)
  const router = useRouter()
  const [name, setName] = useState(category?.name ?? "")
  const [isActive, setIsActive] = useState(category?.isActive ?? true)
  const [parentId, setParentId] = useState(category?.parentId ?? "")

  useEffect(() => {
    if (state?.success) {
      toast.success(
        isEditing ? "Category updated successfully." : "Category created successfully."
      )
      router.push("/admin/categories")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, isEditing, router])

  // Exclude self (and descendants would need recursive fetch — exclude self for now)
  const excludeIds = isEditing ? [category.id] : []

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Category" : "New Category"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the category details below."
            : "Fill in the details to create a new category."}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        {isEditing && <input type="hidden" name="id" value={category.id} />}
        <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smart Lighting"
              required
            />
            {state?.fieldErrors?.name && (
              <p className="text-destructive text-sm">{state.fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Slug */}
          <SlugInput nameValue={name} defaultSlug={category?.slug ?? ""} />
          {state?.fieldErrors?.slug && (
            <p className="text-destructive text-sm">{state.fieldErrors.slug[0]}</p>
          )}

          {/* Parent Category */}
          <div className="space-y-2">
            <Label>Parent Category</Label>
            <CategorySelect
              categories={categories}
              value={parentId}
              onValueChange={setParentId}
              name="parentId"
              excludeIds={excludeIds}
              placeholder="None (top-level)"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={category?.description ?? ""}
              placeholder="Optional category description"
              rows={3}
            />
          </div>

          {/* Image URL */}
          <ImageUpload
            name="imageUrl"
            defaultValue={category?.imageUrl ?? ""}
            label="Image URL"
          />

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={category?.sortOrder ?? 0}
              className="w-24"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
            disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEditing ? "Saving..." : "Creating..."
              : isEditing ? "Save Changes" : "Create Category"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export { CategoryForm }
