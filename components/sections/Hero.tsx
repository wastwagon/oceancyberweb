"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { HeroDomainBlock } from "@/components/sections/HeroDomainBlock";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";

const GRID_SIZE = 64;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const heroText = getPageHeroMotionVariants(reduceMotion);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pb-24 pt-10">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          maskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
        }}
      />

      {!reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(2, 106, 255, 0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(2, 106, 255, 0.28) 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            maskImage: "radial-gradient(circle at 50% 40%, black 25%, transparent 75%)",
          }}
          aria-hidden
        />
      )}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sky-200/50 blur-[150px]" />
      </div>

      <motion.div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          className="mx-auto w-full max-w-5xl text-center"
          initial="hidden"
          animate="visible"
          variants={heroText.container}
        >
          <motion.span
            variants={heroText.item}
            className="mb-8 inline-block rounded-full border border-ocean-200 bg-ocean-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ocean-800 backdrop-blur-md"
          >
            Trusted digital delivery partner in Ghana
          </motion.span>

          <motion.h1
            variants={heroText.item}
            className="mb-6 text-balance text-center text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-7xl"
          >
            Build Reliable Websites & <br />
            <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
              Mobile Apps
            </span>
          </motion.h1>

          <motion.p
            variants={heroText.item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            We design, build, and support modern products with clear milestones,
            fast communication, and dependable delivery standards.
          </motion.p>

          <motion.div
            variants={heroText.item}
            className="mt-10 flex w-full max-w-4xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="min-h-[48px] w-full min-w-[240px] rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 py-4 font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98]">
                Start your project
              </button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <button className="min-h-[48px] w-full min-w-[220px] rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition-colors hover:border-slate-400">
                View our work
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={heroText.item}
            className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-600"
          >
            <span>Clear project roadmap</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
            <span>Weekly progress updates</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
            <span>Post-launch support</span>
          </motion.div>

          <HeroDomainBlock />
        </motion.div>
      </motion.div>

    </section>
  );
}
