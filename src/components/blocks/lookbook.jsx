import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

const LookBook = () => {
    return (
        <div className='container mx-auto flex gap-20 mb-20 max-sm:flex-col max-sm:px-5 max-sm:gap-5'>
            <Card className='w-full overflow-hidden group p-0'>
                <Image src='/images/lookbook-new.png' alt='' width={800} height={400} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' />
            </Card>
            <div className='flex flex-col gap-5 justify-center max-sm:items-center'>
                <h3 className='w-1/2 text-4xl text-tertiary font-bold max-sm:w-full max-sm:text-3xl max-sm:text-center dark:text-tertiary-foreground'>Build a smarter home one device at a time.</h3>
                <p className='w-3/4 mb-10 max-sm:w-full max-sm:text-center max-sm:mb-2'>Bring your devices together for more personalized help around the home.1 And create automations to simplify everyday tasks tailored to your needs.2</p>
                <Button variant='outline' size='lg' className='w-fit text-primary dark:text-tertiary-foreground'>Read The Article <ChevronRight /></Button>
            </div>
        </div>
    )
}

export default LookBook