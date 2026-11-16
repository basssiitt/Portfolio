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
  isActive?: boolean;
}

function TiltCard({
  children,
  className = "",
  isActive = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      reducedMotion ||
      (typeof window !== "undefined" && window.innerWidth < 768) ||
      !cardRef.current
    )
      return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reducedMotion ? "none" : transform,
        transition: "transform 0.15s ease-out",
      }}
      className={`relative rounded-2xl bg-transparent border transition-all duration-300 ${
        isActive
          ? "border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          : "border-white/20 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      } ${className}`}
    >
      {/* Subtle top-edge light highlight */}
      <div
        className="pointer-events-none absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track || !sectionRef.current) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        animation: tween,
        scrub: 1,
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
      });
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  const cardContainerClass =
    "w-[85vw] sm:w-[480px] md:w-[560px] lg:w-[600px] h-[520px] max-h-[75vh] shrink-0 p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-transparent";

  return (
    <div id="work" className="relative">
      {/* Header bar that scrolls naturally before the pin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent border border-white/20 text-xs font-mono text-[var(--cyan)]">
              <span>Scroll horizontally</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned horizontal section */}
      <section
        ref={sectionRef}
        className="relative h-screen w-full flex items-center overflow-hidden bg-[#05060A]"
      >
        <div
          ref={trackRef}
          className="flex gap-6 pl-6 md:pl-24 w-max"
        >
          {/* =========================================================================
              CARD 1: CLASLO CORE OS (FLAGSHIP)
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 0}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-transparent border border-[var(--cyan)]/40 text-[var(--cyan)] font-mono text-[11px] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-ping" />
                    Flagship Venture
                  </span>
                  <span className="text-[11px] font-mono text-white px-2 py-0.5 rounded-full bg-transparent border border-white/20">
                    Solo Full-Stack
                  </span>
                </div>
                <a
                  href="https://claslo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-transparent border border-emerald-500/30 hover:underline"
                >
                  claslo.com ↗
                </a>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                Claslo: Multi-Tenant Educational Operating System
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Engineered from the ground up to replace fragmented paperwork and
                spreadsheets. Unifies student admissions, automated tuition invoicing,
                real-time attendance, and parent communication into one fast platform.
              </p>

              {/* Tech Stack Pills - 100% Transparent with White Outline */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Next.js 16",
                  "React 19",
                  "TypeScript",
                  "PostgreSQL",
                  "Prisma ORM",
                  "Tailwind",
                  "Vercel Edge",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Compact Dashboard Telemetry - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[11px] font-mono">
                  <span className="text-[var(--cyan)]">https://app.claslo.com</span>
                  <span className="text-emerald-400">● 99.98% SLA Active</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-sm font-bold text-white block">100%</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Solo-Built</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-sm font-bold text-[var(--cyan)] block">&lt; 1.8s</span>
                    <span className="text-[10px] text-[var(--text-muted)]">LCP Median</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-sm font-bold text-emerald-400 block">Automated</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Fee Invoicing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3.5 mt-3 border-t border-white/10">
              <MagneticButton
                href="/work/claslo"
                variant="primary"
                className="!text-xs !px-5 !py-2"
                ariaLabel="Read detailed Claslo case study"
              >
                Read Case Study →
              </MagneticButton>
              <a
                href="https://claslo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors px-3 py-1.5 rounded-lg"
              >
                <span>Visit claslo.com</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </TiltCard>

          {/* =========================================================================
              CARD 2: CLASLO MULTI-TENANT DATA ISOLATION & RLS
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 1}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  {"//"} 02. ARCHITECTURE • MULTI-TENANCY
                </span>
                <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-transparent border border-emerald-500/30">
                  Sub-10ms Routing
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                Zero-Bleed Cryptographic Tenant Isolation &amp; RBAC
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Enforces absolute data isolation across hundreds of school
                tenants on a shared PostgreSQL infrastructure. Uses Prisma client
                extensions and custom PostgreSQL Row-Level Security (RLS) policies
                injected at edge middleware.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "PostgreSQL RLS",
                  "Prisma Extensions",
                  "Edge Middleware",
                  "JWT Claims",
                  "Redis Routing",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact Middleware Inspector Visual - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 font-mono text-[11px] space-y-1">
                <div className="flex justify-between text-[var(--text-muted)] pb-1 border-b border-white/10">
                  <span className="text-[var(--violet)]">TENANT MIDDLEWARE INSPECTOR</span>
                  <span className="text-emerald-400">200 OK</span>
                </div>
                <div className="space-y-0.5 text-white/80">
                  <p><span className="text-white/40">HOST:</span> beacon-academy.claslo.com</p>
                  <p><span className="text-white/40">TENANT_ID:</span> <span className="text-[var(--cyan)]">tnt_89f02e88a1b</span></p>
                  <p><span className="text-white/40">RLS_POLICY:</span> Enforced (Row Isolation Active)</p>
                  <p><span className="text-white/40">LATENCY:</span> <span className="text-emerald-400">4.8ms</span></p>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
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
          </TiltCard>

          {/* =========================================================================
              CARD 3: CLASLO AUTOMATED BILLING & WHATSAPP ENGINE
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 2}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--amber)] font-semibold">
                  {"//"} 03. FINTECH ENGINE • BILLING
                </span>
                <span className="text-[11px] font-mono text-[var(--amber)] px-2 py-0.5 rounded bg-transparent border border-amber-500/30">
                  15% Leakage Saved
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                Automated Fee Invoicing &amp; WhatsApp Receipts
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                An event-driven billing pipeline that automatically generates
                custom fee vouchers, calculates family discounts, and dispatches
                digital PDF invoices directly to parents via automated WhatsApp &amp;
                SMS Webhooks.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "Node.js Cron",
                  "WhatsApp Cloud API",
                  "AWS S3 PDF Engine",
                  "Stripe / Cash Webhooks",
                  "Automated Ledger",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact Invoice Ledger Component - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pb-1 border-b border-white/10">
                  <span>BILLING LEDGER RUN</span>
                  <span className="text-emerald-400">100% DISPATCHED</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-[10px] text-[var(--text-muted)] block">Vouchers Created</span>
                    <span className="text-sm font-bold text-white font-mono">4,820 Monthly</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-[10px] text-[var(--text-muted)] block">WhatsApp Delivery</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">99.4% Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Eliminates manual paper vouchers
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
          </TiltCard>

          {/* =========================================================================
              CARD 4: CLASLO REAL-TIME WEBSOCKETS & MORNING SPIKE QUEUE
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 3}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  {"//"} 04. HIGH CONCURRENCY • WEBSOCKETS
                </span>
                <span className="text-[11px] font-mono text-[var(--cyan)] px-2 py-0.5 rounded bg-transparent border border-cyan-500/30">
                  Sub-100ms Sync
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                Morning Concurrency Queue &amp; Absence Alerts
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Engineered for the peak 8:00 AM rush when hundreds of teachers submit
                attendance simultaneously. Uses optimistic UI state, an asynchronous
                Redis write-behind buffer, and WebSockets to alert parents of absence
                within 45 seconds.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "WebSockets",
                  "Redis Streams",
                  "Optimistic Updates",
                  "Async Write-Behind",
                  "Server Actions",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact Sync Telemetry - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 space-y-1 font-mono text-[11px]">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-white/60">PEAK SPIKE BUFFER</span>
                  <span className="text-emerald-400">0 PACKETS LOST</span>
                </div>
                <div className="space-y-0.5 text-white/80">
                  <p><span className="text-white/40">CONCURRENCY:</span> 12,000+ marks / 15-min window</p>
                  <p><span className="text-white/40">QUEUE LATENCY:</span> <span className="text-[var(--cyan)]">18ms median</span></p>
                  <p><span className="text-white/40">PARENT PUSH:</span> Dispatched in &lt; 45s</p>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
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
          </TiltCard>

          {/* =========================================================================
              CARD 5: OMNIAI - ENTERPRISE RAG & AGENT ENGINE
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 4}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  {"//"} 05. APPLIED AI &amp; AGENTS • SAAS MVP
                </span>
                <span className="text-[11px] font-mono text-[var(--violet)] px-2 py-0.5 rounded bg-transparent border border-violet-500/30">
                  Hybrid Search
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                OmniAI: Autonomous Agent &amp; RAG Concierge
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Enterprise knowledge retrieval and autonomous agent orchestrator.
                Combines dense vector embeddings with sparse BM25 search and
                multi-step function calling to query databases and resolve complex
                business workflows in real time.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "Claude 3.5 / GPT-4o",
                  "pgvector",
                  "Pinecone",
                  "LangChain",
                  "Function Calling",
                  "Next.js App Router",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact Agent Reasoning Trace - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 font-mono text-[11px] space-y-1">
                <div className="flex justify-between text-[var(--text-muted)] pb-1 border-b border-white/10">
                  <span className="text-[var(--violet)]">AGENT REASONING TRACE</span>
                  <span>accuracy: 99.2%</span>
                </div>
                <div className="space-y-0.5 text-white/80">
                  <p><span className="text-white/40">1. INTENT:</span> Semantic SQL Query Extraction</p>
                  <p><span className="text-white/40">2. RAG RETRIEVAL:</span> 180ms hybrid vector top-k</p>
                  <p><span className="text-white/40">3. TOOL CALL:</span> execute_scoped_query()</p>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
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
          </TiltCard>

          {/* =========================================================================
              CARD 6: APEXPAY - HIGH-THROUGHPUT DOUBLE-ENTRY LEDGER
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 5}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--amber)] font-semibold">
                  {"//"} 06. FINTECH PLATFORM • ARCHITECTURAL MVP
                </span>
                <span className="text-[11px] font-mono text-[var(--amber)] px-2 py-0.5 rounded bg-transparent border border-amber-500/30">
                  Double-Entry
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                ApexPay: Double-Entry Ledger &amp; Payments Hub
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Fault-tolerant financial ledger with strict double-entry accounting
                guarantees. Implements cryptographic idempotent request keys,
                webhook retry backoff, and real-time balance invariants to prevent
                overdraft race conditions.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "TypeScript",
                  "Stripe Connect",
                  "Double-Entry SQL",
                  "Idempotency Keys",
                  "Redis BullMQ",
                  "Docker",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact Ledger Audit Log - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-[var(--text-muted)] pb-1 border-b border-white/10">
                  <span className="text-[var(--amber)]">IMMUTABLE LEDGER RECORD</span>
                  <span className="text-emerald-400">ZERO-SUM OK</span>
                </div>
                <div className="space-y-0.5 text-white/80">
                  <p><span className="text-white/40">TXN_ID:</span> tx_9048a178bc</p>
                  <p><span className="text-white/40">DEBIT:</span> Customer Vault ($1,450.00)</p>
                  <p><span className="text-white/40">CREDIT:</span> Settlement Pool ($1,450.00)</p>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
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
          </TiltCard>

          {/* =========================================================================
              CARD 7: PULSEFLOW - SYNTHETIC WEB VITALS & A11Y SUITE
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 6}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  {"//"} 07. CI/CD TOOLING • QUALITY
                </span>
                <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-transparent border border-emerald-500/30">
                  95+ Lighthouse
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                PulseFlow: Synthetic Core Web Vitals &amp; A11y Suite
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Automated continuous testing harness running headless Playwright and
                Lighthouse auditors. Verifies sub-1.8s LCP, zero Cumulative Layout
                Shift, and strict WCAG 2.1 AA/AAA accessibility compliance before code
                lands in production.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "Node.js",
                  "Lighthouse CI",
                  "Playwright",
                  "WCAG 2.1 AA",
                  "GitHub Actions",
                  "Docker",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact CI Audit Scorecard - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono pb-1 border-b border-white/10">
                  <span className="text-white/60">CI BENCHMARK AUDIT</span>
                  <span className="text-emerald-400">PASSED ALL CHECKS</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-sm font-bold text-emerald-400 block">100</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Performance</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-sm font-bold text-emerald-400 block">100</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Accessibility</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-sm font-bold text-emerald-400 block">100</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Best Practices</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
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
          </TiltCard>

          {/* =========================================================================
              CARD 8: HYPERGRAPH - DISTRIBUTED EDGE CACHE LAYER
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 7}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--violet)] font-semibold">
                  {"//"} 08. CLOUD SYSTEMS • EDGE
                </span>
                <span className="text-[11px] font-mono text-[var(--cyan)] px-2 py-0.5 rounded bg-transparent border border-cyan-500/30">
                  0.8ms Latency
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                HyperGraph: Sub-Millisecond Distributed Edge Cache
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Geographically distributed edge caching architecture built on
                Cloudflare Workers and replicated Redis KV clusters. Offloads 85% of
                relational database read load while delivering sub-millisecond cached
                JSON responses worldwide.
              </p>

              <div className="flex flex-wrap gap-1.5">
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
                    className="text-[11px] px-2.5 py-0.5 rounded bg-transparent border border-white/20 text-white font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Compact Global Edge Latency Map - Pure Transparent */}
              <div className="rounded-xl border border-white/20 bg-transparent p-3 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-[var(--text-muted)] pb-1 border-b border-white/10">
                  <span className="text-[var(--violet)]">GLOBAL POP LATENCY</span>
                  <span className="text-emerald-400">85% DB OFFLOAD</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-white font-bold block">0.6ms</span>
                    <span className="text-[10px] text-[var(--text-muted)]">IAD (US-East)</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-white font-bold block">0.7ms</span>
                    <span className="text-[10px] text-[var(--text-muted)]">FRA (Europe)</span>
                  </div>
                  <div className="p-1.5 rounded bg-transparent border border-white/10">
                    <span className="text-white font-bold block">1.1ms</span>
                    <span className="text-[10px] text-[var(--text-muted)]">SIN (Asia)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
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
          </TiltCard>

          {/* =========================================================================
              CARD 9: PARTNERSHIP & NEXT VENTURE (ACTION HUB)
          ========================================================================= */}
          <TiltCard
            isActive={activeCardIndex === 8}
            className={cardContainerClass}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  {"//"} 09. NEXT VENTURE • PARTNERSHIP
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-transparent border border-emerald-500/40 text-emerald-400 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Booking Open
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                Ready to Build Your High-Velocity MVP or AI Platform?
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                I partner with ambitious founders, startups, and companies as a
                senior solo full-stack engineer and technical architect. From zero
                to authenticated, database-backed, payment-integrated launch in 2
                to 4 weeks.
              </p>

              {/* Action box - Pure Transparent */}
              <div className="p-3 rounded-xl bg-transparent border border-white/20 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Turnaround Velocity</span>
                  <span className="text-[var(--cyan)]">2 - 4 Weeks</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Engagement Model</span>
                  <span className="text-white">Fixed-Scope MVP / Retainer</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
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

            <div className="pt-3.5 mt-3 border-t border-white/10 space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <MagneticButton
                  href="#contact"
                  variant="primary"
                  className="w-full sm:w-auto justify-center !text-xs !px-5 !py-2"
                  ariaLabel="Start a project conversation"
                >
                  Start Conversation →
                </MagneticButton>
                <MagneticButton
                  href="/cv"
                  variant="secondary"
                  className="w-full sm:w-auto justify-center !text-xs !px-5 !py-2"
                  ariaLabel="View CV and background"
                >
                  View Résumé / CV
                </MagneticButton>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
}
