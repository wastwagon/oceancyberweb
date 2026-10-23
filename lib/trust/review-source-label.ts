import type { GooglePlaceStats } from "@/lib/google-places-stats";

/** Short UI line for when review stats are live vs GBP fallback. */
export function reviewStatsSourceNote(stats: GooglePlaceStats): string | null {
  if (stats.source === "places-api") {
    return "Synced from Google Business Profile via Places API.";
  }
  if (stats.source === "env-config") {
    return "Rating and count from OCEAN_GOOGLE_RATING / OCEAN_GOOGLE_REVIEW_COUNT — update when Google changes.";
  }
  return "Static GBP fallback in code — set Places API or OCEAN_GOOGLE_RATING + OCEAN_GOOGLE_REVIEW_COUNT in env.";
}
