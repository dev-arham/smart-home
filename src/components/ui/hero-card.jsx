import React from 'react'
import { Card, CardContent } from './card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const HeroCard = ({ item = {} }) => {
    return (
        <Card className='w-full relative overflow-hidden group z-2' >
            <div className="absolute -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
                <div className="-z-10 m-auto h-77.5 w-77.5 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
            </div>
            <CardContent className="h-[350px] px-10 py-5 flex justify-between items-center max-sm:px-5 max-sm:py-3 max-sm:flex-col max-sm:gap-0 select-none max-sm:justify-start max-xl:h-fit">
                <div className="max-xl:w-full max-xl:h-full">
                    <p className="text-primary text-sm font-bold uppercase mb-2 max-sm:text-xs max-sm:mb-1">{item.badge}</p>
                    <h2 className="text-4xl text-tertiary font-bold capitalize mb-3 max-sm:text-lg max-sm:mb-1">{item.title}</h2>
                    <p className="text-md text-muted-foreground capitalize mb-2 max-sm:text-xs max-sm:mb-3">{item.subTitle ?? ''}</p>
                    <div className='flex gap-1 items-center justify-start mb-2'><ChevronRight size={16} className='text-sm text-tertiary' /><a href="" className='text-sm text-tertiary font-semibold underline max-sm:text-xs max-sm:mb-0'>Shop Now</a></div>
                </div>
                <div className='max-xl:hidden'>
                    <Image src={item.imageUrl} alt={item.title} height={400} width={400} className="p-6 w-fit h-fit group-hover:scale-105 transition-transform duration-300 ease-in-out max-sm:p-0 max-sm:w-fit max-sm:h-fit" />
                </div>
            </CardContent>

        </Card>
    )
}

export default HeroCard