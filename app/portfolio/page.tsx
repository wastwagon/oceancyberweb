import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PortfolioTabbedGallery } from "@/components/portfolio/PortfolioTabbedGallery";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Web and app portfolio",
    description:
      "Live client websites and concept work from OceanCyber. Open a production site, or browse illustrative work in the Creative Hub.",
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
            Live client sites and concept work
          </h1>
          <p className="sa-subtitle mx-auto">
            Switch between partner sites you can open now and Creative Hub concepts. Concept work is labelled as illustrative.
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
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-sa-primary"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
