import type { Metadata } from "next";
import { ReviewsPageJsonLd } from "@/components/seo/ReviewsPageJsonLd";
import { SaReviewsPageContent } from "@/components/startup-agency/sections/SaReviewsPageContent";
import { getGooglePlaceProfile } from "@/lib/google-places-stats";
import { buildReviewsPageMetadata } from "@/lib/trust/reviews-page-metadata";
import { withCanonical } from "@/lib/seo/canonical";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { stats } = await getGooglePlaceProfile();

  return withCanonical(buildReviewsPageMetadata(stats), "/reviews");
}

export default async function ReviewsPage() {
  const { stats, reviews } = await getGooglePlaceProfile();

  return (
    <>
      <ReviewsPageJsonLd stats={stats} reviews={reviews} />
      <SaReviewsPageContent stats={stats} reviews={reviews} />
    </>
  );
}
