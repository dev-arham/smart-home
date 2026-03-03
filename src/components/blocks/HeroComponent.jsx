import React from 'react'
import { Button } from '../ui/button'

export default function HeroComponent() {
  return (
    <div>
        <div className="container mx-auto  flex flex-row items-center justify-start text-center px-4 py-16 gap-6 h-screen">
            <div className="w-1/2 text-start">
                <h1 className="text-7xl font-bold mb-4 bg-linear-to-r from-blue-600 to-blue-950 bg-clip-text text-transparent"> AquaSmart Home</h1>
                <h2 className="text-2xl font-semibold mb-4">Smart Living, Simplified</h2>
                <p className="text-lg mb-6">Experience the future of living with our smart home solutions. Control your home with ease and convenience.</p>
                <Button variant="primary" size="lg" className="px-6 py-3 bg-blue-950 text-white rounded-full">
                    Shop Now
                </Button>
            </div>
            <div>
                <img src="/images/homepage.png" alt="Smart Home" className="w-full h-auto" />
            </div>
        </div>
    </div>
  )
}
