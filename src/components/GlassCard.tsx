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
  hoverEffect = true,
  as: Component = "div",
}: GlassCardProps) {
  const hoverClass = hoverEffect
    ? "transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    : "";

  return (
    <Component
      className={`relative overflow-hidden rounded-2xl bg-transparent border border-white/20 ${hoverClass} ${className}`}
    >
      {/* Subtle top-edge light highlight */}
      <div
        className="pointer-events-none absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden="true"
      />
      {children}
    </Component>
  );
}
