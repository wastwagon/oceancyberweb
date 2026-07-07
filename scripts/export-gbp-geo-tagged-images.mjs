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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imagesRoot = path.join(root, "public/images");
const outRoot = path.join(root, "exports/google-business-profile");

/** Keep in sync with lib/startup-agency/google-business.ts */
const business = {
  name: "OceanCyber",
  street: "232 Nii Kwashiefio Avenue",
  locality: "Accra",
  country: "Ghana",
  countryCode: "GH",
  latitude: 5.6173486,
  longitude: -0.2252809,
};

const fullAddress = `${business.street}, ${business.locality}, ${business.country}`;
const baseKeywords = ["OceanCyber", "Accra", "Ghana"];

const catalogs = {
  insights: [
    {
      input: "insights/future-cybersecurity-africa.webp",
      fileBase: "oceancyber-accra-cybersecurity-africa-insights",
      title: "Cybersecurity insights for African businesses",
      description:
        "OceanCyber editorial on cybersecurity trends across Africa — Accra, Ghana.",
      keywords: [...baseKeywords, "cybersecurity", "Africa"],
      gbpCategory: "At work",
    },
    {
      input: "insights/digital-transformation-ghana.webp",
      fileBase: "oceancyber-accra-digital-transformation-ghana",
      title: "Digital transformation in Ghana",
      description:
        "How Ghanaian businesses adopt digital platforms — OceanCyber, Accra.",
      keywords: [...baseKeywords, "digital transformation"],
      gbpCategory: "At work",
    },
    {
      input: "insights/fintech-banking-unbanked.webp",
      fileBase: "oceancyber-accra-fintech-banking-unbanked",
      title: "Fintech and financial inclusion in Africa",
      description: "Fintech product insights from OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "fintech", "banking"],
      gbpCategory: "At work",
    },
    {
      input: "insights/ecommerce-emerging-markets.webp",
      fileBase: "oceancyber-accra-ecommerce-emerging-markets",
      title: "E-commerce growth in emerging markets",
      description:
        "E-commerce strategy insights from OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "e-commerce"],
      gbpCategory: "At work",
    },
    {
      input: "insights/ai-ml-practical.webp",
      fileBase: "oceancyber-accra-ai-machine-learning",
      title: "Practical AI and machine learning applications",
      description: "AI and ML product insights from OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "AI", "machine learning"],
      gbpCategory: "At work",
    },
    {
      input: "insights/ghana-momo-economy.webp",
      fileBase: "oceancyber-accra-mobile-money-ghana",
      title: "Ghana mobile money economy insights",
      description:
        "Mobile money and fintech insights from OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "mobile money", "MoMo"],
      gbpCategory: "At work",
    },
    {
      input: "insights/ghana-cybersecurity-trends.webp",
      fileBase: "oceancyber-accra-cybersecurity-trends-ghana",
      title: "Cybersecurity trends for Ghanaian businesses",
      description:
        "Threat trends and controls for Ghana SMEs — OceanCyber, Accra.",
      keywords: [...baseKeywords, "cybersecurity", "SME"],
      gbpCategory: "At work",
    },
    {
      input: "insights/ecommerce-growth-ghana.webp",
      fileBase: "oceancyber-accra-ecommerce-growth-ghana",
      title: "Ghana e-commerce growth outlook",
      description:
        "E-commerce growth insights for Ghana merchants — OceanCyber, Accra.",
      keywords: [...baseKeywords, "e-commerce", "retail"],
      gbpCategory: "At work",
    },
    {
      input: "insights/data-privacy-compliance.webp",
      fileBase: "oceancyber-accra-data-privacy-compliance",
      title: "Data privacy and compliance insights",
      description: "Data protection guidance from OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "data privacy", "compliance"],
      gbpCategory: "At work",
    },
  ],
  services: [
    {
      input: "hero-services/hero-ui-ux-brand.webp",
      fileBase: "oceancyber-accra-ui-ux-brand-design",
      title: "UI/UX and brand design services in Accra",
      description:
        "OceanCyber UI/UX and brand design for web and mobile products — Accra, Ghana.",
      keywords: [...baseKeywords, "UI/UX", "brand design"],
      gbpCategory: "Services",
    },
    {
      input: "hero-services/hero-web-development.webp",
      fileBase: "oceancyber-accra-web-development",
      title: "Web development services in Accra",
      description:
        "Custom websites and web applications by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "web development", "website"],
      gbpCategory: "Services",
    },
    {
      input: "hero-services/hero-mobile-apps.webp",
      fileBase: "oceancyber-accra-mobile-app-development",
      title: "Mobile app development in Accra",
      description:
        "iOS and Android app development by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "mobile apps", "iOS", "Android"],
      gbpCategory: "Services",
    },
    {
      input: "hero-services/hero-ecommerce.webp",
      fileBase: "oceancyber-accra-ecommerce-development",
      title: "E-commerce development in Accra",
      description:
        "Online stores and marketplace builds by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "e-commerce", "online store"],
      gbpCategory: "Services",
    },
    {
      input: "hero-services/hero-cyber-security.webp",
      fileBase: "oceancyber-accra-cybersecurity-services",
      title: "Cybersecurity services in Accra",
      description:
        "Security assessments and hardened builds by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "cybersecurity", "security"],
      gbpCategory: "Services",
    },
    {
      input: "hero-services/hero-cloud-hosting.webp",
      fileBase: "oceancyber-accra-cloud-hosting",
      title: "Cloud hosting and managed infrastructure in Accra",
      description:
        "Cloud hosting and managed ICT services by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "cloud hosting", "managed services"],
      gbpCategory: "Services",
    },
  ],
  portfolio: [
    {
      input: "portfolio-showcase/portfolio-creative-hub.webp",
      fileBase: "oceancyber-accra-portfolio-creative-hub",
      title: "OceanCyber Creative Hub — portfolio project",
      description:
        "Premium UI/UX dashboard prototype delivered by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "UI/UX", "dashboard"],
      gbpCategory: "At work",
    },
    {
      input: "portfolio-showcase/portfolio-egp-ghana.webp",
      fileBase: "oceancyber-accra-portfolio-egp-ghana",
      title: "EGP Ghana — fintech web platform",
      description:
        "Financial services platform built by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "fintech", "banking"],
      gbpCategory: "At work",
    },
    {
      input: "portfolio-showcase/portfolio-juelle-hair.webp",
      fileBase: "oceancyber-accra-portfolio-juelle-hair",
      title: "Juelle Hair — e-commerce platform",
      description:
        "E-commerce store built by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "e-commerce"],
      gbpCategory: "At work",
    },
    {
      input: "portfolio-showcase/portfolio-tour-world.webp",
      fileBase: "oceancyber-accra-portfolio-tour-world-tourism",
      title: "Tour World Tourism — booking platform",
      description:
        "Travel booking platform built by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "travel", "booking"],
      gbpCategory: "At work",
    },
    {
      input: "portfolio-showcase/portfolio-fitch-advisory.webp",
      fileBase: "oceancyber-accra-portfolio-fitch-advisory",
      title: "Fitch Advisory — consulting website",
      description:
        "Financial advisory website built by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "consulting"],
      gbpCategory: "At work",
    },
    {
      input: "portfolio-showcase/portfolio-fitch-attorneys.webp",
      fileBase: "oceancyber-accra-portfolio-fitch-attorneys",
      title: "Fitch Attorneys — legal services platform",
      description:
        "Law firm website and portal built by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "legal"],
      gbpCategory: "At work",
    },
    {
      input: "Africa Trade Chamber.webp",
      fileBase: "oceancyber-accra-portfolio-africa-trade-awards",
      title: "Africa Trade Awards — event platform",
      description:
        "Award ceremony and voting platform built by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "portfolio", "events"],
      gbpCategory: "At work",
    },
  ],
  work: [
    {
      input: "agency-bento/agency-bento-fintech-dashboard.webp",
      fileBase: "oceancyber-accra-work-fintech-dashboard",
      title: "Financial services dashboard — OceanCyber work",
      description:
        "Fintech dashboard design and development by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "fintech", "dashboard"],
      gbpCategory: "At work",
    },
    {
      input: "agency-bento/agency-bento-mobile-commerce.webp",
      fileBase: "oceancyber-accra-work-mobile-commerce",
      title: "Mobile commerce experience — OceanCyber work",
      description:
        "Mobile commerce product by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "mobile commerce", "e-commerce"],
      gbpCategory: "At work",
    },
    {
      input: "agency-bento/agency-bento-brand-system.webp",
      fileBase: "oceancyber-accra-work-brand-design-system",
      title: "Brand and design system — OceanCyber work",
      description:
        "Brand identity and design system by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "brand", "design system"],
      gbpCategory: "At work",
    },
    {
      input: "agency-bento/agency-bento-travel-platform.webp",
      fileBase: "oceancyber-accra-work-travel-platform",
      title: "Travel booking platform — OceanCyber work",
      description:
        "Hospitality booking platform by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "travel", "booking"],
      gbpCategory: "At work",
    },
    {
      input: "agency-bento/agency-bento-cybersecurity-platform.webp",
      fileBase: "oceancyber-accra-work-cybersecurity-platform",
      title: "Secure enterprise portal — OceanCyber work",
      description:
        "Cybersecurity-focused web platform by OceanCyber — Accra, Ghana.",
      keywords: [...baseKeywords, "cybersecurity", "enterprise"],
      gbpCategory: "At work",
    },
  ],
};

