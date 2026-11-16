"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Dynamically import Three.js scene with ssr: false
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

const rotatingTitles = [
  "Full Stack Developer",
  "Founder @ Claslo",
  "I build fast, accessible web apps",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Background ambient lighting and glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,229,255,0.07)_0%,rgba(139,92,246,0.05)_45%,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[var(--cyan)]/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[var(--violet)]/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* R3F 3D Canvas or Static Gradient for reduced motion */}
      {!reducedMotion ? (
        <HeroScene reducedMotion={reducedMotion} />
      ) : (
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.12)_0%,rgba(139,92,246,0.08)_50%,transparent_80%)]"
          aria-hidden="true"
        />
      )}

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
          </span>
          <span className="text-xs sm:text-sm font-mono tracking-wide text-[var(--cyan)]">
            Founder &amp; CEO @ Claslo • Open to New Projects
          </span>
        </div>

        {/* Huge Heading */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-[1.08]">
          Abdul Basit{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] via-white to-[var(--violet)]">
            Chandio
          </span>
        </h1>

        {/* Rotating Subline */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-lg sm:text-2xl md:text-3xl font-medium text-[var(--text-muted)] font-heading"
            >
              {rotatingTitles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Value Proposition Description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[var(--text-muted)] mb-10 leading-relaxed font-sans px-4">
          Architecting high-speed web apps, enterprise SaaS platforms, and AI
          integrations. Helping startups move from zero to one with resilient
          Next.js code and intuitive user experiences.
        </p>

        {/* Two CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto px-4">
          <MagneticButton
            href="#work"
            variant="primary"
            className="w-full sm:w-auto !px-8 !py-3.5 text-base font-semibold"
            ariaLabel="View Work - jump to portfolio projects"
          >
            <span>View Work</span>
            <span aria-hidden="true">↓</span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            variant="secondary"
            className="w-full sm:w-auto !px-8 !py-3.5 text-base"
            ariaLabel="Let's Talk - jump to contact section"
          >
            <span>Let&apos;s Talk</span>
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </div>

        {/* Quick Highlights bar */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-[var(--glass-border)] w-full max-w-3xl text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
              100%
            </p>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
              Solo Full-Stack
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-[var(--cyan)]">
              Claslo
            </p>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
              Founder &amp; CEO
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-[var(--violet)]">
              &lt; 2s
            </p>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
              LCP Performance
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-[var(--amber)]">
              95+
            </p>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
              Lighthouse Mobile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
