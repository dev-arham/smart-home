import React from 'react'
import { Card, CardContent } from './card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const HeroCard = ({ item = {} }) => {
    return (
        <Card className='w-full sm:w-72 md:w-80 lg:w-100 xl:w-150 relative overflow-hidden group z-2 py-0'>
            <div className="absolute -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
                <div className="-z-10 m-auto h-40 sm:h-60 lg:h-77.5 w-40 sm:w-60 lg:w-77.5 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
            </div>
            <CardContent className="h-[200px] sm:h-[280px] md:h-[320px] lg:h-[350px] px-4 sm:px-6 md:px-10 py-4 sm:py-5 flex justify-center items-center select-none relative">
                {/* Image centered */}
                <div className='absolute inset-0 flex items-center justify-center z-0'>
                    <Image src={item.imageUrl} alt={item.title} height={350} width={350} className="p-2 sm:p-4 md:p-6 w-auto h-[160px] sm:h-[220px] md:h-[280px] lg:h-[320px] object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                </div>

                {/* Hover overlay with title at bottom */}
                <div className='absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400 ease-in-out z-10 p-3 sm:p-6'>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 font-bold capitalize text-center items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">{item.title}</h2>
                </div>
            </CardContent>
        </Card>
    )
}

export default HeroCard