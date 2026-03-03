import React from 'react'
import { Button } from '../ui/button'

export default function HeroComponent() {
  return (
    <div className='bg-black'>
        <div className="container mx-auto pt-20 flex flex-row items-center justify-start text-center px-4 py-16 gap-6 h-screen">
            <div className="w-1/2 text-start justify-center items-center drop-shadow-[0_15px_30px_rgba(59,130,246,0.3)]">
                <h1 className="text-7xl font-bold mb-4 bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent"> AquaSmart </h1>
                <h2 className="text-2xl font-semibold mb-4 text-white">Smart Living, Simplified</h2>
                <p className="text-lg text-gray-100 mb-6">Experience the future of living with our smart home solutions.</p>
                <Button variant="primary" size="xl" className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-400 text-white rounded-full text-xl">
                   Explore Aqua Electric
                </Button>
            </div>
            <div className="w-full justify-end items-center hidden md:flex drop-shadow-[0_35px_80px_rgba(37,99,235,0.7)]">
                <img src="/images/stay-connected-1.png" alt="Smart Home" className="w-auto h-auto" />
            </div>
        </div>
    </div>
  )
}
