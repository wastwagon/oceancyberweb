import type { GooglePlaceStats } from "@/lib/google-places-stats";
import {
  formatGoogleRatingLabel,
  formatGoogleReviewCountLabel,
  getGoogleBusinessProfileUrl,
  getGoogleWriteReviewUrl,
  googleBusinessProfile,
} from "@/lib/startup-agency/google-business";

export type ReviewBadge = {
  id: string;
  provider: string;
  rating: string;
  label: string;
  href: string;
  external: boolean;
};

/** Homepage / reviews trust badges — Google Business Profile only. */
export function getReviewBadges(stats?: GooglePlaceStats): ReviewBadge[] {
  const googleUrl = getGoogleBusinessProfileUrl();
  const rating = stats ? stats.rating.toFixed(1) : formatGoogleRatingLabel();
  const label = stats
    ? `${stats.reviewCount} Google review${stats.reviewCount === 1 ? "" : "s"}`
    : formatGoogleReviewCountLabel();

  return [
    {
      id: "google",
      provider: "Google",
      rating,
      label,
      href: googleUrl,
      external: true,
    },
  ];
}

export function getGoogleReviewCta() {
  return {
    profileUrl: getGoogleBusinessProfileUrl(),
    writeReviewUrl: getGoogleWriteReviewUrl(),
    rating: googleBusinessProfile.rating,
    reviewCount: googleBusinessProfile.reviewCount,
    businessName: googleBusinessProfile.name,
  };
}
