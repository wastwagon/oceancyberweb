"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Content in the first screen stays visible in the HTML. Fading it in after
 * hydration keeps the viewport visually unfinished and inflates Speed Index.
 * Sections that start below the fold can still ease in.
 */
export function SaReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setAnimate(true);
  }, [reduceMotion]);

  if (!animate) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
