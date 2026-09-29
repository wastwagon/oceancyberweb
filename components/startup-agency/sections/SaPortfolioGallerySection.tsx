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
          title="Live sites and concept work"
          subtitle="Switch between client sites that are live and concept work that is still illustrative."
          className="mb-10 md:mb-12"
        />

        <Suspense fallback={<div className="min-h-[280px] animate-pulse rounded-3xl bg-white/5" />}>
          <PortfolioTabbedGallery variant="section" className="mx-auto max-w-6xl" />
        </Suspense>

        <div className="mx-auto mt-10 flex flex-col items-center gap-3 md:mt-12">
          <Link href="/portfolio" className="sa-btn-primary w-full sm:w-auto">
            View portfolio
          </Link>
          <Link
            href="/portfolio?tab=creative"
            className="inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
          >
            Concept work
          </Link>
        </div>
      </div>
    </section>
  );
}
