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
export function getReviewBadges(): ReviewBadge[] {
  const googleUrl = getGoogleBusinessProfileUrl();

  return [
    {
      id: "google",
      provider: "Google",
      rating: formatGoogleRatingLabel(),
      label: formatGoogleReviewCountLabel(),
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
