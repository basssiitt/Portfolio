"use client";

import Link from "next/link";
import MagneticButton from "./MagneticButton";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    ariaLabel: "Abdul Basit Chandio on GitHub",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    ariaLabel: "Abdul Basit Chandio on LinkedIn",
  },
  {
    name: "Calendly",
    href: "https://calendly.com",
    ariaLabel: "Book a call on Calendly",
  },
  {
    name: "Email",
    href: "mailto:contact@claslo.com",
    ariaLabel: "Send email to Abdul Basit Chandio",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--glass-border)] bg-[var(--bg-2)]/60 backdrop-blur-xl mt-24">
      {/* Decorative top accent glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-px bg-gradient-to-r from-transparent via-[var(--cyan)]/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Status */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block font-heading text-xl font-bold text-white hover:text-[var(--cyan)] transition-colors"
            >
              Abdul Basit Chandio
            </Link>
            <p className="text-[var(--text-muted)] text-sm max-w-md leading-relaxed">
              Founder &amp; CEO at{" "}
              <a
                href="https://claslo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cyan)] hover:underline"
              >
                Claslo
              </a>
              . Full Stack Developer building scalable web applications, AI
              integrations, and high-converting digital platforms for clients &amp;
              startups.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for select client projects &amp; full-stack roles</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
              <li>
                <Link
                  href="/#about"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#work"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/work/claslo"
                  className="hover:text-[var(--cyan)] transition-colors flex items-center gap-1.5"
                >
                  <span>Claslo Case Study</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[var(--cyan)]/10 text-[var(--cyan)] rounded border border-[var(--cyan)]/30">
                    Live
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/cv"
                  className="hover:text-[var(--cyan)] transition-colors"
                >
                  Curriculum Vitae (CV)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="hover:text-[var(--cyan)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs opacity-60">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            &copy; 2026 Abdul Basit Chandio. All rights
            reserved. Built with Next.js, React Three Fiber &amp; Tailwind.
          </p>

          <MagneticButton
            variant="ghost"
            onClick={scrollToTop}
            className="!text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1 !p-2"
            ariaLabel="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
