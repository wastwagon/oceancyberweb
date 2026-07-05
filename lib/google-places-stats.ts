import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export type GooglePlaceStats = {
  rating: number;
  reviewCount: number;
  placeId?: string;
  source: "places-api" | "fallback";
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

type PlacesDetailsResponse = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
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

async function fetchPlaceDetails(
  placeId: string,
  apiKey: string,
): Promise<GooglePlaceStats | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return null;

  const data = (await res.json()) as PlacesDetailsResponse;
  if (data.status !== "OK" || !data.result) return null;

  const rating = data.result.rating;
  const reviewCount = data.result.user_ratings_total;
  if (typeof rating !== "number" || typeof reviewCount !== "number") return null;

  return { rating, reviewCount, placeId, source: "places-api" };
}

async function findPlaceByText(apiKey: string): Promise<GooglePlaceStats | null> {
  const query = `${googleBusinessProfile.name}, ${googleBusinessProfile.address.locality}, ${googleBusinessProfile.address.country}`;

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );
  url.searchParams.set("input", query);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,rating,user_ratings_total,name");
  url.searchParams.set(
    "locationbias",
    `circle:5000@${googleBusinessProfile.geo.latitude},${googleBusinessProfile.geo.longitude}`,
  );
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return null;

  const data = (await res.json()) as FindPlaceResponse;
  const candidate = data.candidates?.[0];
  if (data.status !== "OK" || !candidate?.place_id) return null;

  const rating = candidate.rating;
  const reviewCount = candidate.user_ratings_total;
  if (typeof rating !== "number" || typeof reviewCount !== "number") {
    return fetchPlaceDetails(candidate.place_id, apiKey);
  }

  return {
    rating,
    reviewCount,
    placeId: candidate.place_id,
    source: "places-api",
  };
}

/** Live rating/count from Google Places API when configured; otherwise static GBP values. */
export async function getGooglePlaceStats(): Promise<GooglePlaceStats> {
  const fallback: GooglePlaceStats = {
    rating: googleBusinessProfile.rating,
    reviewCount: googleBusinessProfile.reviewCount,
    source: "fallback",
  };

  const apiKey = getApiKey();
  if (!apiKey) return fallback;

  const placeId = getConfiguredPlaceId();
  if (placeId) {
    const details = await fetchPlaceDetails(placeId, apiKey);
    if (details) return details;
  }

  const found = await findPlaceByText(apiKey);
  return found ?? fallback;
}
