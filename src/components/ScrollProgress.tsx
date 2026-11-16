"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[95] pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #00E5FF 0%, #8B5CF6 50%, #FFB86B 100%)",
        boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
      }}
      aria-hidden="true"
    />
  );
}
