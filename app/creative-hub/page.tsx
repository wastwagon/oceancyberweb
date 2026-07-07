import type { Metadata } from "next";
import Link from "next/link";
import { CreativeHubGallery } from "@/components/portfolio/CreativeHubGallery";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { creativeHubGallery } from "@/lib/data/creative-hub-gallery";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Creative Hub",
    description:
      "OceanCyber studio concepts and illustrative UI — design exploration separate from live client deliveries.",
  },
  "/creative-hub",
);

export default function CreativeHubPage() {
  return (
    <main className="min-h-screen bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-intro border-b border-sa-border">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow mb-4">Studio showcase</p>
          <h1 className="sa-title-lg text-balance">
            Our
            <span className="text-sa-primary"> Creative Hub</span>
          </h1>
          <p className="sa-subtitle mx-auto">
            Illustrative interfaces, brand explorations, and service visuals from our design
            studio. These are concept work — for live client sites, see our featured deliveries.
          </p>
          <div className="mt-8">
            <Link href="/portfolio" className="sa-btn-outline w-full sm:inline-flex sm:w-auto">
              View live client work
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container">
          <p className="mb-8 text-center text-sm text-sa-muted/70">
            Tap any visual to preview. All items are studio-generated or concept artwork.
          </p>
          <CreativeHubGallery items={creativeHubGallery} />
        </div>
      </section>

    </main>
  );
}
