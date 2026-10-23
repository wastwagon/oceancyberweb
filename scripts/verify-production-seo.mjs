#!/usr/bin/env node
/**
 * Live SEO + marketing smoke test against NEXT_PUBLIC_SITE_URL (default production).
 * Usage: npm run verify:production-seo
 *        SITE_URL=https://oceancyber.net node scripts/verify-production-seo.mjs
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

const base = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://oceancyber.net"
).replace(/\/$/, "");

const paths = [
  { path: "/", checks: ["places-sync", "no-template-reviews", "jsonld"] },
  { path: "/facts", checks: ["places-sync", "jsonld"] },
  { path: "/reviews", checks: ["places-sync", "jsonld", "aggregate-rating"] },
  { path: "/llms.txt", checks: ["llms"] },
  { path: "/services/cybersecurity", checks: ["consultation", "jsonld", "no-template-reviews"] },
  { path: "/services/web-design", checks: ["jsonld"] },
  { path: "/services/web-design-in-accra", checks: ["no-template-reviews", "jsonld"] },
  { path: "/domains", checks: ["faq-jsonld"] },
  { path: "/hosting", checks: ["faq-jsonld"] },
  { path: "/ssl", checks: ["faq-jsonld"] },
  { path: "/sitemap.xml", checks: ["sitemap"] },
  { path: "/robots.txt", checks: ["robots"] },
];

const failures = [];
const passes = [];

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, text: await res.text(), url };
}

function pass(msg) {
  passes.push(msg);
}

function fail(msg) {
  failures.push(msg);
}

for (const { path, checks } of paths) {
  const url = `${base}${path}`;
  const { status, text } = await fetchText(url);
  if (status !== 200) {
    fail(`${path}: HTTP ${status}`);
    continue;
  }
  pass(`${path}: HTTP 200`);

  if (checks.includes("llms")) {
    if (!text.includes("OceanCyber") || !text.includes("consultation")) {
      fail("llms.txt: missing expected company/consultation copy");
    } else pass("llms.txt: content OK");
    continue;
  }

  if (checks.includes("sitemap")) {
    if (!text.includes("<urlset") && !text.includes("<loc>")) {
      fail("sitemap.xml: invalid or empty");
    } else pass("sitemap.xml: present");
    continue;
  }

  if (checks.includes("robots")) {
    if (!text.toLowerCase().includes("sitemap")) {
      fail("robots.txt: no sitemap reference");
    } else pass("robots.txt: OK");
    continue;
  }

  if (checks.includes("no-template-reviews") && text.includes("{{REVIEWS}}")) {
    fail(`${path}: unresolved {{REVIEWS}} in HTML`);
  } else if (checks.includes("no-template-reviews")) {
    pass(`${path}: no {{REVIEWS}} template`);
  }

  if (path === "/facts" || path === "/domains") {
    if (text.includes(".com.gh") || text.includes("com-gh-domain-registration")) {
      fail(
        `${path}: still shows .com.gh — deploy latest web (feature removed; redirect only in next.config.js)`,
      );
    } else {
      pass(`${path}: no .com.gh marketing`);
    }
  }

  if (checks.includes("places-sync")) {
    if (text.includes("Static GBP fallback")) {
      fail(`${path}: still on static GBP fallback`);
    } else if (text.includes("Synced from Google Business Profile via Places API")) {
      pass(`${path}: Places API sync label`);
    } else {
      fail(`${path}: missing Places sync label (unexpected)`);
    }
  }

  if (checks.includes("consultation")) {
    if (text.match(/24\/7|MSSP|managed security service/i) && !text.includes("not MSSP")) {
      fail(`${path}: possible MSSP/monitoring copy`);
    } else pass(`${path}: cyber consultation positioning OK`);
  }

  if (checks.includes("jsonld")) {
    if (!text.includes("application/ld+json")) {
      fail(`${path}: no JSON-LD script`);
    } else pass(`${path}: JSON-LD present`);
  }

  if (checks.includes("faq-jsonld")) {
    if (!text.includes("FAQPage") && !text.includes("Question")) {
      fail(`${path}: FAQ JSON-LD not found in source`);
    } else pass(`${path}: FAQ JSON-LD present`);
  }

  if (checks.includes("aggregate-rating")) {
    if (!text.includes("AggregateRating")) {
      fail("/reviews: AggregateRating JSON-LD missing");
    } else pass("/reviews: AggregateRating JSON-LD");
  }
}

console.log(`Production SEO smoke — ${base}\n`);
console.log(`Passed: ${passes.length}`);
for (const p of passes) console.log(`  ✓ ${p}`);
if (failures.length) {
  console.log(`\nFailed: ${failures.length}`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nAll production SEO checks passed.");
