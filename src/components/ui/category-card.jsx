import React from 'react'
import { Card } from './card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const CategoryCard = ({image, badge, title}) => {
  return (
      <Card
      className='w-full min-h-[600px] max-h-[800px] bg-secondary flex flex-col pt-15 gap-20 justify-between items-center group relative overflow-hidden z-2'>
      <Image src={image} alt='decorative shape' width={1000} height={1500} quality={100} unoptimized={true} className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 md:saturate-0 group-hover:saturate-100 transition-transform duration-500 ease-in-out z-1' />
      <div className='w-3/4 flex flex-col items-center z-2 max-sm:w-full max-sm:px-5'>
        <h6 className='text-white font-bold text-sm text-center uppercase mb-2 max-sm:text-md md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'>{badge}</h6>
        <h4 className='text-white font-bold text-4xl text-center capitalize mb-5 max-lg:text-2xl md:opacity-10 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'>{title}</h4>
        <a href='' className='text-sm text-white font-bold underline max-sm:text-xs md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'><div className='flex w-fit items-center justify-center'><ChevronRight size={16} className='text-white' />Discover More</div></a>
      </div>
    </Card>
  )
}

export default CategoryCard