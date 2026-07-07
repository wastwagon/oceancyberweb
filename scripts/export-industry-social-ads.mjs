/**
 * Export industry premium UI ads for Google, Facebook, and Instagram.
 * Output: exports/social-ads/industries/
 *
 * Sizes:
 *   - landscape/  1920×1080 (16:9) — Google Display, YouTube
 *   - square/     1080×1080 (1:1)  — Facebook/Instagram feed
 *   - portrait/   1080×1350 (4:5)  — Instagram feed
 *   - stories/    1080×1920 (9:16) — Stories/Reels
 *   - jpg/        GBP-compatible JPEG copies (16:9)
 *
 * Run: npm run export:industry-social-ads
 */
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { industryImageExports } from "./industry-image-exports.mjs";
import { business } from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.join(__dirname, "../public/images/industries");
const outRoot = path.join(__dirname, "../exports/social-ads/industries");

const sizes = {
  landscape: { width: 1920, height: 1080, ext: "jpg", quality: 92 },
  square: { width: 1080, height: 1080, ext: "jpg", quality: 92 },
  portrait: { width: 1080, height: 1350, ext: "jpg", quality: 92 },
  stories: { width: 1080, height: 1920, ext: "jpg", quality: 92 },
};

function assertExiftool() {
  try {
    execFileSync("exiftool", ["-ver"], { stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    console.warn("exiftool not found — skipping geo metadata on exports");
    return false;
  }
  return true;
}

function applyGeo(jpegPath, title, description) {
  const locationLabel = `${business.locality}, ${business.country}`;
  execFileSync(
    "exiftool",
    [
      "-overwrite_original",
      `-GPSLatitude=${business.latitude}`,
      `-GPSLongitude=${Math.abs(business.longitude)}`,
      "-GPSLatitudeRef=N",
      "-GPSLongitudeRef=W",
      `-Title=${title}`,
      `-Description=${description}`,
      `-Artist=${business.name}`,
      jpegPath,
    ],
    { stdio: "pipe" },
  );
}

const hasExiftool = assertExiftool();
const manifest = [];

for (const dir of Object.keys(sizes)) {
  mkdirSync(path.join(outRoot, dir), { recursive: true });
}

for (const item of industryImageExports) {
  const input = path.join(imagesRoot, item.file);
  if (!existsSync(input)) {
    console.warn("Skip (missing):", item.file);
    continue;
  }

  const base = `oceancyber-accra-${item.slug}-ui-design-ghana`;

  for (const [folder, spec] of Object.entries(sizes)) {
    const output = path.join(outRoot, folder, `${base}.${spec.ext}`);
    await sharp(input)
      .resize(spec.width, spec.height, { fit: "cover", position: "centre" })
      .jpeg({ quality: spec.quality, mozjpeg: true })
      .toFile(output);

    if (hasExiftool) {
      applyGeo(
        output,
        `${item.title} — UI/UX by OceanCyber`,
        item.description,
      );
    }
  }

  manifest.push({
    industry: item.title,
    slug: item.slug,
    files: Object.fromEntries(
      Object.entries(sizes).map(([folder, spec]) => [
        folder,
        `${folder}/${base}.${spec.ext}`,
      ]),
    ),
  });

  console.log("Exported:", item.slug);
}

writeFileSync(
  path.join(outRoot, "manifest.json"),
  JSON.stringify(
    {
      note: "Premium industry UI ads for Google, Facebook, and Instagram.",
      uploadGuide: {
        landscape: "Google Display, YouTube, Facebook link ads",
        square: "Facebook & Instagram feed (1:1)",
        portrait: "Instagram feed (4:5 recommended)",
        stories: "Instagram/Facebook Stories & Reels (9:16, cropped from landscape masters)",
        storiesCloseup:
          "Single-phone close-ups — run npm run export:industry-stories → stories-closeup/",
      },
      industries: manifest,
    },
    null,
    2,
  ),
);

console.log(`\nDone. ${manifest.length} industries × 4 sizes → ${outRoot}`);
