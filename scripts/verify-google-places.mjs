#!/usr/bin/env node
/**
 * Verify GOOGLE_MAPS_API_KEY and print live rating/count + Place ID.
 *
 * Usage:
 *   GOOGLE_MAPS_API_KEY=your_key node scripts/verify-google-places.mjs
 *   GOOGLE_MAPS_API_KEY=your_key GOOGLE_PLACE_ID=ChIJ... node scripts/verify-google-places.mjs
 *
 * Loads GOOGLE_* vars from `.env` in repo root when present.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
  console.error("Set it in .env or pass inline:");
  console.error("  GOOGLE_MAPS_API_KEY=your_key node scripts/verify-google-places.mjs");
  process.exit(1);
}

async function placeDetails(id) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", id);
  url.searchParams.set("fields", "name,rating,user_ratings_total,url");
  url.searchParams.set("key", apiKey);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function findPlace() {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );
  url.searchParams.set("input", query);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name,rating,user_ratings_total");
  url.searchParams.set("locationbias", `circle:5000@${lat},${lng}`);
  url.searchParams.set("key", apiKey);
  const res = await fetch(url);
  return res.json();
}

console.log("Checking Google Places API…\n");

try {
  let result;
  let resolvedPlaceId = placeId;

  if (placeId) {
    console.log(`Using GOOGLE_PLACE_ID: ${placeId}`);
    const data = await placeDetails(placeId);
    if (data.status !== "OK") {
      console.error("Place Details failed:", data.status, data.error_message || "");
      process.exit(1);
    }
    result = data.result;
  } else {
    console.log(`Searching: "${query}"`);
    const data = await findPlace();
    if (data.status !== "OK" || !data.candidates?.[0]) {
      console.error("Find Place failed:", data.status, data.error_message || "");
      console.error("\nEnable Places API in Google Cloud and ensure billing is on.");
      process.exit(1);
    }
    const candidate = data.candidates[0];
    resolvedPlaceId = candidate.place_id;
    if (typeof candidate.rating === "number") {
      result = candidate;
    } else {
      const details = await placeDetails(resolvedPlaceId);
      if (details.status !== "OK") {
        console.error("Place Details failed:", details.status, details.error_message || "");
        process.exit(1);
      }
      result = details.result;
    }
  }

  console.log("\n✓ Success\n");
  console.log(`  Business:  ${result.name ?? businessName}`);
  console.log(`  Rating:    ${result.rating ?? "n/a"}`);
  console.log(`  Reviews:   ${result.user_ratings_total ?? "n/a"}`);
  console.log(`  Place ID:  ${resolvedPlaceId}`);
  if (result.url) console.log(`  Maps URL:  ${result.url}`);

  const reviewsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  reviewsUrl.searchParams.set("place_id", resolvedPlaceId);
  reviewsUrl.searchParams.set("fields", "reviews");
  reviewsUrl.searchParams.set("key", apiKey);
  const reviewsRes = await fetch(reviewsUrl);
  const reviewsData = await reviewsRes.json();
  const reviews = reviewsData.result?.reviews ?? [];
  if (reviews.length > 0) {
    console.log(`\n  Recent reviews (${reviews.length}):`);
    for (const review of reviews) {
      const snippet = (review.text ?? "").slice(0, 80).replace(/\s+/g, " ");
      console.log(`    · ${review.author_name} (${review.rating}★): ${snippet}…`);
    }
  }

  console.log("\nAdd to Coolify (web service):");
  console.log(`  GOOGLE_MAPS_API_KEY=${apiKey.slice(0, 8)}…`);
  console.log(`  GOOGLE_PLACE_ID=${resolvedPlaceId}`);
  console.log(`  NEXT_PUBLIC_GOOGLE_PLACE_ID=${resolvedPlaceId}`);
  console.log("\nThen redeploy / rebuild web.");
} catch (err) {
  console.error("Request failed:", err.message);
  process.exit(1);
}
