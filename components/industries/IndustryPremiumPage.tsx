"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import {
  PremiumFinalCtaSection,
  PremiumStoriesGridSection,
} from "@/components/shared/PremiumContentSections";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

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

export function IndustryPremiumPage({ content }: { content: IndustryPageContent }) {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);
  const highlightTone = content.heroHighlightTone ?? "gradient";
  const highlightClassName =
    highlightTone === "white"
      ? "text-white"
      : "text-sa-primary";

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              {content.heroEyebrow}
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              {content.heroPrefix}
              <span className={highlightClassName}>{content.heroHighlight}</span>
              {content.heroSuffix}
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-6"
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
                  className="rounded-full border border-sa-border bg-sa-surface px-4 py-2 text-xs font-medium text-sa-muted"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="sa-eyebrow">
              {content.solutionsEyebrow}
            </p>
            <h2 className="sa-title mt-4">
              {content.solutionsTitle}
            </h2>
            <p className="sa-subtitle mx-auto">
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
                className="sa-card p-6 md:p-7"
              >
                <h3 className="font-heading text-lg font-bold text-white md:text-xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="sa-eyebrow">
              {content.capabilitiesEyebrow}
            </p>
            <h2 className="sa-title mt-4">
              {content.capabilitiesTitle}
            </h2>
            <p className="sa-subtitle mx-auto">
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
                className="sa-card px-5 py-4"
              >
                <span className="font-heading text-sm font-semibold text-white">{tech.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-sa-muted/70">
                  {tech.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PremiumStoriesGridSection
        eyebrow={content.storiesEyebrow}
        title={content.storiesTitle}
        subtitle={content.storiesSubtitle}
        stories={content.caseStudies}
      />

      <PremiumFinalCtaSection
        title={content.ctaTitle}
        description={content.ctaDescription}
      />

      <StartupAgencyMobileQuickBar />
    </main>
  );
}
