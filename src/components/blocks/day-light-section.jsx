'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Sun } from 'lucide-react'
import { Moon } from 'lucide-react'

const DayLightSection = () => {

    const [mode, setMode] = useState('day');

    const changeMode = (mode) => {
        setMode(mode);
    };

    return (
        <div className='relative container mx-auto mb-20'>
            <Card style={{ backgroundImage: `url(${mode === 'day' ? '/images/morning.png' : '/images/night.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundOverlay: '' }} className='transition-opacity duration-500 overflow-hidden' >
                <div className="absolute inset-0 bg-black opacity-20 z-1 rounded-xl"></div>
                <CardContent className=" h-[70vh] flex flex-col items-center justify-center px-20 w-4/5 mx-auto z-2">
                    <p className="text-white text-md font-semibold uppercase mb-2 text-center">CUSTOM SCENES</p>
                    <h2 className="text-7xl text-white font-semibold mb-3 text-center">Making life effortlessly easy!</h2>
                    <p className="w-2/3 text-lg text-white mb-10 text-center">Walk into a low-lit, warm and cosy room to help you unwind before bed or have your home light up as the sun sets.</p>
                    <div className='flex gap-10 mb-5'>
                        <Button className="border border-foreground text-accent-foreground bg-white hover:bg-accent/90 hover:text-accent-foreground dark:hover:bg-accent/20"
                            size='lg'
                            onClick={() => changeMode('day')}>
                            <Sun />
                            Good Morning
                        </Button>
                        <Button className="border border-foreground bg-black hover:bg-accent-foreground/90 hover:text-accent dark:hover:bg-accent/20"
                            size='lg'
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