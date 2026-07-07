import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PortfolioTabbedGallery } from "@/components/portfolio/PortfolioTabbedGallery";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Portfolio",
    description:
      "Live client websites and OceanCyber Creative Hub studio work — switch tabs to browse production sites or illustrative concepts.",
  },
  "/portfolio",
);

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-intro border-b border-sa-border">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow mb-4">Portfolio</p>
          <h1 className="sa-title-lg text-balance">
            Live deliveries &
            <span className="text-sa-primary"> studio work</span>
          </h1>
          <p className="sa-subtitle mx-auto">
            Use the tabs below to switch between partner sites in production and our Creative Hub
            concepts. Live cards link to real URLs — studio work is clearly labeled illustrative.
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

      <section className="sa-section">
        <div className="sa-container max-w-3xl text-center">
          <p className="sa-subtitle mx-auto">
            Want something similar shipped for your team? We scope from discovery through launch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link href="/contact" className="sa-btn-primary w-full sm:w-auto">
              Start a project
            </Link>
            <Link href="/get-started" className="sa-btn-outline w-full sm:w-auto">
              Guided intake
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
