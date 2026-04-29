"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function StartupAgencyProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[110] h-[3px] overflow-hidden bg-transparent"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left rounded-r-[10px] bg-sa-primary"
        style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
      />
    </div>
  );
}
