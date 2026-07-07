"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
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
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                {story.client}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-sa-muted/80">
                {story.result}
              </p>
              <Link
                href="/portfolio"
                className="sa-ios-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary transition-colors active:opacity-80"
              >
                View work
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
};

export function PremiumFinalCtaSection({
  title,
  description,
}: PremiumFinalCtaSectionProps) {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border">
      <div className="sa-container max-w-4xl text-center">
        <motion.div
          {...fadeUpSoft}
          className="sa-card p-10 md:p-14"
        >
          <SaSectionHeader title={title} subtitle={description} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href="/contact"
              className="sa-btn-primary w-full sm:w-auto"
            >
              Talk to our team
            </Link>
            <Link
              href="/portfolio"
              className="sa-btn-outline w-full sm:w-auto"
            >
              View portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
