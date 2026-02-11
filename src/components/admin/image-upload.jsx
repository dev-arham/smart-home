"use client"

import * as React from "react"
import { X, ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

function ImageUpload({
  name,
  defaultValue,
  multiple = false,
  label = "Image URL",
  className,
  ...props
}) {
  if (multiple) {
    return (
      <MultiImageUpload
        name={name}
        defaultValue={defaultValue || []}
        label={label}
        className={className}
        {...props}
      />
    );
  }

  return (
    <SingleImageUpload
      name={name}
      defaultValue={defaultValue || ""}
      label={label}
      className={className}
      {...props}
    />
  );
}

function SingleImageUpload({ name, defaultValue, label, className, ...props }) {
  const [url, setUrl] = React.useState(defaultValue)

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Label>{label}</Label>
      <Input
        name={name}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />
      {url && (
        <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-md border">
          <img
            src={url}
            alt="Preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none"
            }}
          />
        </div>
      )}
    </div>
  );
}

function MultiImageUpload({ name, defaultValue, label, className, ...props }) {
  const [urls, setUrls] = React.useState(
    defaultValue.length > 0 ? defaultValue : [""]
  )

  function handleChange(index, value) {
    const next = [...urls]
    next[index] = value
    setUrls(next)
  }

  function handleAdd() {
    setUrls([...urls, ""])
  }

  function handleRemove(index) {
    const next = urls.filter((_, i) => i !== index)
    if (next.length === 0) {
      setUrls([""])
    } else {
      setUrls(next)
    }
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Label>{label}</Label>
      <div className="space-y-3">
        {urls.map((url, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {url && (
                <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => handleRemove(index)}>
              <X />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
        <ImageIcon />
        Add image
      </Button>
      {/* Hidden inputs for form submission */}
      {urls
        .filter((u) => u.trim() !== "")
        .map((url, index) => (
          <input key={index} type="hidden" name={name} value={url} />
        ))}
    </div>
  );
}

export { ImageUpload }
