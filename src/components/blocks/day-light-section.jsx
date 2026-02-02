'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Sun } from 'lucide-react'
import { Moon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useFadeIn } from '@/hooks/use-fade-in'
import { usePopUp } from '@/hooks/use-pop-up'
import TypingText from '../ui/typing-text'

// Inner component that contains all animated content
const AnimatedContent = ({ mode, changeMode }) => {
    const isMobile = useIsMobile();
    const sectionTop = useFadeIn({ direction: 'top', threshold: 0.1, duration: 700, delay: 100 })
    const buttonPopUp1 = usePopUp({ threshold: 0.1, duration: 600, delay: 300 })
    const buttonPopUp2 = usePopUp({ threshold: 0.1, duration: 600, delay: 450 })

    return (
        <CardContent className="h-full flex flex-col items-center justify-center px-20 w-4/5 mx-auto z-2 max-sm:px-5 max-sm:w-full">
            <p className="text-white text-2xl font-semibold uppercase mb-2 text-center max-sm:text-sm">CUSTOM SCENES</p>
            <div ref={sectionTop.ref} style={sectionTop.animationStyles}>
                <h2 className="fade-out-top text-8xl text-white font-semibold mb-3 text-center max-sm:text-5xl md:text-8xl">Making life effortlessly easy!</h2>
            </div>
            <TypingText 
                text={["Walk into a low-lit, warm and cosy room to help you unwind before bed or have your home light up as the sun sets."]}
                as="p"
                typingSpeed={30}
                initialDelay={500}
                loop={true}
                showCursor={true}
                className="w-2/3 text-lg text-white mb-10 text-center max-sm:text-sm max-sm:w-full max-sm:mb-5"
            />
            <div className='flex gap-10 mb-5 max-sm:gap-2'>
                <Button 
                    ref={buttonPopUp1.ref}
                    style={buttonPopUp1.animationStyles}
                    className="border-none text-black bg-white hover:bg-accent/90 hover:text-accent-foreground dark:hover:bg-accent/20"
                    size={isMobile ? 'sm' : 'lg'}
                    onClick={() => changeMode('day')}>
                    <Sun color={mode === 'day' ? 'orange' : 'gray'} />
                    Good Morning
                </Button>
                <Button 
                    ref={buttonPopUp2.ref}
                    style={buttonPopUp2.animationStyles}
                    className="border-none bg-black text-white hover:bg-accent-foreground/90 hover:text-white dark:hover:bg-accent/20"
                    size={isMobile ? 'sm' : 'lg'}
                    onClick={() => changeMode('night')}>
                    <Moon color={mode === 'night' ? 'lightblue' : 'gray'} />
                    Good Night
                </Button>
            </div>
            <p className='text-xs text-center text-white'>try scenes by clicking on them</p>
        </CardContent>
    )
}

const DayLightSection = () => {

    const [mode, setMode] = useState('day');
    const [reloadKey, setReloadKey] = useState(0);
    const sectionFade = useFadeIn({ direction: 'fade', threshold: 0.2, duration: 900 })

    const changeMode = (newMode) => {
        setMode(newMode);
        setReloadKey(prev => prev + 1);
    };

    return (
        <div ref={sectionFade.ref} style={sectionFade.animationStyles} className='relative w-full h-screen overflow-hidden'>
            
            <Card className='relative overflow-hidden h-full rounded-none' >
                <div 
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${mode === 'day' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url('/images/morning.png')` }}
                />
                <div 
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${mode === 'night' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url('/images/night.png')` }}
                />
                <div className="absolute inset-0 bg-black opacity-30 z-1"></div>
                <AnimatedContent key={reloadKey} mode={mode} changeMode={changeMode} />
            </Card>
        </div>
    )
}

export default DayLightSection