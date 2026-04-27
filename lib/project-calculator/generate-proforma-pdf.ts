"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { PROFORMA_COMPANY, PROFORMA_DISCLAIMER, PROFORMA_LOGO_PATH } from "./config";
import { formatGhs, type LineItem, type PricingResult } from "./pricing";

export type ProformaInput = {
  pricing: PricingResult;
  lineItems: LineItem[];
  /** Customer / lead */
  clientName: string;
  clientEmail: string;
  projectTimeline: string;
  platformLabel: string;
  designLabel: string;
  complexityLabel: string;
  /** Human-readable, e.g. "1.28×" */
  rushNote?: string;
};

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function loadImageAsDataUrl(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    const safePath = src.startsWith("http")
      ? src
      : `${window.location.origin}${encodeURI(src)}`;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = safePath;
  });
}

/**
 * Generates a branded proforma PDF and triggers download in the browser.
 */
export async function downloadProformaPdf(data: ProformaInput): Promise<void> {
  const {
    pricing,
    lineItems,
    clientName,
    clientEmail,
    projectTimeline,
    platformLabel,
    designLabel,
    complexityLabel,
    rushNote,
  } = data;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  let y = 16;

  const logoData = await loadImageAsDataUrl(PROFORMA_LOGO_PATH);
  if (logoData) {
    try {
      doc.addImage(logoData, "PNG", 16, y, 42, 12);
    } catch {
      /* non-fatal */
    }
  }
  y += 14;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(20, 45, 85);
  doc.text("PROFORMA INVOICE (ESTIMATE)", pageW - 16, 22, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  let ty = 34;
  doc.setFont("helvetica", "bold");
  doc.text(PROFORMA_COMPANY.name, 16, ty);
  doc.setFont("helvetica", "normal");
  ty += 5;
  for (const line of PROFORMA_COMPANY.addressLines) {
    doc.text(line, 16, ty);
    ty += 4.5;
  }
  doc.text(`Email: ${PROFORMA_COMPANY.email}`, 16, ty);
  ty += 4.5;
  doc.text(`Tel: ${PROFORMA_COMPANY.phone}`, 16, ty);

  const today = new Date();
  const validUntil = addDays(today, 30);
  const metaRight: string[] = [
    `Date: ${formatDate(today)}`,
    `Valid until: ${formatDate(validUntil)}`,
    `Ref: OCEAN-${Date.now().toString(36).toUpperCase().slice(-8)}`,
  ];
  let ry = 34;
  doc.setFontSize(9);
  for (const t of metaRight) {
    doc.text(t, pageW - 16, ry, { align: "right" });
    ry += 4.5;
  }

  y = Math.max(ty, ry) + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Bill to", 16, y);
  doc.setFont("helvetica", "normal");
  y += 5;
  doc.text(clientName, 16, y);
  y += 4.5;
  doc.text(clientEmail, 16, y);
  y += 4.5;
  doc.text(`Target timeline: ${projectTimeline}`, 16, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  const rush = rushNote ?? `×${pricing.rushLabourMultiplier} on labour (timeline)`;
  doc.text(
    `Platform: ${platformLabel}  ·  Design: ${designLabel}  ·  Complexity: ${complexityLabel}  ·  ` +
      `Timeline: ${rush}  ·  Rate: ${formatGhs(pricing.hourlyRateGhs)}/hr (nominal)`,
    16,
    y,
  );
  y += 8;

  const tableBody: (string | number)[][] = lineItems.map((row) => [row.label, row.hours, formatGhs(row.amountGhs)]);

  autoTable(doc, {
    startY: y,
    head: [["Description", "Est. hours", "Amount (GHS)"]],
    body: tableBody,
    theme: "grid",
    headStyles: { fillColor: [14, 60, 120], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8.5 },
    columnStyles: {
      0: { cellWidth: 110 },
      1: { halign: "center" },
      2: { halign: "right" },
    },
    margin: { left: 16, right: 16 },
  });

  const jsp = doc as jsPDF & { lastAutoTable?: { finalY: number } };
  const finalY = jsp.lastAutoTable?.finalY ?? y + 40;
  let footY = finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text(`Subtotal (mid estimate): ${formatGhs(pricing.totalMidGhs)}`, pageW - 16, footY, { align: "right" });
  footY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  const rangeText = `Indicative range (±10%): ${formatGhs(pricing.rangeLowGhs)} – ${formatGhs(pricing.rangeHighGhs)}`;
  doc.text(rangeText, 16, footY);
  footY += 8;
  if (footY > 250) {
    doc.addPage();
    footY = 24;
  }
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "italic");
  const split = doc.splitTextToSize(PROFORMA_DISCLAIMER, pageW - 32);
  doc.text(split, 16, footY);
  footY += (split as string[]).length * 4.2 + 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text("Amounts are indicative development estimates in Ghana cedis (GHS).", 16, footY);

  doc.save(`proforma-oceancyber-${new Date().toISOString().slice(0, 10)}.pdf`);
}
