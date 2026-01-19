import React from 'react'
import ProductDetails from '@/components/blocks/product-details'
import FeaturedProducts from '@/components/blocks/featured-products'
import { Separator } from '@/components/ui/separator'

// Mock Data Function
async function getProduct(id) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))

    // In a real app, you would fetch from DB based on id
    // For now, return a rich mock object
    return {
        id: id,
        title: "Aqua Wifi Smart Switch 30 AMP",
        category: "Smart Switches",
        price: 45.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviews: 156,
        description: "Control your heavy appliances remotely with the Aqua Wifi Smart Switch 30 AMP. Featuring a sleek glass panel design, voice control compatibility, and real-time energy monitoring, it's the perfect addition to your smart home ecosystem.",
        isNew: true,
        isSale: true,
        images: [
            "/images/products/Aqua Wifi Smart Switch 30 AMP.jpg",
            "/images/products/AQUA 32A 4 POSITION PHASE SELECTOR.jpg", // Mock additional images
            "/images/products/AQUA SAPPHIRE 4 GANG SWITCH PLUS 2 SOCKET.jpg",
            "/images/products/Aqua Desk Pop-up Lifting Sockets Silver 1-Speaker+2-MF+2USB+2C-Type.jpg" 
        ],
        features: [
            "Voice Control with Alexa & Google Assistant",
            "Remote Access via Smartphone App",
            "Timer & Schedule Functionality",
            "Overload Protection",
            "Energy Power Monitoring",
            "Tempered Glass Panel"
        ],
        specs: {
            "Model": "AQ-30A-WF",
            "Voltage": "110-240V AC",
            "Max Current": "30A",
            "Wireless Standard": "WiFi 2.4GHz b/g/n",
            "Material": "Tempered Glass + PC Fire Retardant",
            "Dimensions": "86 x 86 x 35mm"
        }
    }
}

export async function generateMetadata({ params }) {
    const { pid } = await params
    const product = await getProduct(pid)
    
    return {
        title: `${product.title} | Smart Home Store`,
        description: product.description,
    }
}

export default async function Page({ params }) {
    const { pid } = await params
    const product = await getProduct(pid)

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
            
            <ProductDetails product={product} />
            
            <Separator className="my-16" />
            
            <FeaturedProducts />
        </div>
    )
}
