"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Gem, Hammer, Leaf } from "lucide-react";

const PILLARS = [
  {
    icon: Compass,
    title: "Designed with purpose",
    body: "Every line, every curve of our products starts with a question — does this make a home feel better to live in?",
  },
  {
    icon: Hammer,
    title: "Built like infrastructure",
    body: "Brass contacts, flame-retardant polymers, proper earth continuity. The boring stuff done beautifully.",
  },
  {
    icon: Gem,
    title: "Finished like furniture",
    body: "Matte-soft textures, precise seams, and a quiet family of colors that disappear into the wall — or stand out when you want them to.",
  },
  {
    icon: Leaf,
    title: "Responsible by default",
    body: "Low-power radios, recyclable packaging, and circuits that sip, not gulp. The smartest home is the one you don't over-feed.",
  },
];

export default function BrandStory() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left: narrative */}
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
            >
              Our Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 font-semibold tracking-tight text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.08] text-foreground"
            >
              Electrical, but it{" "}
              <span className="text-gradient-brand">feels like furniture.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-5 text-sm text-foreground/65 sm:text-base"
            >
              Aqua Electrical started in a workshop with a simple belief: the
              switches and sockets you live with for thirty years deserve more
              thought than the ones you replaced last year. We build two lines
              under one roof — smart and traditional — so every home can
              choose its own level of intelligence without ever compromising
              on craft.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-4 text-sm text-foreground/65 sm:text-base"
            >
              From the first prototype to the final finish, we engineer
              everything in-house — because "good enough" is a dangerous
              standard for anything that carries current.
            </motion.p>

            {/* Pillars grid */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors hover:border-primary/30 hover:bg-white/[0.04]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                    <p.icon className="h-4 w-4 text-primary" />
                  </span>
                  <h4 className="mt-3 text-sm font-semibold text-foreground">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl sm:aspect-5/6 lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1000&q=80"
                alt="A modern living space outfitted with Aqua electrical products"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

              {/* Floating stat card */}
              <div className="absolute left-5 top-5 rounded-2xl border border-white/15 bg-background/70 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                  In production since
                </p>
                <p className="text-2xl font-semibold text-foreground">1985</p>
              </div>

              {/* Stat ribbon */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-background/70 p-4 backdrop-blur-md">
                <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
                  <div className="px-2">
                    <p className="text-lg font-semibold text-foreground sm:text-xl">
                      2
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-foreground/50">
                      Collections
                    </p>
                  </div>
                  <div className="px-2">
                    <p className="text-lg font-semibold text-foreground sm:text-xl">
                      40+
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-foreground/50">
                      Years
                    </p>
                  </div>
                  <div className="px-2">
                    <p className="text-lg font-semibold text-foreground sm:text-xl">
                      100k
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-foreground/50">
                      Homes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative orb */}
            <div className="absolute -right-10 top-1/3 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
