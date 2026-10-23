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
import { ServicePageHeroBanner } from "@/components/services/ServicePageHeroBanner";
import { CompanyFactsBox } from "@/components/marketing/CompanyFactsBox";
import { ServiceOwnershipSection } from "@/components/services/ServiceOwnershipSection";
import { ServicePricingStrip } from "@/components/services/ServicePricingStrip";
import { StartupAgencyFaq } from "@/components/startup-agency/StartupAgencyFaq";
import { getServiceHubFaqs } from "@/lib/seo/service-hub-faqs";
import type { ServicePricingStripContent } from "@/lib/startup-agency/pricing";

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
  /** Geo hire page that owns “Best … company in Accra” — capability pages must not compete. */
  hireGeoHref?: string;
  hireGeoLabel?: string;
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
  pricing?: ServicePricingStripContent;
  /** Show compact at-a-glance fact box after hero pills */
  showAtAGlance?: boolean;
  /** Show standard ownership / IP block before final CTA */
  showOwnership?: boolean;
  /** Optional compliance note (e.g. cybersecurity licence status). */
  regulatoryNote?: string | null;
  /** Renders matching on-page + JSON-LD FAQs from service-hub-faqs. */
  serviceHubPath?: string;
};

import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";

/**
 * Capability hub layout (10 blocks): hero → pills → facts → focus → pricing → stack →
 * deliverables → outcomes (optional) → FAQ → ownership → CTA.
 */
export function ServicePremiumPage({ content }: { content: ServicePageContent }) {
  const hasOutcomes = content.outcomes && content.outcomes.length > 0;
  const hubFaqs = content.serviceHubPath
    ? getServiceHubFaqs(content.serviceHubPath)
    : undefined;
  const faqItems = hubFaqs?.map((item) => ({ q: item.q, a: item.a }));
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />

      <section className="sa-page-hero">
        {content.heroImage ? (
          <ServicePageHeroBanner image={content.heroImage} />
        ) : null}
        <div className="sa-page-hero-body">
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
            <motion.div variants={heroMotion.item} className="mt-10 flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-none">
              <Link
                href={content.heroCtaHref}
                className="sa-btn-primary flex w-full sm:inline-flex sm:w-auto"
              >
                {content.heroCtaLabel}
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {content.pricing ? (
                  <Link
                    href="/pricing"
                    className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
                  >
                    View pricing
                  </Link>
                ) : null}
                {content.hireGeoHref && content.hireGeoLabel ? (
                  <Link
                    href={content.hireGeoHref}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
                  >
                    {content.hireGeoLabel}
                  </Link>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {content.regulatoryNote ? (
        <div className="relative z-10 border-b border-sa-border bg-sa-surface/30">
          <div className="sa-container py-5">
            <p className="text-center text-sm leading-relaxed text-sa-muted/90">
              {content.regulatoryNote}
            </p>
          </div>
        </div>
      ) : null}

      {content.pills.length > 0 ? (
        <div className="relative z-10 border-b border-sa-border py-6 md:py-8">
          <div className="sa-container">
            <div className="sa-chip-scroller justify-start sm:justify-center">
              {content.pills.map((pill) => (
                <span key={pill} className="sa-chip">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {content.showAtAGlance ? (
        <section className="sa-section relative z-10 border-b border-sa-border py-10 md:py-12">
          <div className="sa-container max-w-3xl">
            <CompanyFactsBox maxRows={8} />
          </div>
        </section>
      ) : null}

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
                className="sa-card sa-pressable p-5 md:p-8"
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

      {content.pricing ? <ServicePricingStrip content={content.pricing} /> : null}

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
                className="sa-card sa-pressable flex flex-col p-6"
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
                className="sa-card sa-pressable p-5 md:p-8"
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

      {faqItems && faqItems.length > 0 ? (
        <section className="sa-section relative z-10 border-b border-sa-border">
          <div className="sa-container max-w-3xl">
            <SaSectionHeader eyebrow="FAQ" title="Common questions" />
            <div className="mt-8">
              <StartupAgencyFaq items={faqItems} />
            </div>
          </div>
        </section>
      ) : null}

      {content.showOwnership ? <ServiceOwnershipSection /> : null}

      <PremiumFinalCtaSection
        title={content.ctaTitle}
        description={content.ctaDescription}
        secondaryCtaLabel={content.pricing ? "Compare pricing" : "View portfolio"}
        secondaryCtaHref={content.pricing ? "/pricing" : "/portfolio"}
      />
      
    </main>
  );
}
