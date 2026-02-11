"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createProduct, updateProduct } from "@/server/admin/products"
import { SlugInput } from "@/components/admin/slug-input"
import { ImageUpload } from "@/components/admin/image-upload"
import { CategorySelect } from "@/components/admin/category-select"
import { BrandSelect } from "@/components/admin/brand-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function ProductForm({ product, categories = [], brands = [], categoryAttributes = [] }) {
  const isEditing = !!product
  const action = isEditing ? updateProduct : createProduct
  const [state, formAction, isPending] = useActionState(action, null)
  const router = useRouter()

  const [name, setName] = useState(product?.name ?? "")
  const [isActive, setIsActive] = useState(product?.isActive ?? true)
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false)
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "")
  const [brandId, setBrandId] = useState(product?.brandId ?? "")
  const [sellType, setSellType] = useState(product?.sellType ?? "unit")

  // Get attributes for the selected category
  const selectedCatAttrs = categoryAttributes.filter(
    (ca) => ca.categoryId === categoryId
  )

  // Build default attribute values from existing product attributes
  const existingAttrs = {}
  if (product?.productAttributes) {
    for (const pa of product.productAttributes) {
      existingAttrs[pa.attributeId] = pa.value
    }
  }

  useEffect(() => {
    if (state?.success) {
      toast.success(
        isEditing ? "Product updated successfully." : "Product created successfully."
      )
      router.push("/admin/products")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, isEditing, router])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Product" : "New Product"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the product details below."
            : "Fill in the details to create a new product."}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        {isEditing && <input type="hidden" name="id" value={product.id} />}
        <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />
        <input type="hidden" name="isFeatured" value={isFeatured ? "true" : "false"} />
        <input type="hidden" name="sellType" value={sellType} />

        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              {selectedCatAttrs.length > 0 && (
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
              )}
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" forceMount className="space-y-4 data-[state=inactive]:hidden">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product name"
                  required
                />
                {state?.fieldErrors?.name && (
                  <p className="text-destructive text-sm">{state.fieldErrors.name[0]}</p>
                )}
              </div>

              <SlugInput nameValue={name} defaultSlug={product?.slug ?? ""} />

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  defaultValue={product?.sku ?? ""}
                  placeholder="e.g. SH-LIGHT-001"
                  required
                />
                {state?.fieldErrors?.sku && (
                  <p className="text-destructive text-sm">{state.fieldErrors.sku[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={product?.description ?? ""}
                  placeholder="Product description"
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <CategorySelect
                    categories={categories}
                    value={categoryId}
                    onValueChange={setCategoryId}
                    name="categoryId"
                    placeholder="Select category..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Brand</Label>
                  <BrandSelect
                    brands={brands}
                    value={brandId}
                    onValueChange={setBrandId}
                    name="brandId"
                    placeholder="Select brand..."
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-3">
                  <Switch
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    id="isFeatured"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
              </div>
            </TabsContent>

            {/* Pricing & Inventory Tab */}
            <TabsContent value="pricing" forceMount className="space-y-4 data-[state=inactive]:hidden">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (R)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    inputMode="decimal"
                    defaultValue={product?.price ?? ""}
                    placeholder="0.00"
                    required
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                  {state?.fieldErrors?.price && (
                    <p className="text-destructive text-sm">{state.fieldErrors.price[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare At Price (R)</Label>
                  <Input
                    id="compareAtPrice"
                    name="compareAtPrice"
                    type="number"
                    inputMode="decimal"
                    defaultValue={product?.compareAtPrice ?? ""}
                    placeholder="Optional"
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sell Type</Label>
                <Select value={sellType} onValueChange={setSellType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="carton">Carton</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="stockUnits">Stock (base units)</Label>
                  <Input
                    id="stockUnits"
                    name="stockUnits"
                    type="number"
                    min="0"
                    defaultValue={product?.stockUnits ?? 0}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitsPerBox">Units per Box</Label>
                  <Input
                    id="unitsPerBox"
                    name="unitsPerBox"
                    type="number"
                    min="1"
                    defaultValue={product?.unitsPerBox ?? 1}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="boxesPerCarton">Boxes per Carton</Label>
                  <Input
                    id="boxesPerCarton"
                    name="boxesPerCarton"
                    type="number"
                    min="1"
                    defaultValue={product?.boxesPerCarton ?? 1}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  type="number"
                  min="0"
                  defaultValue={product?.lowStockThreshold ?? 10}
                  className="w-32"
                />
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" forceMount className="space-y-4 data-[state=inactive]:hidden">
              <ImageUpload
                name="thumbnailUrl"
                defaultValue={product?.thumbnailUrl ?? ""}
                label="Thumbnail URL"
              />

              <ImageUpload
                name="images"
                defaultValue={product?.images ?? []}
                label="Gallery Images"
                multiple
              />
            </TabsContent>

            {/* Attributes Tab */}
            {selectedCatAttrs.length > 0 && (
              <TabsContent value="attributes" forceMount className="space-y-4 data-[state=inactive]:hidden">
                <p className="text-muted-foreground text-sm">
                  Set attribute values for this product based on its category.
                </p>
                {selectedCatAttrs.map((ca) => (
                  <div key={ca.attributeId} className="space-y-2">
                    <Label htmlFor={`attr_${ca.attributeId}`}>
                      {ca.attributeName}
                      {ca.isRequired && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </Label>
                    {ca.dataType === "boolean" ? (
                      <Select
                        name={`attr_${ca.attributeId}`}
                        defaultValue={existingAttrs[ca.attributeId] ?? ""}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={`attr_${ca.attributeId}`}
                        name={`attr_${ca.attributeId}`}
                        type={ca.dataType === "number" ? "number" : "text"}
                        defaultValue={existingAttrs[ca.attributeId] ?? ""}
                        required={ca.isRequired}
                      />
                    )}
                  </div>
                ))}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
            disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEditing ? "Saving..." : "Creating..."
              : isEditing ? "Save Changes" : "Create Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export { ProductForm }
