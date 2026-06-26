export type ReviewBadge = {
  id: string;
  provider: string;
  rating: string;
  label: string;
  href: string;
  external: boolean;
};

/** Review profile URLs — set in env when verified profiles are live. */
export function getReviewBadges(): ReviewBadge[] {
  const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim();
  const clutchUrl = process.env.NEXT_PUBLIC_CLUTCH_PROFILE_URL?.trim();

  return [
    {
      id: "google",
      provider: "Google",
      rating: "5.0",
      label: googleUrl ? "Verified Google reviews" : "Request client references",
      href: googleUrl || "/contact?topic=Client%20references",
      external: Boolean(googleUrl),
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
