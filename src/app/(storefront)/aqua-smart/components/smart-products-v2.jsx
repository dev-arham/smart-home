"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingCart, Wifi, Cpu, Star } from "lucide-react";

const SMART_PRODUCTS = [
  {
    id: 1,
    name: "Aqua Smart 4-Gang Switch",
    series: "Smart WiFi Series",
    slug: "aqua-smart-4-gang-switch",
    price: 4200,
    rating: 4.9,
    badge: "Best Seller",
    features: ["WiFi", "Voice", "App"],
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Smart Control Panel 4\"",
    series: "Smart Control Series",
    slug: "aqua-smart-control-panel-s-4",
    price: 12500,
    rating: 4.8,
    badge: "New",
    features: ["Zigbee", "SigMesh", "Scenes"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Smart Energy Hub",
    series: "Smart Power Series",
    slug: "aqua-smart-energy-hub",
    price: 8900,
    rating: 4.7,
    badge: null,
    features: ["Monitor", "Alexa", "App"],
    image: "https://images.unsplash.com/photo-1601233891960-c85f8c7adf29?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Smart Dimmer Switch",
    series: "Smart WiFi Series",
    slug: "aqua-smart-dimmer",
    price: 3500,
    rating: 4.9,
    badge: "New",
    features: ["Dim", "WiFi", "Voice"],
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
  },
];

export default function SmartProductsV2() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-blue opacity-70"
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
              Smart devices{" "}
              <span className="text-gradient-brand">you&apos;ll love.</span>
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
          {SMART_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const { name, series, slug, price, rating, badge, features, image } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-2xl"
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
          <span className="absolute left-3 top-3 rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
            {badge}
          </span>
        )}

        {/* Add to cart overlay */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/90 py-2.5 text-xs font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary">
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/40">{series}</p>

        <Link href={`/product/${slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="text-xs text-foreground/60">{rating}</span>
        </div>

        {/* Feature tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-foreground/55"
            >
              <Wifi className="h-2.5 w-2.5" />
              {f}
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
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  );
}
