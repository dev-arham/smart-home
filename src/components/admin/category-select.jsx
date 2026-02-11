"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

function CategorySelect({
  categories = [],
  value,
  onValueChange,
  name,
  excludeIds = [],
  placeholder = "Select category...",
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false)

  const filteredCategories = categories.filter(
    (cat) => !excludeIds.includes(cat.id)
  )

  const selectedCategory = categories.find(
    (cat) => String(cat.id) === String(value)
  )

  function handleSelect(categoryId) {
    const newValue = String(categoryId) === String(value) ? "" : String(categoryId)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <div className={className} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal">
            {selectedCategory ? selectedCategory.name : placeholder}
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={() => handleSelect(category.id)}
                    style={{ paddingLeft: `${(category.depth || 0) * 16 + 8}px` }}>
                    <Check
                      className={cn(
                        "mr-2",
                        String(value) === String(category.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {name && <input type="hidden" name={name} value={value || ""} />}
    </div>
  );
}

export { CategorySelect }
