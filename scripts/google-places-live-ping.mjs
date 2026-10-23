/**
 * One-shot Places API (New) details fetch — used by verify-marketing --live.
 */
export async function pingPlacesApi(apiKey, placeId) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,rating,userRatingCount,displayName",
      },
    },
  );

  if (!res.ok) {
    const body = await res.text();
    return {
      ok: false,
      error: `HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`,
    };
  }

  const data = await res.json();
  if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
    return { ok: false, error: "Incomplete response (check Places API New on the key)" };
  }

  return {
    ok: true,
    rating: data.rating,
    reviewCount: data.userRatingCount,
    name: data.displayName?.text,
    placeId: data.id ?? placeId,
  };
}
