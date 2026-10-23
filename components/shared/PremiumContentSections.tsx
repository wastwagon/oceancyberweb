"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { SITE_CTA } from "@/lib/marketing/site-cta";
import { fadeUpSoft, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

type StoryCard = {
  title: string;
  client: string;
  result: string;
};

type PremiumStoriesGridSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  stories: StoryCard[];
};

export function PremiumStoriesGridSection({
  eyebrow,
  title,
  subtitle,
  stories,
}: PremiumStoriesGridSectionProps) {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border">
      <div className="sa-container">
        <motion.div {...fadeUpSoft} className="mx-auto max-w-3xl">
          <SaSectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
        </motion.div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={staggerDelay(index, 0.07)}
              className="sa-card sa-pressable flex h-full flex-col p-6 md:p-8"
            >
              <h3 className="sa-card-title">
                {story.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-sa-primary">
                {story.client}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-sa-muted/80">
                {story.result}
              </p>
              <Link
                href={SITE_CTA.fullPortfolio.href}
                className="sa-ios-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary transition-colors active:opacity-80"
              >
                {SITE_CTA.fullPortfolio.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

type PremiumFinalCtaSectionProps = {
  title: string;
  description: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Hero already has Get started — close with planning links only. */
  planningOnly?: boolean;
};

export function PremiumFinalCtaSection({
  title,
  description,
  secondaryCtaLabel = SITE_CTA.comparePackages.label,
  secondaryCtaHref = SITE_CTA.comparePackages.href,
  planningOnly = false,
}: PremiumFinalCtaSectionProps) {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border">
      <div className="sa-container max-w-4xl text-center">
        <motion.div
          {...fadeUpSoft}
          className="sa-card p-10 md:p-14"
        >
          <SaSectionHeader title={title} subtitle={description} />
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {planningOnly ? (
              <>
                <Link href={secondaryCtaHref} className="sa-btn-outline w-full sm:w-auto">
                  {secondaryCtaLabel}
                </Link>
                <Link href={SITE_CTA.estimateInCedis.href} className="sa-btn-outline w-full sm:w-auto">
                  {SITE_CTA.estimateInCedis.label}
                </Link>
              </>
            ) : (
              <>
                <Link href={SITE_CTA.getStarted.href} className="sa-btn-primary w-full sm:w-auto">
                  {SITE_CTA.getStarted.label}
                </Link>
                <Link href={secondaryCtaHref} className="sa-btn-outline w-full sm:w-auto">
                  {secondaryCtaLabel}
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
