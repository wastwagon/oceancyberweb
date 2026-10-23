import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

/** Manual GBP sync when Places API is not wired — set in Coolify after you update Google. */
export function readEnvGbpOverride(): { rating: number; reviewCount: number } | null {
  const ratingRaw = process.env.OCEAN_GOOGLE_RATING?.trim();
  const countRaw = process.env.OCEAN_GOOGLE_REVIEW_COUNT?.trim();
  if (!ratingRaw || !countRaw) return null;

  const rating = Number(ratingRaw);
  const reviewCount = Number.parseInt(countRaw, 10);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return null;
  if (!Number.isFinite(reviewCount) || reviewCount < 0) return null;

  return { rating, reviewCount };
}

export function staticGbpFallback(): { rating: number; reviewCount: number } {
  const env = readEnvGbpOverride();
  if (env) return env;
  return {
    rating: googleBusinessProfile.rating,
    reviewCount: googleBusinessProfile.reviewCount,
  };
}
