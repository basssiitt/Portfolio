"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function useScramble(
  targetText: string,
  autoStart = true,
  speed = 30
): { text: string; start: () => void; isDone: boolean } {
  const [displayText, setDisplayText] = useState(targetText);
  const [isDone, setIsDone] = useState(false);
  const frameRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  const start = useCallback(() => {
    // If reduced motion is preferred, jump straight to target
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayText(targetText);
      setIsDone(true);
      return;
    }

    setIsDone(false);
    iterationRef.current = 0;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > speed) {
        lastTime = time;

        const next = targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterationRef.current) {
              return targetText[index];
            }
            return DEFAULT_CHARS[
              Math.floor(Math.random() * DEFAULT_CHARS.length)
            ];
          })
          .join("");

        setDisplayText(next);

        if (iterationRef.current >= targetText.length) {
          setIsDone(true);
          return;
        }

        iterationRef.current += 1 / 3;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [targetText, speed]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [autoStart, start]);

  return { text: displayText, start, isDone };
}

/**
 * Scramble an HTML element's text directly (useful with GSAP or IntersectionObserver)
 */
export function scrambleElement(
  element: HTMLElement,
  finalText: string,
  options?: { chars?: string; speed?: number; onComplete?: () => void }
): () => void {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    element.innerText = finalText;
    options?.onComplete?.();
    return () => {};
  }

  const chars = options?.chars || DEFAULT_CHARS;
  const speed = options?.speed || 25;
  let iteration = 0;
  let animId: number;
  let lastTime = 0;

  const frame = (time: number) => {
    if (time - lastTime > speed) {
      lastTime = time;
      element.innerText = finalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration) return finalText[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= finalText.length) {
        element.innerText = finalText;
        options?.onComplete?.();
        return;
      }
      iteration += 1 / 3;
    }
    animId = requestAnimationFrame(frame);
  };

  animId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(animId);
}
