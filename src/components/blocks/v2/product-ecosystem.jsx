"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed,
  Sofa,
  Utensils,
  Briefcase,
  Baby,
  ChefHat,
  ArrowUpRight,
} from "lucide-react";

const ROOMS = [
  {
    id: "living",
    label: "Living Room",
    icon: Sofa,
    title: "Cinema on tap, every evening.",
    body: "Dim the cove lights, drop the blinds, warm the LEDs — one scene, one tap. Aqua Smart turns your living room into a mood you can schedule.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    products: ["Smart Dimmer", "Scene Controller", "Dual Socket + USB-C"],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    icon: Bed,
    title: "Wind down without lifting a finger.",
    body: "Sunset-warm bedside lamps, silent circadian triggers, and a bedside panel that can turn the whole house off at once.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
    products: ["Bedside Panel", "Circadian LED", "Soft-Close Switch"],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: ChefHat,
    title: "Bright where it counts, elegant everywhere else.",
    body: "Task-bright under-counter lighting, smart extractor triggers, and heavy-duty 20A sockets for every appliance you own — and the next one.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    products: ["20A Heavy Duty", "Under-Counter LED", "Waterproof Switch"],
  },
  {
    id: "office",
    label: "Home Office",
    icon: Briefcase,
    title: "Power that keeps up with your best work.",
    body: "USB-C PD sockets, surge-protected rails, and lighting that adapts to the time of day so your eyes stay fresh, even at 7 PM.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    products: ["USB-C PD 65W", "Surge Rail", "Daylight LED"],
  },
  {
    id: "nursery",
    label: "Nursery",
    icon: Baby,
    title: "Quiet, safe, and always dimmable.",
    body: "Shuttered sockets, silent relays, and a very soft 1% dim floor — because little people are light sleepers.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80",
    products: ["Shuttered Socket", "Silent Relay", "1% Dim LED"],
  },
  {
    id: "dining",
    label: "Dining",
    icon: Utensils,
    title: "Set a table. Set a scene.",
    body: "Warm pendants, accent wall washes, and a single rotary that takes dinner from prep to after-dinner drinks.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    products: ["Rotary Dimmer", "Pendant Driver", "Wall Washer"],
  },
];

export default function ProductEcosystem() {
  const [active, setActive] = useState(ROOMS[0].id);
  const current = ROOMS.find((r) => r.id === active) ?? ROOMS[0];

  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-radial-blue opacity-60" />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            Room-by-room
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-semibold tracking-tight text-[clamp(1.8rem,3.6vw,2.75rem)] leading-tight text-foreground"
          >
            One system,{" "}
            <span className="text-gradient-brand">every room it lives in.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-4 text-sm text-foreground/60 sm:text-base"
          >
            Aqua Smart and Aqua Electrical are built to solve real moments, not
            just tick feature boxes. Pick a room — we'll show you how they
            work together.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {ROOMS.map((r) => {
            const isActive = r.id === active;
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={[
                  "group flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 sm:text-sm",
                  isActive
                    ? "border-primary/60 bg-primary/15 text-foreground shadow-[0_0_24px_-8px_var(--color-primary)]"
                    : "border-white/10 bg-white/[0.03] text-foreground/60 hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground",
                ].join(" ")}
              >
                <r.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Featured panel */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            {/* Image side with crossfade */}
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.label}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/10 lg:to-background/90" />
                </motion.div>
              </AnimatePresence>

              {/* Room badge */}
              <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
                <current.icon className="h-3.5 w-3.5 text-accent" />
                {current.label}
              </div>
            </div>

            {/* Text side */}
            <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                    Scene {String(ROOMS.findIndex((r) => r.id === current.id) + 1).padStart(2, "0")} /
                    {" "}{String(ROOMS.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 text-sm text-foreground/65 sm:text-base">
                    {current.body}
                  </p>

                  <div className="mt-6 space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                      Products in this scene
                    </p>
                    <ul className="space-y-2">
                      {current.products.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 text-sm text-foreground/80"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/category"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:gap-3 hover:bg-accent/20"
                  >
                    Shop this scene
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
