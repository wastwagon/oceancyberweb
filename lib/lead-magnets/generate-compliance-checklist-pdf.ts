"use client";

import { jsPDF } from "jspdf";
import {
  COMPLIANCE_CHECKLIST_SECTIONS,
  COMPLIANCE_CHECKLIST_TITLE,
} from "./compliance-checklist-content";

export function downloadComplianceChecklistPdf(): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  const titleLines = doc.splitTextToSize(COMPLIANCE_CHECKLIST_TITLE, maxWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 20 + 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("OceanCyber · oceancyber.net · Accra, Ghana", margin, y);
  y += 22;
  doc.setTextColor(0);
  doc.setFontSize(11);

  const intro =
    "A practical checklist for law firms, advisory practices, public programmes, and regulated teams operating in Ghana. Not legal advice — validate with counsel and the Data Protection Commission.";
  const introLines = doc.splitTextToSize(intro, maxWidth);
  doc.text(introLines, margin, y);
  y += introLines.length * 14 + 18;

  for (const section of COMPLIANCE_CHECKLIST_SECTIONS) {
    if (y > doc.internal.pageSize.getHeight() - 72) {
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
    y += bodyLines.length * 14 + 12;
  }

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(80);
  if (y > doc.internal.pageSize.getHeight() - 48) {
    doc.addPage();
    y = margin;
  }
  doc.text("Questions? oceancyber.net/contact · Security assessment: oceancyber.net/tools/security-assessment", margin, y);

  doc.save("oceancyber-ghana-compliance-checklist.pdf");
}
