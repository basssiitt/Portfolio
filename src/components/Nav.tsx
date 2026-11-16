"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#work" },
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "CV", href: "/cv" },
  { name: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05060A]/85 backdrop-blur-xl border-b border-[var(--glass-border)] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#05060A]/40 backdrop-blur-md border-b border-transparent py-5"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[var(--cyan)] rounded-lg p-1"
          aria-label="Abdul Basit Chandio — Home"
        >
          <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[var(--cyan)] transition-colors">
            Abdul Basit
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] group-hover:scale-150 transition-transform" />
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--text-muted)] font-mono hidden sm:inline-block">
            Claslo
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[var(--cyan)] focus-visible:outline-2 focus-visible:outline-[var(--cyan)] rounded px-1.5 py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <MagneticButton
            href="/#contact"
            variant="primary"
            className="text-xs tracking-wider uppercase font-semibold !px-5 !py-2.5"
            ariaLabel="Let's Talk - Jump to contact section"
          >
            Let&apos;s Talk
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative p-2 rounded-lg text-[var(--text)] hover:text-[var(--cyan)] focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[61px] bg-[#05060A]/95 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between p-6 overflow-y-auto"
        >
          <ul className="flex flex-col gap-5 pt-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl font-heading font-medium text-[var(--text)] hover:text-[var(--cyan)] transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-8 pb-6 flex flex-col gap-4">
            <MagneticButton
              href="/#contact"
              onClick={() => setIsOpen(false)}
              variant="primary"
              className="w-full text-center py-3.5 justify-center"
              ariaLabel="Let's Talk"
            >
              Let&apos;s Talk
            </MagneticButton>

            <p className="text-xs text-center text-[var(--text-muted)]">
              Founder &amp; CEO @ Claslo • Full Stack Developer
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
