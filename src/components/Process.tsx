"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import { useReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  {
    number: "01",
    phase: "Discovery & Blueprint",
    duration: "Day 1 - 3",
    tagline: "Architecture First",
    description:
      "Clarifying core user journeys, data structures, and edge-cases. Establishing database schemas, API contracts, security bounds, and tech stack choices before writing a line of code.",
    deliverable: "System architecture doc, DB schema & wireframes",
  },
  {
    number: "02",
    phase: "Rapid Iterative Build",
    duration: "Week 1 - 2",
    tagline: "Daily Deployments",
    description:
      "Developing component primitives in Next.js & TypeScript with continuous preview deployments. Integrating auth, backend logic, and responsive UI with immediate feedback loops.",
    deliverable: "Working preview environment & core features live",
  },
  {
    number: "03",
    phase: "Hardening & A11y Tuning",
    duration: "Week 2 - 3",
    tagline: "Zero Compromises",
    description:
      "Aggressive performance optimization to hit LCP < 2s, mobile Lighthouse 95+, keyboard accessibility passes, error boundaries, and edge caching policies.",
    deliverable: "Lighthouse 95+ score & WCAG 2.1 compliance pass",
  },
  {
    number: "04",
    phase: "Production Launch & Scale",
    duration: "Week 3 - 4",
    tagline: "Seamless Handoff",
    description:
      "Production domain migration, DNS propagation, SSL hardening, telemetry instrumentation, and comprehensive documentation handover or continued founder advisory.",
    deliverable: "Live product at custom domain & clean repo handover",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (reducedMotion) {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "100%";
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate progress line with scroll
      if (progressBarRef.current && containerRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.5,
            },
          }
        );
      }

      // Stagger card reveals on scroll with toggleActions
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0 && containerRef.current) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="process"
      aria-label="Development Process and Delivery Timeline"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="05 // METHODOLOGY"
        title="Predictable Delivery Process"
        description="A battle-tested 4-step framework engineered to eliminate scope creep, maintain velocity, and ensure production excellence."
      />

      <div ref={containerRef} className="relative mt-16">
        {/* Horizontal Connecting Timeline Line for Desktop */}
        <div
          className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-white/10 z-0"
          aria-hidden="true"
        >
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--violet)] to-[var(--amber)] shadow-[0_0_12px_rgba(0,229,255,0.6)]"
            style={{ width: "0%" }}
          />
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="flex flex-col"
            >
              {/* Step Node indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--bg-2)] border border-[var(--cyan)]/40 flex items-center justify-center font-heading font-bold text-lg text-white shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  {step.number}
                </div>
                <div className="lg:hidden flex-1 h-[2px] bg-white/10">
                  <div className="h-full bg-[var(--cyan)] w-full opacity-60" />
                </div>
              </div>

              {/* Step Card Content */}
              <GlassCard
                glowColor={
                  index === 0
                    ? "cyan"
                    : index === 1
                    ? "violet"
                    : index === 2
                    ? "cyan"
                    : "amber"
                }
                className="p-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[var(--cyan)] uppercase tracking-wider">
                      {step.tagline}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-white/5">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white">
                    {step.phase}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block mb-1">
                    Key Output:
                  </span>
                  <p className="text-xs text-white/90 font-medium">
                    {step.deliverable}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
