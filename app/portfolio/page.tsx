import type { Metadata } from "next";
import Link from "next/link";
import { ClientWorkGrid } from "@/components/portfolio/ClientWorkGrid";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { featuredClientWork } from "@/lib/data/featured-client-work";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Portfolio",
    description:
      "Live client work from OceanCyber — visit deployed websites for Fitch Advisory, Fitch Attorneys, Africa Governance Centre, and ThinQ Shopping.",
  },
  "/portfolio",
);

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-intro border-b border-sa-border">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow mb-4">Client work</p>
          <h1 className="sa-title-lg text-balance">
            Live sites we
            <span className="text-sa-primary"> shipped</span>
          </h1>
          <p className="sa-subtitle mx-auto">
            Featured partner deliveries you can open and explore right now. Each card links to the
            live website — no fabricated case studies, just real work in production.
          </p>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container max-w-6xl">
          <ClientWorkGrid items={featuredClientWork} />
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container max-w-3xl text-center">
          <p className="sa-eyebrow mb-4">Studio</p>
          <h2 className="sa-title mb-4">Explore our Creative Hub</h2>
          <p className="sa-subtitle mx-auto">
            UI concepts, brand explorations, and illustrative service visuals live separately from
            client deliveries — so prospects always know what is live versus concept work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link href="/creative-hub" className="sa-btn-primary w-full sm:w-auto">
              Open Creative Hub
            </Link>
            <Link href="/contact" className="sa-btn-outline w-full sm:w-auto">
              Start a project
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
