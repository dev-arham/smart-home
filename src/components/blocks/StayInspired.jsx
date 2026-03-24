"use client";

import { motion } from "framer-motion";
import FuzzyText from '../ui/FuzzyText';

export default function StayInspired() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full mx-auto text-center"
      >
        <h1 className="mb-8 text-white font-light tracking-wide flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-none text-slate-300"
          >
            Stay Inspired With
          </motion.div>
          <div className='mt-4 flex flex-col w-full items-center justify-center relative'>
            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full scale-y-50 scale-x-75 -z-10" />
            <FuzzyText
              fontSize="clamp(4rem,9vw,9rem)"
              fontWeight={700}
              color="#fff"
              enableHover={true}
              baseIntensity={0.2}
              hoverIntensity={0.08}
            >
              Aqua Electrical
            </FuzzyText>
          </div>
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-2xl px-4 relative"
        >
          <div className="absolute left-0 top-1/2 w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="absolute right-0 top-1/2 w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
          
          <p className="text-base font-light leading-relaxed tracking-widest text-slate-300 sm:text-lg md:text-xl uppercase">
            Where simplicity meets <span className="text-cyan-300 font-medium">sophistication</span>.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
