"use client";

import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

const pillars = [
  {
    tag: "01 / ARCHITECTURE",
    title: "Production-Grade Full Stack",
    description:
      "Specializing in modern Next.js App Router, React 19, TypeScript, and high-performance serverless/edge APIs. Clean code, type safety, and resilient system design from day one.",
    glow: "cyan" as const,
  },
  {
    tag: "02 / VENTURE MINDSET",
    title: "Founder-Led Execution",
    description:
      "As Founder & CEO of Claslo, I understand business economics, user onboarding friction, and unit metrics. I don't just write code—I ship products that retain users and generate value.",
    glow: "violet" as const,
  },
  {
    tag: "03 / PERFORMANCE & A11Y",
    title: "Speed & Universal Access",
    description:
      "Sub-2s Largest Contentful Paint (LCP), keyboard navigation, screen reader semantics, and buttery 60fps animations. Fast apps convert better and leave no user behind.",
    glow: "amber" as const,
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Abdul Basit Chandio"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="01 // BACKGROUND & IDENTITY"
        title="Engineering Products That Matter"
        description="I am Abdul Basit Chandio—a full-stack developer and technical founder based at the intersection of product vision and engineering craft."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Main narrative story */}
        <div className="lg:col-span-7 space-y-6 text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          <p>
            Whether building{" "}
            <a
              href="https://claslo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium underline underline-offset-4 decoration-[var(--cyan)] hover:text-[var(--cyan)] transition-colors"
            >
              Claslo
            </a>{" "}
            from an empty repository to a full-featured multi-tenant education
            ecosystem, or consulting for ambitious clients and startups, my
            approach is hands-on, rigorous, and rapid.
          </p>

          <p>
            I operate across the entire lifecycle: UI/UX system design, database
            schema modeling, secure auth, API routing, real-time sync, AI agent
            tooling, and cloud deployments. For recruiters, that means a senior
            full-stack engineer who understands the big picture; for clients, it
            means a single accountable technical partner who turns requirements
            into live software.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <MagneticButton href="/cv" variant="secondary" className="text-sm">
              View Detailed Résumé / CV →
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost" className="text-sm">
              Explore Selected Work ↓
            </MagneticButton>
          </div>
        </div>

        {/* Quick info card */}
        <div className="lg:col-span-5">
          <GlassCard glowColor="cyan" className="p-6 sm:p-8 space-y-6">
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
              Quick Facts
            </h3>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between pb-3 border-b border-white/5">
                <dt className="text-[var(--text-muted)]">Current Focus</dt>
                <dd className="text-white font-medium text-right">
                  Founder &amp; CEO @ Claslo
                </dd>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <dt className="text-[var(--text-muted)]">Primary Stack</dt>
                <dd className="text-white font-medium text-right">
                  Next.js, TS, React, Node, SQL
                </dd>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <dt className="text-[var(--text-muted)]">Specialization</dt>
                <dd className="text-white font-medium text-right">
                  Full Stack, AI Integrations, A11y
                </dd>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <dt className="text-[var(--text-muted)]">Audience Focus</dt>
                <dd className="text-[var(--cyan)] font-medium text-right">
                  Clients, Startups &amp; Enterprise
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-muted)]">Availability</dt>
                <dd className="text-emerald-400 font-medium text-right flex items-center gap-1.5 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open for Q2/Q3 Roles
                </dd>
              </div>
            </dl>
          </GlassCard>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <GlassCard
            key={pillar.tag}
            glowColor={pillar.glow}
            className="p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span
                className={`text-xs font-mono tracking-wider ${
                  pillar.glow === "cyan"
                    ? "text-[var(--cyan)]"
                    : pillar.glow === "violet"
                    ? "text-[var(--violet)]"
                    : "text-[var(--amber)]"
                }`}
              >
                {pillar.tag}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-3 mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
