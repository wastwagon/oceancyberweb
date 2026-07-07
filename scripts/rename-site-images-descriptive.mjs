/**
 * Renames marketing images to descriptive SEO filenames.
 * Run: npm run rename:site-images
 */
import { existsSync, renameSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { legacyImagePaths, siteImageCatalog } from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.join(__dirname, "../public/images");

function pairsFromSlugCatalog() {
  return Object.keys(legacyImagePaths.insights).map((slug) => {
    const from = legacyImagePaths.insights[slug];
    const to = siteImageCatalog.find((item) => item.slug === slug)?.path;
    return to ? [from, to] : null;
  });
}

function pairsFromKeyedCatalog(legacyGroup, filterFn) {
  const targets = siteImageCatalog.filter(filterFn);
  const keys = Object.keys(legacyGroup);
  return keys.map((key, index) => [legacyGroup[key], targets[index]?.path]);
}

const renamePairs = [
  ...pairsFromSlugCatalog(),
  ...pairsFromKeyedCatalog(
    legacyImagePaths.services,
    (item) => item.path.startsWith("hero-services/"),
  ),
  ...pairsFromKeyedCatalog(
    legacyImagePaths.portfolio,
    (item) =>
      item.path.startsWith("portfolio-showcase/") ||
      item.path.startsWith("oceancyber-accra-portfolio-"),
  ),
  ...pairsFromKeyedCatalog(
    legacyImagePaths.work,
    (item) => item.path.startsWith("agency-bento/"),
  ),
].filter((pair) => pair && pair[0] && pair[1] && pair[0] !== pair[1]);

let renamed = 0;
let skipped = 0;

for (const [fromRel, toRel] of renamePairs) {
  const from = path.join(imagesRoot, fromRel);
  const to = path.join(imagesRoot, toRel);

  if (existsSync(to)) {
    skipped += 1;
    continue;
  }

  if (!existsSync(from)) {
    console.warn(`Skip (missing source): ${fromRel}`);
    skipped += 1;
    continue;
  }

  renameSync(from, to);
  renamed += 1;
  console.log(`Renamed: ${fromRel} → ${toRel}`);
}

console.log(`\nDone. ${renamed} renamed, ${skipped} skipped.`);
