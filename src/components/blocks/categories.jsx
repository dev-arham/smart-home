'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PackageSearch } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WishlistButton from '@/components/blocks/wishlist-button';
import AddToCartButton from '@/components/blocks/add-to-cart-button';

// ─── Recursive Category Node ────────────────────────────────

function CategoryNode({ category, selectedCategoryIds, onToggle }) {
  const hasChildren = category.children && category.children.length > 0;

  // Leaf node → render checkbox
  if (!hasChildren) {
    const isChecked = selectedCategoryIds.has(category.id);
    return (
      <div className="flex items-center gap-2 py-1.5">
        <Checkbox
          id={`cat-${category.id}`}
          checked={isChecked}
          onCheckedChange={() => onToggle(category.id)}
        />
        <label
          htmlFor={`cat-${category.id}`}
          className="text-sm cursor-pointer select-none hover:text-foreground text-muted-foreground"
        >
          {category.name}
          {category.productCount > 0 && (
            <span className="ml-1 text-xs text-muted-foreground/60">
              ({category.productCount})
            </span>
          )}
        </label>
      </div>
    );
  }

  // Parent node → render accordion with children inside
  return (
    <AccordionItem value={category.id} className="border-none">
      <AccordionTrigger className="py-2.5 hover:no-underline text-sm font-medium">
        {category.name}
      </AccordionTrigger>
      <AccordionContent className="pb-0 pl-3">
        {/* Recurse: children may themselves be parents or leaves */}
        <Accordion type="multiple" className="w-full">
          {category.children.map((child) => (
            <CategoryNode
              key={child.id}
              category={child}
              selectedCategoryIds={selectedCategoryIds}
              onToggle={onToggle}
            />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}

// ─── Category Sidebar ───────────────────────────────────────

function CategorySidebar({ categories, selectedCategoryIds, onToggle, onClearAll }) {
  return (
    <div className="bg-card rounded-lg border p-5 sticky top-24 ">
      <h2 className="text-base font-semibold mb-4">Filter by Category</h2>

      <Accordion type="multiple" className="w-full">
        {categories.map((category) => (
          <CategoryNode
            key={category.id}
            category={category}
            selectedCategoryIds={selectedCategoryIds}
            onToggle={onToggle}
          />
        ))}
      </Accordion>

      {selectedCategoryIds.size > 0 && (
        <>
          <Separator className="my-4" />
          <button
            onClick={onClearAll}
            className="w-full px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-md transition-colors"
          >
            Clear All Filters
          </button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {selectedCategoryIds.size} filter{selectedCategoryIds.size !== 1 ? 's' : ''} applied
          </p>
        </>
      )}
    </div>
  );
}

// ─── Products Grid ──────────────────────────────────────────

function ProductsGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-20 px-6 text-center">
        <PackageSearch className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <p className="text-lg font-medium text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground/60 mt-1">
          Try selecting different categories
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => {
        const imageSrc = product.thumbnailUrl || product.images?.[0] || '/placeholder.svg';
        const price = Number(product.price);
        const compareAt = product.compareAtPrice ? Number(product.compareAtPrice) : null;
        const onSale = compareAt && compareAt > price;

        return (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <Card className="group overflow-hidden rounded-lg border-muted bg-card transition-all hover:shadow-md h-full">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {onSale && (
                  <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                    Sale
                  </span>
                )}
                <WishlistButton
                  product={{
                    id: product.id,
                    title: product.name,
                    price,
                    image: imageSrc,
                  }}
                  variant="icon"
                  className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>

              <CardHeader className="px-4">
                <CardTitle className="line-clamp-1 text-base font-bold">
                  {product.name}
                </CardTitle>
                {product.category && (
                  <span className="inline-block w-fit px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    {product.category.name}
                  </span>
                )}
              </CardHeader>

              <CardContent className="px-4 pt-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold">PKR {price.toFixed(2)}</span>
                  {onSale && (
                    <span className="text-sm text-muted-foreground line-through">
                      PKR {compareAt.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="px-4 pt-0" onClick={(e) => e.preventDefault()}>
                <AddToCartButton
                  product={{
                    id: product.id,
                    title: product.name,
                    price,
                    image: imageSrc,
                  }}
                  className="w-full gap-2"
                />
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

// ─── Main Client Component ──────────────────────────────────

export default function CategoriesUI({ categories, products }) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(new Set());

  const handleToggle = useCallback((categoryId) => {
    setSelectedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedCategoryIds(new Set());
  }, []);

  // Filter products: no selection = show all, otherwise match categoryId
  const filteredProducts = useMemo(() => {
    if (selectedCategoryIds.size === 0) return products;
    return products.filter((p) => p.categoryId && selectedCategoryIds.has(p.categoryId));
  }, [products, selectedCategoryIds]);

  return (
    <div className="min-h-screen bg-background mt-30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Shop by Category</h1>
          <p className="text-muted-foreground mt-1">Browse our collection of products</p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar */}
          <aside>
            <CategorySidebar
              categories={categories}
              selectedCategoryIds={selectedCategoryIds}
              onToggle={handleToggle}
              onClearAll={handleClearAll}
            />
          </aside>

          {/* Right Content */}
          <main>
            <div className="mb-5">
              <p className="text-sm text-muted-foreground">
                Showing{' '}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{' '}
                product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <ProductsGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
