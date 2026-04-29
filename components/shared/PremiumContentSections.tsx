"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
    <section className="relative z-10 border-t border-slate-200/80 py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <motion.div {...fadeUpSoft} className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-800 shadow-sm">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-slate-600 md:text-base">{subtitle}</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={staggerDelay(index, 0.07)}
              className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-200/50 transition-colors hover:border-ocean-200/80 md:p-7"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {story.title}
              </h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {story.client}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {story.result}
              </p>
              <Link
                href="/portfolio"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 transition-colors hover:text-ocean-900"
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
    <section className="relative z-10 border-t border-slate-200/80 py-20 md:py-24">
      <div className="container mx-auto max-w-3xl px-6 md:px-8">
        <motion.div
          {...fadeUpSoft}
          className="rounded-[2rem] border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-10 text-center shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 backdrop-blur-sm md:p-14 [&_h2]:text-center [&_p]:text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto md:text-base"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-ocean-200 bg-white px-8 py-4 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-200/40 transition-all hover:border-ocean-300 hover:bg-ocean-50/40 active:scale-[0.98] sm:w-auto md:text-base"
            >
              View portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
