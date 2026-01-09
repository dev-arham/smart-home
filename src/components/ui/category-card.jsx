import React from 'react'
import { Card } from './card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const CategoryCard = ({image, badge, title}) => {
  return (
    <Card
      className='w-full h-[75vh] bg-secondary flex flex-col pt-15 gap-20 justify-between items-center group relative overflow-hidden z-2 max-lg:h-[60vh]'>
      <Image src={image} alt='decorative shape' width={300} height={300} className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out z-1' />
      <div className='w-3/4 flex flex-col items-center z-2 max-sm:w-full max-sm:px-5'>
        <h6 className='text-white font-bold text-sm text-center uppercase mb-2 max-sm:text-md'>{badge}</h6>
        <h4 className='text-white font-bold text-4xl text-center capitalize mb-5 max-lg:text-2xl'>{title}</h4>
        <a href='' className='text-sm text-white font-bold underline max-sm:text-xs'><div className='flex w-fit items-center justify-center'><ChevronRight size={16} className='text-white' />Discover More</div></a>
      </div>
    </Card>
  )
}

export default CategoryCard