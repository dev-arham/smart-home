import React from 'react'

export default function HeroComponent() {
  return (
    <div>
        <div className="container mx-auto flex flex-row items-center justify-start text-center px-4 py-16 gap-6 h-screen">
            <div className="w-1/2 text-start">
                <h1 className="text-7xl font-bold mb-4"> AquaSmart Home</h1>
                <p className="text-lg mb-6">Experience the future of living with our smart home solutions. Control your home with ease and convenience.</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">Shop Now</button>
            </div>
            <div>
                <img src="/images/homepage.png" alt="Smart Home" className="w-full h-auto" />
            </div>
        </div>
    </div>
  )
}
