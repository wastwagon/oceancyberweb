import Link from "next/link";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { ClientWorkGrid } from "@/components/portfolio/ClientWorkGrid";
import { featuredClientWork } from "@/lib/data/featured-client-work";

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
          title="Live client work"
          subtitle="Open real partner sites in production — then explore studio concepts in our Creative Hub."
          className="mb-12 md:mb-16"
        />

        <ClientWorkGrid items={featuredClientWork} className="mx-auto max-w-6xl" />

        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 text-center md:mt-16">
          <p className="text-sm text-sa-muted/70">
            Illustrative UI and brand explorations are kept separate so live deliveries stay
            credible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/portfolio" className="sa-btn-outline">
              Full portfolio
            </Link>
            <Link href="/creative-hub" className="sa-btn-primary">
              Creative Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
