/**
 * Converts AI-generated PNG covers into optimized WebP for /insights.
 * Place PNGs named {slug}.png in assets/insight-covers/, then run:
 *   node scripts/import-insight-cover-pngs.mjs
 * Or pass a custom folder:
 *   node scripts/import-insight-cover-pngs.mjs /path/to/pngs
 */
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir =
  process.argv[2] ?? path.join(__dirname, "../assets/insight-covers");
const outDir = path.join(__dirname, "../public/images/insights");

const slugs = [
  "future-cybersecurity-africa",
  "digital-transformation-ghana",
  "fintech-banking-unbanked",
  "ecommerce-emerging-markets",
  "ai-ml-practical",
  "ghana-momo-economy",
  "ghana-cybersecurity-trends",
  "ecommerce-growth-ghana",
  "data-privacy-compliance",
];

for (const slug of slugs) {
  const input = path.join(assetsDir, `${slug}.png`);
  if (!existsSync(input)) {
    console.warn("Skip (missing):", slug);
    continue;
  }
  const output = path.join(outDir, `${slug}.webp`);
  await sharp(input)
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .webp({ quality: 90 })
    .toFile(output);
  console.log("Wrote", output);
}
