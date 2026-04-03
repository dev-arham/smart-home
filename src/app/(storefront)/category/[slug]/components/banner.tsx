'use client';

import { motion } from 'framer-motion';

export default function Banner({ categoryName = "Lighting & Automation" }: { categoryName?: string }) {
    return (
        <div className="relative w-full h-[60vh] min-h-[300px] flexitems-center justify-center overflow-hidden bg-zinc-50 flex flex-col pt-24">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50 opacity-80" />

            {/* Subtle animated background shapes */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-100/40 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center py-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4">
                        {categoryName}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    className="max-w-xl text-lg text-zinc-600 font-medium"
                >
                    Elevate your space with our curated selection of intelligent, beautifully designed {categoryName.toLowerCase()} solutions.
                </motion.p>
            </div>
        </div>
    );
}
