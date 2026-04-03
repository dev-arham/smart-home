'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    PhoneCall,
    MessageCircle,
    Mail,
    FileText,
    Smartphone,
    Headset,
    MapPin,
    Building2,
    Globe2,
    Users2,
    Landmark,
    Briefcase
} from 'lucide-react';

const CONTACT_METHODS = [
    { icon: MessageCircle, title: "WhatsApp Support", detail: "+9211773333", colSpan: "col-span-1" },
    { icon: Headset, title: "Online Service Request", detail: "Get in Touch", colSpan: "col-span-1" },
    { icon: PhoneCall, title: "Customer Care No.", detail: "021045771313", colSpan: "col-span-1" },
    { icon: Mail, title: "Email Support", detail: "customercare@aquasmart.com", colSpan: "col-span-2" },
    { icon: FileText, title: "Legal Queries", detail: "legal@aquasmart.com", subtext: "Admin Aqua", colSpan: "md:col-span-1 lg:col-span-1" },
];

const OFFICE_LOCATIONS = [
    {
        icon: Building2,
        title: "Corporate Office",
        details: [
            "Aqua Smart Towers, 2D, Sec- 126, Expressway, Karachi",
            "Tel: +92 - 21 - 4771000",
            "Email: marketing@aquasmart.com"
        ]
    },
    {
        icon: Landmark,
        title: "Registered Office",
        details: [
            "904, 9th Floor, Surya Kiran Building",
            "Connaught Place, Lahore - 110001",
            "Tel: +92 - 42 - 35780000",
            "Email: investors@aquasmart.com"
        ]
    },
    {
        icon: Landmark,
        title: "Registered Office",
        details: [
            "904, 9th Floor, Surya Kiran Building",
            "Connaught Place, Lahore - 110001",
            "Tel: +92 - 42 - 35780000",
            "Email: investors@aquasmart.com"
        ]
    },
    {
        icon: Landmark,
        title: "Registered Office",
        details: [
            "904, 9th Floor, Surya Kiran Building",
            "Connaught Place, Lahore - 110001",
            "Tel: +92 - 42 - 35780000",
            "Email: investors@aquasmart.com"
        ]
    }
];

export default function ContactUs() {
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="bg-[#F4F4F6] pb-24 font-sans selection:bg-cyan-500/30 selection:text-cyan-900 border-none">

            {/* 1. HERO BANNER WITH CYAN WAVES & BADGES */}
            <section className="relative w-full bg-white overflow-hidden pb-4 md:pb-8 pt-20">

                {/* Abstract Wavy Shapes & Background */}
                <div className="absolute inset-0 top-0 left-0 z-0 pointer-events-none overflow-hidden">
                    <svg className="absolute w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1440 400">
                        {/* Base grey wave */}
                        <path d="M0,80 C320,200 600,0 900,100 C1200,200 1440,30 1440,30 L1440,0 L0,0 Z" fill="#F4F4F6" fillOpacity="0.8" />
                        {/* Cyan Accent Waves */}
                        <path d="M0,130 C300,240 700,-50 1440,110 L1440,0 L0,0 Z" fill="#67E8F9" fillOpacity="0.3" />
                        {/* Majestic Primary Cyan wave */}
                        <path d="M0,280 C360,350 780,50 1440,250 L1440,0 L0,0 Z" fill="#0891B2" fillOpacity="1" className="drop-shadow-2xl" />
                    </svg>
                    {/* subtle dot pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-8 pb-32 md:pb-60">

                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 h-full">

                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                            className="w-full relative h-[350px] md:h-[450px] flex items-end justify-center z-20"
                        >
                            {/* Image Placeholder representing the Woman with Headset */}
                            <div className="absolute bottom-0 w-full h-[95%] bg-transparent drop-shadow-2xl flex items-end justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Customer Support Agent"
                                    className="w-full h-full object-cover object-top mask-image-bottom mask-[linear-gradient(to_top,transparent_0%,black_10%)]"
                                    style={{ borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}
                                />
                                <h1 className='absolute -bottom-20 flex items-center justify-center text-6xl font-bold'>Contact us</h1>
                            </div>
                        </motion.div>

                        {/* Added a subtle brand tag if needed, otherwise kept minimal and clean as photo */}
                    </div>

                    {/* Quick Contact Badges row overlapping the bottom */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="flex flex-wrap justify-center md:justify-around items-end gap-x-2 gap-y-8 absolute -bottom-10 left-4 right-4 md:left-8 md:right-8 bg-white md:bg-white/90 md:backdrop-blur-xl rounded-2xl md:rounded-[2rem] py-6 md:py-8 mb-5 shadow-2xl shadow-cyan-900/10 border border-white z-30"
                    >
                        {[
                            { icon: PhoneCall, label: "Customer Care No.", val: "+923045771313" },
                            { icon: MessageCircle, label: "WhatsApp Support", val: "+923045771313" },
                            { icon: Mail, label: "Email ID", val: "customercare@aquasmart.com" },
                            { icon: FileText, label: "Legal Queries", val: "legal@aquasmart.com" },
                            { icon: Smartphone, label: "Mobile App", val: "Aqua Smart App" }
                        ].map((b, i) => (
                            <motion.div key={i} variants={itemAnim} className="flex flex-col items-center w-40 text-center group cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-cyan-600 text-white flex items-center justify-center mb-3 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(8,145,178,0.4)] transition-all duration-300">
                                    <b.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wide leading-tight mb-1">{b.label}</h4>
                                <p className="text-[13px] font-black text-zinc-800 group-hover:text-cyan-600 transition-colors">{b.val}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 2. CONTACT US CARDS GRID */}
            <section className="container mx-auto px-4 pt-28 md:pt-36">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
                    {CONTACT_METHODS.map((method, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-white rounded-xl p-8 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer ${method.colSpan}`}
                        >
                            <div className="mb-4 text-zinc-400 group-hover:text-cyan-600 transition-colors duration-300">
                                <method.icon className="w-10 h-10 stroke-[1.5px]" />
                            </div>
                            <h3 className="text-[14px] font-bold text-zinc-900 mb-2">{method.title}</h3>
                            {method.subtext && <p className="text-[12px] text-zinc-500 mb-2">{method.subtext}</p>}
                            <p className="text-[13px] font-semibold text-cyan-600 underline decoration-cyan-600/30 underline-offset-4 group-hover:decoration-cyan-600 transition-all">{method.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. WHERE WE ARE (MAP & ADDRESSES) */}
            <section className="container mx-auto px-4 mt-20 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-black text-zinc-900 tracking-tight max-w-[85rem] mx-auto">Where We Are</h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 max-w-[85rem] mx-auto">
                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[45%] h-[500px] lg:h-auto rounded-xl overflow-hidden bg-zinc-200 border border-zinc-200/50 shadow-sm"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=Karachi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1) brightness(1.05)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>

                    {/* Address Cards Grid */}
                    <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4">
                        {OFFICE_LOCATIONS.map((loc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-xl p-6 border border-transparent hover:border-cyan-100 hover:shadow-lg hover:shadow-cyan-900/5 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="text-zinc-400 group-hover:text-cyan-600 transition-colors">
                                        <loc.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-[13px] font-bold text-zinc-900 tracking-wide">{loc.title}</h4>
                                </div>
                                <div className="space-y-1.5 pl-7">
                                    {loc.details.map((line, j) => (
                                        <p key={j} className="text-[12px] text-zinc-500 leading-snug">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}