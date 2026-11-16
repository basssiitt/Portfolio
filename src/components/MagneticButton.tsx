"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
  }, []);

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
    "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cyan)] cursor-pointer text-sm md:text-base select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] text-[#05060A] font-semibold shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.45)] hover:brightness-110 px-6 py-3",
    secondary:
      "bg-[var(--glass)] text-[var(--text)] border border-[var(--glass-border)] backdrop-blur-md hover:border-[var(--cyan)] hover:bg-white/[0.08] hover:text-white px-6 py-3",
    ghost:
      "text-[var(--text-muted)] hover:text-[var(--cyan)] px-4 py-2 hover:bg-white/[0.04]",
  };

  const buttonContent = (
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  );

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

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
          aria-label={ariaLabel}
        >
          {buttonContent}
        </button>
      )}
    </motion.div>
  );
}
