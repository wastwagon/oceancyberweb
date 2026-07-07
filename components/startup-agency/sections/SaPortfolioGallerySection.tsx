"use client";

import Link from "next/link";
import { Suspense } from "react";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { PortfolioTabbedGallery } from "@/components/portfolio/PortfolioTabbedGallery";

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
          eyebrow="Portfolio"
          title="Live sites & Creative Hub"
          subtitle="Tab between production partner sites and studio concept work — always know what's live versus illustrative."
          className="mb-10 md:mb-12"
        />

        <Suspense fallback={<div className="min-h-[280px] animate-pulse rounded-3xl bg-white/5" />}>
          <PortfolioTabbedGallery variant="section" className="mx-auto max-w-6xl" />
        </Suspense>

        <div className="mx-auto mt-10 text-center md:mt-12">
          <Link href="/portfolio" className="sa-btn-outline">
            Open full portfolio
          </Link>
          <Link href="/portfolio?tab=creative" className="sa-btn-primary ml-0 mt-3 inline-flex sm:ml-3 sm:mt-0">
            Creative Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
