import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Claslo Case Study — Abdul Basit Chandio",
  description:
    "How Abdul Basit Chandio designed and engineered Claslo from scratch as Founder & Solo Full-Stack Engineer. An all-in-one school management platform.",
  openGraph: {
    title: "Claslo Case Study — Abdul Basit Chandio",
    description:
      "All-in-one educational platform engineered solo with Next.js, TypeScript, and PostgreSQL.",
  },
};

export default function ClasloCaseStudy() {
  return (
    <article className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button */}
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--cyan)] rounded p-1"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Selected Work</span>
        </Link>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="space-y-6 pb-12 border-b border-[var(--glass-border)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)] font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-ping" />
            Case Study
          </span>
          <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-transparent border border-emerald-500/40">
            Live at claslo.com
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)] px-3 py-1 rounded-full bg-transparent border border-white/20">
            2024 – Present
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          Claslo — All-in-One Multi-Tenant Educational Operating System
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-3xl">
          Architected, designed, and solo-engineered from a blank canvas to an
          active production platform. Unifying student records, automated fee
          billing, real-time attendance, and parent communication for modern
          schools.
        </p>

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-transparent border border-white/20">
            <span className="block text-xs font-mono text-[var(--text-muted)] uppercase">
              Role
            </span>
            <span className="text-sm font-semibold text-white mt-1 block">
              Founder &amp; Solo Full-Stack
            </span>
          </div>

          <div className="p-4 rounded-xl bg-transparent border border-white/20">
            <span className="block text-xs font-mono text-[var(--text-muted)] uppercase">
              Core Stack
            </span>
            <span className="text-sm font-semibold text-[var(--cyan)] mt-1 block">
              Next.js, TS, PostgreSQL
            </span>
          </div>

          <div className="p-4 rounded-xl bg-transparent border border-white/20">
            <span className="block text-xs font-mono text-[var(--text-muted)] uppercase">
              Architecture
            </span>
            <span className="text-sm font-semibold text-[var(--violet)] mt-1 block">
              Multi-Tenant SaaS
            </span>
          </div>

          <div className="p-4 rounded-xl bg-transparent border border-white/20">
            <span className="block text-xs font-mono text-[var(--text-muted)] uppercase">
              Live Product
            </span>
            <a
              href="https://claslo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-400 hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>claslo.com</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* CASE STUDY CONTENT BODY */}
      <div className="py-12 space-y-16">
        {/* 2. THE PROBLEM */}
        <section aria-labelledby="problem-heading" className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--cyan)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            <span>01 // The Problem</span>
          </div>
          <h2
            id="problem-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
          >
            Fragmented Systems, Manual Spreadsheets &amp; Revenue Leakage
          </h2>
          <div className="prose prose-invert max-w-none text-[var(--text-muted)] text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              Traditional private schools and educational academies frequently
              rely on disconnected software tools or literal paper ledgers. Student
              admissions live in Excel sheets, fee vouchers are stamped by hand,
              and attendance is recorded on paper registers that never sync with
              parents until end-of-term reports.
            </p>
            <p>
              This operational friction leads to three catastrophic bottlenecks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <GlassCard glowColor="amber" className="p-6">
              <h3 className="font-heading font-semibold text-white mb-2 text-base">
                1. Uncollected Tuition
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Up to 15% of monthly school dues went unpaid due to manual billing
                delays and zero automated parent reminders.
              </p>
            </GlassCard>

            <GlassCard glowColor="amber" className="p-6">
              <h3 className="font-heading font-semibold text-white mb-2 text-base">
                2. Teacher Admin Burnout
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Educators were spending 6+ hours per week copying attendance and
                calculating exam percentiles manually.
              </p>
            </GlassCard>

            <GlassCard glowColor="amber" className="p-6">
              <h3 className="font-heading font-semibold text-white mb-2 text-base">
                3. Total Data Fragmentation
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Principals lacked any real-time snapshot of enrollment trends,
                daily attendance anomalies, or financial solvency.
              </p>
            </GlassCard>
          </div>

          {/* TODO Comment */}
          <div className="p-4 rounded-xl bg-transparent border border-dashed border-white/20 text-xs font-mono text-[var(--text-muted)]">
            {/* TODO: Add survey charts or baseline quote from school administrators */}
            <span className="text-[var(--cyan)] font-bold">TODO:</span> Include
            quantitative survey metrics collected from initial pilot academies.
          </div>
        </section>

        {/* 3. THE SOLUTION */}
        <section aria-labelledby="solution-heading" className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--violet)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)]" />
            <span>02 // The Solution</span>
          </div>
          <h2
            id="solution-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
          >
            Claslo: A Unified Multi-Tenant Cloud Operating System
          </h2>
          <div className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              I engineered Claslo as a single web application with isolated
              multi-tenant workspaces. Every school receives its own branded
              subdomain or tenant context, providing custom role access for
              Directors, Teachers, Students, and Parents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <GlassCard glowColor="cyan" className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                <h3 className="font-heading font-bold text-white text-base">
                  Automated Fee &amp; Invoicing Engine
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Generates scheduled digital fee vouchers with dynamic discounts,
                scholarships, and late fees. Triggers automated WhatsApp/SMS
                alerts directly to parents upon payment clearance.
              </p>
            </GlassCard>

            <GlassCard glowColor="violet" className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--violet)]" />
                <h3 className="font-heading font-bold text-white text-base">
                  Instant Attendance &amp; Anomaly Detection
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                One-tap mobile attendance for teachers with offline queueing. If a
                student is marked absent, parents receive an instant notification
                within 60 seconds.
              </p>
            </GlassCard>

            <GlassCard glowColor="cyan" className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                <h3 className="font-heading font-bold text-white text-base">
                  Dynamic Gradebooks &amp; Report Cards
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Automated grade weighting, GPA conversions, and rank
                distributions. Generates beautiful, print-ready PDF transcripts
                with custom school branding at the click of a button.
              </p>
            </GlassCard>

            <GlassCard glowColor="violet" className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--violet)]" />
                <h3 className="font-heading font-bold text-white text-base">
                  Executive Analytics Dashboard
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Real-time charts depicting enrollment retention, overdue
                receivables, teacher-student ratios, and classroom capacities in
                a single high-level dashboard.
              </p>
            </GlassCard>
          </div>

          {/* TODO Comment */}
          <div className="p-4 rounded-xl bg-transparent border border-dashed border-white/20 text-xs font-mono text-[var(--text-muted)]">
            {/* TODO: Embed screenshot gallery or interactive UI walkthrough */}
            <span className="text-[var(--cyan)] font-bold">TODO:</span> Embed
            high-resolution UI screenshots of Claslo&apos;s billing and gradebook
            modules.
          </div>
        </section>

        {/* 4. MY ROLE (SOLO FULL-STACK) */}
        <section aria-labelledby="role-heading" className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--amber)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" />
            <span>03 // My Role</span>
          </div>
          <h2
            id="role-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
          >
            Solo Full-Stack Engineer &amp; Founder
          </h2>
          <div className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              I handled 100% of the project across every domain: product strategy,
              Figma design systems, relational schema design, backend business
              logic, frontend component engineering, accessibility compliance, and
              production infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-transparent border border-white/20 space-y-2">
              <h3 className="font-heading font-semibold text-white text-sm">
                Product &amp; Systems Architecture
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Modeled relational data structures with strict foreign key
                integrity and multi-tenant partitioning in PostgreSQL via Prisma.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-transparent border border-white/20 space-y-2">
              <h3 className="font-heading font-semibold text-white text-sm">
                Modern Frontend Engineering
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Leveraged Next.js App Router and React Server Components to ship
                minimal client JavaScript, ensuring instantaneous page loads even
                on low-bandwidth devices.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-transparent border border-white/20 space-y-2">
              <h3 className="font-heading font-semibold text-white text-sm">
                Security &amp; RBAC Auth
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Implemented fine-grained permissions, encrypted session cookies,
                CSRF protection, and strict tenant isolation to guarantee student
                privacy.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-transparent border border-white/20 space-y-2">
              <h3 className="font-heading font-semibold text-white text-sm">
                Operations &amp; Customer Success
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Conducted in-person onboarding workshops with school principals,
                iterating on features based on daily live user feedback.
              </p>
            </div>
          </div>
        </section>

        {/* 5. TECH STACK */}
        <section aria-labelledby="stack-heading" className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--cyan)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
            <span>04 // Technical Stack</span>
          </div>
          <h2
            id="stack-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
          >
            Built for Extreme Speed, Reliability &amp; Maintainability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <GlassCard glowColor="cyan" className="p-5">
              <span className="text-[11px] font-mono text-[var(--cyan)] uppercase">
                Frontend
              </span>
              <ul className="mt-3 space-y-1.5 text-xs text-white font-medium">
                <li>• Next.js App Router</li>
                <li>• React 19</li>
                <li>• TypeScript (Strict)</li>
                <li>• Tailwind CSS v4</li>
                <li>• Framer Motion</li>
              </ul>
            </GlassCard>

            <GlassCard glowColor="violet" className="p-5">
              <span className="text-[11px] font-mono text-[var(--violet)] uppercase">
                Backend
              </span>
              <ul className="mt-3 space-y-1.5 text-xs text-white font-medium">
                <li>• Next.js Server Actions</li>
                <li>• Route Handlers</li>
                <li>• Node.js runtime</li>
                <li>• Prisma ORM</li>
                <li>• Zod validation</li>
              </ul>
            </GlassCard>

            <GlassCard glowColor="amber" className="p-5">
              <span className="text-[11px] font-mono text-[var(--amber)] uppercase">
                Database &amp; Storage
              </span>
              <ul className="mt-3 space-y-1.5 text-xs text-white font-medium">
                <li>• PostgreSQL</li>
                <li>• Connection pooling</li>
                <li>• Redis caching</li>
                <li>• S3 Object Storage</li>
                <li>• Automated backups</li>
              </ul>
            </GlassCard>

            <GlassCard glowColor="cyan" className="p-5">
              <span className="text-[11px] font-mono text-[var(--cyan)] uppercase">
                Infra &amp; Auth
              </span>
              <ul className="mt-3 space-y-1.5 text-xs text-white font-medium">
                <li>• Vercel Edge Network</li>
                <li>• NextAuth (RBAC)</li>
                <li>• Cloudflare DNS &amp; WAF</li>
                <li>• Resend Email API</li>
                <li>• GitHub Actions CI/CD</li>
              </ul>
            </GlassCard>
          </div>
        </section>

        {/* 6. CHALLENGES & ENGINEERING SOLUTIONS */}
        <section aria-labelledby="challenges-heading" className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--violet)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)]" />
            <span>05 // Technical Challenges</span>
          </div>
          <h2
            id="challenges-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
          >
            Engineering Hurdles Overcome
          </h2>

          <div className="space-y-4 pt-2">
            <GlassCard glowColor="none" className="p-6">
              <h3 className="font-heading font-bold text-white text-base mb-1">
                Challenge 1: Zero Data Bleed Between Competing School Tenants
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                <strong className="text-white">Solution:</strong> Enforced
                tenant isolation at both middleware routing and Prisma query
                extensions. Every database operation automatically binds the
                verified tenant ID extracted from cryptographically signed
                session tokens.
              </p>
            </GlassCard>

            <GlassCard glowColor="none" className="p-6">
              <h3 className="font-heading font-bold text-white text-base mb-1">
                Challenge 2: 8:00 AM Morning Attendance Spikes
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                <strong className="text-white">Solution:</strong> Over 90% of
                teachers mark attendance within the same 15-minute morning
                window. I designed an asynchronous batching queue and optimistic
                UI updates that store marks locally before synchronizing in
                background workers, preventing database lockups.
              </p>
            </GlassCard>

            <GlassCard glowColor="none" className="p-6">
              <h3 className="font-heading font-bold text-white text-base mb-1">
                Challenge 3: High Latency &amp; Spotty Rural Internet
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                <strong className="text-white">Solution:</strong> Optimized
                assets and serialized payloads, keeping initial JS bundle sizes
                under 75KB. Implemented offline-first service worker caching for
                critical daily workflows.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* 7. OUTCOME & METRICS */}
        <section aria-labelledby="outcome-heading" className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>06 // Outcome &amp; Impact</span>
          </div>
          <h2
            id="outcome-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-white"
          >
            Live Production Platform at Claslo.com
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-transparent border border-white/20 text-center">
              <span className="block text-3xl sm:text-4xl font-heading font-bold text-white">
                99.98%
              </span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1 block">
                Uptime SLA
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-transparent border border-white/20 text-center">
              <span className="block text-3xl sm:text-4xl font-heading font-bold text-[var(--cyan)]">
                &lt; 1.8s
              </span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1 block">
                LCP Load Time
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-transparent border border-white/20 text-center">
              <span className="block text-3xl sm:text-4xl font-heading font-bold text-[var(--violet)]">
                85%
              </span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1 block">
                Admin Time Saved
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-transparent border border-white/20 text-center">
              <span className="block text-3xl sm:text-4xl font-heading font-bold text-emerald-400">
                0
              </span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1 block">
                Security Incidents
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-transparent border border-white/20 space-y-3">
            <h3 className="font-heading font-semibold text-white text-base">
              Client &amp; Operational Takeaway
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Claslo proves the advantage of a founder-engineer who can turn
              ambitious vision into bulletproof production software without
              bloated agency teams. The platform remains actively supported and
              scaling.
            </p>
          </div>

          {/* TODO Comment */}
          <div className="p-4 rounded-xl bg-transparent border border-dashed border-white/20 text-xs font-mono text-[var(--text-muted)]">
            {/* TODO: Add featured video demo or customer testimonial quote */}
            <span className="text-[var(--cyan)] font-bold">TODO:</span> Insert
            testimonial quote from partner school principal and 60-second video
            tour.
          </div>
        </section>

        {/* CTA BOTTOM BAR */}
        <div className="pt-12 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Interested in similar architecture for your venture?
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Let&apos;s build your SaaS MVP or enterprise web platform together.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="/#contact"
              variant="primary"
              ariaLabel="Get in touch regarding a new project"
            >
              Let&apos;s Talk →
            </MagneticButton>
            <MagneticButton
              href="/#work"
              variant="secondary"
              ariaLabel="Return to all projects"
            >
              All Projects
            </MagneticButton>
          </div>
        </div>
      </div>
    </article>
  );
}
