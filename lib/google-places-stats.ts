import { cache } from "react";
import {
  getPlaceDetails,
  searchPlaceByText,
  type PlacesNewReview,
} from "@/lib/google-places/new-api";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { readEnvGbpOverride, staticGbpFallback } from "@/lib/trust/gbp-fallback";

export type GooglePlaceStats = {
  rating: number;
  reviewCount: number;
  placeId?: string;
  source: "places-api" | "env-config" | "fallback";
};

export type GooglePlaceReview = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  initials: string;
  authorUrl?: string;
  profilePhotoUrl?: string;
};

export type GooglePlaceProfile = {
  stats: GooglePlaceStats;
  reviews: GooglePlaceReview[];
};

const REVALIDATE_SECONDS = 86_400; // daily

function getApiKey(): string | undefined {
  return process.env.GOOGLE_MAPS_API_KEY?.trim();
}

function getConfiguredPlaceId(): string | undefined {
  return (
    process.env.GOOGLE_PLACE_ID?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim()
  );
}

function fallbackProfile(): GooglePlaceProfile {
  const env = readEnvGbpOverride();
  const { rating, reviewCount } = staticGbpFallback();
  return {
    stats: {
      rating,
      reviewCount,
      source: env ? "env-config" : "fallback",
    },
    reviews: [],
  };
}

function mapReview(raw: PlacesNewReview): GooglePlaceReview | null {
  const quote = raw.text?.text?.trim();
  if (!quote) return null;

  const name = raw.authorAttribution?.displayName?.trim() || "Google reviewer";
  const parts = name.split(/\s+/).filter(Boolean);
  const initials =
    parts.length >= 2
      ? `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

  return {
    quote,
    name,
    role: raw.relativePublishTimeDescription?.trim() || "Google review",
    rating: typeof raw.rating === "number" ? raw.rating : 5,
    initials,
    authorUrl: raw.authorAttribution?.uri,
    profilePhotoUrl: raw.authorAttribution?.photoUri,
  };
}

async function fetchPlaceProfile(
  placeId: string,
  apiKey: string,
): Promise<GooglePlaceProfile | null> {
  const result = await getPlaceDetails(
    apiKey,
    placeId,
    "id,rating,userRatingCount,reviews",
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  if (!result) return null;

  const rating = result.rating;
  const reviewCount = result.userRatingCount;
  if (typeof rating !== "number" || typeof reviewCount !== "number") return null;

  const reviews = (result.reviews ?? [])
    .map(mapReview)
    .filter((review): review is GooglePlaceReview => review !== null);

  return {
    stats: { rating, reviewCount, placeId, source: "places-api" },
    reviews,
  };
}

async function findPlaceId(apiKey: string): Promise<string | null> {
  const query = `${googleBusinessProfile.name}, ${googleBusinessProfile.address.locality}, ${googleBusinessProfile.address.country}`;

  const place = await searchPlaceByText(
    apiKey,
    query,
    {
      latitude: googleBusinessProfile.geo.latitude,
      longitude: googleBusinessProfile.geo.longitude,
      radiusMeters: 5000,
    },
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  return place?.id ?? null;
}

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = getConfiguredPlaceId();
  if (configured) return configured;
  return findPlaceId(apiKey);
}

/** Live rating, count, and up to 5 recent Google reviews (Places API, daily cache). */
export const getGooglePlaceProfile = cache(async (): Promise<GooglePlaceProfile> => {
  const fallback = fallbackProfile();
  const apiKey = getApiKey();
  if (!apiKey) return fallback;

  const placeId = await resolvePlaceId(apiKey);
  if (!placeId) return fallback;

  const profile = await fetchPlaceProfile(placeId, apiKey);
  return profile ?? fallback;
});

/** Live rating/count from Google Places API when configured; otherwise static GBP values. */
export async function getGooglePlaceStats(): Promise<GooglePlaceStats> {
  const profile = await getGooglePlaceProfile();
  return profile.stats;
}

/** Recent Google reviews only — empty when API key is missing or fetch fails. */
export async function getGooglePlaceReviews(): Promise<GooglePlaceReview[]> {
  const profile = await getGooglePlaceProfile();
  return profile.reviews;
}
