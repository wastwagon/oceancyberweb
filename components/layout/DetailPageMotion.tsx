"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Soft animated depth for portfolio / case study detail shells. */
export function DetailPageHeroAmbient() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(34,211,238,0.08)_0%,transparent_52%)]" />
      {!reduceMotion ? (
        <motion.div
          className="absolute -right-[10%] top-[6%] h-[48%] w-[58%] rounded-full opacity-[0.35]"
          style={{
            background:
              "radial-gradient(circle at 28% 38%, rgba(6,182,212,0.16) 0%, transparent 68%)",
            filter: "blur(68px)",
          }}
          animate={{
            opacity: [0.2, 0.36, 0.24, 0.32, 0.2],
            x: ["0%", "-4%", "2%"],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      {!reduceMotion ? (
        <motion.div
          className="absolute inset-y-[16%] -left-[42%] w-[92%] -skew-x-[10deg] opacity-[0.14]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(165,243,252,0.1) 50%, transparent 100%)",
          }}
          animate={{ x: ["-8%", "42%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}

export function DetailIntroMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
