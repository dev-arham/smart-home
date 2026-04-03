'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Heart,
    Share2,
    Minus,
    Plus,
    Wrench,
    ChevronRight,
    ChevronLeft,
    Truck,
    Check,
    Info,
    Gift,
    Smartphone,
    ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function ProductView({ slug }: { slug: string }) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('Specs');

    const price = 55990;
    const mrp = 84990;

    const productName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || "Aqua Smart AC 1.0 - 5 Star";

    const features = [
        "Stylish Sliding Fascia",
        "Highest ISEER (6.50)",
        "1 Unit / Night Mode",
        "Direct Voice Command 2.0 (Hey Aqua / Hello Aqua)",
        "I.N.D.R.I and AI Modes (Find Me & Miss Me)",
        "M.A.D.M (Multi-Directional Air Delivery Mechanism)",
        "Mood On (Mood-Lighting - Also in StandBy Mode)",
        "In-Built Air Purifier & ACP Mode (AC Convertible to Air Purifier)",
        "6 in 1 Expandable AC (40 / 60 / 80 / 100 / 120 / Auto) %",
        "100% Performance even at 46 °C"
    ];

    return (
        <div className="bg-[#F4F4F6] min-h-screen pb-24 font-sans text-zinc-900 selection:bg-cyan-500/30 selection:text-cyan-900 relative">


            <div className="container mx-auto px-2 md:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center flex-wrap gap-2 text-[12px] text-zinc-500 pt-24 md:pt-32 mb-6 md:mb-8 font-medium ml-2 md:ml-0">
                    <Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/category/smart-home" className="hover:text-cyan-600 transition-colors">Home Appliances</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/category/smart-climate" className="hover:text-cyan-600 transition-colors">Smart Climate</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-zinc-800">{productName}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 relative items-start">

                    {/* LEFT COLUMN - Gallery & Details */}
                    <div className="w-full lg:flex-1 min-w-0">
                        {/* Product Gallery Box */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 border border-zinc-200/60 shadow-sm relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[650px] group">
                            <button className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-zinc-100 backdrop-blur flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors z-10 shadow-sm">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-zinc-100 backdrop-blur flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors z-10 shadow-sm">
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Main Viewport */}
                            <div className="relative w-full flex items-center justify-center overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800"
                                    alt={productName}
                                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[0.34,1.56,0.64,1] rounded-3xl"
                                />
                            </div>
                        </div>

                        {/* Tabs Nav Content Area */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-10 border border-zinc-200/60 shadow-sm mb-12 md:mb-0" id="specs-section">
                            <div className="flex gap-6 md:gap-10 mb-8 border-b border-zinc-200 overflow-x-auto no-scrollbar">
                                {['Features', 'Specs', 'Reviews', 'Downloads'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-[14px] md:text-[15px] font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'text-zinc-900 border-b-2 border-cyan-600' : 'text-zinc-400 hover:text-zinc-700'}`}
                                    >
                                        {tab === 'Specs' ? 'Technical Specifications' : tab}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'Specs' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2 mb-6">
                                            Technical Specifications <ChevronDown className="w-5 h-5 text-cyan-600 rotate-180" />
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 border-t border-zinc-100">
                                            {/* Spec Items */}
                                            {[
                                                { k: "Manufactured By", v: "Aqua Smart India Ltd." },
                                                { k: "Country Of Origin", v: "Pakistan" },
                                                { k: "AC Type", v: "Split Air Conditioner" },
                                                { k: "ISEER", v: "6.5" },
                                                { k: "ODU Noise (dB)", v: "50 dB" },
                                                { k: "IDU Noise (dB)", v: "36 dB" },
                                                { k: "Air Flow (m³/h)", v: "1000 m³/h" },
                                                { k: "Input Current (100% / 50%) - Cooling", v: "2.72 A / 1.55 A" },
                                                { k: "Annual Electricity Consumption", v: "398.83 kWh" },
                                                { k: "Cooling Capacity (100% / 50%)", v: "3350 W / 1675 W" },
                                                { k: "Power Supply (V / Hz / Phase)", v: "230 V - 50 Hz - 1 Phase" },
                                                { k: "Area Coverage", v: "11.0 m²" },
                                                { k: "Operating Voltage Range", v: "100 V - 300 V" },
                                                { k: "Air Throw Distance", v: "15 m" }
                                            ].map((spec, i) => (
                                                <div key={i} className="flex justify-between py-4 border-b border-zinc-100 transition-colors hover:bg-zinc-50/50">
                                                    <span className="text-[13px] text-zinc-500 font-medium tracking-wide max-w-[40%]">{spec.k}</span>
                                                    <span className="text-[12.5px] text-zinc-900 font-bold text-right max-w-[55%] leading-snug">{spec.v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {activeTab !== 'Specs' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center justify-center py-24 text-zinc-400 bg-zinc-50/50 rounded-2xl border border-zinc-100"
                                    >
                                        <Info className="w-10 h-10 mb-4 opacity-30 text-cyan-600" />
                                        <p className="text-sm font-medium tracking-wide">Detailed {activeTab.toLowerCase()} information goes here.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sticky Buy Box */}
                    <div className="w-full lg:w-[600px] lg:shrink-0 lg:sticky lg:top-[110px] z-40 bg-transparent">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                            className="bg-white rounded-2xl md:rounded-[2rem] p-6 lg:p-8 shadow-2xl shadow-cyan-900/10 border border-zinc-200/80"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <div>
                                    <h1 className="text-[24px] md:text-[28px] font-black text-zinc-900 tracking-tight leading-tight">
                                        {productName}
                                    </h1>
                                    <p className="text-[11px] text-zinc-400 mt-2.5 uppercase font-bold tracking-[0.2em]">GLS12V6GSOQZ</p>
                                </div>
                                <div className="flex gap-[6px] shrink-0">
                                    <button className="text-zinc-400 hover:text-cyan-600 transition-colors p-1"><Heart className="w-[20px] h-[20px]" strokeWidth={2} /></button>
                                    <button className="text-zinc-400 hover:text-cyan-600 transition-colors p-1"><Share2 className="w-[20px] h-[20px]" strokeWidth={2} /></button>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="mt-8 flex flex-wrap items-baseline gap-3 mb-2">
                                <span className="text-[26px] md:text-[30px] font-black text-zinc-900 tracking-tight">PKR {price.toLocaleString()}</span>
                                <span className="text-[13px] text-zinc-400 line-through font-medium">MRP {mrp.toLocaleString()}</span>
                                <span className="text-[11px] text-zinc-500 font-medium">(incl. of all taxes)</span>
                                <span className="text-[13px] font-black text-cyan-600">34% Off</span>
                            </div>
                            <div className="text-[13px] font-medium text-zinc-500 mb-8">Net Quantity : <strong className="text-zinc-900">1 N</strong></div>

                            {/* Features List */}
                            <div className="mb-8 pb-8 border-b border-zinc-100">
                                <h3 className="text-[16px] font-bold text-zinc-900 mb-4">Key Features</h3>
                                <ul className="space-y-3.5">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[13.5px] text-zinc-600 leading-snug font-medium">
                                            <span className="text-cyan-500 font-black text-xs leading-none mt-[2px]">—</span> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quantity */}
                            <div className="mb-8">
                                <h3 className="text-[16px] font-bold text-zinc-900 mb-4">Quantity</h3>
                                <div className="inline-flex items-center border border-zinc-200 rounded-xl overflow-hidden h-12 bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" strokeWidth={2.5} />
                                    </button>
                                    <div className="w-14 h-full flex items-center justify-center font-black text-zinc-900 text-sm border-x border-zinc-200">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            {/* Bulk & Total */}
                            <div className="mb-6 flex items-center gap-2">
                                <h3 className="text-[14px] font-bold text-zinc-900 leading-none">Buy In Bulk</h3>
                                <p className="text-[12.5px] text-zinc-500 font-medium leading-none mt-[1px]">
                                    Looking to make bulk purchases? <button className="text-cyan-600 font-bold hover:underline underline-offset-4 decoration-cyan-600/30 ml-1">Enquire Now</button>
                                </p>
                            </div>

                            <div className="flex justify-between items-center py-6 border-t border-zinc-200 mb-6">
                                <span className="text-[16px] font-bold text-zinc-900 tracking-wide">Total</span>
                                <span className="text-2xl md:text-[28px] font-black text-zinc-900 tracking-tight">PKR {(price * quantity).toLocaleString()}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <button className="w-full min-h-[52px] bg-white border-[1.5px] border-cyan-600 hover:bg-cyan-50 text-cyan-600 rounded-full font-bold text-[14.5px] transition-colors active:scale-[0.98] tracking-wide flex items-center justify-center">
                                    Add to Cart
                                </button>
                                <button className="w-full min-h-[52px] bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-[14.5px] transition-colors shadow-lg shadow-cyan-900/20 active:scale-[0.98] tracking-wide flex items-center justify-center">
                                    Buy Now
                                </button>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
