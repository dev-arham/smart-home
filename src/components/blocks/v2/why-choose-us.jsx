"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Wrench,
  Leaf,
  Headset,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safety-first engineering",
    body: "Over-current protection, flame-retardant housings, and grounded assembly on every unit — tested to international standards.",
    tag: "Safety",
  },
  {
    icon: Cpu,
    title: "Smart, not noisy",
    body: "A calm app, zero hub drama. Scenes, schedules and routines that fade into the background of everyday life.",
    tag: "Intelligence",
  },
  {
    icon: Wrench,
    title: "Installer-friendly",
    body: "Clear terminals, deeper backboxes, and honest wiring diagrams. Your electrician will thank us.",
    tag: "Install",
  },
  {
    icon: Leaf,
    title: "Built to sip power",
    body: "Efficient LED drivers and low-standby radios mean smarter bills, not just smarter switches.",
    tag: "Efficient",
  },
  {
    icon: Headset,
    title: "Humans answer the phone",
    body: "Real engineers, real support. We replace, repair, or walk you through anything — even at 9 PM on a Sunday.",
    tag: "Support",
  },
  {
    icon: Sparkles,
    title: "Designed to be seen",
    body: "Matte-soft finishes, metallic accents, and a color palette that earns a spot on your most visible wall.",
    tag: "Finish",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 bg-grid-dots [mask-image:radial-gradient(900px_400px_at_50%_50%,black,transparent)]" />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            Why Aqua
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-semibold tracking-tight text-[clamp(1.8rem,3.6vw,2.75rem)] leading-tight text-foreground"
          >
            Six reasons this is the last{" "}
            <span className="text-gradient-brand">rewire you'll regret.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-4 text-sm text-foreground/60 sm:text-base"
          >
            We didn't just make switches you can turn on. We made ones you
            actually want to.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const { icon: Icon, title, body, tag } = feature;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/70 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card sm:p-7"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

      {/* Tag */}

      <span className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-accent/15 text-primary ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
        <Icon className="h-5 w-5" strokeWidth={2.1} />
      </span>
      <span className="ml-2 inline-flex items-center rounded-full text-sm uppercase text-foreground/55">
        {tag}
      </span>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{body}</p>

      {/* Bottom hairline */}
      <div className="mt-6 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary/60 via-accent/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
    </motion.div>
  );
}
