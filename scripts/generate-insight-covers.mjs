/**
 * Fallback: generates SVG-based covers for insight articles.
 * Prefer AI editorial art — export PNGs as {slug}.png, then run:
 *   node scripts/import-insight-cover-pngs.mjs
 */
import { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/images/insights");

function networkNodes(cx, cy, radius, accent) {
  const nodes = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    nodes.push(`<circle cx="${x}" cy="${y}" r="10" fill="${accent}" opacity="0.55"/>`);
    nodes.push(`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${accent}" stroke-width="1" opacity="0.25"/>`);
  }
  return nodes.join("");
}

function gridBlocks(x, y, cols, rows, accent) {
  let blocks = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const opacity = 0.12 + ((r + c) % 3) * 0.08;
      blocks += `<rect x="${x + c * 100}" y="${y + r * 70}" width="80" height="50" rx="8" fill="${accent}" opacity="${opacity}"/>`;
    }
  }
  return blocks;
}

function orbitRings(cx, cy, accent) {
  return [120, 180, 240]
    .map(
      (r) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.25"/>`,
    )
    .join("");
}

const accent = "#BBF340";

const covers = [
  {
    slug: "future-cybersecurity-africa",
    category: "Security",
    glow: "#22d3ee",
    title: "Cybersecurity in Africa",
    motif: () => `
      <circle cx="960" cy="380" r="180" fill="url(#glow)" opacity="0.35"/>
      <path d="M960 220 L1100 290 V430 C1100 520 960 580 960 580 C960 580 820 520 820 430 V290 Z" fill="none" stroke="${accent}" stroke-width="3" opacity="0.9"/>
      ${networkNodes(960, 380, 240, accent)}
    `,
  },
  {
    slug: "digital-transformation-ghana",
    category: "Technology",
    glow: "#a78bfa",
    title: "Digital Transformation",
    motif: () => `
      <rect x="720" y="260" width="480" height="280" rx="24" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7"/>
      ${gridBlocks(760, 300, 4, 3, accent)}
    `,
  },
  {
    slug: "fintech-banking-unbanked",
    category: "Finance",
    glow: "#fbbf24",
    title: "Banking the Unbanked",
    motif: () => `
      <rect x="860" y="250" width="200" height="340" rx="36" fill="none" stroke="${accent}" stroke-width="3"/>
      <circle cx="960" cy="330" r="28" fill="${accent}" opacity="0.25"/>
      ${orbitRings(960, 400, accent)}
    `,
  },
  {
    slug: "ecommerce-emerging-markets",
    category: "Business",
    glow: "#fb7185",
    title: "E-commerce Growth",
    motif: () => `
      <path d="M780 520 L860 320 H1060 L1140 520 Z" fill="none" stroke="${accent}" stroke-width="2.5"/>
      <rect x="820" y="360" width="280" height="120" rx="12" fill="${accent}" opacity="0.12"/>
      <circle cx="860" cy="560" r="18" fill="none" stroke="${accent}" stroke-width="2"/>
      <circle cx="1100" cy="560" r="18" fill="none" stroke="${accent}" stroke-width="2"/>
    `,
  },
  {
    slug: "ai-ml-practical",
    category: "Innovation",
    glow: "#38bdf8",
    title: "AI and Machine Learning",
    motif: () => `
      ${networkNodes(960, 380, 200, accent)}
      <circle cx="960" cy="380" r="48" fill="${accent}" opacity="0.35"/>
    `,
  },
  {
    slug: "ghana-momo-economy",
    category: "Finance",
    glow: "#4ade80",
    title: "Mobile Money Economy",
    motif: () => `
      <rect x="880" y="270" width="160" height="280" rx="28" fill="none" stroke="${accent}" stroke-width="3"/>
      <text x="960" y="420" text-anchor="middle" fill="${accent}" font-family="Arial,sans-serif" font-size="64" font-weight="700">₵</text>
      ${orbitRings(960, 400, accent)}
    `,
  },
  {
    slug: "ghana-cybersecurity-trends",
    category: "Security",
    glow: "#f87171",
    title: "Cyber Threat Trends",
    motif: () => `
      <path d="M960 240 L1080 300 V440 C1080 500 960 560 960 560 C960 560 840 500 840 440 V300 Z" fill="${accent}" opacity="0.08" stroke="${accent}" stroke-width="2"/>
      <circle cx="1120" cy="280" r="36" fill="none" stroke="${accent}" stroke-width="2" opacity="0.6"/>
    `,
  },
  {
    slug: "ecommerce-growth-ghana",
    category: "Business",
    glow: "#c084fc",
    title: "E-commerce Boom",
    motif: () => `
      <rect x="800" y="440" width="80" height="80" fill="${accent}" opacity="0.15"/>
      <rect x="920" y="380" width="80" height="140" fill="${accent}" opacity="0.22"/>
      <rect x="1040" y="340" width="80" height="180" fill="${accent}" opacity="0.3"/>
      <path d="M760 520 H1160" stroke="${accent}" stroke-width="3"/>
    `,
  },
  {
    slug: "data-privacy-compliance",
    category: "Compliance",
    glow: "#94a3b8",
    title: "Data Privacy",
    motif: () => `
      <rect x="820" y="300" width="280" height="200" rx="16" fill="none" stroke="${accent}" stroke-width="2"/>
      <circle cx="960" cy="340" r="40" fill="none" stroke="${accent}" stroke-width="2"/>
      <path d="M920 400 H1000 M960 360 V460" stroke="${accent}" stroke-width="3" opacity="0.7"/>
    `,
  },
];

function svgForCover({ glow, category, title, motif }) {
  return `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050505"/>
      <stop offset="55%" stop-color="#0a0f0a"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="${glow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="#BBF340" stroke-width="0.6" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect width="1920" height="1080" fill="url(#grid)"/>
  <rect width="1920" height="1080" fill="url(#glow)"/>
  ${motif()}
  <rect x="0" y="880" width="1920" height="200" fill="#000" opacity="0.55"/>
  <text x="96" y="960" fill="${accent}" font-family="Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="6">${category.toUpperCase()}</text>
  <text x="96" y="1010" fill="#ffffff" font-family="Arial,sans-serif" font-size="44" font-weight="700">${title}</text>
  <text x="96" y="1048" fill="#888888" font-family="Arial,sans-serif" font-size="22" letter-spacing="4">OCEANCYBER INSIGHTS</text>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

for (const cover of covers) {
  const svg = svgForCover(cover);
  const outPath = path.join(outDir, `${cover.slug}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(outPath);
  console.log("Wrote", outPath);
}

console.log(`Generated ${covers.length} insight covers.`);
