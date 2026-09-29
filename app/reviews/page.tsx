import type { Metadata } from "next";
import { ReviewsPageJsonLd } from "@/components/seo/ReviewsPageJsonLd";
import { SaReviewsPageContent } from "@/components/startup-agency/sections/SaReviewsPageContent";
import { getGooglePlaceProfile } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { withCanonical } from "@/lib/seo/canonical";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { stats } = await getGooglePlaceProfile();

  return withCanonical(
    {
      title: "Client reviews on Google",
      description: `${googleBusinessProfile.shortName} has a ${stats.rating.toFixed(1)} star rating on Google from ${stats.reviewCount} verified reviews for website and mobile app work in Accra.`,
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
  const { stats, reviews } = await getGooglePlaceProfile();

  return (
    <>
      <ReviewsPageJsonLd stats={stats} />
      <SaReviewsPageContent stats={stats} reviews={reviews} />
    </>
  );
}
