'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar() {
    const categories = ['All', 'New Arrivals', 'Best Sellers'];

    return (
        <div className="container mx-auto sticky top-18 sm:top-23 z-40 w-full rounded-3xl border-b border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar"
                >
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                ? 'bg-zinc-900 text-white shadow-md'
                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 w-full sm:w-auto"
                >
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-sm font-medium text-zinc-700 transition-colors">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-sm font-medium text-zinc-700 transition-colors">
                        Sort by: Featured
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
