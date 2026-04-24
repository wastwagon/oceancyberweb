import type { Transition } from "framer-motion";

/** Viewport: trigger once when section enters, slightly before fully visible */
export const revealViewport = { once: true as const, margin: "-12% 0px" as const };

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const baseTransition: Transition = { duration: 0.65, ease };

/** Fade + lift - shared home sections below the hero */
export const fadeUpProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: baseTransition,
} as const;

export const fadeUpSoft = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: { duration: 0.55, ease } as Transition,
} as const;

export const fadeFromLeft = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: revealViewport,
  transition: { duration: 0.6, ease } as Transition,
} as const;

export const fadeFromRight = {
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: revealViewport,
  transition: { duration: 0.65, ease } as Transition,
} as const;

export function staggerDelay(index: number, step = 0.08): Transition {
  return { ...baseTransition, delay: index * step };
}
