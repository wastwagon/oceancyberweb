import { cache } from "react";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export type GooglePlaceStats = {
  rating: number;
  reviewCount: number;
  placeId?: string;
  source: "places-api" | "fallback";
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

type PlacesReviewRaw = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type PlacesDetailsResponse = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: PlacesReviewRaw[];
  };
};

type FindPlaceResponse = {
  status: string;
  candidates?: Array<{
    place_id?: string;
    rating?: number;
    user_ratings_total?: number;
  }>;
};

function fallbackProfile(): GooglePlaceProfile {
  return {
    stats: {
      rating: googleBusinessProfile.rating,
      reviewCount: googleBusinessProfile.reviewCount,
      source: "fallback",
    },
    reviews: [],
  };
}

function mapReview(raw: PlacesReviewRaw): GooglePlaceReview | null {
  const quote = raw.text?.trim();
  if (!quote) return null;

  const name = raw.author_name?.trim() || "Google reviewer";
  const parts = name.split(/\s+/).filter(Boolean);
  const initials =
    parts.length >= 2
      ? `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

  return {
    quote,
    name,
    role: raw.relative_time_description?.trim() || "Google review",
    rating: typeof raw.rating === "number" ? raw.rating : 5,
    initials,
    authorUrl: raw.author_url,
    profilePhotoUrl: raw.profile_photo_url,
  };
}

async function fetchPlaceProfile(
  placeId: string,
  apiKey: string,
): Promise<GooglePlaceProfile | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return null;

  const data = (await res.json()) as PlacesDetailsResponse;
  if (data.status !== "OK" || !data.result) return null;

  const rating = data.result.rating;
  const reviewCount = data.result.user_ratings_total;
  if (typeof rating !== "number" || typeof reviewCount !== "number") return null;

  const reviews = (data.result.reviews ?? [])
    .map(mapReview)
    .filter((review): review is GooglePlaceReview => review !== null);

  return {
    stats: { rating, reviewCount, placeId, source: "places-api" },
    reviews,
  };
}

async function findPlaceId(apiKey: string): Promise<string | null> {
  const query = `${googleBusinessProfile.name}, ${googleBusinessProfile.address.locality}, ${googleBusinessProfile.address.country}`;

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );
  url.searchParams.set("input", query);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set(
    "locationbias",
    `circle:5000@${googleBusinessProfile.geo.latitude},${googleBusinessProfile.geo.longitude}`,
  );
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return null;

  const data = (await res.json()) as FindPlaceResponse;
  return data.candidates?.[0]?.place_id ?? null;
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
