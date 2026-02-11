"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createAttribute, updateAttribute } from "@/server/admin/attributes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const DATA_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "select", label: "Select (Options)" },
]

const initialState = { success: false, errors: {}, error: null }

function AttributeForm({ attribute }) {
  const isEditing = !!attribute
  const action = isEditing ? updateAttribute : createAttribute
  const [state, formAction, isPending] = useActionState(action, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast.success(
        isEditing
          ? "Attribute updated successfully."
          : "Attribute created successfully."
      )
      router.push("/admin/attributes")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, isEditing, router])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Attribute" : "New Attribute"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the attribute details below."
            : "Fill in the details to create a new attribute."}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        {isEditing && <input type="hidden" name="id" value={attribute.id} />}

        <CardContent className="space-y-4">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Color, Voltage, Weight"
              defaultValue={attribute?.name ?? ""}
              required
            />
            {state?.errors?.name && (
              <p className="text-destructive text-sm">{state.errors.name}</p>
            )}
          </div>

          {/* Data type field */}
          <div className="space-y-2">
            <Label htmlFor="dataType">Data Type</Label>
            <Select
              name="dataType"
              defaultValue={attribute?.dataType ?? ""}
              required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a data type" />
              </SelectTrigger>
              <SelectContent>
                {DATA_TYPES.map((dt) => (
                  <SelectItem key={dt.value} value={dt.value}>
                    {dt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.dataType && (
              <p className="text-destructive text-sm">
                {state.errors.dataType}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/attributes")}
            disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save Changes"
                : "Create Attribute"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export { AttributeForm }
