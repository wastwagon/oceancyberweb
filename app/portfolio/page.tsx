import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
import { getPortfolioCaseStudies } from "@/lib/data/portfolio-loader";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Portfolio",
    description:
      "Featured OceanCyber projects — scope, stack choices, and measurable outcomes.",
  },
  "/portfolio",
);

export default async function PortfolioPage() {
  const cases = await getPortfolioCaseStudies();
  return (
    <main className="min-h-screen bg-sa-bg text-sa-muted">
      <section className="sa-section border-b border-sa-border pt-28 md:pt-34">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow mb-4">
            Portfolio
          </p>
          <h1 className="sa-title text-balance">
            Proven delivery across products, platforms, and industries
          </h1>
          <p className="sa-subtitle mx-auto">
            Browse featured projects and detailed case studies. Each engagement highlights
            scope, technical approach, and measurable outcomes.
          </p>
        </div>
      </section>
      <Portfolio cases={cases} />
    </main>
  );
}