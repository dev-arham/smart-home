'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

export default function VideoBanner() {
    return (
        <section className="relative w-full py-40 overflow-hidden bg-[#1a2024]">
            {/* Ethereal Abstract Background / Flow rendering */}
            <div className="absolute bottom-0 inset-x-0 opacity-50 pointer-events-none mix-blend-screen scale-125">
                <video src="/videos/aqua-smart-video.mp4" autoPlay loop muted className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1e24] via-transparent to-[#1a1f24]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 lg:px-0 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="max-w-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Pure. Intelligent. Flowing.
                    </h2>

                    <p className="text-zinc-300 text-sm md:text-base font-medium mb-8">
                        Presenting the stunning Aqua Smart System.
                    </p>

                    <Button className="inline-flex items-center gap-2 text-white rounded-full pl-5 pr-6 py-2 text-sm font-semibold transition-colors active:scale-[0.98]">
                        Watch Video <PlayCircle />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}