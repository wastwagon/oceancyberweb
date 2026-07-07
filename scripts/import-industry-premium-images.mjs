/**
 * Imports AI-generated premium industry UI ads into public/images/industries/.
 * Source PNGs: assets/industry-{key}.png
 * Run: npm run import:industry-ui
 */
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir =
  process.argv[2] ?? path.join(__dirname, "../assets/industry-premium");
const outDir = path.join(__dirname, "../public/images/industries");

const map = [
  ["industry-finance.png", "finance.png"],
  ["industry-healthcare.png", "healthcare.png"],
  ["industry-education.png", "education.png"],
  ["industry-tourism.png", "tourism.png"],
  ["industry-retail.png", "retail.png"],
  ["industry-legal.png", "legal.png"],
  ["industry-logistics.png", "logistics.png"],
  ["industry-real-estate.png", "real-estate.png"],
  ["industry-agriculture.png", "agriculture.png"],
  ["industry-media.png", "media.png"],
  ["industry-government.png", "government.png"],
  ["industry-energy.png", "energy.png"],
];

mkdirSync(outDir, { recursive: true });

for (const [srcName, destName] of map) {
  const input = path.join(assetsDir, srcName);
  if (!existsSync(input)) {
    console.warn("Skip (missing):", srcName);
    continue;
  }
  const output = path.join(outDir, destName);
  await sharp(input)
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(output);
  console.log("Wrote", output);
}

console.log("Done.");
