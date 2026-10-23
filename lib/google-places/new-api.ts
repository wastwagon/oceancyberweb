/**
 * Google Places API (New) — use when legacy Places API is disabled on the GCP project.
 * @see https://developers.google.com/maps/documentation/places/web-service/place-details
 */

const PLACES_BASE = "https://places.googleapis.com/v1";

export type PlacesNewReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

export type PlacesNewPlace = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  displayName?: { text?: string };
  reviews?: PlacesNewReview[];
};

export type PlacesSearchTextResponse = {
  places?: PlacesNewPlace[];
};

function placesHeaders(apiKey: string, fieldMask: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": fieldMask,
  };
}

export async function searchPlaceByText(
  apiKey: string,
  textQuery: string,
  locationBias: { latitude: number; longitude: number; radiusMeters: number },
  init?: RequestInit,
): Promise<PlacesNewPlace | null> {
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: "POST",
    headers: placesHeaders(
      apiKey,
      "places.id,places.displayName,places.rating,places.userRatingCount",
    ),
    ...init,
    body: JSON.stringify({
      textQuery,
      locationBias: {
        circle: {
          center: {
            latitude: locationBias.latitude,
            longitude: locationBias.longitude,
          },
          radius: locationBias.radiusMeters,
        },
      },
    }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as PlacesSearchTextResponse;
  return data.places?.[0] ?? null;
}

export async function getPlaceDetails(
  apiKey: string,
  placeId: string,
  fieldMask: string,
  init?: RequestInit,
): Promise<PlacesNewPlace | null> {
  const res = await fetch(`${PLACES_BASE}/places/${encodeURIComponent(placeId)}`, {
    method: "GET",
    headers: placesHeaders(apiKey, fieldMask),
    ...init,
  });

  if (!res.ok) return null;

  return (await res.json()) as PlacesNewPlace;
}
