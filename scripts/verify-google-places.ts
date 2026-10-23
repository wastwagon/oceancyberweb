#!/usr/bin/env npx tsx
/**
 * Verify GOOGLE_MAPS_API_KEY (Places API New) and print live rating/count + Place ID.
 * Loads root `.env` when present.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getPlaceDetails, searchPlaceByText } from "../lib/google-places/new-api";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
const placeId =
  process.env.GOOGLE_PLACE_ID?.trim() ||
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();

const businessName = "OceanCyber - Website & Mobile App Development";
const query = `${businessName}, Accra, Ghana`;
const lat = 5.6173486;
const lng = -0.2252809;

if (!apiKey) {
  console.error("Missing GOOGLE_MAPS_API_KEY.");
  console.error("Set it in .env or pass inline.");
  process.exit(1);
}

async function main() {
  console.log("Checking Google Places API (New)…\n");

  let resolvedPlaceId = placeId;
  let summary = placeId
    ? await getPlaceDetails(
        apiKey,
        placeId,
        "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      )
    : null;

  if (!placeId) {
    console.log(`Searching: "${query}"`);
    const candidate = await searchPlaceByText(apiKey, query, {
      latitude: lat,
      longitude: lng,
      radiusMeters: 5000,
    });
    if (!candidate?.id) {
      console.error(
        "Text Search failed. Enable Places API (New) and billing in Google Cloud.",
      );
      process.exit(1);
    }
    resolvedPlaceId = candidate.id;
    summary = await getPlaceDetails(
      apiKey,
      resolvedPlaceId,
      "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
    );
  } else {
    console.log(`Using GOOGLE_PLACE_ID: ${placeId}`);
  }

  if (!summary?.id || typeof summary.rating !== "number") {
    console.error("Place Details failed or incomplete response.");
    process.exit(1);
  }

  console.log("\n✓ Success\n");
  console.log(`  Business:  ${summary.displayName?.text ?? businessName}`);
  console.log(`  Rating:    ${summary.rating}`);
  console.log(`  Reviews:   ${summary.userRatingCount ?? "n/a"}`);
  console.log(`  Place ID:  ${resolvedPlaceId}`);
  if (summary.googleMapsUri) console.log(`  Maps URL:  ${summary.googleMapsUri}`);

  const reviews = summary.reviews ?? [];
  if (reviews.length > 0) {
    console.log(`\n  Recent reviews (${reviews.length}):`);
    for (const review of reviews) {
      const snippet = (review.text?.text ?? "").slice(0, 80).replace(/\s+/g, " ");
      const author = review.authorAttribution?.displayName ?? "Reviewer";
      console.log(`    · ${author} (${review.rating ?? "?"}★): ${snippet}…`);
    }
  }

  console.log("\nAdd to Coolify (web service):");
  console.log(`  GOOGLE_MAPS_API_KEY=${apiKey.slice(0, 8)}…`);
  console.log(`  GOOGLE_PLACE_ID=${resolvedPlaceId}`);
  console.log(`  NEXT_PUBLIC_GOOGLE_PLACE_ID=${resolvedPlaceId}`);
  console.log("\nThen redeploy / rebuild web.");
}

main().catch((err) => {
  console.error("Request failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
