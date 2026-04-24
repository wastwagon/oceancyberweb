import type { Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Staggered hero text - full motion vs reduced-motion (no lift). */
export function getPageHeroMotionVariants(
  reduceMotion?: boolean | null,
): { container: Variants; item: Variants } {
  if (reduceMotion) {
    return {
      container: {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05, delayChildren: 0 },
        },
      },
      item: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.22, ease },
        },
      },
    };
  }

  return {
    container: {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.11, delayChildren: 0.05 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 22 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.56, ease },
      },
    },
  };
}
