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

function BrandSelect({
  brands = [],
  value,
  onValueChange,
  name,
  placeholder = "Select brand...",
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false)

  const selectedBrand = brands.find(
    (brand) => String(brand.id) === String(value)
  )

  function handleSelect(brandId) {
    const newValue = String(brandId) === String(value) ? "" : String(brandId)
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
            {selectedBrand ? selectedBrand.name : placeholder}
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search brands..." />
            <CommandList>
              <CommandEmpty>No brand found.</CommandEmpty>
              <CommandGroup>
                {brands.map((brand) => (
                  <CommandItem
                    key={brand.id}
                    value={brand.name}
                    onSelect={() => handleSelect(brand.id)}>
                    <Check
                      className={cn(
                        "mr-2",
                        String(value) === String(brand.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {brand.name}
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

export { BrandSelect }
