import type { Metadata } from "next";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

/** Merge live Google review line into a meta description template. */
export async function withLiveReviewsDescription(
  baseDescription: string,
): Promise<string> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  if (baseDescription.includes(reviewsOnly)) return baseDescription;
  return `${baseDescription.replace(/\s*Rated[\s\S]*$/i, "").trim()} ${reviewsOnly}.`;
}
