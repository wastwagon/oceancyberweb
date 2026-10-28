#!/usr/bin/env node
/**
 * Pre-deploy marketing checklist — run before Coolify rebuild or after env changes.
 *
 * Usage:
 *   npm run verify:marketing
 *   npm run verify:marketing -- --strict   # exit 1 if reviews still on code fallback
 *
 * Loads root `.env` when present (same as verify-google-places.mjs).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");
const strict = process.argv.includes("--strict");
const live = process.argv.includes("--live");

function loadEnvFile() {
  if (!existsSync(envPath)) return;
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

loadEnvFile();

async function main() {
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
const mapsKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
const placeId =
  process.env.GOOGLE_PLACE_ID?.trim() ||
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
const ratingEnv = process.env.OCEAN_GOOGLE_RATING?.trim();
const countEnv = process.env.OCEAN_GOOGLE_REVIEW_COUNT?.trim();

let reviewTier = "code-fallback";
let reviewOk = false;
if (placeId && (placeId.startsWith("AIza") || placeId.length < 20)) {
  reviewTier = "places-api-misconfigured (GOOGLE_PLACE_ID must be ChIJ… not the API key)";
} else if (mapsKey && placeId) {
  reviewTier = "places-api-ready";
  reviewOk = true;
} else if (mapsKey) {
  reviewTier = "places-api-partial (add GOOGLE_PLACE_ID — run verify:google-places)";
} else if (ratingEnv && countEnv) {
  reviewTier = "env-manual";
  reviewOk = true;
} else if (ratingEnv || countEnv) {
  reviewTier = "env-incomplete (set BOTH OCEAN_GOOGLE_RATING and OCEAN_GOOGLE_REVIEW_COUNT)";
}

const lines = [];
const push = (s) => lines.push(s);

push("OceanCyber marketing readiness");
push("==============================\n");

push("YOUR PART (operations)");
push("------------------------");
push(`  Production URL     ${siteUrl || "(missing NEXT_PUBLIC_SITE_URL)"}`);
push(`  Google reviews     ${reviewTier}`);

let livePing = null;
if (live && mapsKey && placeId) {
  const { pingPlacesApi } = await import("./google-places-live-ping.mjs");
  livePing = await pingPlacesApi(mapsKey, placeId);
  if (livePing.ok) {
    push(
      `    → Live API: ${livePing.rating}★ · ${livePing.reviewCount} reviews (${livePing.name ?? "OceanCyber"})`,
    );
  } else {
    push(`    → Live API failed: ${livePing.error}`);
  }
} else if (live && reviewOk && reviewTier === "env-manual") {
  push(`    → Live API skipped (using OCEAN_GOOGLE_RATING env, not Places)`);
} else if (live && !reviewOk) {
  push("    → Live API skipped (configure key + place ID or manual rating env first)");
}

if (reviewTier.startsWith("code-fallback") || reviewTier.startsWith("places-api-partial") || reviewTier.startsWith("env-incomplete")) {
  push("    → Preferred: npm run verify:google-places (then set keys in Coolify)");
  push("    → Or set OCEAN_GOOGLE_RATING + OCEAN_GOOGLE_REVIEW_COUNT together");
}
push("  Cyber offering      consultation only (no env — do not advertise MSSP/monitoring)\n");

push("CODE (already done)");
push("------------------");
push("  Service hubs, /facts, llms.txt, JSON-LD, consultation copy, review source labels\n");

if (siteUrl && !siteUrl.startsWith("http")) {
  push("⚠ NEXT_PUBLIC_SITE_URL should include https://\n");
}

const paths = [
  "/facts",
  "/reviews",
  "/llms.txt",
  "/help-center",
  "/insights/pos-vs-ecommerce-ghana-2026",
  "/insights/google-maps-web-design-ghana-2026",
  "/guides/dwumapos-for-ghana-shops",
  "/services/web-development-in-ghana",
  "/services/web-design-in-ghana",
  "/services/cybersecurity",
  "/services/web-design-in-accra",
  "/services/ecommerce",
  "/portfolio/creative-hub-template",
  "/domains",
];
if (siteUrl.startsWith("http")) {
  push("Spot-check after deploy");
  push("---------------------");
  for (const p of paths) {
    push(`  ${siteUrl}${p}`);
  }
  push("");
}

push("Commands");
push("--------");
push("  npm run verify:google-places   # live rating + Place ID for Coolify");
push("  npm run sync:help-center       # refresh public/data/help-center.json from code");
push("  npm run sync:nav               # prisma db seed — navigation + portfolio rows from lib/data/projects.ts");
push("  npx prisma db seed             # after deploy if admin portfolio still shows old Creative Hub copy");
push("  npm run verify:production-seo  # live HTML smoke (after deploy)");
push("  npm run verify:marketing -- --strict   # fail if reviews not configured");
push("  npm run verify:marketing -- --strict --live   # also ping Places API (New)");
push("  npm run verify:image-paths       # site-image-paths + geo catalog on disk");
push("  npm run rename:site-images       # one-time legacy filename migration");
push("  npm run verify:predeploy-local   # tests + local SEO + build (no live site)");
push("  npm run preflight:local          # above + Playwright smoke");
push("  npm run build && npm test\n");

console.log(lines.join("\n"));

if (strict && !reviewOk) {
  console.error("Strict mode: configure Places API or OCEAN_GOOGLE_RATING + OCEAN_GOOGLE_REVIEW_COUNT.");
  process.exit(1);
}

if (strict && live && livePing && !livePing.ok) {
  console.error("Strict + --live: Places API request failed. Check key restrictions include Places API (New).");
  process.exit(1);
}
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
