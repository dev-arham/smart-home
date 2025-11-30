'use client'
import React from 'react'
import { Card } from '../ui/card'
import { TruckElectric } from 'lucide-react'
import { BanknoteArrowDown } from 'lucide-react'
import { Wrench } from 'lucide-react'
import { Headset } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

const Services = () => {
  const isMobile = useIsMobile();
  return (
    <div className='container mx-auto mb-5 max-sm:px-5 max-sm:text-sm'>
      <Card className='py-4 shadow-none '>
          <div className='flex items-center justify-evenly max-sm:flex-wrap max-sm:gap-4 max-sm:justify-start'>
              <div className='flex items-center justify-center gap-5 px-10'><TruckElectric width={isMobile ? 20 : 26} /> Fast, Free Shipping</div>
              <div className='flex items-center justify-center border-l gap-5 px-10'><BanknoteArrowDown width={isMobile ? 20 : 26} /> 30-Day Money-Back Guarantee</div>
              <div className='flex items-center justify-center border-l gap-5 px-10'><Wrench width={isMobile ? 20 : 26} /> Hassle-Free Warranty</div>
              <div className='flex items-center justify-center border-l gap-5 px-10'><Headset width={isMobile ? 20 : 26} /> Lifetime Customer Support</div>
          </div>
      </Card>
    </div>
  )
}

export default Services