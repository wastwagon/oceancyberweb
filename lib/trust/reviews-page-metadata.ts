import type { Metadata } from "next";
import { AGENCY_IDENTITY_GHANA } from "@/lib/marketing/agency-positioning";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import type { GooglePlaceStats } from "@/lib/google-places-stats";

export function buildReviewsPageMetadata(stats: GooglePlaceStats): Metadata {
  const ratingLine = `${stats.rating.toFixed(1)}★ from ${stats.reviewCount} Google reviews`;

  return {
    title: "Google reviews · Accra website & mobile app agency",
    description: `${googleBusinessProfile.shortName} — ${ratingLine} for ${AGENCY_IDENTITY_GHANA.toLowerCase()}. Verified feedback synced from Google Business Profile.`,
    openGraph: {
      title: `${ratingLine} on Google · OceanCyber`,
      description:
        "Read verified Google reviews for OceanCyber — website and mobile app development in Accra, Ghana.",
    },
  };
}
