"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
  glow: "cyan" | "violet" | "amber";
}

const servicesList: ServiceItem[] = [
  {
    number: "01",
    title: "SaaS MVP Architecture & Rapid Launch",
    description:
      "Transforming raw specifications into a production-ready, scalable software product. From zero codebase to authenticated, database-backed, payment-integrated MVP ready for initial traction.",
    deliverables: [
      "Next.js App Router & TypeScript codebase",
      "Multi-tenant PostgreSQL schema & Prisma ORM",
      "Stripe / Lemon Squeezy billing & subscription tiers",
      "Secure auth (OAuth, Magic Links, MFA)",
      "Automated CI/CD deployment to Vercel/Cloudflare",
    ],
    timeline: "2 to 4 weeks turnaround",
    glow: "cyan",
  },
  {
    number: "02",
    title: "AI Chatbot & Intelligent Workflow Integration",
    description:
      "Embed state-of-the-art LLM capabilities directly into your software. Intelligent customer concierges, vector document retrieval (RAG), and autonomous function-calling agents that cut manual operational overhead.",
    deliverables: [
      "Custom Claude / OpenAI API prompt pipelines",
      "RAG architecture with vector databases (pgvector/Pinecone)",
      "Streaming markdown UI with code syntax highlighting",
      "Guardrails against prompt injection and hallucinations",
      "Webhook-driven autonomous agent execution",
    ],
    timeline: "1 to 2 weeks sprint",
    glow: "violet",
  },
  {
    number: "03",
    title: "Performance & A11y Remediation",
    description:
      "Diagnosing and eliminating slow load times, layout shifts, and accessibility violations. Turning sluggish web apps into 95+ mobile Lighthouse performers that rank higher and convert better.",
    deliverables: [
      "Core Web Vitals overhaul (LCP < 2s, zero CLS)",
      "WCAG 2.1 AA/AAA compliance audit and fixes",
      "Full keyboard navigation & screen-reader ARIA tree",
      "Bundle size shrinking & dynamic code splitting",
      "Database query optimization and caching layer",
    ],
    timeline: "1 week rapid audit & patch",
    glow: "amber",
  },
  {
    number: "04",
    title: "High-Converting Marketing & Interactive Sites",
    description:
      "Futuristic, glassmorphic brand experiences that command authority. Powered by smooth motion, 3D Canvas micro-interactions, and flawless responsive layouts optimized for lead conversion.",
    deliverables: [
      "Bespoke dark glassmorphism design system",
      "Three.js / React Three Fiber interactive visuals",
      "GSAP & Framer Motion scroll-driven storytelling",
      "Ultra-fast static site generation (SSG) with ISR",
      "Analytics, heatmaps, and CRM lead capture",
    ],
    timeline: "1 to 2 weeks delivery",
    glow: "cyan",
  },
  {
    number: "05",
    title: "School Systems & Education Portals",
    description:
      "Drawing directly from real-world Claslo operational architecture. Custom school operating systems that replace manual chaos with automated attendance, gradebooks, invoicing, and parent portals.",
    deliverables: [
      "Multi-role role-based access control (Admin, Teacher, Student, Parent)",
      "Automated tuition billing and SMS fee receipts",
      "Real-time student attendance with QR/biometric sync",
      "Report card generation with automated grade distribution",
      "Parent mobile-responsive portal with instant notices",
    ],
    timeline: "2 to 6 weeks rollout",
    glow: "violet",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);

      if (validCards.length > 0 && sectionRef.current) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Client Services and Solutions"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="04 // WHAT I BUILD"
        title="Services & Capabilities"
        description="Comprehensive technical execution tailored for startups, founders, and companies that demand speed without sacrificing quality."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service, index) => {
          const isWide = index === 0 || index === 4;
          return (
            <div
              key={service.number}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`flex flex-col ${isWide ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <GlassCard
                glowColor={service.glow}
                className="p-7 sm:p-8 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs tracking-widest uppercase font-semibold ${
                        service.glow === "cyan"
                          ? "text-[var(--cyan)]"
                          : service.glow === "violet"
                          ? "text-[var(--violet)]"
                          : "text-[var(--amber)]"
                      }`}
                    >
                      {"//"} SERVICE {service.number}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-transparent border border-white/20">
                      {service.timeline}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-2.5">
                      Key Deliverables:
                    </h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-[var(--text-muted)] flex items-start gap-2"
                        >
                          <span
                            className={`mt-0.5 text-xs font-bold ${
                              service.glow === "cyan"
                                ? "text-[var(--cyan)]"
                                : service.glow === "violet"
                                ? "text-[var(--violet)]"
                                : "text-[var(--amber)]"
                            }`}
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    Fixed-scope or sprint
                  </span>
                  <MagneticButton
                    href="#contact"
                    variant="ghost"
                    className="!text-xs text-white hover:text-[var(--cyan)] font-mono"
                    ariaLabel={`Inquire about ${service.title}`}
                  >
                    Book Service →
                  </MagneticButton>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
