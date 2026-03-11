'use client';
import { useRef } from 'react';
import { Button } from "../ui/button"
import { motion, useScroll, useTransform } from 'motion/react'

const HeroAbout = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 50%", "end 30%"]
    });
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.8]);
    return (
        <section ref={sectionRef} className='relative z-20 h-[70svh]'>
            <motion.div style={{ opacity, scale }} className='myBox sticky top-[20vh] z-20 pt-50 text-center space-y-5'>
                <div className="text-[clamp(4rem,8vw,8rem)] text-white font-normal leading-none">
                    About Us
                </div>
                <Button size="lg" className="rounded-full bg-white px-8 py-3 text-base font-normal text-black shadow-lg transition-all duration-300 hover:bg-white/90 sm:w-auto">
                    Learn More
                </Button>
            </motion.div>
        </section>
    )
}

export default HeroAbout