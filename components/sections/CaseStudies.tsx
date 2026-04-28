"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpSoft,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

const CASE_STUDIES_STAR_SEED = 52;

function caseStudiesStarField() {
  return Array.from({ length: CASE_STUDIES_STAR_SEED }, (_, i) => {
    const a = i * 9301 + 49297;
    const left = (a % 1000) / 10;
    const top = ((a * 7) % 880) / 10;
    const size = 1 + (i % 3);
    const duration = 2.4 + (i % 6) * 0.35;
    const delay = ((i * 13) % 45) / 10;
    return { id: i, left, top, size, duration, delay };
  });
}

const caseStudiesStars = caseStudiesStarField();

/** Twinkling star field - hero only; static dim dots when reduced motion */
function CaseStudiesHeroStars() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,rgba(2,106,255,0.06)_0%,transparent_55%)]" />
      {caseStudiesStars.map((s) =>
        reduceMotion ? (
          <span
            key={s.id}
            className="absolute rounded-full bg-ocean-200/50 shadow-[0_0_4px_rgba(2,106,255,0.2)]"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
          />
        ) : (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-sky-300/90 shadow-[0_0_5px_rgba(2,106,255,0.35)]"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{
              opacity: [0.12, 0.95, 0.18, 0.65, 0.12],
              scale: [1, 1.35, 1, 1.15, 1],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
          />
        ),
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-transparent to-slate-100/80" />
    </div>
  );
}

export function CaseStudies() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <PageAmbient />

      <section
        id="case-studies"
        className="relative z-10 flex min-h-[64vh] flex-col justify-center overflow-hidden border-b border-slate-200/80 py-28 md:min-h-[70vh] md:py-36"
      >
        <CaseStudiesHeroStars />
        <HeroSectionMotionLayers tone="light" />
        <div className="container relative z-10 mx-auto max-w-6xl px-6 py-4 text-center md:px-8 md:py-6">
          <motion.div
            className="mx-auto max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-800 shadow-sm"
            >
              <Layers className="h-3.5 w-3.5 text-ocean-600" aria-hidden />
              Success stories
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
            >
              Case
              <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                studies
              </span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-600 md:text-lg"
            >
              Selected engagements across finance, commerce, legal, and
              associations, architecture, security, and product delivery in
              one narrative per project.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.07)}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-200/50 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-ocean-200/80 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ocean-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 md:flex-row md:items-stretch"
                >
                  <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-[44%] md:min-h-[260px]">
                    <Image
                      src={study.image}
                      alt={`${study.client}, ${study.title}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 38vw"
                      priority={index < 2}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-[0.12]`}
                      aria-hidden
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/15 to-transparent md:bg-gradient-to-r md:from-transparent md:via-slate-900/2 md:to-slate-900/4" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/25 bg-slate-900/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {study.category}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/20 px-3 py-1 font-mono text-[10px] font-medium text-slate-100 backdrop-blur-md">
                        {study.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between border-t border-slate-200/60 bg-white p-6 md:border-t-0 md:border-l md:border-slate-200/60 md:p-8 md:pl-7">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                        {study.client}
                      </p>
                      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                        {study.title}
                      </h2>
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600 md:line-clamp-5 md:text-[0.9375rem]">
                        {study.description}
                      </p>
                    </div>

                    <div className="mt-8 flex border-t border-slate-100 pt-6">
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ocean-700 transition-colors group-hover:text-ocean-900">
                        Read case study
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-slate-200/80 py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpSoft}
            className="rounded-[2rem] border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-10 text-center shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 backdrop-blur-sm md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Ready for your own story?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600 md:text-base">
              Share where you are today, and we&apos;ll propose scope, timeline, and
              a security-aware delivery plan.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98] md:text-base"
            >
              Start your project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
