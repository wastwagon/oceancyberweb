import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioTabbedGallery } from "@/components/portfolio/PortfolioTabbedGallery";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { portfolioSectionIntro } from "@/lib/startup-agency/content";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Web and app portfolio",
    description:
      "Selected live client sites and Creative Hub concept work from OceanCyber — a curated sample from many deliveries.",
  },
  "/portfolio",
);

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-intro border-b border-sa-border">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow mb-4">{portfolioSectionIntro.eyebrow}</p>
          <h1 className="sa-title-lg text-balance">{portfolioSectionIntro.title}</h1>
          <p className="sa-lead mx-auto max-w-2xl">{portfolioSectionIntro.subtitle}</p>
          <p className="sa-subtitle mx-auto mt-4 max-w-xl">
            Use the tabs for live URLs you can open today versus Creative Hub concepts labelled as illustrative.
          </p>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container max-w-6xl">
          <Suspense fallback={<div className="min-h-[320px] animate-pulse rounded-3xl bg-white/5" />}>
            <PortfolioTabbedGallery variant="page" />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
