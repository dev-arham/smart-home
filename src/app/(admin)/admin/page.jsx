import Link from "next/link";
import {
  Package,
  Layers,
  Tag,
  Users,
  AlertTriangle,
  Star,
  ShoppingBag,
} from "lucide-react";

import { getDashboardStats, getLowStockProducts, getRecentProducts } from "@/lib/queries/admin.queries";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const [stats, lowStock, recent] = await Promise.all([
    getDashboardStats(),
    getLowStockProducts(8),
    getRecentProducts(5),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your store performance and inventory status."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          description={`${stats.activeProducts} active`}
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon={Layers}
        />
        <StatCard
          title="Brands"
          value={stats.totalBrands}
          icon={Tag}
        />
        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={Users}
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStockCount}
          icon={AlertTriangle}
          description="Items below threshold"
          className={stats.lowStockCount > 0 ? "border-yellow-500/50" : ""}
        />
        <StatCard
          title="Featured"
          value={stats.featuredCount}
          icon={Star}
        />
        <StatCard
          title="Active Products"
          value={stats.activeProducts}
          icon={ShoppingBag}
          description={`of ${stats.totalProducts} total`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low stock alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Products that need restocking</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/inventory">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {lowStock.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">
                All products are well stocked.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Threshold</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStock.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {product.sku}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {product.stockUnits}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {product.lowStockThreshold}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={product.stockUnits === 0 ? "out-of-stock" : "low-stock"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>Latest additions to the catalog</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">
                No products yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {product.sku}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        R{Number(product.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={product.isActive ? "active" : "inactive"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
