#!/usr/bin/env node
/**
 * Validates local SEO artifacts in repo (no network).
 * Usage: npm run verify:local-seo
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function readJson(rel) {
  const p = resolve(root, rel);
  if (!existsSync(p)) {
    failures.push(`Missing file: ${rel}`);
    return null;
  }
  return JSON.parse(readFileSync(p, "utf8"));
}

const help = readJson("public/data/help-center.json");
if (help) {
  const ids = new Set(help.map((a) => a.id));
  for (const id of ["google-maps-listing", "find-web-company-ghana", "pos-vs-ecommerce"]) {
    if (!ids.has(id)) failures.push(`help-center.json: missing article id "${id}"`);
  }
}

const chatReply = readFileSync(resolve(root, "lib/chat-reply.ts"), "utf8");
if (!chatReply.includes("dwumapos-for-ghana-shops")) {
  failures.push("chat-reply.ts: DwumaPOS guide routing missing");
}

const insights = readJson("public/data/insights.json");
if (insights) {
  const slugs = new Set(insights.map((p) => p.slug));
  for (const slug of ["google-maps-web-design-ghana-2026", "pos-vs-ecommerce-ghana-2026"]) {
    if (!slugs.has(slug)) {
      failures.push(`insights.json: missing slug ${slug}`);
    }
  }
}

const menu = readFileSync(resolve(root, "lib/navigation/menu.ts"), "utf8");
if (!menu.includes("servicesGeoMegaMenuItems")) {
  failures.push("menu.ts: services geo mega-menu import missing");
}
if (!menu.includes("Best website developers in Ghana")) {
  failures.push("menu.ts: footer missing Best website developers in Ghana");
}

const market = readFileSync(resolve(root, "lib/seo/ghana-local-market.ts"), "utf8");
if (!market.includes("buildGbpProfileDescription")) {
  failures.push("ghana-local-market.ts: GBP copy helpers missing");
}

const geoNav = readFileSync(resolve(root, "lib/navigation/services-geo-nav.ts"), "utf8");
const geoLinks = [...geoNav.matchAll(/link: "(\/services\/[^"]+)"/g)].map((m) => m[1]);
const backendNav = readFileSync(
  resolve(root, "backend/src/navigation/navigation.service.ts"),
  "utf8",
);
for (const link of geoLinks) {
  if (!backendNav.includes(link)) {
    failures.push(`backend navigation missing geo link ${link}`);
  }
}

const requiredFiles = [
  "components/marketing/GbpCopyKit.tsx",
  "lib/navigation/services-geo-nav.ts",
  "scripts/sync-help-center-defaults.ts",
  "scripts/sync-insights-defaults.ts",
  "scripts/verify-image-paths.mjs",
  "components/seo/WebDesignGeoPageView.tsx",
];
for (const rel of requiredFiles) {
  if (!existsSync(resolve(root, rel))) failures.push(`Missing file: ${rel}`);
}

const intentPages = readFileSync(resolve(root, "lib/seo/intent-pages.ts"), "utf8");
for (const slug of [
  "dwumapos-for-ghana-shops",
  "dwumapos-restaurant-pos-ghana",
  "dwumapos-pharmacy-pos-ghana",
]) {
  if (!intentPages.includes(`slug: "${slug}"`)) {
    failures.push(`intent-pages.ts: DwumaPOS guide missing (${slug})`);
  }
}
if (intentPages.includes("Up to 50 branches") || intentPages.includes("when you open the shop for sales")) {
  failures.push("intent-pages.ts: outdated DwumaPOS branch or trial copy");
}
for (const metaTitle of [
  "DwumaPOS Guide for Ghana Shops | OceanCyber",
  "Restaurant POS on DwumaPOS | OceanCyber",
  "Pharmacy POS on DwumaPOS | OceanCyber",
]) {
  if (!intentPages.includes(`metaTitle: "${metaTitle}"`)) {
    failures.push(`intent-pages.ts: DwumaPOS meta title missing (${metaTitle})`);
  }
}
if (!intentPages.includes("Your 30-day free trial begins when you sign up")) {
  failures.push("intent-pages.ts: DwumaPOS trial-on-signup copy missing");
}
if (!intentPages.includes('href: "/guides/dwumapos-for-ghana-shops"')) {
  failures.push("intent-pages.ts: internal Dwuma guide cross-links missing");
}

const projectsFallback = readFileSync(resolve(root, "lib/data/projects.ts"), "utf8");
for (const banned of [
  "Internal Prototype",
  "500%",
  "prototype demonstrates",
]) {
  if (projectsFallback.includes(banned)) {
    failures.push(`projects.ts: demo-style portfolio copy still present (${banned})`);
  }
}
const creativeHubIdx = projectsFallback.indexOf('title: "OceanCyber Creative Hub"');
if (creativeHubIdx === -1) {
  failures.push("projects.ts: missing creative-hub-template entry");
} else {
  const nextProjectIdx = projectsFallback.indexOf('title: "EGP Ghana"', creativeHubIdx);
  const blockEnd = nextProjectIdx === -1 ? creativeHubIdx + 1400 : nextProjectIdx;
  const block = projectsFallback.slice(creativeHubIdx, blockEnd);
  if (!block.includes('slug: "creative-hub-template"')) {
    failures.push("projects.ts: OceanCyber Creative Hub entry missing slug creative-hub-template");
  }
  if (!block.includes("in-house concept") && !block.includes("CONCEPT_PORTFOLIO")) {
    failures.push("projects.ts: creative-hub-template must label in-house concept");
  }
  if (block.includes("testimonial:") || block.includes("metrics:")) {
    failures.push("projects.ts: creative-hub-template must not include testimonial or metrics");
  }
}

const caseStudies = readFileSync(resolve(root, "lib/data/case-studies.ts"), "utf8");
if (caseStudies.includes('"creative-hub-template"') && caseStudies.includes("challenge:")) {
  failures.push("case-studies.ts: creative-hub must not use client challenge/solution/impact narrative");
}
const conceptNarrativePath = resolve(root, "lib/marketing/concept-portfolio-narrative.ts");
if (!existsSync(conceptNarrativePath)) {
  failures.push("Missing concept-portfolio-narrative.ts for in-house portfolio pages");
} else {
  const conceptNarr = readFileSync(conceptNarrativePath, "utf8");
  if (!conceptNarr.includes("creative-hub-template") || !conceptNarr.includes("labelling")) {
    failures.push("concept-portfolio-narrative.ts: must define creative-hub in-house labelling copy");
  }
}

if (!existsSync(resolve(root, "lib/portfolio/concept-fallback-overlay.ts"))) {
  failures.push("Missing concept-fallback-overlay.ts for DB stale concept copy");
}

if (!existsSync(resolve(root, "lib/marketing/agency-positioning.ts"))) {
  failures.push("Missing agency-positioning.ts canonical company identity");
} else {
  const agencyPos = readFileSync(resolve(root, "lib/marketing/agency-positioning.ts"), "utf8");
  if (!agencyPos.includes("Website and mobile application development agency")) {
    failures.push("agency-positioning.ts: must define website and mobile application development agency");
  }
  if (!agencyPos.includes("buildSiteMetaDescription")) {
    failures.push("agency-positioning.ts: must export buildSiteMetaDescription for root SEO");
  }
}

const rootLayout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");
if (!rootLayout.includes("buildSiteMetaDescription")) {
  failures.push("app/layout.tsx: must use buildSiteMetaDescription from agency-positioning");
}
if (!rootLayout.includes('href="/llms.txt"')) {
  failures.push("app/layout.tsx: missing alternate link to /llms.txt for LLM discovery");
}

const sitemapTs = readFileSync(resolve(root, "app/sitemap.ts"), "utf8");
if (!sitemapTs.includes('"/llms.txt"')) {
  failures.push("app/sitemap.ts: must list /llms.txt for crawlers and agents");
}
const homePage = readFileSync(resolve(root, "app/page.tsx"), "utf8");
if (!homePage.includes("buildSiteMetaDescription")) {
  failures.push("app/page.tsx: must use buildSiteMetaDescription from agency-positioning");
}

const siteFacts = readFileSync(resolve(root, "lib/site-facts.ts"), "utf8");
if (!siteFacts.includes('label: "What we are"')) {
  failures.push("site-facts.ts: missing What we are fact for /facts and llms.txt");
}

const llmsRoute = resolve(root, "app/llms.txt/route.ts");
if (existsSync(llmsRoute)) {
  const llmsSrc = readFileSync(llmsRoute, "utf8");
  if (!llmsSrc.includes("Social proof (Google reviews)")) {
    failures.push("llms.txt route: missing Social proof (Google reviews) section");
  }
  if (!llmsSrc.includes("formatLlmsGoogleReviewExcerpts")) {
    failures.push("llms.txt route: must include Google review excerpts for AI agents");
  }
}

const portfolioSourceTs = readFileSync(resolve(root, "lib/types/portfolio-source.ts"), "utf8");
if (!portfolioSourceTs.includes('"concept"') || portfolioSourceTs.includes('studio: "Concept work"')) {
  failures.push("portfolio-source.ts: PortfolioSource must use concept (not studio key)");
}

const legacyAssignRe = /portfolioSource:\s*["']studio["']/g;
for (const rel of ["lib/portfolio", "lib/data", "prisma/seed.ts"]) {
  const abs = resolve(root, rel);
  if (!existsSync(abs)) continue;
  const files = abs.endsWith(".ts") ? [abs] : collectSourceFiles(abs);
  for (const full of files) {
    if (full.includes("portfolio-source.ts")) continue;
    const text = readFileSync(full, "utf8");
    if (legacyAssignRe.test(text)) {
      failures.push(
        `${full.replace(root + "/", "")}: use portfolioSource "concept" (legacy studio only via normalizePortfolioSource)`,
      );
    }
    legacyAssignRe.lastIndex = 0;
  }
}

/** User-facing copy must not position OceanCyber as a "studio company". */
const forbiddenPositioning = [
  "Accra studio",
  "one Accra studio",
  "Studio concept",
  "studio concept",
  "OceanCyber studio",
  "same studio that builds",
  "design studio in Accra",
  "we are a studio",
  "creative studio",
];
const positioningScanRoots = [
  "lib/startup-agency",
  "lib/seo",
  "lib/marketing",
  "lib/data/projects.ts",
  "lib/data/case-studies.ts",
  "lib/site-facts.ts",
  "components/startup-agency",
  "components/portfolio",
  "components/seo",
  "app/portfolio",
  "app/creative-hub",
  "app/llms.txt",
];
for (const rel of positioningScanRoots) {
  const abs = resolve(root, rel);
  if (!existsSync(abs)) continue;
  const files =
    abs.endsWith(".ts") ? [abs] : collectSourceFiles(abs);
  for (const full of files) {
    const text = readFileSync(full, "utf8");
    for (const phrase of forbiddenPositioning) {
      if (text.includes(phrase)) {
        failures.push(
          `${full.replace(root + "/", "")}: company positioning must not use "${phrase}" (use agency / in-house concept)`,
        );
      }
    }
  }
}

function collectSourceFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    for (const ent of readdirSync(d, { withFileTypes: true })) {
      const full = resolve(d, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (/\.(tsx?|jsx?)$/.test(ent.name)) out.push(full);
    }
  }
  return out;
}

const marketingSourceRoots = [
  "app",
  "lib/data",
  "lib/startup-agency",
  "lib/seo",
  "components/portfolio",
  "components/seo",
  "components/startup-agency",
];
const spacedImagePathRe = /\/images\/[^"'`\n]*\s[^"'`\n]*/g;
for (const relRoot of marketingSourceRoots) {
  const absRoot = resolve(root, relRoot);
  if (!existsSync(absRoot)) continue;
  const stack = [absRoot];
  while (stack.length) {
    const dir = stack.pop();
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (/\.(tsx?|jsx?|mjs)$/.test(ent.name)) {
        const text = readFileSync(full, "utf8");
        const hit = text.match(spacedImagePathRe);
        if (hit) {
          failures.push(`${full.replace(root + "/", "")}: legacy image path with spaces (${hit[0]})`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error("Local SEO content verification failed:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log("Local SEO content verification passed.");
