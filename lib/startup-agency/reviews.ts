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

export function getReviewBadges(): ReviewBadge[] {
  const googleUrl = getGoogleBusinessProfileUrl();
  const clutchUrl = process.env.NEXT_PUBLIC_CLUTCH_PROFILE_URL?.trim();

  return [
    {
      id: "google",
      provider: "Google",
      rating: formatGoogleRatingLabel(),
      label: formatGoogleReviewCountLabel(),
      href: googleUrl,
      external: true,
    },
    {
      id: "clutch",
      provider: "Clutch",
      rating: "Top rated",
      label: clutchUrl ? "View Clutch profile" : "See portfolio outcomes",
      href: clutchUrl || "/portfolio",
      external: Boolean(clutchUrl),
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
