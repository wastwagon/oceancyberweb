"use client";

import Link from "next/link";
import { Suspense } from "react";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { PortfolioTabbedGallery } from "@/components/portfolio/PortfolioTabbedGallery";
import { SITE_CTA } from "@/lib/marketing/site-cta";
import { portfolioSectionIntro } from "@/lib/startup-agency/content";

export function SaPortfolioGallerySection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-sa-border bg-sa-bg py-16 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sa-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]"
      />

      <div className="sa-container relative z-10">
        <SaSectionHeader
          align="center"
          eyebrow={portfolioSectionIntro.eyebrow}
          title={portfolioSectionIntro.title}
          subtitle={portfolioSectionIntro.subtitle}
          subtitleVariant="lead"
          className="mb-10 md:mb-12"
        />

        <Suspense fallback={<div className="min-h-[280px] animate-pulse rounded-3xl bg-white/5" />}>
          <PortfolioTabbedGallery variant="section" className="mx-auto max-w-6xl" />
        </Suspense>

        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:mt-12">
          <Link
            href={SITE_CTA.fullPortfolio.href}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline underline-offset-4 hover:text-sa-primary"
          >
            {SITE_CTA.fullPortfolio.label}
          </Link>
          <Link
            href={SITE_CTA.conceptWork.href}
            className="inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline underline-offset-4 hover:text-white"
          >
            {SITE_CTA.conceptWork.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
