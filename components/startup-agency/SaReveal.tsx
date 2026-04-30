"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.62, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
