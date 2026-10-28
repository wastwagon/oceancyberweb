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
  { path: "/llms.txt", checks: ["llms"] },
  { path: "/services/cybersecurity", checks: ["consultation", "jsonld", "no-template-reviews"] },
  { path: "/services/web-design", checks: ["jsonld"] },
  { path: "/services/web-design-in-accra", checks: ["no-template-reviews", "jsonld"] },
  { path: "/domains", checks: ["faq-jsonld"] },
  { path: "/hosting", checks: ["faq-jsonld"] },
  { path: "/ssl", checks: ["faq-jsonld"] },
  { path: "/sitemap.xml", checks: ["sitemap", "sitemap-no-studio-portfolio"] },
  {
    path: "/portfolio/creative-hub-template",
    checks: ["studio-portfolio-noindex"],
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
    } else pass("llms.txt: content OK");
    continue;
  }

  if (checks.includes("sitemap")) {
    if (!text.includes("<urlset") && !text.includes("<loc>")) {
      fail("sitemap.xml: invalid or empty");
    } else pass("sitemap.xml: present");
    if (checks.includes("sitemap-no-studio-portfolio")) {
      if (text.includes("/portfolio/creative-hub-template")) {
        fail("sitemap.xml: studio concept URL should not be indexed");
      } else pass("sitemap.xml: studio portfolio omitted");
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

  if (checks.includes("home-aggregate-rating")) {
    if (!text.includes("AggregateRating")) {
      fail("/: sitewide AggregateRating JSON-LD missing");
    } else pass("/: AggregateRating JSON-LD");
  }

  if (checks.includes("home-best-hero")) {
    if (!text.includes("Best web design") || !text.includes("website development company")) {
      fail("/: homepage missing peer-aligned hero phrasing");
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

  if (checks.includes("studio-portfolio-noindex")) {
    if (!text.includes("noindex")) {
      fail(`${path}: studio concept page should be noindex`);
    } else if (text.includes("500%") || text.includes("Internal Prototype")) {
      fail(`${path}: stale demo-style portfolio copy in HTML`);
    } else if (!text.includes("studio") && !text.includes("concept")) {
      fail(`${path}: missing studio/concept labelling`);
    } else {
      pass(`${path}: studio portfolio hygiene`);
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
