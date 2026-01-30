import React from 'react'
import { Card, CardContent } from './card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const HeroCard = ({ item = {} }) => {
    return (
        <Card className='w-full sm:w-80 md:w-100 lg:w-120 xl:w-150 relative overflow-hidden group z-2 py-0'>
            <div className="absolute -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
                <div className="-z-10 m-auto h-77.5 w-77.5 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
            </div>
            <CardContent className="h-[350px] px-10 py-5 flex justify-center items-center max-sm:px-5 max-sm:py-3 max-sm:flex-col max-sm:gap-0 select-none max-sm:justify-start max-xl:h-fit relative">
                {/* Image centered */}
                <div className='absolute inset-0 flex items-center justify-center z-0'>
                    <Image src={item.imageUrl} alt={item.title} height={350} width={350} className="p-6 w-fit h-fit group-hover:scale-105 transition-transform duration-300 ease-in-out max-sm:p-0 max-sm:w-fit max-sm:h-fit" />
                </div>

                {/* Hover overlay with title at bottom */}
                <div className='absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out z-10 p-6'>
                    <h2 className="text-3xl text-gray-900 font-bold capitalize text-center items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out max-sm:text-lg">{item.title}</h2>
                </div>
            </CardContent>
        </Card>
    )
}

export default HeroCard