import type { Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Staggered hero motion that keeps LCP text visible from first paint.
 * Do not start from opacity: 0 — that delays LCP on marketing/commerce heroes.
 */
export function getPageHeroMotionVariants(
  reduceMotion?: boolean | null,
): { container: Variants; item: Variants } {
  if (reduceMotion) {
    return {
      container: {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.04, delayChildren: 0 },
        },
      },
      item: {
        hidden: { opacity: 1, y: 0 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.01 },
        },
      },
    };
  }

  return {
    container: {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.02 },
      },
    },
    item: {
      // Visible immediately for LCP; only lift on animate (layout shift risk is tiny vs opacity delay)
      hidden: { opacity: 1, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease },
      },
    },
  };
}
