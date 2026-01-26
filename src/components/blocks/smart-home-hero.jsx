'use client'
import React from 'react'
import Image from 'next/image'
import { useFadeIn } from '@/hooks/use-fade-in'

const SmartHomeHero = () => {
  const sectionFade = useFadeIn({ direction: 'fade', threshold: 0.2, duration: 900 })

  return (
    <div 
      ref={sectionFade.ref} 
      style={sectionFade.animationStyles}
      className='w-full bg-white py-20 px-4 max-sm:py-10'
    >
      <div className='container mx-auto flex items-center justify-between gap-10 max-lg:flex-col max-lg:text-center'>
        {/* Left Content */}
        <div className='flex-1 max-lg:order-2'>
          <h1 className='text-6xl font-bold mb-4 max-sm:text-3xl max-lg:text-4xl items-center '>
            Simplify Your <span className='text-[#c93738]'>Life</span>, Enhance Your <span className='text-[#c93738]'>Home</span>
          </h1>
          <p className='text-lg text-gray-600 max-sm:text-base'>
            where your ease of life is priority number one!
          </p>
        </div>

        {/* Right Image */}
        <div className='flex-1 flex justify-end max-lg:order-1 items-end'>
          <Image 
            src='/images/tv-lamp-light.png' 
            alt='Smart Home Setup' 
            width={500}
            height={400}
            className='w-full max-w-md h-auto'
          />
        </div>
      </div>
    </div>
  )
}

export default SmartHomeHero
