'use client'

import { ShoppingCart } from 'lucide-react'
import AddToCartButton from '@/components/blocks/add-to-cart-button'
import WishlistButton from '@/components/blocks/wishlist-button'

export default function RelatedProductActions({ product }) {
    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <AddToCartButton
                product={product}
                size="sm"
                className="bg-linear-to-r from-blue-500 to-blue-800 rounded-full hover:bg-primary/90 text-white shadow-lg text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 h-7 sm:h-8 cursor-pointer"
            >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
            </AddToCartButton>
            <WishlistButton
                product={product}
                variant="icon"
                className="rounded-full border-gray-300 text-gray-700 shadow-lg h-7 sm:h-8 w-7 sm:w-8 p-0 cursor-pointer"
            />
        </div>
    )
}
