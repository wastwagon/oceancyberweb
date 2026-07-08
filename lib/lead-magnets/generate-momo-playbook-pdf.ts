"use client";

import { jsPDF } from "jspdf";
import {
  MOMO_PLAYBOOK_SECTIONS,
  MOMO_PLAYBOOK_TITLE,
} from "./momo-playbook-content";

export function downloadMomoPlaybookPdf(): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(MOMO_PLAYBOOK_TITLE, margin, y);
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("OceanCyber · oceancyber.net · Accra, Ghana", margin, y);
  y += 24;
  doc.setTextColor(0);

  doc.setFontSize(11);
  const intro =
    "A practical checklist for fintech, e-commerce, and product teams integrating mobile money in Ghana. Not legal or financial advice — validate with your PSP and compliance counsel.";
  const introLines = doc.splitTextToSize(intro, maxWidth);
  doc.text(introLines, margin, y);
  y += introLines.length * 14 + 16;

  for (const section of MOMO_PLAYBOOK_SECTIONS) {
    if (y > doc.internal.pageSize.getHeight() - 80) {
      doc.addPage();
      y = margin;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(section.heading, margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const bodyLines = doc.splitTextToSize(section.body, maxWidth);
    doc.text(bodyLines, margin, y);
    y += bodyLines.length * 14 + 14;
  }

  y += 8;
  if (y > doc.internal.pageSize.getHeight() - 60) {
    doc.addPage();
    y = margin;
  }
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(
    "Need help scoping MoMo integration? Contact OceanCyber at oceancyber.net/contact",
    margin,
    y,
  );

  doc.save("oceancyber-momo-integration-playbook.pdf");
}
