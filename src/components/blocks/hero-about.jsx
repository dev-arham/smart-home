'use client';
import { useRef } from 'react';
import { Button } from "../ui/button"
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const HeroAbout = () => {
    const sectionRef = useRef(null);

    // Parallax & Fade constraints mapping to Awwwards style
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 50%", "end 50%"]
    });

    const yTransform = useTransform(scrollYProgress, [0, 0.2, 1], [100, 0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.8]);

    return (
        <section ref={sectionRef} className='relative z-20 flex h-[60svh] md:h-[70svh] w-full flex-col items-center justify-center overflow-hidden pb-20'>

            <motion.div
                style={{ opacity, scale, y: yTransform }}
                className='z-20 flex max-w-4xl flex-col items-center justify-center space-y-10 text-center px-4 sticky top-[20vh] pt-50 will-change-transform transform-gpu'
            >
                <h2 className="bg-linear-to-b from-slate-700 to-slate-400 bg-clip-text text-[clamp(4rem,10vw,10rem)] font-bold leading-none tracking-tight text-transparent">
                    About Us
                </h2>

                <p className="max-w-2xl text-lg md:text-2xl font-light text-slate-200 leading-relaxed">
                    Pioneering the future of smart living. We seamlessly integrate cutting-edge <span className="text-gradient-brand font-semibold">architectural technology</span> into your everyday environment.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button asChild size="lg" className="group relative overflow-hidden rounded-full px-10 py-7 text-lg font-medium shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-500 cursor-pointer hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]">
                        <Link href="/about">
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Discover Our Vision</span>
                            <div className="absolute inset-0 z-0 h-full w-full opacity-0 bg-linear-to-r from-cyan-500 to-blue-600 transition-opacity duration-500 group-hover:opacity-100" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HeroAbout;