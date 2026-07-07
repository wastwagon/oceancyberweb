/**
 * Export Google Business Profile–ready JPEGs with geo EXIF + IPTC metadata.
 *
 * Note: Google strips EXIF on GBP upload, so geo tags mainly help website SEO
 * and your own asset catalog. For GBP, descriptive filenames and visual
 * relevance matter more than embedded GPS.
 *
 * Requires: sharp (project dep) + exiftool (brew install exiftool)
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
} from "./image-geo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.join(__dirname, "../public/images");
const outRoot = path.join(__dirname, "../exports/google-business-profile");
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

function fileBaseForItem(item) {
  return gbpJpegBaseName(item);
}

async function exportCatalog(category, items) {
  const categoryDir = path.join(outRoot, category);
  mkdirSync(categoryDir, { recursive: true });
  const exported = [];

  for (const item of items) {
    const input = path.join(imagesRoot, item.path);
    if (!existsSync(input)) {
      console.warn(`Skip (missing): ${item.path}`);
      continue;
    }

    const fileBase = fileBaseForItem(item);
    const output = path.join(categoryDir, `${fileBase}.jpg`);

    await sharp(input)
      .resize(1920, 1080, { fit: "cover", position: "centre" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(output);

    applyGeoMetadata(output, item);

    exported.push({
      file: path.join(category, `${fileBase}.jpg`),
      category,
      title: item.title,
      gbpCategory: category === "services" ? "Services" : "At work",
      gps: {
        latitude: business.latitude,
        longitude: business.longitude,
      },
      address: fullAddress,
    });

    console.log(`Exported [${category}]:`, output);
  }

  return exported;
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
  note:
    "Google Business Profile strips EXIF on upload. Geo tags help website SEO and asset management; for GBP, use descriptive filenames and relevant visuals.",
  uploadGuide: gbpCategoryHints,
  counts: {},
  images: [],
};

for (const [category, items] of Object.entries(gbpCatalogs)) {
  const exported = await exportCatalog(category, items);
  manifest.counts[category] = exported.length;
  manifest.images.push(...exported);
}

writeFileSync(
  path.join(outRoot, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

const total = manifest.images.length;
console.log(`\nDone. ${total} images exported to ${outRoot}`);
console.log("Counts:", manifest.counts);
