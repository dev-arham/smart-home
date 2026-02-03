import React from 'react'
import AllProducts from '@/components/blocks/all-products'
import Header from '@/components/blocks/header'
import Footer from '@/components/blocks/footer'

export const metadata = {
    title: 'All Products | Aqua Electrical',
    description: 'Browse all our smart home products',
}

const ProductsPage = () => {
    return (
        <main>
            <Header/>
            <AllProducts />
            <Footer/>
        </main>
    )
}

export default ProductsPage
