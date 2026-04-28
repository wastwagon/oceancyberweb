"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import {
  PremiumFinalCtaSection,
  PremiumStoriesGridSection,
} from "@/components/shared/PremiumContentSections";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

export type ServiceCard = { title: string; description: string };

export type ServiceStory = {
  title: string;
  client: string;
  result: string;
};

export type ServicePageContent = {
  heroEyebrow: string;
  heroPrefix: string;
  heroHighlight: string;
  heroSuffix: string;
  /** Default: gradient blue; use `white` for a solid headline (e.g. service names). */
  heroHighlightTone?: "gradient" | "white";
  heroDescription: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  pills: string[];
  focusEyebrow: string;
  focusTitle: string;
  focusSubtitle: string;
  focusAreas: ServiceCard[];
  stackEyebrow: string;
  stackTitle: string;
  stackSubtitle: string;
  stack: ServiceCard[];
  deliverEyebrow: string;
  deliverTitle: string;
  deliverSubtitle: string;
  deliverables: ServiceCard[];
  outcomesEyebrow?: string;
  outcomesTitle?: string;
  outcomesSubtitle?: string;
  outcomes?: ServiceStory[];
  ctaTitle: string;
  ctaDescription: string;
};

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
            "radial-gradient(ellipse 100% 72% at 50% 0%, black 0%, transparent 76%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,52vh)] w-[min(100%,880px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

export function ServicePremiumPage({ content }: { content: ServicePageContent }) {
  const hasOutcomes = content.outcomes && content.outcomes.length > 0;
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);
  const highlightTone = content.heroHighlightTone ?? "gradient";
  const highlightClassName =
    highlightTone === "white"
      ? "text-slate-900"
      : "bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <PageAmbient />

      <section className="relative z-10 overflow-hidden border-b border-slate-200/80 pb-16 pt-28 md:pb-20 md:pt-36">
        <HeroSectionMotionLayers tone="light" />
        <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-800 shadow-sm"
            >
              <Briefcase className="h-3.5 w-3.5 text-ocean-600" aria-hidden />
              {content.heroEyebrow}
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
            >
              {content.heroPrefix}
              <span className={highlightClassName}>{content.heroHighlight}</span>
              {content.heroSuffix}
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-600 md:text-lg"
            >
              {content.heroDescription}
            </motion.p>
            <motion.div
              variants={heroMotion.item}
              className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {content.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-slate-200/90 bg-white px-4 py-2 text-xs font-medium text-slate-700"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={heroMotion.item} className="mt-10">
              <Link
                href={content.heroCtaHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98] md:text-base"
              >
                {content.heroCtaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-slate-200/80 py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ocean-600">
              {content.focusEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {content.focusTitle}
            </h2>
            <p className="mt-3 text-slate-600 md:text-base">{content.focusSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {content.focusAreas.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-200/50 transition-colors hover:border-ocean-200/80 hover:shadow-md md:p-7"
              >
                <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-slate-200/80 py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ocean-600">
              {content.stackEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {content.stackTitle}
            </h2>
            <p className="mt-3 text-slate-600 md:text-base">{content.stackSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.stack.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.05)}
                className="flex flex-col rounded-xl border border-slate-200/90 bg-slate-50/80 px-5 py-4 transition-colors hover:border-ocean-200/70"
              >
                <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                <span className="mt-1 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-slate-200/80 py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ocean-600">
              {content.deliverEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {content.deliverTitle}
            </h2>
            <p className="mt-3 text-slate-600 md:text-base">{content.deliverSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {content.deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-200/50 transition-colors hover:border-ocean-200/80 hover:shadow-md md:p-7"
              >
                <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {hasOutcomes ? (
        <PremiumStoriesGridSection
          eyebrow={content.outcomesEyebrow!}
          title={content.outcomesTitle!}
          subtitle={content.outcomesSubtitle!}
          stories={content.outcomes!}
        />
      ) : null}

      <PremiumFinalCtaSection
        title={content.ctaTitle}
        description={content.ctaDescription}
      />
    </main>
  );
}
