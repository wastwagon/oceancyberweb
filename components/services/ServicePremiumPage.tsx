"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
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
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { ServicePageHeroBanner } from "@/components/services/ServicePageHeroBanner";

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
  heroHighlightTone?: "gradient" | "white";
  heroDescription: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroImage?: string;
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

import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";

export function ServicePremiumPage({ content }: { content: ServicePageContent }) {
  const hasOutcomes = content.outcomes && content.outcomes.length > 0;
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />

      <section className="relative z-10 min-h-[72vh] overflow-hidden border-b border-sa-border pt-28 md:min-h-[78vh] md:pt-36">
        {content.heroImage ? (
          <ServicePageHeroBanner image={content.heroImage} />
        ) : null}
        <div className="sa-container relative z-10 flex min-h-[calc(72vh-7rem)] flex-col items-center justify-center pb-16 text-center md:min-h-[calc(78vh-9rem)] md:pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" aria-hidden />
              {content.heroEyebrow}
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title-lg mx-auto max-w-4xl text-balance"
            >
              {content.heroPrefix}
              <span className="text-sa-primary">{content.heroHighlight}</span>
              {content.heroSuffix}
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-lead mx-auto mt-3"
            >
              {content.heroDescription}
            </motion.p>
            <motion.div
              variants={heroMotion.item}
              className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {content.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-sa-border bg-sa-surface px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/80"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={heroMotion.item} className="mt-12">
              <Link
                href={content.heroCtaHref}
                className="sa-btn-primary"
              >
                {content.heroCtaLabel}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mb-14">
            <SaSectionHeader
              eyebrow={content.focusEyebrow}
              title={content.focusTitle}
              subtitle={content.focusSubtitle}
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.focusAreas.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="sa-card p-8 md:p-10"
              >
                <h3 className="sa-card-title">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mb-14">
            <SaSectionHeader
              eyebrow={content.stackEyebrow}
              title={content.stackTitle}
              subtitle={content.stackSubtitle}
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.stack.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.05)}
                className="sa-card flex flex-col p-6"
              >
                <span className="font-heading text-sm font-bold text-white">{item.title}</span>
                <span className="mt-2 text-xs leading-relaxed text-sa-muted/70">
                  {item.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mb-14">
            <SaSectionHeader
              eyebrow={content.deliverEyebrow}
              title={content.deliverTitle}
              subtitle={content.deliverSubtitle}
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="sa-card p-8 md:p-10"
              >
                <h3 className="sa-card-title">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
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
      
      <StartupAgencyMobileQuickBar />
    </main>
  );
}
