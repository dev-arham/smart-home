'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { FlickeringGrid } from '../ui/flickering-grid'
import { Marquee } from '../ui/marquee'
import { 
    Tv, 
    Lightbulb, 
    Refrigerator, 
    Laptop, 
    Fan, 
    Microwave, 
    Speaker, 
    Watch, 
    Camera, 
    Thermometer, 
    AirVent,
    Lamp,
    WashingMachine,
    Coffee,
    MonitorSpeaker,
    SquareMinus
} from 'lucide-react'
import { Android } from '../ui/android'

function useInView(options = {}) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.15, ...options }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return [ref, inView]
}

const Showcase = () => {
    const [warmth, setWarmth] = useState(0.45)
    const sliderRef = useRef(null)
    const isDragging = useRef(false)
    const animFrame = useRef(null)
    const targetWarmth = useRef(0.45)
    const currentWarmth = useRef(0.45)

    const [headingRef, headingInView] = useInView()
    const [lightCardRef, lightCardInView] = useInView()
    const [demoCardRef, demoCardInView] = useInView()

    // Smooth interpolation loop
    useEffect(() => {
        let running = true
        const lerp = (a, b, t) => a + (b - a) * t

        const tick = () => {
            if (!running) return
            const next = lerp(currentWarmth.current, targetWarmth.current, 0.18)
            if (Math.abs(next - currentWarmth.current) > 0.001) {
                currentWarmth.current = next
                setWarmth(next)
            }
            animFrame.current = requestAnimationFrame(tick)
        }
        animFrame.current = requestAnimationFrame(tick)
        return () => {
            running = false
            cancelAnimationFrame(animFrame.current)
        }
    }, [])

    const updateWarmth = useCallback((clientY) => {
        if (!sliderRef.current) return
        const rect = sliderRef.current.getBoundingClientRect()
        const y = clientY - rect.top
        const ratio = 1 - Math.max(0, Math.min(1, y / rect.height))
        targetWarmth.current = ratio
    }, [])

    const handlePointerDown = useCallback((e) => {
        e.preventDefault()
        if (e.currentTarget.setPointerCapture) {
            e.currentTarget.setPointerCapture(e.pointerId)
        }
        isDragging.current = true
        updateWarmth(e.clientY)
    }, [updateWarmth])

    const handlePointerMove = useCallback((e) => {
        if (!isDragging.current) return
        updateWarmth(e.clientY)
    }, [updateWarmth])

    const handlePointerUp = useCallback((e) => {
        if (e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId)
        }
        isDragging.current = false
    }, [])

    // Color math
    const r = 255
    const g = Math.round(220 - warmth * 100)
    const b = Math.round(180 - warmth * 155)
    const lightColor = `rgb(${r}, ${g}, ${b})`
    const glowInner = `rgba(${r}, ${g}, ${b}, ${0.5 + warmth * 0.35})`
    const glowOuter = `rgba(${r}, ${g}, ${b}, ${0.12 + warmth * 0.18})`
    const pct = Math.round(warmth * 100)

    // Container background: warmth=0 → near black, warmth=0.45 → original, warmth=1 → bright
    // factor 0.1→2.1 keeps original colours at warmth≈0.45 while going dark/bright at extremes
    const bgFactor = Math.min(2.2, 0.1 + warmth * 2.0)
    const clamp = (v) => Math.round(Math.min(255, v))
    const containerBg = `linear-gradient(135deg,
        rgb(${clamp(30 * bgFactor)}, ${clamp(28 * bgFactor)}, ${clamp(42 * bgFactor)}),
        rgb(${clamp(37 * bgFactor)}, ${clamp(35 * bgFactor)}, ${clamp(51 * bgFactor)}))`
    const darkOverlayOpacity = Math.max(0, 0.85 - warmth * 0.85)
    const imageOpacity = 0.5 + warmth * 0.5

    return (
        <section className='relative py-16 md:py-24 px-4 overflow-hidden'>
            <FlickeringGrid
                className="absolute inset-0 z-0 mask-[radial-gradient(450px_circle_at_center,white,transparent)]"
                squareSize={4}
                gridGap={6}
                color="#60A5FA"
                maxOpacity={0.5}
                flickerChance={0.1}
            />

            <div className='relative z-10 container mx-auto'>
                <div
                    ref={headingRef}
                    className={`max-w-2xl mb-10 md:mb-14 showcase-reveal ${headingInView ? 'is-visible' : ''}`}
                >
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold capitalize leading-tight'>
                        Control all your devices from one place
                    </h2>
                    <p className='text-base sm:text-lg text-muted-foreground mt-4'>
                        Designed to make controlling, automating and monitoring your smart home intuitive and fun.
                    </p>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-2  z-100'>

                    <div
                        ref={lightCardRef}
                        className={`w-full lg:flex-1 showcase-reveal showcase-reveal--card ${lightCardInView ? 'is-visible' : ''}`}
                        style={{ transitionDelay: '0.15s' }}
                    >
                        <div
                            className='relative rounded-3xl overflow-hidden flex h-[360px] sm:h-[420px] lg:h-[520px]'
                            style={{
                                background: containerBg,
                                transition: 'background 80ms linear',
                                willChange: 'background',
                            }}
                        >
                            <div
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    background: `rgba(0,0,0,${darkOverlayOpacity})`,
                                    boxShadow: `inset 0 0 120px rgba(0,0,0,${Math.min(0.9, darkOverlayOpacity + 0.12)})`,
                                    transition: 'background 80ms linear, box-shadow 80ms linear',
                                }}
                            />

                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: `
                                        radial-gradient(ellipse 55% 55% at 42% 48%, ${glowInner} 0%, transparent 100%),
                                        radial-gradient(ellipse 80% 70% at 42% 50%, ${glowOuter} 0%, transparent 100%)
                                    `,
                                    willChange: 'background',
                                }}
                            />

                            <div className="relative flex-1 flex items-center justify-center">
                                <div
                                    className="absolute rounded-full pointer-events-none showcase-glow-pulse w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px]"
                                    style={{
                                        background: `radial-gradient(circle, ${glowInner} 0%, transparent 70%)`,
                                        filter: 'blur(40px)',
                                        willChange: 'filter, background, transform',
                                    }}
                                />
                                <div
                                    className="absolute rounded-full pointer-events-none w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] lg:w-[160px] lg:h-[160px]"
                                    style={{
                                        backgroundColor: lightColor,
                                        opacity: 0.22 + warmth * 0.22,
                                        filter: 'blur(30px)',
                                        willChange: 'opacity, background-color',
                                    }}
                                />
                                <img
                                    src="images/showcase-image.png"
                                    alt="Smart Light"

                                    className={`rotate-140 relative z-10 object-contain w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] lg:w-[230px] lg:h-[230px] showcase-light-img ${lightCardInView ? 'is-visible' : ''}`}
                                    style={{
                                        opacity: imageOpacity,
                                        filter: `drop-shadow(0 0 ${18 + warmth * 35}px ${glowInner})`,
                                        willChange: 'filter, opacity',
                                    }}
                                    draggable={false}
                                />
                            </div>

                            <div className={`flex flex-col items-center justify-center pr-5 sm:pr-7 pl-2 z-20 select-none showcase-slider-entry ${lightCardInView ? 'is-visible' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="w-4 h-4 sm:w-5 sm:h-5 mb-3 sm:mb-4 shrink-0 transition-colors duration-500"
                                    style={{ color: warmth > 0.4 ? `rgba(251,191,36,${0.5 + warmth * 0.5})` : '#3a3a48' }}
                                >
                                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                </svg>

                                <div
                                    ref={sliderRef}
                                    className="relative w-10 sm:w-8 touch-none cursor-ns-resize h-[200px] sm:h-[260px] lg:h-[320px]"
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerCancel={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                    role="slider"
                                    aria-label="Light temperature"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={pct}
                                >
                                    <div
                                        className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-full w-[6px]"
                                        style={{
                                            backgroundColor: '#1e1e2a',
                                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        <div
                                            className="absolute bottom-0 left-0 w-full rounded-full pointer-events-none"
                                            style={{
                                                height: `${pct}%`,
                                                background: `linear-gradient(to top, #d97706, ${lightColor})`,
                                                boxShadow: `0 0 8px ${glowOuter}`,
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="absolute left-1/2 pointer-events-none"
                                        style={{
                                            bottom: `${pct}%`,
                                            transform: 'translate(-50%, 50%)',
                                            width: '22px',
                                            height: '22px',
                                            borderRadius: '50%',
                                            background: `radial-gradient(circle at 40% 38%, #fff 0%, ${lightColor} 100%)`,
                                            border: '2.5px solid rgba(255,255,255,0.85)',
                                            boxShadow: `0 0 14px ${glowInner}, 0 2px 6px rgba(0,0,0,0.4)`,
                                        }}
                                    />
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="w-3 h-3 sm:w-[14px] sm:h-[14px] mt-3 sm:mt-4 shrink-0 transition-colors duration-500"
                                    style={{ color: warmth < 0.4 ? `rgba(147,197,253,${1 - warmth})` : '#3a3a48' }}
                                >
                                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                </svg>
                            </div>

                            <div className="absolute bottom-4 left-5 sm:bottom-5 sm:left-7 z-20">
                                <p className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Color Temp</p>
                                <p className="text-sm sm:text-base font-semibold mt-0.5"
                                    style={{ color: lightColor }}
                                >
                                    {Math.round(2700 + warmth * 3800)}K
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={demoCardRef}
                        className={`w-full h-full lg:flex-1 flex justify-center showcase-reveal showcase-reveal--card ${demoCardInView ? 'is-visible' : ''}`}
                        style={{ transitionDelay: '0.3s' }}
                    >
                        <div className="demo-frame-wrapper h-90 sm:h-105 lg:h-130">
                            <Android className="h-full w-full">
                                <iframe
                                    id="HAdemo"
                                    title="Home Assistant Demo"
                                    src="https://demo.home-assistant.io/?frontpage"
                                    className="block h-full w-full border-0"
                                    loading="lazy"
                                />
                            </Android>
                        </div>
                    </div>
                </div>
            </div>

            {/* Colorful Icons Marquee */}
            <Marquee className="mt-20 [--duration:20s]">
                <div className="flex items-center gap-8 text-lg whitespace-nowrap">
                    <div className="flex flex-col items-center gap-2">
                        <Tv className="w-8 h-8" style={{ color: '#3B82F6' }} />
                        <span className="font-medium text-muted-foreground">Smart TV</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Lightbulb className="w-8 h-8" style={{ color: '#FBBF24' }} />
                        <span className="font-medium text-muted-foreground">Smart Lights</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Refrigerator className="w-8 h-8" style={{ color: '#10B981' }} />
                        <span className="font-medium text-muted-foreground">Refrigerator</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <AirVent className="w-8 h-8" style={{ color: '#06B6D4' }} />
                        <span className="font-medium text-muted-foreground">Air Conditioning</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    {/* <div className="flex flex-col items-center gap-2">
                        <WashingMachine className="w-8 h-8" style={{ color: '#8B5CF6' }} />
                        <span className="font-medium text-muted-foreground">Washing Machine</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Coffee className="w-8 h-8" style={{ color: '#A855F7' }} />
                        <span className="font-medium text-muted-foreground">Coffee Maker</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Speaker className="w-8 h-8" style={{ color: '#EF4444' }} />
                        <span className="font-medium text-muted-foreground">Smart Speaker</span>
                    </div> */}
                    {/* <span className="text-muted-foreground/30">•</span> */}
                    
                    <div className="flex flex-col items-center gap-2">
                        <Camera className="w-8 h-8" style={{ color: '#F59E0B' }} />
                        <span className="font-medium text-muted-foreground">Security Camera</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    {/* <div className="flex flex-col items-center gap-2">
                        <Thermometer className="w-8 h-8" style={{ color: '#EC4899' }} />
                        <span className="font-medium text-muted-foreground">Thermostat</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Laptop className="w-8 h-8" style={{ color: '#6366F1' }} />
                        <span className="font-medium text-muted-foreground">Laptop</span>
                    </div> */}
                    {/* <span className="text-muted-foreground/30">•</span> */}
                    
                    <div className="flex flex-col items-center gap-2">
                        <Fan className="w-8 h-8" style={{ color: '#14B8A6' }} />
                        <span className="font-medium text-muted-foreground">Smart Fan</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <SquareMinus  className="w-8 h-8" style={{ color: '#F97316' }} />
                        <span className="font-medium text-muted-foreground">Smart Switches</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Lamp className="w-8 h-8" style={{ color: '#FACC15' }} />
                        <span className="font-medium text-muted-foreground">Table Lamp</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>
                    
                    {/* <div className="flex flex-col items-center gap-2">
                        <Watch className="w-8 h-8" style={{ color: '#84CC16' }} />
                        <span className="font-medium text-muted-foreground">Smart Watch</span>
                    </div> */}
                    {/* <span className="text-muted-foreground/30">•</span> */}
                    
                    {/* <div className="flex flex-col items-center gap-2">
                        <MonitorSpeaker className="w-8 h-8" style={{ color: '#22D3EE' }} />
                        <span className="font-medium text-muted-foreground">Monitor</span>
                    </div> */}
                    {/* <span className="text-muted-foreground/30">•</span> */}
                                        
                </div>
            </Marquee>
        </section>
    )
}

export default Showcase
