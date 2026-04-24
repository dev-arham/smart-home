"use client";

import CategoriesSection from "@/components/blocks/v2/categories-section";
import { Wifi, Monitor, Smartphone, DoorOpen, Wind, ShieldCheck } from "lucide-react";

const SMART_CATEGORIES = [
  {
    icon: Wifi,
    name: "Smart Switches",
    description: "1–4 gang WiFi switches, voice & app controlled via Tuya / Smart Life",
    count: "24+ products",
    href: "/category",
  },
  {
    icon: Monitor,
    name: "Control Panels",
    description: "Touch panels with scene, schedule & multi-device control",
    count: "8+ products",
    href: "/category",
  },
  {
    icon: Smartphone,
    name: "Smart Remotes",
    description: "Universal IR remote controllers for all your devices",
    count: "6+ products",
    href: "/category",
  },
  {
    icon: DoorOpen,
    name: "Door Phones",
    description: "Video intercom & smart entry systems with app access",
    count: "5+ products",
    href: "/category",
  },
  {
    icon: Wind,
    name: "Smart Motors",
    description: "Curtain & blind automation for complete home control",
    count: "4+ products",
    href: "/category",
  },
  {
    icon: ShieldCheck,
    name: "Smart Protection",
    description: "Smart breakers & voltage protectors with app alerts",
    count: "10+ products",
    href: "/category",
  },
];

export default function SmartCategories() {
  return (
    <CategoriesSection
      eyebrow="Smart Home · Browse by device"
      title="Every smart device,"
      titleAccent="one ecosystem."
      description="From single-gang WiFi switches to full-room scene controllers — explore the Aqua Smart range organised by device type."
      categories={SMART_CATEGORIES}
      columns={3}
      ctaHref="/category"
      ctaLabel="View all smart products"
    />
  );
}
