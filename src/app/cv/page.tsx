import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import DownloadPdfButton from "@/components/DownloadPdfButton";

export const metadata: Metadata = {
  title: "Curriculum Vitae (CV) — Abdul Basit Chandio",
  description:
    "Professional résumé and curriculum vitae of Abdul Basit Chandio — Founder & CEO of Claslo, Full Stack Developer. Next.js, React 19, TypeScript, PostgreSQL, and AI Solutions.",
  openGraph: {
    title: "Curriculum Vitae (CV) — Abdul Basit Chandio",
    description:
      "Founder & CEO of Claslo, Full Stack Developer. Comprehensive résumé of experience, skills, and shipped systems.",
  },
};

export default function CvPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top action bar (Breadcrumb + Download Button) */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--glass-border)] print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--cyan)] rounded p-1"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <DownloadPdfButton />
        </div>
      </div>

      {/* Main Résumé Document Container */}
      <GlassCard
        glowColor="none"
        className="p-6 sm:p-12 space-y-12 bg-[var(--bg-2)]/80 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
      >
        {/* HEADER SECTION */}
        <header className="border-b border-white/10 pb-8 print:border-black/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight">
                Abdul Basit Chandio
              </h1>
              <p className="text-base sm:text-lg text-[var(--cyan)] print:text-blue-700 font-medium mt-1">
                Founder &amp; CEO of Claslo • Full Stack Developer
              </p>
            </div>

            <div className="text-xs sm:text-sm text-[var(--text-muted)] print:text-gray-700 space-y-1 font-mono sm:text-right">
              <p>
                <a
                  href="mailto:admin@claslo.com"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  admin@claslo.com
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/923127803616"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 text-emerald-400/90 transition-colors"
                >
                  WhatsApp: +92 312 7803616
                </a>
              </p>
              <p>
                <a
                  href="https://claslo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  claslo.com
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/basssiit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  github.com/basssiit
                </a>
              </p>
              <p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  linkedin.com/in/abdulbasitchandio
                </a>
              </p>
            </div>
          </div>
        </header>

        {/* EXECUTIVE SUMMARY */}
        <section aria-labelledby="summary-heading" className="space-y-3">
          <h2
            id="summary-heading"
            className="font-heading text-xs font-mono uppercase tracking-widest text-[var(--cyan)] print:text-black font-bold"
          >
            {"//"} Executive Summary
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
            Technical founder and senior full-stack engineer with proven
            experience architecting and deploying end-to-end multi-tenant web
            platforms from scratch. Founder &amp; CEO of Claslo, a modern school
            operating system live in production. Deep expertise in Next.js 15/16
            (App Router, React 19, Server Components), TypeScript, PostgreSQL,
            Prisma, and AI workflow integration. Relentlessly focused on sub-2s
            Core Web Vitals, semantic WCAG 2.1 AA accessibility, and scalable
            product velocity.
          </p>
        </section>

        {/* WORK EXPERIENCE */}
        <section aria-labelledby="experience-heading" className="space-y-6">
          <h2
            id="experience-heading"
            className="font-heading text-xs font-mono uppercase tracking-widest text-[var(--violet)] print:text-black font-bold"
          >
            {"//"} Professional Experience
          </h2>

          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-heading text-lg font-bold text-white print:text-black">
                  Founder &amp; CEO / Solo Full-Stack Engineer —{" "}
                  <a
                    href="https://claslo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--cyan)] print:text-blue-700 hover:underline"
                  >
                    Claslo
                  </a>
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)] print:text-gray-600">
                  2024 — Present
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] print:text-gray-600 font-mono">
                Multi-Tenant Educational Operating System • Live at claslo.com
              </p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Conceived, designed, and solo-engineered Claslo from an empty
                  repository into an active production multi-tenant school
                  management platform.
                </li>
                <li>
                  Engineered multi-tenant database partitioning and RBAC in
                  PostgreSQL &amp; Prisma, securely serving Directors, Teachers,
                  Students, and Parents with zero data bleed.
                </li>
                <li>
                  Automated digital tuition invoicing and SMS/WhatsApp payment
                  receipts, eliminating up to 15% manual revenue leakage for
                  partner schools.
                </li>
                <li>
                  Achieved &lt;1.8s Largest Contentful Paint (LCP) and 99.98%
                  production uptime on Vercel Edge network with optimistic UI
                  updates.
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-heading text-lg font-bold text-white print:text-black">
                  Full Stack Software Engineer &amp; Consultant — Independent
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)] print:text-gray-600">
                  2022 — Present
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] print:text-gray-600 font-mono">
                Startups, SaaS MVPs &amp; Digital Ventures
              </p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)] print:text-gray-800 leading-relaxed">
                <li>
                  Partnered directly with startup founders to build production
                  SaaS MVPs in 2 to 4 weeks using Next.js App Router, Tailwind,
                  and Supabase/PostgreSQL.
                </li>
                <li>
                  Integrated autonomous AI workflows, Claude/OpenAI APIs, and
                  vector search (pgvector) to deliver real-time intelligent
                  customer assistants.
                </li>
                <li>
                  Conducted comprehensive Core Web Vitals and WCAG 2.1 AA
                  audits, consistently turning sub-60 mobile performance scores
                  into 95+ green audits.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARSENAL */}
        <section aria-labelledby="skills-heading" className="space-y-4">
          <h2
            id="skills-heading"
            className="font-heading text-xs font-mono uppercase tracking-widest text-[var(--amber)] print:text-black font-bold"
          >
            {"//"} Technical Competencies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 print:border-gray-300">
              <span className="font-bold text-white print:text-black block mb-1">
                Frontend &amp; UI
              </span>
              <p className="text-[var(--text-muted)] print:text-gray-700">
                Next.js (App Router), React 19, TypeScript, Tailwind CSS v4,
                Three.js, React Three Fiber, GSAP, Framer Motion, Zustand.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 print:border-gray-300">
              <span className="font-bold text-white print:text-black block mb-1">
                Backend &amp; Database
              </span>
              <p className="text-[var(--text-muted)] print:text-gray-700">
                Node.js, Next.js Server Actions, PostgreSQL, Supabase, Prisma
                ORM, Redis Caching, RESTful APIs, GraphQL.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 print:border-gray-300">
              <span className="font-bold text-white print:text-black block mb-1">
                AI &amp; Automation
              </span>
              <p className="text-[var(--text-muted)] print:text-gray-700">
                OpenAI &amp; Anthropic Claude APIs, RAG (Retrieval-Augmented
                Gen), pgvector, LangChain, Vercel AI SDK, Prompt Engineering.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 print:border-gray-300">
              <span className="font-bold text-white print:text-black block mb-1">
                DevOps &amp; Compliance
              </span>
              <p className="text-[var(--text-muted)] print:text-gray-700">
                Vercel, Cloudflare, Docker, GitHub Actions, WCAG 2.1 AA/AAA,
                Lighthouse CI, Playwright, Core Web Vitals optimization.
              </p>
            </div>
          </div>
        </section>

        {/* KEY HIGHLIGHTED PROJECTS */}
        <section aria-labelledby="projects-heading" className="space-y-4">
          <h2
            id="projects-heading"
            className="font-heading text-xs font-mono uppercase tracking-widest text-[var(--cyan)] print:text-black font-bold"
          >
            {"//"} Selected Key Projects
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white print:text-black">
                  Claslo (claslo.com)
                </span>
                <span className="font-mono text-[var(--text-muted)] print:text-gray-600">
                  Production SaaS
                </span>
              </div>
              <p className="text-[var(--text-muted)] print:text-gray-700 mt-0.5">
                Multi-tenant educational management system powering student
                records, attendance, automated invoicing, and parent portals.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white print:text-black">
                  OmniAI
                </span>
                <span className="font-mono text-[var(--text-muted)] print:text-gray-600">
                  AI Agent Engine
                </span>
              </div>
              <p className="text-[var(--text-muted)] print:text-gray-700 mt-0.5">
                Autonomous enterprise customer concierge combining vector
                semantic search (RAG) with multi-step tool calling.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white print:text-black">
                  PulseFlow
                </span>
                <span className="font-mono text-[var(--text-muted)] print:text-gray-600">
                  Performance &amp; A11y Suite
                </span>
              </div>
              <p className="text-[var(--text-muted)] print:text-gray-700 mt-0.5">
                Continuous CI testing tool verifying web accessibility (WCAG AA)
                and sub-2s Largest Contentful Paint benchmarks.
              </p>
            </div>
          </div>
        </section>

        {/* EDUCATION & PHILOSOPHY */}
        <section aria-labelledby="education-heading" className="space-y-2">
          <h2
            id="education-heading"
            className="font-heading text-xs font-mono uppercase tracking-widest text-[var(--violet)] print:text-black font-bold"
          >
            {"//"} Education &amp; Approach
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] print:text-gray-700 leading-relaxed">
            Continuous technical education in Software Architecture, Distributed
            Systems, and Modern Web Standards. Champion of developer empathy,
            type safety, and user-centric software delivery.
          </p>
        </section>

        {/* FOOTER CALL TO ACTION */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <span className="text-xs text-[var(--text-muted)]">
            Available for select client projects, founding roles, and advisory.
          </span>
          <Link
            href="/#contact"
            className="text-xs font-mono text-[var(--cyan)] hover:underline"
          >
            Get in touch directly →
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
