#!/usr/bin/env node
/**
 * End-to-end check: Places config + /reviews + llms.txt social proof on a running dev server.
 *
 * Prereqs: .env with GOOGLE_MAPS_API_KEY (+ PLACE_ID), app running on FRONTEND_PORT (default 3020).
 * Tip: if `next dev` errors, run `npm run build` then `FRONTEND_PORT=3021 npm run start:standalone`
 *      and `SITE_URL=http://127.0.0.1:3021 npm run verify:reviews-local`.
 *
 * Usage:
 *   npm run dev   # another terminal
 *   npm run verify:reviews-local
 *
 * Optional: SITE_URL=https://oceancyber.net npm run verify:reviews-integration
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

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

const port = process.env.FRONTEND_PORT || "3020";
/** Local dev by default — set SITE_URL to smoke production (e.g. https://oceancyber.net). */
const base = (process.env.SITE_URL || `http://127.0.0.1:${port}`).replace(/\/$/, "");

const failures = [];
const passes = [];

function pass(msg) {
  passes.push(msg);
}
function fail(msg) {
  failures.push(msg);
}

console.log(`Reviews integration — ${base}\n`);

const places = spawnSync("npm", ["run", "verify:google-places"], {
  cwd: root,
  encoding: "utf8",
  env: process.env,
});
if (places.status !== 0) {
  fail("Google Places verify failed (check GOOGLE_MAPS_API_KEY / GOOGLE_PLACE_ID)");
  console.error(places.stdout || places.stderr);
} else {
  pass("Google Places API (verify:google-places)");
}

async function fetchText(path) {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  return { status: res.status, text: await res.text() };
}

try {
  const llms = await fetchText("/llms.txt");
  if (llms.status !== 200) fail(`/llms.txt HTTP ${llms.status}`);
  else {
    pass("/llms.txt HTTP 200");
    if (!llms.text.includes("Social proof (Google reviews)")) {
      fail("llms.txt: missing Social proof section (deploy latest?)");
    } else pass("llms.txt: Social proof section");
    if (!llms.text.includes("source: places-api")) {
      if (llms.text.includes("source: env-config")) pass("llms.txt: env-config stats");
      else if (llms.text.includes("source: fallback")) fail("llms.txt: still on static fallback");
      else fail("llms.txt: missing source: places-api line");
    } else pass("llms.txt: source places-api");
    if (!llms.text.includes("do not invent")) fail("llms.txt: missing anti-fabrication guard");
    else pass("llms.txt: do not invent guard");
  }

  const reviews = await fetchText("/reviews");
  if (reviews.status !== 200) fail(`/reviews HTTP ${reviews.status}`);
  else {
    pass("/reviews HTTP 200");
    if (!reviews.text.includes("Google review")) {
      fail("/reviews: missing Google reviews reference");
    } else pass("/reviews: Google reviews copy");
    if (!reviews.text.includes("AggregateRating")) fail("/reviews: missing AggregateRating JSON-LD");
    else pass("/reviews: AggregateRating JSON-LD");
    if (reviews.text.includes("/reviews#review-")) {
      if (!reviews.text.includes('"Review"')) fail("/reviews: Review nodes expected when excerpts sync");
      else pass("/reviews: Review JSON-LD with excerpts");
    } else pass("/reviews: aggregate only (no excerpt nodes in HTML)");
  }

  const sitemap = await fetchText("/sitemap.xml");
  if (sitemap.text.includes("/llms.txt")) pass("sitemap.xml: lists /llms.txt");
  else fail("sitemap.xml: missing /llms.txt");
  if (sitemap.text.includes("/portfolio/creative-hub-template")) {
    fail("sitemap.xml: creative-hub-template should be omitted");
  } else pass("sitemap.xml: concept portfolio omitted");

  const concept = await fetchText("/portfolio/creative-hub-template");
  if (!concept.text.includes("noindex")) fail("creative-hub-template: missing noindex");
  else pass("creative-hub-template: noindex");
} catch (e) {
  fail(`Fetch failed — is the dev server running at ${base}? (${e.message})`);
}

console.log(`\nPassed: ${passes.length}`);
for (const p of passes) console.log(`  ✓ ${p}`);
if (failures.length) {
  console.error(`\nFailed: ${failures.length}`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nReviews integration OK.");
