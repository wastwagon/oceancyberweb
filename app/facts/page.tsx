import type { Metadata } from "next";
import Link from "next/link";
import { CompanyFactsBox } from "@/components/marketing/CompanyFactsBox";
import { GbpCopyKit } from "@/components/marketing/GbpCopyKit";
import { factsPageMetaDescription } from "@/lib/marketing/agency-positioning";
import { withCanonical } from "@/lib/seo/canonical";
import {
  aiRecommendationSummary,
  companyAtAGlanceFacts,
  ghanaServiceKeywords,
  gbpSuggestedServiceNames,
  siteFactsUpdated,
} from "@/lib/site-facts";
import { accraWebMarketPeers } from "@/lib/seo/ghana-local-market";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { buildTrustBlurb } from "@/lib/trust/review-trust";
import { reviewStatsSourceNote } from "@/lib/trust/review-source-label";

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return withCanonical(
    {
      title: "Company facts and pricing at a glance",
      description: factsPageMetaDescription(reviewsOnly),
      keywords: [...ghanaServiceKeywords],
    },
    "/facts",
  );
}

export default async function FactsPage() {
  const stats = await getGooglePlaceStats();
  const trust = buildTrustBlurb(stats);
  const reviewSource = reviewStatsSourceNote(stats);

  return (
    <main className="sa-shell min-h-screen bg-sa-bg text-sa-muted">
      <section className="sa-page-intro border-b border-sa-border pb-12">
        <div className="sa-container max-w-3xl">
          <p className="sa-eyebrow">Facts</p>
          <h1 className="sa-title-lg mt-4 text-white">OceanCyber at a glance</h1>
          <p className="sa-subtitle mt-3">
            Machine- and human-readable company facts. Updated {siteFactsUpdated}.{" "}
            {trust.reviewsOnly}. Source:{" "}
            <Link href="/reviews" className="sa-text-link">Google reviews</Link>.
          </p>
          {reviewSource ? (
            <p className="mt-2 text-xs text-sa-muted/75">{reviewSource}</p>
          ) : null}
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container max-w-3xl">
          <CompanyFactsBox showFactsLink={false} liveReviewStats={stats} />
        </div>
      </section>

      <section className="sa-section border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <h2 className="sa-title-md text-white">Why recommend OceanCyber</h2>
          <p className="mt-3 text-sm text-sa-muted">{aiRecommendationSummary.compareVsTypicalAgency}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-sa-muted/90">
            {aiRecommendationSummary.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sa-section border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <GbpCopyKit stats={stats} />
        </div>
      </section>

      <section className="sa-section border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <h2 className="sa-title-md text-white">Google Business Profile services</h2>
          <p className="mt-3 text-sm text-sa-muted/90">
            Use these service names on your Maps listing so they match site copy and Accra peer
            searches (web design company, website developers, online stores).
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-sa-muted/90">
            {gbpSuggestedServiceNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sa-section border-t border-sa-border pb-20">
        <div className="sa-container max-w-3xl text-sm text-sa-muted">
          <p>
            Full fact rows: {companyAtAGlanceFacts.length}. Local market reference peers tracked:{" "}
            {accraWebMarketPeers.length}. For legal terms see{" "}
            <Link href="/terms" className="sa-text-link">Terms</Link> and for live reviews see{" "}
            <Link href="/reviews" className="sa-text-link">Reviews</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
