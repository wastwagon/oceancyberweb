import type { Metadata } from "next";
import { PortfolioFilteredLibrary } from "@/components/portfolio/PortfolioFilteredLibrary";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
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
      <SaPageAmbient />
      <section className="sa-section border-b border-sa-border pt-28 md:pt-34">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow mb-4">
            Showcase
          </p>
          <h1 className="sa-title-lg text-balance">
            Digital excellence,
            <span className="text-sa-primary"> engineered for scale.</span>
          </h1>
          <p className="sa-subtitle mx-auto">
            Our portfolio represents a bridge between complex technical challenges and 
            elegant business solutions. Explore how we apply world-class engineering 
            principles to deliver measurable impact for our partners globally.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Agile Delivery", desc: "Rapid iterations with continuous client feedback loops." },
              { label: "Security First", desc: "Hardened infrastructure and data protection by design." },
              { label: "Scalable Core", desc: "Cloud-native architectures built for future growth." }
            ].map((item, i) => (
              <div key={i} className="sa-card p-6 text-left border-l-2 border-sa-primary bg-sa-surface/30">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">{item.label}</h3>
                <p className="mt-2 text-xs text-sa-muted/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PortfolioFilteredLibrary projects={cases} />
    </main>
  );
}