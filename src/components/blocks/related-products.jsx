import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getRelatedProducts } from '@/lib/queries/product.queries'
import RelatedProductActions from '@/components/blocks/related-product-actions'

function ProductItem({ product }) {
    const imageSrc = product.thumbnailUrl || product.images?.[0] || '/placeholder.svg'
    const price = Number(product.price)
    const compareAt = product.compareAtPrice ? Number(product.compareAtPrice) : null
    const discount = compareAt && compareAt > price
        ? Math.round(((compareAt - price) / compareAt) * 100)
        : 0

    return (
        <div className="group h-full">
            <Card className="relative overflow-hidden border border-gray-100 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)] py-0 rounded-none h-full flex flex-col">
                {/* New Badge */}
                {product.isFeatured && (
                    <Badge variant="secondary" className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-0.5 sm:gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500" />
                        New
                    </Badge>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                    <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-500 text-white border-red-500 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                        -{discount}%
                    </Badge>
                )}

                {/* Product Info - Top */}
                <CardContent className="p-2 sm:p-3 md:p-4 text-center max-sm:mt-6">
                    {/* Brand as tagline */}
                    <p className="text-gray-500 text-[10px] sm:text-xs md:text-[14px] font-medium mb-0.5 line-clamp-1">
                        {product.brand?.name || product.category?.name || ''}
                    </p>

                    {/* Product Name */}
                    <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-[22px] font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                </CardContent>

                {/* Product Image Container */}
                <Link href={`/product/${product.id}`} className="block flex-1">
                    <div className="relative bg-white h-30 sm:h-40 md:h-50 lg:h-55 overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={product.name}
                            fill
                            className="object-contain p-3 sm:p-4 md:p-6 transition-all duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, 33vw"
                        />
                    </div>
                </Link>

                {/* Price & Actions - Bottom */}
                <CardContent className="p-2 sm:p-3 md:p-4 text-center mt-auto">
                    {/* Price Section */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
                            Rs. {price.toLocaleString()}
                        </span>
                        {discount > 0 && compareAt && (
                            <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 line-through">
                                Rs. {compareAt.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons (Client Component) */}
                    <RelatedProductActions
                        product={{
                            id: product.id,
                            title: product.name,
                            price,
                            image: imageSrc,
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default async function RelatedProducts({ productId }) {
    const products = await getRelatedProducts(productId, 6)

    if (!products || products.length === 0) {
        return null
    }

    return (
        <section className="py-12">
            <div className="flex flex-col gap-4 mb-10 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tertiary text-center mb-2 dark:text-tertiary-foreground">
                    Related Products
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                    You may also like these products from our collection.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
