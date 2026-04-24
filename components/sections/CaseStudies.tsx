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
      className="pointer-events-none absolute inset-0 opacity-[0.2]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 50, 150, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 50, 150, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.26)_0%,transparent_72%)] blur-[88px]" />
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,rgba(20,50,150,0.08)_0%,transparent_55%)]" />
      {caseStudiesStars.map((s) =>
        reduceMotion ? (
          <span
            key={s.id}
            className="absolute rounded-full bg-white/25 shadow-[0_0_4px_rgba(147,197,253,0.35)]"
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
            className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(191,219,254,0.55)]"
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/25 via-transparent to-[#00000a]/70" />
    </div>
  );
}

export function CaseStudies() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#00000a] text-white">
      <PageAmbient />

      <section
        id="case-studies"
        className="relative z-10 flex min-h-[64vh] flex-col justify-center overflow-hidden border-b border-white/[0.06] py-28 md:min-h-[70vh] md:py-36"
      >
        <CaseStudiesHeroStars />
        <HeroSectionMotionLayers />
        <div className="container relative z-10 mx-auto max-w-6xl px-6 py-4 text-center md:px-8 md:py-6">
          <motion.div
            className="mx-auto max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
            >
              <Layers className="h-3.5 w-3.5 text-blue-400" aria-hidden />
              Success stories
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Case
              <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
                {" "}
                studies
              </span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-400 md:text-lg"
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
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#143296cc]/45 hover:shadow-xl hover:shadow-[#143296cc]/12 focus-visible:ring-2 focus-visible:ring-[#143296cc]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#00000a] md:flex-row md:items-stretch"
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
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00000a]/90 via-[#00000a]/25 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#00000a]/35 md:to-[#00000a]/88" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {study.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-[10px] font-medium text-slate-200 backdrop-blur-md">
                        {study.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8 md:pl-7">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                        {study.client}
                      </p>
                      <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
                        {study.title}
                      </h2>
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-400 md:line-clamp-5 md:text-[0.9375rem]">
                        {study.description}
                      </p>
                    </div>

                    <div className="mt-8 flex border-t border-white/[0.08] pt-6">
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-300 transition-colors group-hover:text-blue-200">
                        Read case study
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpSoft}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-xl md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Ready for your own story?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Share where you are today, and we&apos;ll propose scope, timeline, and
              a security-aware delivery plan.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/25 transition-all hover:brightness-110 active:scale-[0.98] md:text-base"
            >
              Start your project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#00000a] via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
