"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Gauge,
  Wrench,
  CalendarClock,
  PhoneCall,
  ArrowUpRight,
  Lightbulb,
  Plug,
  Sun,
  Moon,
  Film,
  Home,
  BedDouble,
  TreePine,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "NICEIC Approved.",
    body: "Certified, insured, and fully compliant — every job backed by a 6-year installation guarantee.",
  },
  {
    icon: Zap,
    title: "Smart switch control.",
    body: "Touch, app, or voice — Aqua smart switches respond every way you want them to.",
  },
  {
    icon: Gauge,
    title: "Live energy monitoring.",
    body: "Track usage per circuit in real time. Spot faults before they become bills.",
  },
  {
    icon: Wrench,
    title: "Traditional wiring done right.",
    body: "First fix to final fix — rewires, consumer units, sockets, and outdoor supplies.",
  },
  {
    icon: CalendarClock,
    title: "Scheduled automation.",
    body: "Lights on at dusk, off at dawn. Set once and forget — for years.",
  },
  {
    icon: PhoneCall,
    title: "7-day callout.",
    body: "Electrical fault? We're available Monday to Sunday, no call-out surcharge.",
  },
];

const ROOMS = [
  {
    id: "living",
    label: "Living Room",
    icon: Home,
    devices: [
      { id: "lr-ceil", label: "Ceiling Light", type: "dimmer", defaultOn: true, defaultBrightness: 72 },
      { id: "lr-lamp", label: "Floor Lamp", type: "dimmer", defaultOn: false, defaultBrightness: 45 },
      { id: "lr-tv", label: "TV Socket", type: "switch", defaultOn: true },
      { id: "lr-plug", label: "Smart Plug", type: "switch", defaultOn: false },
    ],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    icon: BedDouble,
    devices: [
      { id: "br-ceil", label: "Ceiling Light", type: "dimmer", defaultOn: false, defaultBrightness: 30 },
      { id: "br-side", label: "Bedside Lamp", type: "dimmer", defaultOn: true, defaultBrightness: 20 },
      { id: "br-fan", label: "Ceiling Fan", type: "switch", defaultOn: true },
    ],
  },
  {
    id: "outside",
    label: "Outside",
    icon: TreePine,
    devices: [
      { id: "out-sec", label: "Security Light", type: "switch", defaultOn: true },
      { id: "out-gate", label: "Gate Socket", type: "switch", defaultOn: false },
      { id: "out-garden", label: "Garden Strip", type: "dimmer", defaultOn: true, defaultBrightness: 60 },
    ],
  },
];

const SCENES = [
  { id: "movie", label: "Movie Night", icon: Film },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "morning", label: "Morning", icon: Sun },
  { id: "away", label: "Away", icon: Home },
];

function initStates() {
  const s = {};
  ROOMS.forEach((r) =>
    r.devices.forEach((d) => {
      s[d.id] = { on: d.defaultOn, brightness: d.defaultBrightness ?? 100 };
    })
  );
  return s;
}

