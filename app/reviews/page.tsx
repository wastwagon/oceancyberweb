import type { Metadata } from "next";
import { ReviewsPageJsonLd } from "@/components/seo/ReviewsPageJsonLd";
import { SaReviewsPageContent } from "@/components/startup-agency/sections/SaReviewsPageContent";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { withCanonical } from "@/lib/seo/canonical";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();

  return withCanonical(
    {
      title: "Google Reviews",
      description: `${googleBusinessProfile.shortName} is rated ${stats.rating.toFixed(1)} stars on Google with ${stats.reviewCount} verified reviews — website and mobile app development in Accra, Ghana.`,
      openGraph: {
        title: `${stats.rating.toFixed(1)}★ on Google · ${stats.reviewCount} reviews`,
        description:
          "Read verified client feedback for OceanCyber on Google Business Profile.",
      },
    },
    "/reviews",
  );
}

export default async function ReviewsPage() {
  const stats = await getGooglePlaceStats();

  return (
    <>
      <ReviewsPageJsonLd stats={stats} />
      <SaReviewsPageContent stats={stats} />
    </>
  );
}
