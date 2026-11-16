"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.3;
    const deltaY = (clientY - centerY) * 0.3;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cyan)] cursor-pointer text-sm md:text-base select-none font-bold";

  const variantStyles: Record<string, { className: string; style?: React.CSSProperties }> = {
    primary: {
      className:
        "text-slate-950 font-bold px-7 py-3.5 shadow-[0_0_25px_rgba(0,229,255,0.45)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] hover:brightness-110 active:scale-95 border border-cyan-200/50",
      style: {
        background: "linear-gradient(135deg, #00E5FF 0%, #a78bfa 60%, #8B5CF6 100%)",
        color: "#05060A",
      },
    },
    secondary: {
      className:
        "text-white font-medium border border-white/20 bg-transparent hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 px-7 py-3.5",
    },
    ghost: {
      className:
        "text-[var(--text-muted)] hover:text-[var(--cyan)] px-4 py-2 hover:bg-white/[0.05] font-medium",
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const buttonContent = (
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  );

  const combinedClasses = `${baseStyles} ${currentVariant.className} ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      {href ? (
        href.startsWith("#") || href.startsWith("/") ? (
          <Link
            href={href}
            className={combinedClasses}
            style={currentVariant.style}
            aria-label={ariaLabel}
            target={target}
            rel={rel}
            onClick={onClick}
          >
            {buttonContent}
          </Link>
        ) : (
          <a
            href={href}
            className={combinedClasses}
            style={currentVariant.style}
            aria-label={ariaLabel}
            target={target ?? "_blank"}
            rel={rel ?? "noopener noreferrer"}
            onClick={onClick}
          >
            {buttonContent}
          </a>
        )
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={combinedClasses}
          style={currentVariant.style}
          aria-label={ariaLabel}
        >
          {buttonContent}
        </button>
      )}
    </motion.div>
  );
}
