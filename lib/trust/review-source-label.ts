import type { GooglePlaceStats } from "@/lib/google-places-stats";
import { getGoogleBusinessProfileUrl } from "@/lib/startup-agency/google-business";

/** Short UI line under review stats — no Places API jargon. */
export function reviewStatsSourceNote(stats: GooglePlaceStats): string | null {
  if (stats.source === "env-config") {
    return "Counts match OCEAN_GOOGLE_RATING and OCEAN_GOOGLE_REVIEW_COUNT in env — update when Google changes.";
  }
  return `See our ${stats.reviewCount} reviews on Google.`;
}

export function reviewStatsSourceLinkLabel(): string {
  return "Read on Google";
}

export function reviewStatsSourceHref(): string {
  return getGoogleBusinessProfileUrl();
}
