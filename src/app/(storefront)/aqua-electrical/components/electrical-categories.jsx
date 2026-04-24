"use client";

import CategoriesSection from "@/components/blocks/v2/categories-section";
import { Plug, Zap, Lightbulb, Network, Battery, Bell, Wind, Package } from "lucide-react";

const ELECTRICAL_CATEGORIES = [
  {
    icon: Plug,
    name: "Switches & Outlets",
    description: "British & Italian standard wiring devices across Bravo, Glasskin, Roman & more series",
    count: "200+ products",
    href: "/category",
  },
  {
    icon: Zap,
    name: "Circuit Protection",
    description: "MCB, MCCB, RCCB, CAM changeover switches & distribution boards",
    count: "80+ products",
    href: "/category",
  },
  {
    icon: Lightbulb,
    name: "Lighting",
    description: "COB downlights, surface panels, flood lights, step lights & sensors",
    count: "60+ products",
    href: "/category",
  },
  {
    icon: Network,
    name: "Cable Management",
    description: "PVC trunking, conduit, junction boxes & concealment accessories",
    count: "40+ products",
    href: "/category",
  },
  {
    icon: Battery,
    name: "Power & Workspace",
    description: "Extension leads with USB-C, floor boxes & motorised desk pop-ups",
    count: "30+ products",
    href: "/category",
  },
  {
    icon: Bell,
    name: "Doorbells",
    description: "Wired & wireless doorbell systems with chime options",
    count: "15+ products",
    href: "/category",
  },
  {
    icon: Wind,
    name: "Fans",
    description: "Ceiling fans & air purification units for every room",
    count: "20+ products",
    href: "/category",
  },
  {
    icon: Package,
    name: "Accessories",
    description: "IP66 covers, travel adapters, capacitors & safety accessories",
    count: "50+ products",
    href: "/category",
  },
];

export default function ElectricalCategories() {
  return (
    <CategoriesSection
      eyebrow="Aqua Electrical · Browse by category"
      title="Every product type,"
      titleAccent="built to spec."
      description="A complete electrical catalogue — from precision switches to circuit protection — organised by function so you find exactly what you need."
      categories={ELECTRICAL_CATEGORIES}
      columns={4}
      ctaHref="/category"
      ctaLabel="Browse all categories"
    />
  );
}
