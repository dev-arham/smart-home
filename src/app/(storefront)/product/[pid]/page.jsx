import React from 'react'
import ProductDetails from '@/components/blocks/product-details'
import RelatedProducts from '@/components/blocks/related-products'
import { Separator } from '@/components/ui/separator'
import { getProductById, getProducts } from '@/lib/queries/product.queries'
import Header from '@/components/blocks/header'
import Footer from '@/components/blocks/footer'

// Mock Data Function


export async function generateMetadata({ params }) {
    const { pid } = await params
    const product = await getProductById(pid)
    
    return {
        title: `${product.name} | Smart Home Store`,
        description: product.description,
    }
}

export default async function Page({ params }) {
    const { pid } = await params
    const product = await getProductById(pid)
    console.log(`product in ${pid}page.jsx`, product)

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 mt-25">
            <Header/>
            <ProductDetails product={product} />
            
            <Separator className="my-16" />
            
            <RelatedProducts />
            <Footer/>
        </div>
    )
}
