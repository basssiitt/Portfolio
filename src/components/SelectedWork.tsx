"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const anim = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const totalCards = 9;
            const index = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1
            );
            setActiveCardIndex(index);
          },
        },
      });

      return () => {
        anim.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  const cardBaseStyle = (index: number) => {
    const isActive = activeCardIndex === index;
    return `w-[85vw] md:w-[70vw] shrink-0 p-6 sm:p-10 rounded-2xl bg-[var(--glass)] backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between ${
      isActive
        ? "border-[var(--cyan)]/80 shadow-[0_0_35px_rgba(0,229,255,0.22)] ring-1 ring-[var(--cyan)]/30"
        : "border-[var(--glass-border)] hover:border-white/20"
    }`;
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Projects and Case Studies"
      className="relative min-h-screen py-16 md:py-20 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            eyebrow="03 // PROVEN RESULTS & ARCHITECTURE"
            title="Selected Work & Deep Dives"
            description="Explore production platforms, distributed systems, and AI workflows engineered for extreme speed and commercial viability."
            className="!mb-0"
          />
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Card {activeCardIndex + 1} of 9
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--cyan)]">
              <span>Scroll to navigate</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track (Desktop) / Vertical Stack (Mobile) */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch w-full md:w-max will-change-transform"
        >
          {/* =========================================================================
              CARD 1: CLASLO CORE OS (FLAGSHIP)
          ========================================================================= */}
          <div className={cardBaseStyle(0)}>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)] font-mono text-xs uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-ping" />
                    Flagship Venture
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    Solo Full-Stack
                  </span>
                </div>
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
                Claslo: All-in-One Multi-Tenant Educational Operating System
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Engineered from the ground up to replace fragmented paperwork and
                confusing spreadsheets. Unifies student admissions, automated
                tuition invoicing, real-time attendance, and parent communication
                into a single fast, accessible platform.
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 16 (App Router)",
                  "React 19",
                  "TypeScript",
                  "PostgreSQL",
                  "Prisma ORM",
                  "Tailwind CSS v4",
                  "Vercel Edge",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Mock Dashboard Telemetry */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/90 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
                  <span className="text-[var(--cyan)]">https://app.claslo.com</span>
                  <span className="text-emerald-400">● Production Active (99.98% SLA)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-lg font-bold text-white block">100%</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Solo-Engineered</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-lg font-bold text-[var(--cyan)] block">&lt; 1.8s</span>
                    <span className="text-[10px] text-[var(--text-muted)]">LCP Median</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-lg font-bold text-emerald-400 block">Automated</span>
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
          </div>

          {/* =========================================================================
              CARD 2: CLASLO MULTI-TENANT DATA ISOLATION & RLS
          ========================================================================= */}
          <div className={cardBaseStyle(1)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  {"//"} 02. ARCHITECTURE • MULTI-TENANCY
                </span>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Sub-10ms Routing
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Zero-Bleed Cryptographic Tenant Isolation &amp; RBAC
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Built to enforce absolute data isolation across hundreds of school
                tenants on a shared PostgreSQL infrastructure. Uses Prisma client
                extensions and custom PostgreSQL Row-Level Security (RLS) policies
                injected at edge middleware from signed session cookies.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "PostgreSQL RLS",
                  "Prisma Extensions",
                  "Next.js Edge Middleware",
                  "JWT Claims",
                  "Redis Subdomain Routing",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock Middleware Inspector Visual */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 font-mono text-xs space-y-2">
                <div className="flex justify-between text-[var(--text-muted)] pb-2 border-b border-white/5">
                  <span className="text-[var(--violet)]">TENANT MIDDLEWARE INSPECTOR</span>
                  <span>status: 200 OK</span>
                </div>
                <div className="space-y-1 text-white/80">
                  <p><span className="text-white/40">HOST:</span> beacon-academy.claslo.com</p>
                  <p><span className="text-white/40">TENANT_ID:</span> <span className="text-[var(--cyan)]">tnt_89f02e88a1b</span></p>
                  <p><span className="text-white/40">RLS_POLICY:</span> Enforced (Row Isolation Active)</p>
                  <p><span className="text-white/40">EDGE_OVERHEAD:</span> <span className="text-emerald-400">4.8ms</span></p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                100% strict cross-tenant data safety
              </span>
              <MagneticButton
                href="/work/claslo#challenges-heading"
                variant="ghost"
                className="!text-xs text-[var(--violet)] hover:text-white"
                ariaLabel="Read about multi-tenant isolation"
              >
                Deep Dive →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 3: CLASLO AUTOMATED BILLING & WHATSAPP ENGINE
          ========================================================================= */}
          <div className={cardBaseStyle(2)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--amber)] font-semibold">
                  {"//"} 03. FINTECH ENGINE • REVENUE RECOVERY
                </span>
                <span className="text-xs font-mono text-[var(--amber)] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  15% Leakage Saved
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Automated Fee Generation &amp; Instant WhatsApp Vouchers
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                An event-driven billing pipeline that automatically generates
                custom fee vouchers, calculates family discounts and scholarships,
                and dispatches digital PDF invoices directly to parents via
                automated WhatsApp &amp; SMS Webhooks.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Node.js Cron",
                  "WhatsApp Cloud API",
                  "AWS S3 PDF Engine",
                  "Stripe / Cash Webhooks",
                  "Automated Ledger",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock Invoice Ledger Component */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pb-2 border-b border-white/5">
                  <span>BILLING LEDGER RUN</span>
                  <span className="text-emerald-400">100% DISPATCHED</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-[var(--text-muted)] block">Vouchers Created</span>
                    <span className="text-sm font-bold text-white font-mono">4,820 Monthly</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-[var(--text-muted)] block">Parent WhatsApp Delivery</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">99.4% Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Eliminates manual paper vouchers entirely
              </span>
              <MagneticButton
                href="/work/claslo"
                variant="ghost"
                className="!text-xs text-[var(--amber)] hover:text-white"
                ariaLabel="Read Claslo case study"
              >
                Explore Details →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 4: CLASLO REAL-TIME WEBSOCKETS & MORNING SPIKE QUEUE
          ========================================================================= */}
          <div className={cardBaseStyle(3)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  {"//"} 04. HIGH CONCURRENCY • WEBSOCKETS
                </span>
                <span className="text-xs font-mono text-[var(--cyan)] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  Sub-100ms Sync
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Morning Concurrency Queue &amp; Real-Time Absence Alerts
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Engineered for the peak 8:00 AM rush when hundreds of teachers mark
                attendance simultaneously. Uses optimistic UI state, an asynchronous
                Redis write-behind buffer, and WebSockets to alert parents of student
                absenteeism within 45 seconds.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "WebSockets",
                  "Redis Streams",
                  "Optimistic Updates",
                  "Async Write-Behind",
                  "Next.js Server Actions",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock Sync Telemetry */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/5">
                  <span className="text-white/60">PEAK SPIKE BUFFER</span>
                  <span className="text-emerald-400">0 DROPPED PACKETS</span>
                </div>
                <div className="space-y-1 text-xs font-mono text-white/80">
                  <p><span className="text-white/40">CONCURRENCY:</span> 12,000+ marks / 15-min window</p>
                  <p><span className="text-white/40">QUEUE LATENCY:</span> <span className="text-[var(--cyan)]">18ms median</span></p>
                  <p><span className="text-white/40">PARENT PUSH:</span> Dispatched in &lt; 45s</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Offline tolerant with auto-retry
              </span>
              <MagneticButton
                href="#contact"
                variant="ghost"
                className="!text-xs text-[var(--cyan)] hover:text-white"
                ariaLabel="Inquire about attendance engine"
              >
                Inquire Architecture →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 5: OMNIAI - ENTERPRISE RAG & AGENT ENGINE
          ========================================================================= */}
          <div className={cardBaseStyle(4)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  {"//"} 05. APPLIED AI &amp; AGENTS • SAAS MVP
                </span>
                <span className="text-xs font-mono text-[var(--violet)] px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                  Hybrid Vector Search
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                OmniAI: Multi-Modal Autonomous Agent &amp; RAG Engine
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Enterprise knowledge retrieval and autonomous agent orchestrator.
                Combines dense vector embeddings with sparse BM25 search and
                multi-step function calling to query databases and resolve complex
                business workflows in real time.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Claude 3.5 Sonnet / GPT-4o",
                  "pgvector",
                  "Pinecone",
                  "LangChain",
                  "Function Calling",
                  "Next.js App Router",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock Agent Reasoning Trace */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 font-mono text-xs space-y-2">
                <div className="flex justify-between text-[var(--text-muted)] pb-2 border-b border-white/5">
                  <span className="text-[var(--violet)]">AGENT REASONING TRACE</span>
                  <span>accuracy: 99.2%</span>
                </div>
                <div className="space-y-1 text-white/80">
                  <p><span className="text-white/40">1. INTENT:</span> Semantic SQL Query Extraction</p>
                  <p><span className="text-white/40">2. RAG RETRIEVAL:</span> 180ms hybrid vector top-k</p>
                  <p><span className="text-white/40">3. TOOL CALL:</span> execute_scoped_query()</p>
                  <p><span className="text-white/40">4. OUTPUT:</span> Streamed Markdown with code syntax</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Deployable for custom enterprise suites
              </span>
              <MagneticButton
                href="#contact"
                variant="ghost"
                className="!text-xs text-[var(--violet)] hover:text-white"
                ariaLabel="Inquire about OmniAI"
              >
                Request Demo →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 6: APEXPAY - HIGH-THROUGHPUT DOUBLE-ENTRY LEDGER
          ========================================================================= */}
          <div className={cardBaseStyle(5)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--amber)] font-semibold">
                  {"//"} 06. FINTECH PLATFORM • ARCHITECTURAL MVP
                </span>
                <span className="text-xs font-mono text-[var(--amber)] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Double-Entry Ledger
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                ApexPay: High-Throughput Double-Entry Ledger &amp; Payments Hub
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Fault-tolerant multi-currency financial ledger with strict
                double-entry accounting guarantees. Implements cryptographic
                idempotent request keys, webhook retry backoff, and real-time
                balance invariants to prevent race-condition overdrafts.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "Stripe Connect API",
                  "Double-Entry SQL",
                  "Idempotency Keys",
                  "Redis BullMQ",
                  "Docker",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock Ledger Audit Log */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[var(--text-muted)] pb-2 border-b border-white/5">
                  <span className="text-[var(--amber)]">IMMUTABLE LEDGER RECORD</span>
                  <span className="text-emerald-400">ZERO-SUM VERIFIED</span>
                </div>
                <div className="space-y-1 text-white/80">
                  <p><span className="text-white/40">TXN_ID:</span> tx_9048a178bc</p>
                  <p><span className="text-white/40">DEBIT:</span> Customer Vault ($1,450.00)</p>
                  <p><span className="text-white/40">CREDIT:</span> Merchant Settlement ($1,450.00)</p>
                  <p><span className="text-white/40">HASH:</span> e3b0c44298fc1c149afbf4c8996fb92427ae</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Idempotent &amp; ACID compliant
              </span>
              <MagneticButton
                href="#contact"
                variant="ghost"
                className="!text-xs text-[var(--amber)] hover:text-white"
                ariaLabel="Inquire about FinTech architecture"
              >
                Inquire Stack →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 7: PULSEFLOW - SYNTHETIC WEB VITALS & A11Y SUITE
          ========================================================================= */}
          <div className={cardBaseStyle(6)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  {"//"} 07. CI/CD TOOLING • QUALITY ASSURANCE
                </span>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  95+ Lighthouse CI
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                PulseFlow: Synthetic Core Web Vitals &amp; WCAG AA Suite
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Automated continuous integration harness running headless
                Playwright and Lighthouse auditors. Verifies sub-1.8s LCP, zero
                Cumulative Layout Shift, and strict WCAG 2.1 AA/AAA accessibility
                compliance before code lands in production.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Node.js",
                  "Lighthouse CI",
                  "Playwright",
                  "WCAG 2.1 AA",
                  "GitHub Actions CI",
                  "Docker",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock CI Audit Scorecard */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/5">
                  <span className="text-white/60">CI BENCHMARK AUDIT</span>
                  <span className="text-emerald-400">PASSED ALL CHECKS</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded bg-white/[0.02]">
                    <span className="text-sm font-bold text-emerald-400 block">100</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Performance</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <span className="text-sm font-bold text-emerald-400 block">100</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Accessibility</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <span className="text-sm font-bold text-emerald-400 block">100</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Best Practices</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Zero performance regressions allowed
              </span>
              <MagneticButton
                href="#contact"
                variant="ghost"
                className="!text-xs text-[var(--cyan)] hover:text-white"
                ariaLabel="Inquire about PulseFlow"
              >
                Inquire Audits →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 8: HYPERGRAPH - DISTRIBUTED EDGE CACHE LAYER
          ========================================================================= */}
          <div className={cardBaseStyle(7)}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  {"//"} 08. CLOUD SYSTEMS • DISTRIBUTED EDGE
                </span>
                <span className="text-xs font-mono text-[var(--cyan)] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  0.8ms Latency
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                HyperGraph: Sub-Millisecond Distributed Edge Cache Layer
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Geographically distributed edge caching architecture built on
                Cloudflare Workers and replicated Redis KV clusters. Offloads 85%
                of relational database read load while delivering sub-millisecond
                cached JSON responses worldwide.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Cloudflare Workers",
                  "Redis Cluster",
                  "Edge KV",
                  "Geo-Replication",
                  "Stale-While-Revalidate",
                  "TypeScript",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--text)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mock Global Edge Latency Map */}
              <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/95 p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[var(--text-muted)] pb-2 border-b border-white/5">
                  <span className="text-[var(--violet)]">GLOBAL POP LATENCY</span>
                  <span className="text-emerald-400">85% DB OFFLOAD</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-white/[0.02]">
                    <span className="text-white font-bold block">0.6ms</span>
                    <span className="text-[10px] text-[var(--text-muted)]">IAD (US-East)</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <span className="text-white font-bold block">0.7ms</span>
                    <span className="text-[10px] text-[var(--text-muted)]">FRA (Europe)</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02]">
                    <span className="text-white font-bold block">1.1ms</span>
                    <span className="text-[10px] text-[var(--text-muted)]">SIN (Asia)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Scalable to 10M+ daily hits
              </span>
              <MagneticButton
                href="#contact"
                variant="ghost"
                className="!text-xs text-[var(--violet)] hover:text-white"
                ariaLabel="Inquire about edge caching"
              >
                Inquire Edge →
              </MagneticButton>
            </div>
          </div>

          {/* =========================================================================
              CARD 9: PARTNERSHIP & NEXT VENTURE (ACTION HUB)
          ========================================================================= */}
          <div className={cardBaseStyle(8)}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  {"//"} 09. NEXT VENTURE • PARTNERSHIP
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Booking Open
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Ready to Build Your High-Velocity MVP or Modernize Your Platform?
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                I partner with ambitious founders, startups, and companies as a
                senior solo full-stack engineer and technical architect. From zero
                to authenticated, database-backed, payment-integrated launch in 2
                to 4 weeks.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span>Turnaround Velocity</span>
                  <span className="text-[var(--cyan)]">2 - 4 Weeks</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span>Engagement Model</span>
                  <span className="text-white">Fixed-Scope MVP / Retainer</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span>Direct WhatsApp</span>
                  <a
                    href="https://wa.me/923127803616"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    +92 312 7803616
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton
                  href="#contact"
                  variant="primary"
                  className="w-full sm:w-auto justify-center !text-sm"
                  ariaLabel="Start a project conversation"
                >
                  Start a Project Conversation →
                </MagneticButton>
                <MagneticButton
                  href="/cv"
                  variant="secondary"
                  className="w-full sm:w-auto justify-center !text-sm"
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
