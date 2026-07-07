/**
 * Converts AI-generated PNG covers into optimized WebP for /insights.
 * Place PNGs named {slug}.png in assets/insight-covers/, then run:
 *   node scripts/import-insight-cover-pngs.mjs
 */
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { siteImageCatalog } from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir =
  process.argv[2] ?? path.join(__dirname, "../assets/insight-covers");
const imagesRoot = path.join(__dirname, "../public/images");

const insightItems = siteImageCatalog.filter((item) => item.slug);

for (const item of insightItems) {
  const input = path.join(assetsDir, `${item.slug}.png`);
  if (!existsSync(input)) {
    console.warn("Skip (missing):", item.slug);
    continue;
  }
  const output = path.join(imagesRoot, item.path);
  await sharp(input)
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .webp({ quality: 90 })
    .toFile(output);
  console.log("Wrote", output);
}
