'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Sun } from 'lucide-react'
import { Moon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

const DayLightSection = () => {

    const [mode, setMode] = useState('day');
    const isMobile = useIsMobile();

    const changeMode = (mode) => {
        setMode(mode);
    };

    return (
        <div className='relative container mx-auto mb-20 max-sm:px-5 max-sm:mb-10 overflow-hidden'>
            <Card style={{ backgroundImage: `url(${mode === 'day' ? '/images/morning.png' : '/images/night.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundOverlay: '' }} className='transition-opacity duration-500 overflow-hidden' >
                <div className="absolute inset-0 bg-black opacity-30 z-1 rounded-xl max-sm:mx-5"></div>
                <CardContent className=" h-[70vh] flex flex-col items-center justify-center px-20 w-4/5 mx-auto z-2 max-sm:px-5 max-sm:w-full max-sm:h-[40vh]">
                    <p className="text-white text-md font-semibold uppercase mb-2 text-center max-sm:text-sm">CUSTOM SCENES</p>
                    <h2 className="text-7xl text-white font-semibold mb-3 text-center max-sm:text-2xl">Making life effortlessly easy!</h2>
                    <p className="w-2/3 text-lg text-white mb-10 text-center max-sm:text-xs max-sm:w-full max-sm:mb-5">Walk into a low-lit, warm and cosy room to help you unwind before bed or have your home light up as the sun sets.</p>
                    <div className='flex gap-10 mb-5 max-sm:gap-2'>
                        <Button className="border border-foreground text-accent-foreground bg-white hover:bg-accent/90 hover:text-accent-foreground dark:hover:bg-accent/20"
                            size={isMobile ? 'sm' : 'lg'}
                            onClick={() => changeMode('day')}>
                            <Sun />
                            Good Morning
                        </Button>
                        <Button className="border border-foreground bg-black hover:bg-accent-foreground/90 hover:text-accent dark:hover:bg-accent/20"
                            size={isMobile ? 'sm' : 'lg'}
                            onClick={() => changeMode('night')}>
                            <Moon />
                            Good Night
                        </Button>
                    </div>
                    <p className='text-xs text-center text-white'>try scenes by clicking on them</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default DayLightSection