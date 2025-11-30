import React from 'react'
import { Card, CardContent } from './card'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const HeroCard = ({ item = {} }) => {
    return (
        <Card className='w-full relative overflow-hidden group z-2' >
            <Image src={item.imageUrl} alt={item.title} height={600} width={400} className="absolute top-0 left-0 w-full h-full object-fill z-1 group-hover:scale-105 transition-transform duration-300 ease-in-out" />
            <CardContent className=" h-[350px] px-10 py-5 flex flex-col justify-center max-sm:h-[20vh] max-sm:px-5 max-sm:py-3">
                <div className="w-1/2 z-2">
                    <p className="text-primary text-sm font-bold uppercase mb-2 max-sm:text-xs max-sm:mb-1">{item.badge}</p>
                    <h2 className="text-4xl text-tertiary font-bold capitalize mb-3 max-sm:text-lg max-sm:mb-1">{item.title}</h2>
                    <p className="text-md text-muted-foreground capitalize mb-6 max-sm:text-xs max-sm:mb-3">{item.subTitle ?? ''}</p>
                    <a href='' className='text-sm text-tertiary font-semibold underline max-sm:text-xs max-sm:mb-1'><div className='flex gap-1 w-fit items-center'><ChevronRight size={16} className='text-sm text-tertiary' />Shop Now</div></a>
                </div>
            </CardContent>
        </Card>
    )
}

export default HeroCard