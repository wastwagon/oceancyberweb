/**
 * Branded placeholder cards for /industries — run: node scripts/generate-industry-card-images.mjs
 */
import { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/images/industries");

const newIndustries = [
  { file: "logistics.png", label: "Logistics", accent: "#BBF340" },
  { file: "real-estate.png", label: "Real Estate", accent: "#BBF340" },
  { file: "agriculture.png", label: "Agriculture", accent: "#BBF340" },
  { file: "media.png", label: "Media", accent: "#BBF340" },
  { file: "government.png", label: "Government", accent: "#BBF340" },
  { file: "energy.png", label: "Energy", accent: "#BBF340" },
];

function svg(label, accent) {
  return `<svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0b"/>
      <stop offset="100%" style="stop-color:#12141a"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="50%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0.22"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#bg)"/>
  <rect width="1200" height="750" fill="url(#glow)"/>
  <g opacity="0.15" stroke="${accent}" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="750"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>
  <rect x="80" y="520" width="420" height="4" fill="${accent}" opacity="0.9"/>
  <text x="80" y="480" fill="#ffffff" font-family="system-ui,sans-serif" font-size="52" font-weight="700">${label}</text>
  <text x="80" y="560" fill="#9ca3af" font-family="system-ui,sans-serif" font-size="22">OceanCyber · Accra, Ghana</text>
  <circle cx="1020" cy="120" r="80" fill="none" stroke="${accent}" stroke-width="2" opacity="0.5"/>
  <circle cx="1020" cy="120" r="40" fill="${accent}" opacity="0.15"/>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

for (const item of newIndustries) {
  const outPath = path.join(outDir, item.file);
  await sharp(Buffer.from(svg(item.label, item.accent)))
    .png({ quality: 90 })
    .toFile(outPath);
  console.log("Wrote", outPath);
}

console.log(`Done. ${newIndustries.length} industry cards.`);
