import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const DisplayCards = () => {
    return (
        <div className='container mx-auto flex items-center gap-5 mb-20'>
            <Card 
            className='w-full h-[75vh] bg-secondary flex flex-col pt-15 gap-20 justify-between items-center group relative overflow-hidden z-2'>
                <Image src='/images/card-bg-one.jpg' alt='decorative shape' width={300} height={300} className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out z-1' />
                <div className='w-3/4 flex flex-col items-center z-2'>
                    <h6 className='text-white font-bold text-sm text-center uppercase mb-2'>Basic - Tech</h6>
                    <h4 className='text-white font-bold text-4xl text-center capitalize mb-5'>Home Security Camera</h4>
                    <a href='' className='text-sm text-white font-bold underline'><div className='flex w-fit items-center justify-center'><ChevronRight size={16} className='text-white' />Discover More</div></a>
                </div>
            </Card>
            <Card 
            className='w-full h-[75vh] bg-secondary flex flex-col pt-15 gap-20 justify-between items-center group relative overflow-hidden z-2'>
                <Image src='/images/card-bg-two.jpg' alt='decorative shape' width={300} height={300} className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out z-1' />
                <div className='w-3/4 flex flex-col items-center z-2'>
                    <h6 className='text-white font-bold text-sm text-center uppercase mb-2'>Best Sellers</h6>
                    <h4 className='text-white font-bold text-4xl text-center capitalize mb-5'>Alarm System Security</h4>
                    <a href='' className='text-sm text-white font-bold underline'><div className='flex w-fit items-center justify-center'><ChevronRight size={16} className='text-white' />Discover More</div></a>
                </div>
            </Card>
            <Card 
            className='w-full h-[75vh] bg-secondary flex flex-col pt-15 gap-20 justify-between items-center group relative overflow-hidden z-2'>
                <Image src='/images/card-bg-three.jpg' alt='decorative shape' width={300} height={300} className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out z-1' />
                <div className='w-3/4 flex flex-col items-center z-2'>
                    <h6 className='text-white font-bold text-sm text-center uppercase mb-2'>Sale 10% Off</h6>
                    <h4 className='text-white font-bold text-4xl text-center capitalize mb-5'>Choose Your Smart Home Hubs</h4>
                    <a href='' className='text-sm text-white font-bold underline'><div className='flex w-fit items-center justify-center'><ChevronRight size={16} className='text-white' />Discover More</div></a>
                </div>
            </Card>
        </div>
    )
}

export default DisplayCards