'use client'
import React from 'react'
import Image from 'next/image'
import { useFadeIn } from '@/hooks/use-fade-in'

const StayConnected = () => {
  const sectionFade = useFadeIn({ direction: 'fade', threshold: 0.2, duration: 900 })

  return (
    <div 
      ref={sectionFade.ref} 
      style={sectionFade.animationStyles}
      className='w-full bg-gray-100 py-20 px-4 max-sm:py-10'
    >
      <div className='container mx-auto flex items-center justify-between gap-12 max-lg:flex-col max-lg:text-center'>

        {/* Left Image */}
        <div className='flex-1 flex justify-center'>
          <Image 
            src='/images/stay-connected.png' 
            alt='Stay Connected' 
            width={500}
            height={500}
            className='w-full max-w-md h-auto '
          />
        </div>
        {/* Right Content */}
        <div className='flex-1 max-lg:order-2'>
          <h1 className='text-6xl font-bold mb-4 max-sm:text-3xl max-lg:text-4xl items-center '>
            Remember <span className='text-[#c93738]'>Aqua Electrical</span>, Stay Connected with <span className='text-[#c93738]'>us</span>
          </h1>
          <p className='text-lg text-gray-600 max-sm:text-base'>
            Stay connected with Aqua Electrical for the latest updates, exclusive offers, and smart home tips. Follow us on social media and subscribe to our newsletter to never miss out on exciting news and promotions. Join our community and be part of the smart home revolution!
          </p>
        </div>
      </div>
    </div>
  )
}

export default StayConnected
