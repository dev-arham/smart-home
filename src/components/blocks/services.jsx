import React from 'react'
import { Card } from '../ui/card'
import { TruckElectric } from 'lucide-react'
import { BanknoteArrowDown } from 'lucide-react'
import { Wrench } from 'lucide-react'
import { Headset } from 'lucide-react'

const Services = () => {
  return (
    <Card className='container mx-auto py-4 mb-20'>
        <div className='flex items-center justify-evenly'>
            <div className='flex items-center justify-center gap-5 px-10'><TruckElectric /> Fast, Free Shipping</div>
            <div className='flex items-center justify-center border-l gap-5 px-10'><BanknoteArrowDown /> 30-Day Money-Back Guarantee</div>
            <div className='flex items-center justify-center border-l gap-5 px-10'><Wrench /> Hassle-Free Warranty</div>
            <div className='flex items-center justify-center border-l gap-5 px-10'><Headset /> Lifetime Customer Support</div>
        </div>
    </Card>
  )
}

export default Services