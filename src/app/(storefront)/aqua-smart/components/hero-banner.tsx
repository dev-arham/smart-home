'use client';

import { motion } from 'framer-motion';
import { Droplet, ShieldCheck, Zap } from 'lucide-react';

export default function HeroBanner() {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center lg:justify-start overflow-hidden bg-zinc-900">
            {/* Background Image - Modern Bathroom/Home setup representing Aqua Smart */}
            <img
                src="/images/aqua-smart-banner.jpg"
                alt="Modern smart home interior"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/50 to-transparent" />

            <div className="relative z-10 container mx-auto px-4 lg:px-0 flex flex-col items-center lg:items-start pt-20 text-center lg:text-left text-white">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex flex-col items-center lg:items-start"
                >
                    <h2 className="text-2xl md:text-3xl font-medium tracking-wide text-zinc-200 mb-4 uppercase">
                        EXPERIENCE PURE FLOW <br />
                        AND FEEL BEYOND
                    </h2>

                    <div className="bg-white/90 backdrop-blur-md rounded-full px-8 py-3 mb-6 shadow-xl">
                        <h1 className="text-xl md:text-2xl font-bold tracking-widest text-primary uppercase">
                            AQUA SMART SYSTEM
                        </h1>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold tracking-wider text-zinc-100 mb-12 uppercase drop-shadow-md">
                        AN ENGINEERING MARVEL
                    </h3>
                </motion.div>

                {/* Feature Icons Row from the reference image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-start justify-center lg:justify-start gap-8 md:gap-16 pt-8 border-t border-white/20"
                >
                    <div className="flex flex-col items-center text-center gap-3 max-w-[120px]">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <Droplet className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-200 leading-tight">Adaptive Water Technology</span>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 max-w-[120px]">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-200 leading-tight">Advanced Leak Detection</span>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 max-w-[120px]">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-200 leading-tight">Up to 99% Flow Efficiency</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
