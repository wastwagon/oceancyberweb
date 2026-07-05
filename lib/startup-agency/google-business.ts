/** Public Google Business Profile facts — keep in sync with Google Search / Maps listing. */
export const googleBusinessProfile = {
  name: "OceanCyber - Website & Mobile App Development",
  shortName: "OceanCyber",
  category: "Website designer",
  rating: 4.9,
  reviewCount: 54,
  phone: "+233242565695",
  phoneDisplay: "024 256 5695",
  address: {
    street: "Nii Kwashiefio Avenue",
    locality: "Accra",
    country: "Ghana",
    countryCode: "GH",
  },
  /** Coordinates from verified directory listing (Accra). */
  geo: {
    latitude: 5.6173486,
    longitude: -0.2252809,
  },
} as const;

const mapsProfileUrl =
  "https://maps.app.goo.gl/yWiB5pNhev2rgZSx7";

const mapsSearchFallback =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${googleBusinessProfile.name}, ${googleBusinessProfile.address.locality}, ${googleBusinessProfile.address.country}`,
  );

/** Profile / reviews page — override in Coolify with Share link from Google Business Profile. */
export function getGoogleBusinessProfileUrl(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() || mapsProfileUrl || mapsSearchFallback;
}

/** Direct “Write a review” link when Place ID is configured. */
export function getGoogleWriteReviewUrl(): string {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  if (placeId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
  }
  return getGoogleBusinessProfileUrl();
}

export function formatGoogleRatingLabel(): string {
  return `${googleBusinessProfile.rating.toFixed(1)}`;
}

export function formatGoogleReviewCountLabel(
  count: number = googleBusinessProfile.reviewCount,
): string {
  return `${count} Google review${count === 1 ? "" : "s"}`;
}
