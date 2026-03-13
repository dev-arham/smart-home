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
            const next = lerp(currentWarmth.current, targetWarmth.current, 0.08) // Lowered for buttery smooth inertia
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

    // Color math (Cool blue → Warm orange)
    const r = Math.round(210 + warmth * 45)      // 210 -> 255
    const g = Math.round(240 - warmth * 70)      // 240 -> 170
    const b = Math.round(255 - warmth * 195)     // 255 -> 60
    const lightColor = `rgb(${r}, ${g}, ${b})`
    const glowInner = `rgba(${r}, ${g}, ${b}, ${0.5 + warmth * 0.35})`
    const glowOuter = `rgba(${r}, ${g}, ${b}, ${0.12 + warmth * 0.18})`
    const pct = Math.round(warmth * 100)

    // Container background: warmth=0 → near black, warmth=0.45 → original, warmth=1 → bright
    // factor 0.1→2.1 keeps original colours at warmth≈0.45 while going dark/bright at extremes
    const bgFactor = Math.min(2.2, 0.1 + warmth * 2.0)
    const clamp = (v) => Math.round(Math.min(255, v))
    const containerBg = 'transparent'
    const darkOverlayOpacity = 0
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
                <div className='flex flex-col items-center lg:flex-row gap-6 lg:gap-2  z-100'>

                    <div
                        ref={lightCardRef}
                        className={`w-full lg:flex-1 showcase-reveal showcase-reveal--card ${lightCardInView ? 'is-visible' : ''}`}
                        style={{ transitionDelay: '0.15s' }}
                    >
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
                        <div
                            className='relative flex h-[360px] sm:h-[420px] lg:h-[450px] w-full items-center'
                        >
                            {/* Connecting dashed line */}
                            <div
                                className="absolute border-t-[2px] border-dashed border-[#e4e4e7] -z-10"
                                style={{
                                    left: '30%',
                                    right: '15%', // connects into slider area
                                    top: '50%',
                                }}
                            />

                            {/* Light Image */}
                            <div className="absolute left-[5%] sm:left-[10%] lg:left-[15%] top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                <div className="relative w-[180px] sm:w-[240px] lg:w-[320px]">
                                    <img
                                        src="images/showcase-image.png"
                                        alt="Smart Light"
                                        className={`w-full h-full object-contain rotate-140 showcase-light-img ${lightCardInView ? 'is-visible' : ''}`}
                                        style={{
                                            filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.08))`,
                                        }}
                                        draggable={false}
                                    />
                                    {/* LED Color tint overlay localized to the center bulb area */}
                                    <div
                                        className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-overlay"
                                        style={{
                                            width: '55%',
                                            height: '55%',
                                            background: `radial-gradient(circle, ${lightColor} 0%, rgba(${r}, ${g}, ${b}, 0.2) 50%, transparent 80%)`,
                                            filter: 'blur(4px)',
                                            opacity: 0.9,
                                            willChange: 'background, opacity',
                                        }}
                                    />
                                    <div
                                        className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-color"
                                        style={{
                                            width: '45%',
                                            height: '45%',
                                            background: `radial-gradient(circle, ${lightColor} 0%, transparent 70%)`,
                                            filter: 'blur(8px)',
                                            opacity: 0.7 + warmth * 0.3,
                                            willChange: 'background, opacity',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Slider Section */}
                            <div className={`absolute right-4 sm:right-[15%] lg:right-[15%] flex flex-col items-center justify-center z-20 select-none showcase-slider-entry ${lightCardInView ? 'is-visible' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                    className="w-5 h-5 sm:w-6 sm:h-6 mb-4 sm:mb-6 shrink-0 transition-colors duration-500"
                                    style={{ color: '#a1a1aa' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-2.25l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>

                                <div
                                    ref={sliderRef}
                                    className="relative w-14 sm:w-16 touch-none cursor-ns-resize h-[200px] sm:h-[260px] lg:h-[300px] rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/60 overflow-hidden"
                                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)' }}
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
                                        className="absolute bottom-0 left-0 w-full pointer-events-none"
                                        style={{
                                            height: `${Math.max(5, pct)}%`,
                                            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
                                        }}
                                    >
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-black/10" />
                                    </div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                    className="w-4 h-4 sm:w-5 sm:h-5 mt-4 sm:mt-6 shrink-0 transition-colors duration-500"
                                    style={{ color: '#d4d4d8' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-2.25l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={demoCardRef}
                        className={`w-full h-full lg:flex-1 flex justify-center items-start showcase-reveal showcase-reveal--card ${demoCardInView ? 'is-visible' : ''}`}
                        style={{ transitionDelay: '0.3s' }}
                    >
                        <div className="demo-frame-wrapper h-180 lg:h-160 flex justify-start">
                            <Android className="h-full w-fit">
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

                    <div className="flex flex-col items-center gap-2">
                        <Camera className="w-8 h-8" style={{ color: '#F59E0B' }} />
                        <span className="font-medium text-muted-foreground">Security Camera</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>

                    <div className="flex flex-col items-center gap-2">
                        <Fan className="w-8 h-8" style={{ color: '#14B8A6' }} />
                        <span className="font-medium text-muted-foreground">Smart Fan</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>

                    <div className="flex flex-col items-center gap-2">
                        <SquareMinus className="w-8 h-8" style={{ color: '#F97316' }} />
                        <span className="font-medium text-muted-foreground">Smart Switches</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>

                    <div className="flex flex-col items-center gap-2">
                        <Lamp className="w-8 h-8" style={{ color: '#FACC15' }} />
                        <span className="font-medium text-muted-foreground">Table Lamp</span>
                    </div>
                    <span className="text-muted-foreground/30">•</span>

                </div>
            </Marquee>
        </section>
    )
}

export default Showcase