function assertExiftool() {
  try {
    execFileSync("exiftool", ["-ver"], { stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    console.error("exiftool is required. Install with: brew install exiftool");
    process.exit(1);
  }
}

function applyGeoMetadata(jpegPath, meta) {
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
      jpegPath,
    ],
    { stdio: "pipe" },
  );
}

async function exportCatalog(category, items) {
  const categoryDir = path.join(outRoot, category);
  mkdirSync(categoryDir, { recursive: true });
  const exported = [];

  for (const item of items) {
    const input = path.join(imagesRoot, item.input);
    if (!existsSync(input)) {
      console.warn(`Skip (missing): ${item.input}`);
      continue;
    }

    const output = path.join(categoryDir, `${item.fileBase}.jpg`);
    await sharp(input)
      .resize(1920, 1080, { fit: "cover", position: "centre" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(output);

    applyGeoMetadata(output, item);

    exported.push({
      file: path.join(category, `${item.fileBase}.jpg`),
      category,
      title: item.title,
      gbpCategory: item.gbpCategory,
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
  uploadGuide: {
    insights: "GBP Posts or At work — thought leadership visuals",
    services: "Services category — showcase what you offer",
    portfolio: "At work — client project highlights",
    work: "At work — product and design deliverables",
  },
  counts: {},
  images: [],
};

for (const [category, items] of Object.entries(catalogs)) {
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
