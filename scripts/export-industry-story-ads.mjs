/**
 * Export single-phone Story close-ups for Instagram/Facebook Reels & Stories.
 * Output: exports/social-ads/industries/stories-closeup/
 *
 * Run: npm run export:industry-stories
 */
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { business } from "./image-geo-config.mjs";
import { industryImageExports } from "./industry-image-exports.mjs";
import { industryStoryExports } from "./industry-story-exports.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storiesRoot = path.join(__dirname, "../assets/industry-stories");
const outRoot = path.join(
  __dirname,
  "../exports/social-ads/industries/stories-closeup",
);

const metaBySlug = Object.fromEntries(
  industryImageExports.map((item) => [item.slug, item]),
);

function assertExiftool() {
  try {
    execFileSync("exiftool", ["-ver"], { stdio: ["ignore", "pipe", "ignore"] });
    return true;
  } catch {
    return false;
  }
}

function applyGeo(jpegPath, title, description) {
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
mkdirSync(outRoot, { recursive: true });

const manifest = [];

for (const item of industryStoryExports) {
  const input = path.join(storiesRoot, item.file);
  const meta = metaBySlug[item.slug];
  if (!existsSync(input) || !meta) {
    console.warn("Skip (missing):", item.file);
    continue;
  }

  const base = `oceancyber-accra-${item.slug}-mobile-ui-story-ghana`;
  const output = path.join(outRoot, `${base}.jpg`);

  await sharp(input)
    .resize(1080, 1920, { fit: "cover", position: "centre" })
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(output);

  if (hasExiftool) {
    applyGeo(
      output,
      `${meta.title} — Mobile UI Story`,
      meta.description,
    );
  }

  manifest.push({
    industry: meta.title,
    slug: item.slug,
    file: `${base}.jpg`,
    format: "1080×1920 (9:16)",
    useFor: "Instagram Stories, Facebook Stories, Reels, TikTok",
  });

  console.log("Exported:", item.slug);
}

writeFileSync(
  path.join(outRoot, "manifest.json"),
  JSON.stringify(
    {
      note: "Single-phone close-up carousel variants for vertical social ads.",
      count: manifest.length,
      industries: manifest,
    },
    null,
    2,
  ),
);

console.log(`\nDone. ${manifest.length} Story close-ups → ${outRoot}`);
