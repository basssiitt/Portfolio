"use client";

import { useRef, useEffect, useState } from "react";
import { scrambleElement } from "@/lib/scramble";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [hasScrambled, setHasScrambled] = useState(false);

  useEffect(() => {
    if (!headingRef.current || hasScrambled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && headingRef.current && !hasScrambled) {
            setHasScrambled(true);
            scrambleElement(headingRef.current, title, { speed: 30 });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, [title, hasScrambled]);

  return (
    <div
      className={`mb-12 ${
        align === "center" ? "text-center mx-auto" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--cyan)] mb-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        ref={headingRef}
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
