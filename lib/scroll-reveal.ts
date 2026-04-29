import type { Transition } from "framer-motion";

/** Viewport: trigger once when section enters, slightly before fully visible */
export const revealViewport = { once: true as const, margin: "-12% 0px" as const };

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const baseTransition: Transition = { duration: 0.5, ease };

/** Fade + lift - shared home sections below the hero (subtle, not “flashy”) */
export const fadeUpProps = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: baseTransition,
} as const;

export const fadeUpSoft = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: { duration: 0.42, ease } as Transition,
} as const;

export const fadeFromLeft = {
  initial: { opacity: 0, x: -12 },
  whileInView: { opacity: 1, x: 0 },
  viewport: revealViewport,
  transition: { duration: 0.48, ease } as Transition,
} as const;

export const fadeFromRight = {
  initial: { opacity: 0, x: 12 },
  whileInView: { opacity: 1, x: 0 },
  viewport: revealViewport,
  transition: { duration: 0.48, ease } as Transition,
} as const;

export function staggerDelay(index: number, step = 0.06): Transition {
  return { ...baseTransition, delay: index * step };
}
