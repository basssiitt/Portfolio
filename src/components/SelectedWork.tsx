"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "amber";
}

function TiltCard({
  children,
  className = "",
  glowColor = "cyan",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  const glowBorder = {
    cyan: "hover:border-[var(--cyan)]/60 hover:shadow-[0_0_35px_rgba(0,229,255,0.18)]",
    violet:
      "hover:border-[var(--violet)]/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]",
    amber:
      "hover:border-[var(--amber)]/60 hover:shadow-[0_0_35px_rgba(255,184,107,0.18)]",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reducedMotion ? "none" : transform,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.4s ease-out",
      }}
      className={`relative overflow-hidden rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)] ${glowBorder[glowColor]} transition-colors duration-300 ${className}`}
    >
      {/* Dynamic spotlight radial gradient follow */}
      {isHovered && !reducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.15), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

      const anim = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Projects and Case Studies"
      className="relative min-h-screen py-20 md:py-24 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            eyebrow="03 // PROVEN RESULTS"
            title="Selected Work"
            description="Featured production applications delivered with focus on speed, user delight, and business impact."
            className="!mb-0"
          />
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--cyan)]">
            <span>Scroll to explore projects</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track on Desktop, Vertical Stack on Mobile */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch w-full md:w-max will-change-transform"
        >
          {/* Card 1: Claslo (Featured Flagship) */}
          <div className="w-full md:w-[700px] lg:w-[820px] shrink-0">
            <TiltCard glowColor="cyan" className="p-6 sm:p-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)] font-mono text-xs uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-ping" />
                    Flagship Venture
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    Solo Full-Stack
                  </span>
                  <a
                    href="https://claslo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:underline"
                  >
                    claslo.com ↗
                  </a>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Claslo — Multi-Tenant School Management OS
                </h3>

                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  Conceived, designed, and solo-engineered from zero to production.
                  Unifies student enrollment, automated tuition billing, real-time
                  attendance tracking, and parent communication into one fast,
                  accessible web platform.
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js App Router",
                    "React 19",
                    "TypeScript",
                    "PostgreSQL",
                    "Prisma ORM",
                    "Tailwind CSS",
                    "Vercel Edge",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Mock dashboard telemetry */}
                <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/90 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
                    <span className="text-[var(--cyan)]">app.claslo.com</span>
                    <span className="text-emerald-400">● 99.98% SLA</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="text-base font-bold text-white block">100%</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Solo Engineered</span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="text-base font-bold text-[var(--cyan)] block">&lt; 1.8s</span>
                      <span className="text-[10px] text-[var(--text-muted)]">LCP Speed</span>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="text-base font-bold text-emerald-400 block">Automated</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Fee Invoicing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-white/10">
                <MagneticButton
                  href="/work/claslo"
                  variant="primary"
                  ariaLabel="Read detailed Claslo case study"
                >
                  Read Full Case Study →
                </MagneticButton>
                <a
                  href="https://claslo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors px-4 py-2 rounded-lg"
                >
                  <span>Visit claslo.com</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Card 2: OmniAI Agent Engine */}
          <div className="w-full md:w-[500px] lg:w-[580px] shrink-0">
            <TiltCard glowColor="violet" className="p-6 sm:p-9 h-full flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                    02 // AI &amp; AGENT PLATFORM
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-white/5">
                    SaaS MVP
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  OmniAI — Multi-Modal Autonomous Agent Engine
                </h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  An intelligent customer concierge and knowledge retrieval engine.
                  Combines vector semantic search (RAG) with autonomous tool
                  calling to resolve complex queries, query databases, and automate
                  customer workflows in milliseconds.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    "Next.js",
                    "TypeScript",
                    "OpenAI API",
                    "pgvector",
                    "LangChain",
                    "Tailwind",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded bg-white/5 text-[var(--text-muted)] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>Retrieval Speed</span>
                    <span className="text-[var(--violet)] font-mono">180ms</span>
                  </div>
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>Context Window</span>
                    <span className="text-white font-mono">128k Tokens</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                  Available for custom rollout
                </span>
                <MagneticButton
                  href="#contact"
                  variant="ghost"
                  className="!text-xs text-[var(--violet)] hover:text-white"
                  ariaLabel="Inquire about OmniAI"
                >
                  Inquire →
                </MagneticButton>
              </div>
            </TiltCard>
          </div>

          {/* Card 3: PulseFlow Observability */}
          <div className="w-full md:w-[500px] lg:w-[580px] shrink-0">
            <TiltCard glowColor="amber" className="p-6 sm:p-9 h-full flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--amber)] font-semibold">
                    03 // DEV TOOLING &amp; PERFORMANCE
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-white/5">
                    Internal System
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  PulseFlow — Core Web Vitals &amp; A11y Suite
                </h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Automated continuous testing harness that audits web applications
                  against WCAG 2.1 AA accessibility benchmarks, Largest Contentful
                  Paint (LCP), and Cumulative Layout Shift (CLS) on every pull request.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    "Node.js",
                    "Lighthouse CI",
                    "Playwright",
                    "Redis",
                    "Docker",
                    "GitHub Actions",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded bg-white/5 text-[var(--text-muted)] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>Lighthouse Target</span>
                    <span className="text-emerald-400 font-mono">95+ Mobile</span>
                  </div>
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>A11y Standard</span>
                    <span className="text-[var(--amber)] font-mono">WCAG 2.1 AA/AAA</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                  Enforcing zero performance regressions
                </span>
                <MagneticButton
                  href="#contact"
                  variant="ghost"
                  className="!text-xs text-[var(--amber)] hover:text-white"
                  ariaLabel="Inquire about PulseFlow"
                >
                  Inquire →
                </MagneticButton>
              </div>
            </TiltCard>
          </div>

          {/* Card 4: CTA Next Project Card */}
          <div className="w-full md:w-[380px] shrink-0">
            <div className="p-6 sm:p-8 h-full rounded-2xl bg-gradient-to-br from-cyan-950/30 via-violet-950/20 to-black/60 border border-white/10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[var(--cyan)] uppercase tracking-wider block">
                  Next Step
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Have an ambitious project in mind?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  I take products from concept to live deployment in 2 to 4 weeks. Let&apos;s build something exceptional together.
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <MagneticButton
                  href="#contact"
                  variant="primary"
                  className="w-full justify-center !text-sm"
                  ariaLabel="Start a project conversation"
                >
                  Let&apos;s Talk →
                </MagneticButton>
                <MagneticButton
                  href="/cv"
                  variant="secondary"
                  className="w-full justify-center !text-xs"
                  ariaLabel="View CV and background"
                >
                  View Résumé / CV
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
