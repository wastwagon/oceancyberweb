/**
 * Renames marketing images to descriptive SEO filenames.
 * Run: npm run rename:site-images
 */
import { existsSync, renameSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildLegacyRenamePairs } from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.join(__dirname, "../public/images");

const renamePairs = buildLegacyRenamePairs();

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
    skipped += 1;
    continue;
  }

  renameSync(from, to);
  renamed += 1;
  console.log(`Renamed: ${fromRel} → ${toRel}`);
}

console.log(`\nDone. ${renamed} renamed, ${skipped} skipped (missing source or target already exists).`);
