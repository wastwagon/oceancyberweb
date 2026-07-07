/**
 * Export Google Business Profile–ready JPEGs with geo EXIF + IPTC metadata.
 *
 * Google Business Profile does not accept WebP — this script converts all
 * marketing images to high-quality JPG in a dedicated upload folder.
 *
 * Output: exports/google-business-profile-jpg/
 *
 * Requires: sharp + exiftool (brew install exiftool)
 * Run: npm run export:gbp-photos
 */
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import {
  business,
  gbpCatalogs,
  gbpJpegBaseName,
  siteImageCatalog,
} from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.join(__dirname, "../public/images");
const outRoot = path.join(__dirname, "../exports/google-business-profile-jpg");
const fullAddress = `${business.street}, ${business.locality}, ${business.country}`;

const gbpCategoryHints = {
  insights: "GBP Posts or At work — thought leadership visuals",
  services: "Services category — showcase what you offer",
  portfolio: "At work — client project highlights",
  work: "At work — product and design deliverables",
};

function assertExiftool() {
  try {
    execFileSync("exiftool", ["-ver"], { stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    console.error("exiftool is required. Install with: brew install exiftool");
    process.exit(1);
  }
}

function applyGeoMetadata(imagePath, meta) {
  const locationLabel = `${business.locality}, ${business.country}`;
  const keywords = meta.keywords.slice(0, 6).join(", ");

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
}

async function exportItem(item, outputDir, category) {
  const input = path.join(imagesRoot, item.path);
  if (!existsSync(input)) {
    console.warn(`Skip (missing): ${item.path}`);
    return null;
  }

  const fileBase = gbpJpegBaseName(item);
  const output = path.join(outputDir, `${fileBase}.jpg`);

  await sharp(input)
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);

  applyGeoMetadata(output, item);

  const gbpCategory =
    item.gbpCategory ?? (category === "services" ? "Services" : "At work");

  console.log(`Exported: ${path.basename(output)}`);

  return {
    file: `${fileBase}.jpg`,
    category,
    title: item.title,
    gbpCategory,
    gps: {
      latitude: business.latitude,
      longitude: business.longitude,
    },
    address: fullAddress,
  };
}

mkdirSync(outRoot, { recursive: true });
assertExiftool();

const manifest = {
  business: {
    name: business.name,
    address: fullAddress,
    coordinates: {
      latitude: business.latitude,
      longitude: business.longitude,
    },
  },
  format: "JPEG (.jpg) — for Google Business Profile upload only",
  note:
    "Site continues to use WebP. Geo EXIF is embedded for your records; Google may strip it on upload. Descriptive filenames are preserved.",
  uploadGuide: gbpCategoryHints,
  counts: {},
  images: [],
};

// Flat folder — easiest for drag-and-drop GBP upload
for (const item of siteImageCatalog) {
  const category =
    Object.entries(gbpCatalogs).find(([, items]) => items.includes(item))?.[0] ??
    "other";
  const exported = await exportItem(item, outRoot, category);
  if (exported) manifest.images.push(exported);
}

for (const [category, items] of Object.entries(gbpCatalogs)) {
  manifest.counts[category] = items.filter((item) =>
    manifest.images.some((img) => img.title === item.title),
  ).length;
}

writeFileSync(
  path.join(outRoot, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(`\nDone. ${manifest.images.length} JPGs in ${outRoot}`);
