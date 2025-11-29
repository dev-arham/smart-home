import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const HeroCard = ({item = {}}) => {
    return (
        <Card style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
            <CardContent className="h-[400px] px-10 py-5 flex flex-col justify-center">
                <div className="w-2/3">
                    <p className="text-primary text-sm font-bold uppercase mb-2">{item.badge}</p>
                    <h2 className="text-5xl text-tertiary font-bold capitalize mb-3">{item.title}</h2>
                    <p className="text-md text-tertiary font-semibold capitalize mb-6">{item.subTitle ?? ''}</p>
                    <a href='' className='text-md text-tertiary font-bold underline'><div className='flex gap-2'><ChevronRight className='text-sm text-tertiary' />Shop Now</div></a>
                </div>
            </CardContent>
        </Card>
    )
}

export default HeroCard