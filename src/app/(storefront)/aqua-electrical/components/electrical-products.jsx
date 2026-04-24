"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingCart, Star, Zap } from "lucide-react";

const ELECTRICAL_PRODUCTS = [
  {
    id: 1,
    name: "Aqua Bravo 2-Gang Switch",
    series: "Bravo Series",
    slug: "aqua-bravo-2-gang-switch",
    price: 850,
    rating: 4.8,
    badge: "Best Seller",
    specs: ["10A", "250V", "British Std"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Glasskin 4-Gang Panel",
    series: "Glasskin Series",
    slug: "glasskin-4-gang-panel",
    price: 2200,
    rating: 4.9,
    badge: "New",
    specs: ["15A", "250V", "Tempered Glass"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "MCB Triple Pole 32A",
    series: "Circuit Protection",
    slug: "mcb-triple-pole-32a",
    price: 1650,
    rating: 4.7,
    badge: null,
    specs: ["32A", "3-Pole", "10kA"],
    image: "https://images.unsplash.com/photo-1601233891960-c85f8c7adf29?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Roman 6-Gang Switch Panel",
    series: "Roman Series",
    slug: "roman-6-gang-panel",
    price: 3200,
    rating: 4.8,
    badge: "New",
    specs: ["10A", "250V", "146×86mm"],
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ElectricalProducts() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-blue opacity-60"
      />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60"
            >
              Featured products
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-3 font-semibold tracking-tight text-[clamp(1.6rem,3.2vw,2.5rem)] leading-tight text-foreground"
            >
              Built to last,{" "}
              <span className="text-gradient-brand">designed to impress.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/category"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              View all products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ELECTRICAL_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const { name, series, slug, price, rating, badge, specs, image } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-card hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

        {badge && (
          <span className="absolute left-3 top-3 rounded-full border border-accent/30 bg-accent/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
            {badge}
          </span>
        )}

        {/* Add to cart overlay */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent/90 py-2.5 text-xs font-semibold text-background backdrop-blur-sm transition-colors hover:bg-accent">
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/40">{series}</p>

        <Link href={`/product/${slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="text-xs text-foreground/60">{rating}</span>
        </div>

        {/* Spec tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {specs.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-foreground/55"
            >
              <Zap className="h-2.5 w-2.5" />
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 border-t border-white/5 pt-4">
          <span className="text-base font-bold text-foreground">
            PKR {price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  );
}
