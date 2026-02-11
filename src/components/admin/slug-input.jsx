"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function SlugInput({ nameValue, defaultSlug = "", className, ...props }) {
  const [manualMode, setManualMode] = React.useState(false)
  const [manualSlug, setManualSlug] = React.useState(defaultSlug)

  const autoSlug = generateSlug(nameValue || "")
  const slug = manualMode ? manualSlug : autoSlug

  // Sync manual slug when switching to manual mode for the first time
  function handleToggle() {
    if (!manualMode) {
      setManualSlug(autoSlug)
    }
    setManualMode(!manualMode)
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <Label htmlFor="slug">Slug</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleToggle}>
          {manualMode ? "Auto-generate" : "Edit manually"}
        </Button>
      </div>
      {manualMode ? (
        <Input
          id="slug"
          name="slug"
          value={manualSlug}
          onChange={(e) => setManualSlug(e.target.value)}
          placeholder="enter-slug-here"
        />
      ) : (
        <>
          <Input
            id="slug"
            value={autoSlug}
            disabled
            placeholder="auto-generated-slug"
          />
          <input type="hidden" name="slug" value={autoSlug} />
        </>
      )}
    </div>
  );
}

export { SlugInput, generateSlug }
