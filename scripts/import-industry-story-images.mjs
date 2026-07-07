/**
 * Imports AI-generated Story close-up PNGs into assets/industry-stories/.
 * Run: npm run import:industry-stories
 */
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { industryStoryExports } from "./industry-story-exports.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir =
  process.argv[2] ?? path.join(__dirname, "../assets/industry-stories-source");
const outDir = path.join(__dirname, "../assets/industry-stories");

mkdirSync(outDir, { recursive: true });

for (const item of industryStoryExports) {
  const input = path.join(sourceDir, item.file);
  if (!existsSync(input)) {
    console.warn("Skip (missing):", item.file);
    continue;
  }
  const output = path.join(outDir, item.file);
  await sharp(input)
    .resize(1080, 1920, { fit: "cover", position: "centre" })
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(output);
  console.log("Wrote", output);
}

console.log("Done.");
