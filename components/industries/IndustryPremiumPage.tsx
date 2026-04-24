"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

export type IndustryCard = { title: string; description: string };

export type IndustryStory = {
  title: string;
  client: string;
  result: string;
};

export type IndustryPageContent = {
  heroEyebrow: string;
  /** Plain text before the gradient span */
  heroPrefix: string;
  /** Gradient emphasis */
  heroHighlight: string;
  /** Plain text after the gradient span */
  heroSuffix: string;
  /** Default: gradient blue; use `white` for a solid headline word (e.g. Education, Healthcare, Retail). */
  heroHighlightTone?: "gradient" | "white";
  heroDescription: string;
  pills: string[];
  solutionsEyebrow: string;
  solutionsTitle: string;
  solutionsSubtitle: string;
  services: IndustryCard[];
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesSubtitle: string;
  technologies: IndustryCard[];
  storiesEyebrow: string;
  storiesTitle: string;
  storiesSubtitle: string;
  caseStudies: IndustryStory[];
  ctaTitle: string;
  ctaDescription: string;
};

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
            "radial-gradient(ellipse 100% 72% at 50% 0%, black 0%, transparent 76%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,52vh)] w-[min(100%,880px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.26)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

export function IndustryPremiumPage({ content }: { content: IndustryPageContent }) {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);
  const highlightTone = content.heroHighlightTone ?? "gradient";
  const highlightClassName =
    highlightTone === "white"
      ? "text-white"
      : "bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#00000a] text-white">
      <PageAmbient />

      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] pb-16 pt-28 md:pb-20 md:pt-36">
        <HeroSectionMotionLayers />
        <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
            >
              <Building2 className="h-3.5 w-3.5 text-blue-400" aria-hidden />
              {content.heroEyebrow}
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              {content.heroPrefix}
              <span className={highlightClassName}>{content.heroHighlight}</span>
              {content.heroSuffix}
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-400 md:text-lg"
            >
              {content.heroDescription}
            </motion.p>
            <motion.div
              variants={heroMotion.item}
              className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2 md:gap-3"
            >
              {content.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              {content.solutionsEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {content.solutionsTitle}
            </h2>
            <p className="mt-3 text-slate-400 md:text-base">
              {content.solutionsSubtitle}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {content.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#143296cc]/35 md:p-7"
              >
                <h3 className="text-base font-semibold text-white md:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              {content.capabilitiesEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {content.capabilitiesTitle}
            </h2>
            <p className="mt-3 text-slate-400 md:text-base">
              {content.capabilitiesSubtitle}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.05)}
                className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/15"
              >
                <span className="text-sm font-semibold text-white">{tech.title}</span>
                <span className="mt-1 text-xs leading-relaxed text-slate-500">
                  {tech.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              {content.storiesEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {content.storiesTitle}
            </h2>
            <p className="mt-3 text-slate-400 md:text-base">
              {content.storiesSubtitle}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {content.caseStudies.map((study, index) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.07)}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#143296cc]/40 md:p-7"
              >
                <h3 className="text-lg font-semibold text-white">{study.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {study.client}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {study.result}
                </p>
                <Link
                  href="/portfolio"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200"
                >
                  View work
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpProps}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-xl md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {content.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              {content.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/25 transition-all hover:brightness-110 sm:w-auto md:text-base"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto md:text-base"
              >
                View portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#00000a] via-transparent to-transparent"
        aria-hidden
      />
    </main>
  );
}
