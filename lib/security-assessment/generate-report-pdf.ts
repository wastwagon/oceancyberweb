"use client";

import { jsPDF } from "jspdf";
import type { AssessmentResult } from "@/lib/security-assessment/scoring";

export function downloadSecurityAssessmentPdf(
  result: AssessmentResult,
  email: string,
): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Security Maturity Assessment", margin, y);
  y += 24;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Prepared for: ${email}`, margin, y);
  y += 16;
  doc.text(`Overall score: ${result.percent}% — ${result.tier.label}`, margin, y);
  y += 28;

  doc.setFont("helvetica", "bold");
  doc.text("Summary", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(result.tier.summary, maxWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 14 + 16;

  doc.setFont("helvetica", "bold");
  doc.text("Domain scores", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  for (const domain of result.domainScores) {
    doc.text(`${domain.title}: ${domain.percent}% (${domain.earned}/${domain.max})`, margin, y);
    y += 14;
  }
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Recommended next steps", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  for (const rec of result.tier.recommendations) {
    const lines = doc.splitTextToSize(`• ${rec}`, maxWidth);
    if (y + lines.length * 14 > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y);
    y += lines.length * 14 + 4;
  }

  y += 12;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(
    "Self-assessment only — not a certification. Book a review at oceancyber.net/contact",
    margin,
    Math.min(y, doc.internal.pageSize.getHeight() - margin),
  );

  doc.save("oceancyber-security-assessment-report.pdf");
}