function ToggleSwitch({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        on ? "bg-accent" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform duration-200 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function BrightnessSlider({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 pl-[2.625rem]">
      <div className="relative flex-1 h-1.5 rounded-full bg-muted cursor-pointer group">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-accent pointer-events-none"
          style={{ width: `${value}%` }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-background shadow-md border-2 border-primary pointer-events-none z-10 group-active:scale-110 transition-transform"
          style={{ left: `${value}%` }}
        />
        <input
          type="range"
          min="5"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0 touch-none"
        />
      </div>
      <span className="w-8 text-right text-[10px] text-muted-foreground">{value}%</span>
    </div>
  );
}

function ControlPanel() {
  const [activeRoom, setActiveRoom] = useState(ROOMS[0].id);
  const [devices, setDevices] = useState(initStates);
  const [activeScene, setActiveScene] = useState(null);

  const toggle = useCallback((id) => {
    setDevices((p) => ({ ...p, [id]: { ...p[id], on: !p[id].on } }));
    setActiveScene(null);
  }, []);

  const setBrightness = useCallback((id, val) => {
    setDevices((p) => ({ ...p, [id]: { ...p[id], brightness: val, on: val > 0 } }));
    setActiveScene(null);
  }, []);

  const applyScene = (scene) => {
    setActiveScene(scene.id);
    setActiveRoom(ROOMS[0].id);
    setDevices((p) => {
      const n = { ...p };
      if (scene.id === "movie") {
        n["lr-ceil"] = { on: true, brightness: 15 };
        n["lr-lamp"] = { on: false, brightness: 45 };
        n["lr-tv"] = { on: true };
      } else if (scene.id === "sleep") {
        Object.keys(n).forEach((k) => (n[k] = { ...n[k], on: false }));
        n["out-sec"] = { on: true };
      } else if (scene.id === "morning") {
        n["lr-ceil"] = { on: true, brightness: 100 };
        n["lr-lamp"] = { on: true, brightness: 80 };
        n["br-ceil"] = { on: true, brightness: 90 };
        n["out-garden"] = { on: true, brightness: 100 };
      } else if (scene.id === "away") {
        Object.keys(n).forEach((k) => (n[k] = { ...n[k], on: false }));
        n["out-sec"] = { on: true };
        n["out-gate"] = { on: false };
      }
      return n;
    });
  };

  const currentRoom = ROOMS.find((r) => r.id === activeRoom);
  const activeCount = Object.values(devices).filter((d) => d.on).length;
  const totalDevices = ROOMS.reduce((a, r) => a + r.devices.length, 0);
  const powerW = activeCount * 14;
  const powerPct = Math.min((powerW / 3600) * 100, 100);

  return (
    <div className="rounded-2xl border border-border bg-card backdrop-blur-xl p-5 shadow-2xl">
      {/* Header bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium text-foreground">Aqua Control</span>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {activeCount}/{totalDevices} active · {powerW}W
        </span>
      </div>

      {/* Room tabs */}
      <div className="mb-4 flex gap-1 rounded-xl bg-muted/40 p-1">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
              activeRoom === room.id
                ? "border border-accent/30 bg-accent/20 text-accent shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <room.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{room.label}</span>
          </button>
        ))}
      </div>

      {/* Device list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoom}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18 }}
          className="space-y-2.5"
        >
          {currentRoom.devices.map((device) => {
            const state = devices[device.id];
            const Icon = device.type === "dimmer" ? Lightbulb : Plug;
            return (
              <div
                key={device.id}
                className="rounded-xl border border-border bg-background/50 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        state.on
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      className={`text-sm font-medium transition-colors ${
                        state.on ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {device.label}
                    </span>
                  </div>
                  <ToggleSwitch on={state.on} onToggle={() => toggle(device.id)} />
                </div>
                {device.type === "dimmer" && state.on && (
                  <BrightnessSlider
                    value={state.brightness}
                    onChange={(v) => setBrightness(device.id, v)}
                  />
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Scenes */}
      <div className="mt-4 border-t border-border pt-4">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          Scenes
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => applyScene(scene)}
              className={`flex flex-col items-center gap-1 rounded-xl py-2.5 text-[10px] font-medium transition-all ${
                activeScene === scene.id
                  ? "border border-primary/40 bg-primary/20 text-primary"
                  : "border border-border bg-background/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <scene.icon className="h-4 w-4" />
              {scene.label}
            </button>
          ))}
        </div>
      </div>

      {/* Power draw bar */}
      <div className="mt-4 border-t border-border pt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">Power draw</span>
          <span className="text-[10px] font-semibold text-muted-foreground">
            {powerW}W / 3600W
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${powerPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

export default function InnovationSpotlight() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 10% 20%, oklch(0.62 0.22 252 / 0.22), transparent 60%), radial-gradient(800px 500px at 90% 80%, oklch(0.82 0.15 195 / 0.18), transparent 60%)",
        }}
      />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left: copy + features */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent"
            >
              Aqua Electrical · Smart &amp; Traditional
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 font-semibold tracking-tight text-[clamp(1.8rem,3.6vw,2.75rem)] leading-tight text-foreground"
            >
              Full control, from the{" "}
              <span className="text-gradient-brand">panel to your phone.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
            >
              Whether you need solid traditional wiring or a fully automated smart
              home, Aqua Electrical delivers both — certified, reliable, and built
              to last.
            </motion.p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                  className="group relative flex gap-3"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <f.icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/aqua-electrical"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)] transition-transform hover:scale-[1.02]"
              >
                Explore our services
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Get a free quote →
              </Link>
            </motion.div>
          </div>

          {/* Right: interactive control panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <ControlPanel />
            <div className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
