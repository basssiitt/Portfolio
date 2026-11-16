import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "amber" | "none";
  hoverEffect?: boolean;
  as?: "div" | "article" | "section" | "li";
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "cyan",
  hoverEffect = true,
  as: Component = "div",
}: GlassCardProps) {
  const glowStyles = {
    cyan: "hover:border-[var(--cyan)]/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.12)]",
    violet:
      "hover:border-[var(--violet)]/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]",
    amber:
      "hover:border-[var(--amber)]/40 hover:shadow-[0_0_25px_rgba(255,184,107,0.12)]",
    none: "",
  };

  const hoverClass = hoverEffect
    ? `transition-all duration-300 hover:-translate-y-1 ${glowStyles[glowColor]}`
    : "";

  return (
    <Component
      className={`relative overflow-hidden rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)] ${hoverClass} ${className}`}
    >
      {/* Subtle top-edge light highlight */}
      <div
        className="pointer-events-none absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      {children}
    </Component>
  );
}
