/**
 * Generates docs/OceanCyber-POS-Development-Guide.pdf (expanded)
 * Run: npm run docs:pos-pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { jsPDF } from "jspdf";
import { GUIDE_DATE, GUIDE_VERSION, SECTIONS } from "../docs/pos/pos-guide-sections.mjs";
import { EXTENDED_SECTIONS } from "../docs/pos/pos-guide-sections-extended.mjs";
import { SAAS_SECTIONS } from "../docs/pos/pos-guide-sections-saas.mjs";
import { V5_SECTIONS } from "../docs/pos/pos-guide-sections-v5.mjs";

const ALL_SECTIONS = [
  ...SECTIONS.slice(0, 2),
  ...SAAS_SECTIONS,
  ...SECTIONS.slice(2),
  ...EXTENDED_SECTIONS,
  ...V5_SECTIONS,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "docs", "OceanCyber-POS-Development-Guide.pdf");

const BRAND = { lime: [187, 243, 64], dark: [12, 12, 16], muted: [120, 120, 130] };

function addCover(doc) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(...BRAND.dark);
  doc.rect(0, 0, w, h, "F");
  doc.setFillColor(...BRAND.lime);
  doc.rect(0, h * 0.34, w, 5, "F");
  doc.setTextColor(...BRAND.lime);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text("OceanCyber POS", 48, h * 0.26);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(19);
  doc.text("Development Guide", 48, h * 0.26 + 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 210);
  const lines = [
    "Complete multi-tenant SaaS specification",
    "Self-register · BYOK payments · Offline & manual MoMo",
    "Subscription billing · Onboarding wizard · API & schema",
    "Ghana market · MoMo · Multi-branch · Separate product domain",
  ];
  let y = h * 0.26 + 72;
  for (const line of lines) {
    doc.text(line, 48, y);
    y += 16;
  }
  doc.setFontSize(10);
  doc.text(`Version ${GUIDE_VERSION} · ${GUIDE_DATE} · oceancyber.net`, 48, h - 44);
}

function addPageHeader(doc, margin) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...BRAND.muted);
  doc.text(`OceanCyber POS Development Guide v${GUIDE_VERSION}`, margin, 28);
  doc.setDrawColor(...BRAND.lime);
  doc.setLineWidth(0.35);
  doc.line(margin, 34, doc.internal.pageSize.getWidth() - margin, 34);
}

function addTableOfContents(doc, margin, maxWidth) {
  addPageHeader(doc, margin);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...BRAND.dark);
  doc.text("Table of contents", margin, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 58);
  let y = 78;
  for (const section of ALL_SECTIONS) {
    if (y > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      addPageHeader(doc, margin);
      y = 52;
    }
    doc.text(section.title, margin, y);
    y += 13;
  }
}

function writeSection(doc, section, margin, maxWidth, startY) {
  let y = startY;
  const pageH = doc.internal.pageSize.getHeight();
  const bottom = pageH - 48;

  const ensure = (needed) => {
    if (y + needed > bottom) {
      doc.addPage();
      addPageHeader(doc, margin);
      y = 48;
    }
  };

  ensure(32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(...BRAND.dark);
  const titleLines = doc.splitTextToSize(section.title, maxWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 14 + 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(35, 35, 42);

  for (const p of section.body) {
    if (p === "") {
      y += 5;
      continue;
    }
    const isCode =
      p.startsWith("  ") ||
      p.startsWith("{") ||
      p.startsWith('"') ||
      p.startsWith("'") ||
      p.includes("oceancyber-pos/") ||
      p.includes("POST /") ||
      p.includes("GET  /") ||
      p.includes("□");
    if (isCode) {
      doc.setFont("courier", "normal");
      doc.setFontSize(8.5);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
    }
    const lines = doc.splitTextToSize(p, maxWidth);
    ensure(lines.length * 11 + 2);
    doc.text(lines, margin, y);
    y += lines.length * 11 + 2;
  }
  return y + 6;
}

function addPageNumbers(doc) {
  const total = doc.getNumberOfPages();
  for (let i = 2; i <= total; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.muted);
    doc.text(`Page ${i - 1} of ${total - 1}`, doc.internal.pageSize.getWidth() - 48, doc.internal.pageSize.getHeight() - 20, {
      align: "right",
    });
  }
}

function generate() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 44;
  const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;

  addCover(doc);
  doc.addPage();
  addTableOfContents(doc, margin, maxWidth);
  doc.addPage();
  addPageHeader(doc, margin);

  let y = 48;
  for (const section of ALL_SECTIONS) {
    y = writeSection(doc, section, margin, maxWidth, y);
  }

  addPageNumbers(doc);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const buf = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync(outPath, buf);
  console.log(
    `Wrote ${outPath} (${(buf.length / 1024).toFixed(1)} KB, ${doc.getNumberOfPages()} pages, ${ALL_SECTIONS.length} sections, v${GUIDE_VERSION})`,
  );
}

generate();
