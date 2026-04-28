"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroMotionTone = "dark" | "light";

type Props = { tone?: HeroMotionTone };

/**
 * Extra depth inside a page hero band - sits under content (z-0).
 * Pairs with the site-wide grid/glow on `<main>` where present.
 */
export function HeroSectionMotionLayers({ tone = "dark" }: Props) {
  const reduceMotion = useReducedMotion();
  const light = tone === "light";

  if (reduceMotion) {
    return (
      <div
        className={
          light
            ? "pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(2,106,255,0.1)_0%,transparent_58%)]"
            : "pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(20,50,150,0.16)_0%,transparent_58%)]"
        }
        aria-hidden
      />
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-y-[12%] -left-[45%] w-[95%] -skew-x-[11deg] opacity-[0.22]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(191,219,254,0.1) 50%, transparent 100%)",
        }}
        animate={{ x: ["-8%", "52%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-[18%] top-[8%] h-[52%] w-[52%] rounded-full blur-[96px]"
        style={{
          background: light
            ? "radial-gradient(circle, rgba(2,106,255,0.1) 0%, transparent 72%)"
            : "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 72%)",
        }}
        animate={{
          opacity: [0.22, 0.42, 0.28, 0.38, 0.22],
          x: ["-4%", "4%", "-1%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className={
          light
            ? "absolute inset-0 bg-[radial-gradient(ellipse_92%_72%_at_50%_0%,transparent_50%,rgba(241,245,249,0.5)_100%)]"
            : "absolute inset-0 bg-[radial-gradient(ellipse_92%_72%_at_50%_0%,transparent_42%,rgba(0,0,10,0.28)_100%)]"
        }
      />
    </div>
  );
}
