"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createBrand, updateBrand } from "@/server/admin/brands"
import { SlugInput } from "@/components/admin/slug-input"
import { ImageUpload } from "@/components/admin/image-upload"
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

function BrandForm({ brand }) {
  const isEditing = !!brand
  const action = isEditing ? updateBrand : createBrand
  const [state, formAction, isPending] = useActionState(action, null)
  const router = useRouter()
  const [name, setName] = useState(brand?.name ?? "")
  const [isActive, setIsActive] = useState(brand?.isActive ?? true)

  useEffect(() => {
    if (state?.success) {
      toast.success(isEditing ? "Brand updated successfully." : "Brand created successfully.")
      router.push("/admin/brands")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, isEditing, router])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Brand" : "New Brand"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the brand details below."
            : "Fill in the details to create a new brand."}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        {isEditing && <input type="hidden" name="id" value={brand.id} />}
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
              placeholder="e.g. Samsung, Philips"
              required
            />
            {state?.fieldErrors?.name && (
              <p className="text-destructive text-sm">{state.fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Slug */}
          <SlugInput nameValue={name} defaultSlug={brand?.slug ?? ""} />
          {state?.fieldErrors?.slug && (
            <p className="text-destructive text-sm">{state.fieldErrors.slug[0]}</p>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={brand?.description ?? ""}
              placeholder="Optional brand description"
              rows={3}
            />
          </div>

          {/* Logo URL */}
          <ImageUpload
            name="logoUrl"
            defaultValue={brand?.logoUrl ?? ""}
            label="Logo URL"
          />

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
            onClick={() => router.push("/admin/brands")}
            disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEditing ? "Saving..." : "Creating..."
              : isEditing ? "Save Changes" : "Create Brand"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export { BrandForm }
