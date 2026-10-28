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
  { path: "/", checks: ["places-sync", "no-template-reviews", "jsonld", "home-aggregate-rating", "home-best-hero"] },
  { path: "/facts", checks: ["places-sync", "jsonld", "facts-maps-kit"] },
  { path: "/help-center", checks: ["help-maps-article", "help-pos-article"] },
  {
    path: "/guides/dwumapos-for-ghana-shops",
    checks: ["jsonld", "faq-jsonld", "dwumapos-shop-guide"],
  },
  {
    path: "/guides/dwumapos-pharmacy-pos-ghana",
    checks: ["jsonld", "faq-jsonld", "dwumapos-pharmacy-guide"],
  },
  {
    path: "/guides/dwumapos-restaurant-pos-ghana",
    checks: ["jsonld", "faq-jsonld", "dwumapos-restaurant-guide"],
  },
  { path: "/services/web-development-in-ghana", checks: ["no-template-reviews", "jsonld", "geo-developers"] },
  { path: "/services/web-design-in-ghana", checks: ["no-template-reviews", "jsonld"] },
  { path: "/reviews", checks: ["places-sync", "jsonld", "aggregate-rating"] },
  { path: "/llms.txt", checks: ["llms", "llms-social-proof", "places-sync-llms"] },
  { path: "/services/cybersecurity", checks: ["consultation", "jsonld", "no-template-reviews"] },
  { path: "/services/web-design", checks: ["jsonld"] },
  { path: "/services/web-design-in-accra", checks: ["no-template-reviews", "jsonld"] },
  { path: "/domains", checks: ["faq-jsonld"] },
  { path: "/hosting", checks: ["faq-jsonld"] },
  { path: "/ssl", checks: ["faq-jsonld"] },
  { path: "/sitemap.xml", checks: ["sitemap", "sitemap-no-concept-portfolio", "sitemap-llms"] },
  {
    path: "/portfolio/creative-hub-template",
    checks: ["concept-portfolio-noindex"],
  },
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
    } else pass("llms.txt: core content OK");
  }

  if (checks.includes("llms-social-proof")) {
    if (!text.includes("Social proof (Google reviews)")) {
      fail("llms.txt: missing Social proof (Google reviews) section");
    } else if (!text.includes("/reviews") || !text.includes("do not invent")) {
      fail("llms.txt: missing reviews URL or anti-fabrication guard");
    } else {
      pass("llms.txt: social proof for AI agents");
    }
  }

  if (checks.includes("places-sync-llms")) {
    if (text.includes("source: fallback")) {
      fail("llms.txt: review stats still on static fallback — configure Places API");
    } else if (text.includes("source: places-api") || text.includes("source: env-config")) {
      pass("llms.txt: review stats source labelled");
    } else {
      fail("llms.txt: missing review stats source line");
    }
  }

  if (checks.includes("llms") || checks.includes("llms-social-proof") || checks.includes("places-sync-llms")) {
    if (path === "/llms.txt") continue;
  }

  if (checks.includes("sitemap")) {
    if (!text.includes("<urlset") && !text.includes("<loc>")) {
      fail("sitemap.xml: invalid or empty");
    } else pass("sitemap.xml: present");
    if (checks.includes("sitemap-no-concept-portfolio")) {
      if (text.includes("/portfolio/creative-hub-template")) {
        fail("sitemap.xml: in-house concept portfolio URL should not be indexed");
      } else pass("sitemap.xml: concept portfolio omitted");
    }
    if (checks.includes("sitemap-llms")) {
      if (!text.includes("/llms.txt")) {
        fail("sitemap.xml: /llms.txt missing (AI discovery)");
      } else pass("sitemap.xml: llms.txt listed");
    }
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
    } else if (
      text.includes("OCEAN_GOOGLE_RATING") ||
      text.includes("Rating and count from OCEAN_GOOGLE")
    ) {
      pass(`${path}: env-config review stats label`);
    } else {
      fail(`${path}: missing Places or env-config review source label`);
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
    } else {
      const hasReviewNodes = text.includes("/reviews#review-");
      const hasReviewType =
        text.includes('"@type":"Review"') || text.includes('"@type": "Review"');
      if (hasReviewNodes && !hasReviewType) {
        fail("/reviews: Review JSON-LD missing for synced excerpts");
      } else if (hasReviewType) {
        pass("/reviews: AggregateRating + Review JSON-LD");
      } else {
        pass("/reviews: AggregateRating JSON-LD");
      }
    }
  }

  if (checks.includes("home-aggregate-rating")) {
    if (!text.includes("AggregateRating")) {
      fail("/: sitewide AggregateRating JSON-LD missing");
    } else pass("/: AggregateRating JSON-LD");
  }

  if (checks.includes("home-best-hero")) {
    if (!text.includes("Best web design") || !text.includes("website development company")) {
      fail("/: homepage missing peer-aligned hero phrasing");
    } else if (/\bdesign studio\b/i.test(text) || /\bcreative studio\b/i.test(text)) {
      fail("/: homepage must not position OceanCyber as a studio");
    } else pass("/: hero local SEO phrasing");
  }

  if (checks.includes("facts-maps-kit")) {
    if (!text.includes("Maps listing kit") || !text.includes("Google Business Profile")) {
      fail("/facts: Maps copy kit section missing");
    } else pass("/facts: Maps copy kit");
  }

  if (checks.includes("help-maps-article")) {
    if (!text.includes("Google Maps listing") && !text.includes("google-maps-listing")) {
      fail("/help-center: Maps listing help article missing");
    } else pass("/help-center: Maps article");
  }

  if (checks.includes("help-pos-article")) {
    if (!text.includes("In-store POS vs ecommerce") && !text.includes("pos-vs-ecommerce")) {
      fail("/help-center: POS vs ecommerce help article missing");
    } else pass("/help-center: POS vs ecommerce article");
  }

  if (checks.includes("geo-developers")) {
    if (!text.includes("website developers") && !text.includes("Website developers")) {
      fail(`${path}: missing website developers phrasing`);
    } else pass(`${path}: developers phrasing`);
  }

  if (checks.includes("dwumapos-restaurant-guide")) {
    if (!text.includes("Restaurant POS on DwumaPOS | OceanCyber")) {
      fail(`${path}: missing updated meta title in HTML`);
    } else if (!text.includes("kitchen order slip")) {
      fail(`${path}: missing kitchen order slip wording`);
    } else if (text.includes("close of night") || text.match(/\bthe pass\b/i) || text.includes("KOT")) {
      fail(`${path}: banned restaurant guide wording`);
    } else if (!text.includes("What a restaurant pays")) {
      fail(`${path}: missing pricing section`);
    } else {
      pass(`${path}: DwumaPOS restaurant guide copy`);
    }
  }

  if (checks.includes("dwumapos-pharmacy-guide")) {
    if (!text.includes("Pharmacy POS on DwumaPOS | OceanCyber")) {
      fail(`${path}: missing updated meta title in HTML`);
    } else if (!text.includes("Payments and delivery") || !text.includes("What a pharmacy pays")) {
      fail(`${path}: missing pharmacy guide sections`);
    } else if (!text.includes("not from a warning when you scan")) {
      fail(`${path}: missing batch-list wording`);
    } else if (text.match(/\bcounter\b/i) && !text.includes("pharmacy-expiry-at-the-counter-pos")) {
      fail(`${path}: banned word counter in visible copy`);
    } else if (text.includes("pop-up") || text.includes("popup")) {
      fail(`${path}: banned pop-up wording`);
    } else {
      pass(`${path}: DwumaPOS pharmacy guide copy`);
    }
  }

  if (checks.includes("dwumapos-shop-guide")) {
    if (!text.includes("DwumaPOS Guide for Ghana Shops")) {
      fail(`${path}: missing updated meta title in HTML`);
    } else if (!text.includes("30-day free trial begins when you sign up")) {
      fail(`${path}: missing trial-on-signup copy`);
    } else if (
      text.includes("Up to 50 branches") ||
      text.includes("when you open the shop for sales") ||
      text.includes("14-day")
    ) {
      fail(`${path}: stale DwumaPOS facts in HTML`);
    } else if (!text.includes("Prepaid for 12 months")) {
      fail(`${path}: missing prepaid section`);
    } else {
      pass(`${path}: DwumaPOS shop guide copy`);
    }
  }

  if (checks.includes("concept-portfolio-noindex")) {
    if (!text.includes("noindex")) {
      fail(`${path}: in-house concept page should be noindex`);
    } else if (text.includes("500%") || text.includes("Internal Prototype")) {
      fail(`${path}: stale demo-style portfolio copy in HTML`);
    } else if (!text.toLowerCase().includes("concept")) {
      fail(`${path}: missing in-house concept labelling`);
    } else if (text.includes("Impact & Results") || text.includes("Verified client")) {
      fail(`${path}: concept page must not use client case-study chrome`);
    } else if (!text.includes("Why this sample exists") && !text.includes("About this sample")) {
      fail(`${path}: concept page missing in-house narrative sections`);
    } else {
      pass(`${path}: concept portfolio hygiene`);
    }
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
