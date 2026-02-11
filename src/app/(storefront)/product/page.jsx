import React from 'react'
import AllProducts from '@/components/blocks/all-products'
import Header from '@/components/blocks/header'
import Footer from '@/components/blocks/footer'
import { getProducts } from '@/lib/queries/product.queries'

export const metadata = {
    title: 'All Products | Aqua Electrical',
    description: 'Browse all our smart home products',
}

const ProductsPage = async () => {
    const products = await getProducts();
    console.log("products in page.jsx", products)

    return (
        <main>
            <Header/>
            <AllProducts products={products} />
            <Footer/>
        </main>
    )
}

export default ProductsPage
