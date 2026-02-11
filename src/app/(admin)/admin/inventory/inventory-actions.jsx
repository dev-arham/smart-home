"use client"

import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StockAdjustDialog } from "@/components/admin/forms/stock-adjust-dialog"

function InventoryActions({ product }) {
  return (
    <div className="flex items-center justify-end">
      <StockAdjustDialog
        product={product}
        trigger={
          <Button variant="outline" size="sm">
            <Settings2 className="mr-1 h-4 w-4" />
            Adjust
          </Button>
        }
      />
    </div>
  )
}

export { InventoryActions }
