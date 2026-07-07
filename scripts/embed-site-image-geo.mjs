/**
 * Embeds GPS + IPTC metadata into live site images (WebP/PNG) under public/images/.
 * Run after generating or replacing marketing images: npm run embed:site-image-geo
 *
 * Requires: sharp (project dep) + exiftool (brew install exiftool)
 */
import { execFileSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { business, siteImageCatalog } from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.join(__dirname, "../public/images");

function assertExiftool() {
  try {
    execFileSync("exiftool", ["-ver"], { stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    console.error("exiftool is required. Install with: brew install exiftool");
    process.exit(1);
  }
}

function embedGeoMetadata(imagePath, meta) {
  const locationLabel = `${business.locality}, ${business.country}`;
  const keywords = meta.keywords.slice(0, 6).join(", ");

  try {
    execFileSync(
      "exiftool",
      [
        "-overwrite_original",
        `-GPSLatitude=${business.latitude}`,
        `-GPSLongitude=${Math.abs(business.longitude)}`,
        "-GPSLatitudeRef=N",
        "-GPSLongitudeRef=W",
        "-GPSAltitude=61",
        `-XMP:Location=${locationLabel}`,
        `-XMP:City=${business.locality}`,
        `-XMP:Country=${business.country}`,
        `-IPTC:City=${business.locality}`,
        "-IPTC:Province-State=Greater Accra",
        `-IPTC:Country-PrimaryLocationName=${business.country}`,
        `-IPTC:Sub-location=${business.street}`,
        `-Title=${meta.title}`,
        `-Description=${meta.description}`,
        `-Caption-Abstract=${meta.description}`,
        `-Keywords=${keywords}`,
        `-Artist=${business.name}`,
        `-Copyright=${business.name}`,
        `-ImageDescription=${meta.description}`,
        imagePath,
      ],
      { stdio: "pipe" },
    );
    return true;
  } catch (error) {
    console.warn(`Geo tag failed for ${imagePath}:`, error.stderr?.toString() || error.message);
    return false;
  }
}

async function normalizeWebp(imagePath) {
  const meta = await sharp(imagePath).metadata();
  if (imagePath.endsWith(".webp") && meta.format !== "webp") {
    const buffer = await sharp(imagePath).webp({ quality: 90 }).toBuffer();
    await sharp(buffer).toFile(imagePath);
  }
}

assertExiftool();

let embedded = 0;
let skipped = 0;

for (const item of siteImageCatalog) {
  const imagePath = path.join(imagesRoot, item.path);
  if (!existsSync(imagePath)) {
    console.warn(`Skip (missing): ${item.path}`);
    skipped += 1;
    continue;
  }

  try {
    await normalizeWebp(imagePath);
  } catch (error) {
    console.warn(`Skip (normalize failed): ${item.path}`, error.message);
    skipped += 1;
    continue;
  }

  if (embedGeoMetadata(imagePath, item)) {
    embedded += 1;
    console.log(`Embedded geo: ${item.path}`);
  } else {
    skipped += 1;
  }
}

console.log(`\nDone. ${embedded} images tagged, ${skipped} skipped.`);
