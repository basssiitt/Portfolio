"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

const contactLinks = [
  {
    name: "Email Directly",
    handle: "admin@claslo.com",
    href: "mailto:admin@claslo.com",
    label: "Send email directly to Abdul Basit Chandio",
    icon: (
      <svg className="w-5 h-5 text-[var(--cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    badge: "Fastest Response",
  },
  {
    name: "WhatsApp",
    handle: "+92 312 7803616",
    href: "https://wa.me/923127803616",
    label: "Chat with Abdul Basit Chandio on WhatsApp",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.585 1.761.884 2.789.885h.002c3.181 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.077-2.12-.51-1.817-.749-2.986-2.593-3.076-2.713-.09-.12-1.282-1.705-1.282-3.251 0-1.545.811-2.308 1.098-2.62.287-.312.628-.39.837-.39.21 0 .42.002.604.012.195.01.455-.074.712.544.267.643.91 2.226.989 2.388.08.162.133.351.026.566-.107.215-.161.348-.319.537-.158.188-.332.42-.475.564-.158.16-.324.333-.139.651.185.318.824 1.359 1.768 2.202 1.215 1.082 2.239 1.417 2.557 1.574.318.158.503.138.69-.078.188-.216.804-.937 1.019-1.258.215-.322.43-.268.724-.16.294.108 1.866.88 2.188 1.04.322.16.537.24.616.376.08.136.08.788-.064 1.193z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.526 3.662 1.442 5.177L2 22l4.98-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25a8.21 8.21 0 01-4.286-1.197l-.307-.183-3.18.834.849-3.1-.2-.318A8.225 8.225 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z" />
      </svg>
    ),
    badge: "Instant Chat",
  },
  {
    name: "Schedule a Call",
    handle: "calendly.com/abdulbasitchandio",
    href: "https://calendly.com",
    label: "Book a 20-minute intro call on Calendly",
    icon: (
      <svg className="w-5 h-5 text-[var(--violet)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: "15-20 Min Chat",
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/abdulbasitchandio",
    href: "https://linkedin.com",
    label: "Connect with Abdul Basit Chandio on LinkedIn",
    icon: (
      <svg className="w-5 h-5 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    badge: "Network",
  },
  {
    name: "GitHub",
    handle: "github.com/basssiit",
    href: "https://github.com/basssiit",
    label: "View open-source repositories on GitHub",
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    badge: "Code Repos",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "Client Project / MVP",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("admin@claslo.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="06 // LET'S TALK"
        title="Start a Conversation"
        description="Whether you have an upcoming SaaS MVP, require a technical co-founder / senior full-stack hire, or need performance & AI consulting—let's connect."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact methods & Direct channels */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glowColor="cyan" className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--cyan)] block mb-1">
                Direct Channels
              </span>
              <h3 className="font-heading text-2xl font-bold text-white">
                Get in Touch
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                I prioritize clarity and respond within 12 hours. Reach out
                directly via email, WhatsApp, or schedule a calendar call.
              </p>
            </div>

            <div className="space-y-3">
              {contactLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    item.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={item.label}
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-transparent border border-white/20 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-transparent border border-white/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[var(--cyan)] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-mono">
                        {item.handle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-transparent border border-white/20 text-[var(--text-muted)] group-hover:text-white">
                    {item.badge} ↗
                  </span>
                </a>
              ))}
            </div>

            {/* Quick clipboard copy */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Direct Email:
              </span>
              <button
                type="button"
                onClick={copyEmail}
                className="text-xs font-mono text-[var(--cyan)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] rounded p-1 cursor-pointer"
                aria-label="Copy contact email to clipboard"
              >
                {copied ? "✓ Copied: admin@claslo.com" : "Copy: admin@claslo.com"}
              </button>
            </div>
          </GlassCard>

          {/* Availability notice card */}
          <GlassCard glowColor="amber" className="p-6">
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 animate-pulse" />
              <div>
                <h4 className="text-sm font-heading font-semibold text-white">
                  Booking Status
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Currently accepting 1 new SaaS build for next month, plus
                  select technical advising / fractional engineering
                  engagements. WhatsApp or email for immediate response.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Interactive Message & Inquiry Form */}
        <div className="lg:col-span-7">
          <GlassCard glowColor="violet" className="p-6 sm:p-10">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
                  Thank you for reaching out, {formData.name || "there"}. I will
                  review your requirements and reply directly to{" "}
                  <span className="text-white font-mono">{formData.email}</span>{" "}
                  within 12 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-[var(--cyan)] font-mono hover:underline mt-4 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Send a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                    Fill out the form below, book on Calendly, or reach out on{" "}
                    <a
                      href="https://wa.me/923127803616"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline hover:text-emerald-300"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/30 focus:border-white/60 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm focus-visible:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/30 focus:border-white/60 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm focus-visible:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="interest"
                    className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2"
                  >
                    Engagement Type
                  </label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white text-sm focus:border-white/60 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus-visible:outline-none transition-all"
                  >
                    <option value="Client Project / MVP" className="bg-[#05060A] text-white">
                      Client Project / SaaS MVP Build
                    </option>
                    <option value="Recruiting / Senior Full Stack" className="bg-[#05060A] text-white">
                      Recruiting / Full-Stack Engineering Role
                    </option>
                    <option value="AI Integration" className="bg-[#05060A] text-white">
                      AI Chatbot / Vector RAG Integration
                    </option>
                    <option value="Performance & A11y Audit" className="bg-[#05060A] text-white">
                      Performance &amp; Accessibility (A11y) Overhaul
                    </option>
                    <option value="School / Education System" className="bg-[#05060A] text-white">
                      Custom School Management Setup (Claslo-grade)
                    </option>
                    <option value="General Technical Inquiry" className="bg-[#05060A] text-white">
                      General Technical Advisory
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2"
                  >
                    Project Details or Role Scope *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Briefly describe your goals, timeline, and tech stack expectations..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/30 focus:border-white/60 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm focus-visible:outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[var(--text-muted)]">
                    Fast response:{" "}
                    <a
                      href="https://wa.me/923127803616"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      WhatsApp +92 312 7803616
                    </a>
                  </p>

                  <MagneticButton
                    variant="primary"
                    className="w-full sm:w-auto !px-8 !py-3"
                    ariaLabel="Submit project inquiry"
                  >
                    Send Message →
                  </MagneticButton>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
