#!/usr/bin/env node
/**
 * Ensures site-image-paths.ts targets exist on disk and migration config is aligned.
 * Run: npm run verify:image-paths
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildLegacyRenamePairs, siteImageCatalog } from "./image-geo-config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imagesRoot = resolve(root, "public/images");
const failures = [];

const sitePathsSource = readFileSync(resolve(root, "lib/seo/site-image-paths.ts"), "utf8");
const imagePathRe = /"(\/images\/[^"]+)"/g;
const referenced = new Set();
let match;
while ((match = imagePathRe.exec(sitePathsSource)) !== null) {
  referenced.add(match[1]);
}

for (const publicPath of referenced) {
  const rel = publicPath.replace(/^\/images\//, "");
  const abs = resolve(imagesRoot, rel);
  if (!existsSync(abs)) {
    failures.push(`site-image-paths: missing file public/images/${rel}`);
  }
}

for (const item of siteImageCatalog) {
  const abs = resolve(imagesRoot, item.path);
  if (!existsSync(abs)) {
    failures.push(`image-geo-config catalog: missing public/images/${item.path}`);
  }
}

for (const [, to] of buildLegacyRenamePairs()) {
  const abs = resolve(imagesRoot, to);
  if (!existsSync(abs)) {
    failures.push(`legacy rename target missing: public/images/${to}`);
  }
}

const geoConfig = readFileSync(resolve(root, "scripts/image-geo-config.mjs"), "utf8");
if (/prototype delivered/i.test(geoConfig)) {
  failures.push("image-geo-config: Creative Hub catalog must not say prototype delivered");
}

const bannedInMarketing = [
  "Juelle Hair.webp",
  "Fitch Avisory",
  "creative-template.png",
  "Africa Trade Chamber.webp",
];
const marketingRoots = ["app", "components", "lib"];
for (const relRoot of marketingRoots) {
  const absRoot = resolve(root, relRoot);
  if (!existsSync(absRoot)) continue;
  const stack = [absRoot];
  while (stack.length) {
    const dir = stack.pop();
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (/\.(tsx?|jsx?)$/.test(ent.name)) {
        const text = readFileSync(full, "utf8");
        for (const banned of bannedInMarketing) {
          if (text.includes(banned)) {
            failures.push(`${full.replace(root + "/", "")}: references removed legacy asset ${banned}`);
          }
        }
      }
    }
  }
}

const insightsJsonPath = resolve(root, "public/data/insights.json");
if (existsSync(insightsJsonPath)) {
  const insights = JSON.parse(readFileSync(insightsJsonPath, "utf8"));
  if (Array.isArray(insights)) {
    for (const post of insights) {
      const img = post?.image;
      if (typeof img !== "string" || !img.startsWith("/images/")) continue;
      if (/\s/.test(img)) {
        failures.push(`insights.json slug "${post.slug}": image path contains spaces (${img})`);
        continue;
      }
      const rel = img.replace(/^\/images\//, "");
      if (!existsSync(resolve(imagesRoot, rel))) {
        failures.push(`insights.json slug "${post.slug}": missing public/images/${rel}`);
      }
    }
  }
}

if (failures.length) {
  console.error("Image path verification failed:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(
  `Image path verification passed (${referenced.size} site-image-paths refs, ${siteImageCatalog.length} catalog entries).`,
);
