'use client';

import { motion } from 'framer-motion';
import { Waves, Shield, Smartphone, BarChart3 } from 'lucide-react';

export default function FeaturesBento() {
  return (
    <section className="py-24 bg-zinc-50 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4"
          >
            Smarter drops. <br /> Bigger impact.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 text-lg"
          >
            Every feature is designed to protect your home and the environment simultaneously.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        >
          {/* Card 1: Wide */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 md:p-12 border border-zinc-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-6">
                <Waves className="w-7 h-7" />
              </div>
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">Adaptive Weather Irrigation</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Our smart sprinklers automatically adjust watering schedules based on local real-time weather forecasts, ensuring your lawn gets exactly what it needs, never more.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tall/Square */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">Instant Leak Protection</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Detect micro-leaks in real-time. The system immediately shuts off the main water valve to prevent costly damage to your home.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Small */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 text-cyan-400 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Remote Control</h3>
                <p className="text-zinc-400 text-sm">Manage entire water flow from anywhere via the Smart Home App.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Wide Span 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden group flex items-center"
          >
            <div className="relative z-10 flex gap-8 items-center flex-col sm:flex-row">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Detailed Usage Insights</h3>
                <p className="text-zinc-600">
                  Track your daily, weekly, and monthly water consumption. Get personalized recommendations to further reduce your footprint and utility bills.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
