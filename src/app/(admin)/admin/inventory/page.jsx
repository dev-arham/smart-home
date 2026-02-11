import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { asc } from "drizzle-orm"

import { PageHeader } from "@/components/admin/page-header"
import { InventoryTable } from "./inventory-table"
import { Card, CardContent } from "@/components/ui/card"

export default async function InventoryPage() {
  const items = await db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      stockUnits: products.stockUnits,
      lowStockThreshold: products.lowStockThreshold,
      sellType: products.sellType,
      unitsPerBox: products.unitsPerBox,
      boxesPerCarton: products.boxesPerCarton,
      thumbnailUrl: products.thumbnailUrl,
    })
    .from(products)
    .orderBy(asc(products.stockUnits))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Monitor stock levels and adjust quantities."
      />
      <Card>
        <CardContent className="p-0">
          <InventoryTable data={items} />
        </CardContent>
      </Card>
    </div>
  )
}
