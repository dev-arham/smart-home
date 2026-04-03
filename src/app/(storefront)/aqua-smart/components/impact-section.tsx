'use client';

import { motion } from 'framer-motion';
import { Droplet, TrendingDown, Leaf } from 'lucide-react';

export default function ImpactSection() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text & Stats Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Smarter usage. <br />
              <span className="text-cyan-600">Profound impact.</span>
            </h2>
            <p className="text-zinc-600 text-lg mb-12 max-w-md leading-relaxed">
              Aqua Smart doesn&apos;t just protect your home from leaks; it empowers you to understand your consumption patterns and make data-driven decisions that save both water and money.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center shrink-0">
                  <Droplet className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-1">Save up to 40%</h4>
                  <p className="text-zinc-500 text-sm">Reduce your monthly water bill with intelligent, weather-adaptive scheduling.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-1">Eco-Friendly</h4>
                  <p className="text-zinc-500 text-sm">Join thousands in seamlessly conserving millions of gallons of fresh water annually.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-1">Leak Prevention</h4>
                  <p className="text-zinc-500 text-sm">Automatic shutoff prevents catastrophic water damage before it even happens.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Abstract Dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full rounded-[2.5rem] bg-zinc-50 border border-zinc-100 p-8 shadow-2xl shadow-cyan-900/5 group min-h-[500px] overflow-hidden"
          >
            {/* Ambient Graphic Blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/40 blur-[80px] rounded-full mix-blend-multiply translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-125 transition-transform duration-[2000ms]" />
            
            <div className="relative z-10 flex flex-col gap-6 h-full justify-center mt-10">
               
               {/* Stat Card */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100/50 flex flex-col gap-4 relative overflow-hidden"
               >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Monthly Usage</span>
                    <span className="text-[10px] text-[#108F1E] font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">-12% vs last month</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tight">4,250</span>
                    <span className="text-zinc-500 font-medium">Gallons</span>
                  </div>
                  
                  {/* Fake Bar Chart Animation */}
                  <div className="flex items-end gap-2 h-28 mt-4 pt-4 border-t border-zinc-50">
                    {[40, 60, 45, 80, 50, 30, 20].map((h, i) => (
                       <div key={i} className="flex-1 bg-zinc-100 rounded-t-sm relative group-hover:bg-zinc-200 transition-colors h-full flex items-end">
                           <motion.div 
                               initial={{ height: 0 }}
                               whileInView={{ height: `${h}%` }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.8, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                               className={`w-full rounded-t-sm ${i === 6 ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-cyan-200'}`}
                           />
                       </div>
                    ))}
                  </div>
               </motion.div>

               {/* Secondary Status Card */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100/50 flex items-center justify-between"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center">
                        <Droplet className="w-5 h-5 text-cyan-600" />
                     </div>
                     <div>
                       <div className="text-sm font-bold text-zinc-900">System Status</div>
                       <div className="text-xs text-zinc-500">All pipe sensors active</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-green-600">Online</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
               </motion.div>

            </div>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
