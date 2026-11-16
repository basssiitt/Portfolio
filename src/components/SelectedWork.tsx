"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

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
    cyan: "hover:border-[var(--cyan)]/60 hover:shadow-[0_0_35px_rgba(0,229,255,0.15)]",
    violet:
      "hover:border-[var(--violet)]/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.15)]",
    amber:
      "hover:border-[var(--amber)]/60 hover:shadow-[0_0_35px_rgba(255,184,107,0.15)]",
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
  return (
    <section
      id="work"
      aria-label="Selected Projects and Case Studies"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="03 // PROVEN RESULTS"
        title="Selected Work"
        description="Featured applications and architectural builds delivered with focus on speed, user delight, and commercial viability."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Featured Case Study: Claslo (Spans 12 cols on desktop) */}
        <div className="lg:col-span-12">
          <TiltCard glowColor="cyan" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)] font-mono text-xs uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-ping" />
                    Flagship Venture
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    Solo Full-Stack
                  </span>
                  <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    Live at claslo.com
                  </span>
                </div>

                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Claslo — Next-Gen School Management &amp; Education Operating
                  System
                </h3>

                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                  Conceived, designed, and engineered from day one as Founder &amp;
                  CEO. Claslo solves the fractured workflow of traditional
                  academies and private schools by unifying student enrollment,
                  grade tracking, timetable management, teacher scheduling, fee
                  invoicing, and parent communication into one ultra-fast web
                  platform.
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Next.js App Router",
                    "React 19",
                    "TypeScript",
                    "PostgreSQL",
                    "Prisma ORM",
                    "Tailwind CSS",
                    "NextAuth",
                    "Vercel Edge",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metric stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="block text-xl sm:text-2xl font-heading font-bold text-white">
                      100%
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      Solo-Engineered
                    </span>
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-heading font-bold text-[var(--cyan)]">
                      &lt; 1.8s
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      LCP Dashboard
                    </span>
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-heading font-bold text-emerald-400">
                      Multi-Tenant
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      Architecture
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
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
              </div>

              {/* Graphical / Interactive Showcase Preview */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/90 p-5 shadow-2xl space-y-4">
                  {/* Browser bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-[var(--cyan)]">
                      https://app.claslo.com
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      TLS 1.3
                    </span>
                  </div>

                  {/* Mock dashboard telemetry */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div>
                        <span className="text-xs text-[var(--text-muted)] block">
                          School Tenant Status
                        </span>
                        <span className="text-sm font-semibold text-white">
                          Active &amp; Synced
                        </span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                        99.98% SLA
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] text-[var(--text-muted)] block">
                          Student Attendance
                        </span>
                        <span className="text-base font-bold text-white">
                          98.4%
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] text-[var(--text-muted)] block">
                          Fee Collection
                        </span>
                        <span className="text-base font-bold text-[var(--cyan)]">
                          Automated
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-gradient-to-r from-[var(--cyan)]/10 to-[var(--violet)]/10 border border-white/10">
                      <span className="text-[11px] text-[var(--text-muted)] block">
                        Instant Parent SMS &amp; Portal
                      </span>
                      <p className="text-xs text-white/90 mt-1">
                        Zero manual paperwork. Real-time updates delivered in
                        milliseconds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Project 2: OmniAI Agent Engine */}
        <div className="lg:col-span-6">
          <TiltCard glowColor="violet" className="p-7 sm:p-9 h-full flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  02 // AI &amp; AGENT PLATFORM
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-white/5">
                  SaaS MVP
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">
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
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                Available for custom enterprise rollout
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

        {/* Project 3: PulseFlow Observability */}
        <div className="lg:col-span-6">
          <TiltCard glowColor="amber" className="p-7 sm:p-9 h-full flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--amber)] font-semibold">
                  03 // DEV TOOLING &amp; PERFORMANCE
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-white/5">
                  Internal System
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">
                PulseFlow — Real-Time Core Web Vitals &amp; A11y Suite
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
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                Built to enforce 95+ mobile Lighthouse standards
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
      </div>
    </section>
  );
}
