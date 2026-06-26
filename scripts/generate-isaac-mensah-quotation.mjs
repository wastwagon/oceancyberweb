/**
 * Proforma quotation PDF for Isaac Mensah — institutional website (AGC-style scope).
 * Usage: node scripts/generate-isaac-mensah-quotation.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable/es";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const COMPANY = {
  name: "Ocean Cyber",
  tagline: "ICT Solutions Provider",
  addressLines: ["232 Nii Kwashiefo Avenue", "Abofu – Achimota, Accra", "Ghana"],
  email: "info@oceancyber.net",
  phone: "+233 242 565 695",
  website: "oceancyber.net",
};

const PAYMENT = {
  momo: {
    number: "0242565695",
    registeredName: "Amidu Kwabena Gilbert",
  },
  bank: {
    name: "Stanbic Bank",
    branch: "Achimota",
    accountName: "OCEANCYBER CO. LTD",
    accountNumber: "9040008425080",
  },
};

const INVOICE = {
  number: "OCEAN-QUO-20260626-001",
  date: "26 June 2026",
  validUntil: "26 July 2026",
  billTo: {
    contact: "Isaac Mensah",
    phone: "055 323 6625",
    organisation: "Organisation name — to be confirmed",
  },
  preparedBy: "Amidu Kwabena Gilbert",
  referenceSite: "africagovernancecentre.org",
  lineItems: [
    {
      description:
        "Discovery, UX planning & custom visual design\n" +
        "Brand-aligned layouts, wireframes, and responsive UI for an institutional presence.",
      amount: 3500,
    },
    {
      description:
        "Multi-page website development\n" +
        "Home, About, Programs/Focus areas, Projects, Events, News & insights, " +
        "Team/Fellows, Contact, and Get Involved pages.",
      amount: 6000,
    },
    {
      description:
        "Content management system (CMS)\n" +
        "Admin dashboard to publish and edit news, events, programs, and team profiles without developer support.",
      amount: 5000,
    },
    {
      description:
        "Newsletter signup, contact forms & integrations\n" +
        "Lead capture, enquiry routing, and basic email list subscription.",
      amount: 1500,
    },
    {
      description:
        "SEO, analytics & performance optimisation\n" +
        "Search-friendly structure, metadata, sitemap, and Google Analytics setup.",
      amount: 1000,
    },
    {
      description:
        "Deployment, training & 30-day post-launch support\n" +
        "Live hosting setup guidance, CMS handover session, and defect fixes after go-live.",
      amount: 1000,
    },
  ],
  depositPct: 50,
  timelineWeeks: "10–12",
};

const BRAND = {
  navy: [14, 60, 120],
  navyDark: [20, 45, 85],
  muted: [70, 70, 70],
};

function formatAmount(n) {
  return n.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatGhs(n) {
  return `GHS ${formatAmount(n)}`;
}

function totalAmount() {
  return INVOICE.lineItems.reduce((sum, row) => sum + row.amount, 0);
}

function depositAmount() {
  return Math.round((totalAmount() * INVOICE.depositPct) / 100);
}

async function loadLogoAsset() {
  const logoPath = path.join(ROOT, "public/images/oceancyber-logo.webp");
  const meta = await sharp(logoPath).metadata();
  const png = await sharp(logoPath).png().toBuffer();
  return {
    dataUrl: `data:image/png;base64,${png.toString("base64")}`,
    width: meta.width ?? 500,
    height: meta.height ?? 90,
  };
}

function logoDimensionsMm(naturalWidth, naturalHeight, targetHeightMm = 12) {
  const aspect = naturalWidth / naturalHeight;
  return { widthMm: targetHeightMm * aspect, heightMm: targetHeightMm };
}

async function generatePdf(logo) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  let y = 14;
  const total = totalAmount();
  const deposit = depositAmount();

  if (logo?.dataUrl) {
    const { widthMm, heightMm } = logoDimensionsMm(logo.width, logo.height, 12);
    doc.addImage(logo.dataUrl, "PNG", margin, y, widthMm, heightMm);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...BRAND.navyDark);
  doc.text("QUOTATION", pageW - margin, y + 4, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.muted);
  doc.text(`Quote No: ${INVOICE.number}`, pageW - margin, y + 11, { align: "right" });
  doc.text(`Date: ${INVOICE.date}`, pageW - margin, y + 16, { align: "right" });
  doc.text(`Valid until: ${INVOICE.validUntil}`, pageW - margin, y + 21, {
    align: "right",
  });

  y += 22;
  doc.setDrawColor(...BRAND.navy);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.navyDark);
  doc.text(COMPANY.name, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.muted);
  y += 5;
  for (const line of COMPANY.addressLines) {
    doc.text(line, margin, y);
    y += 4.5;
  }
  doc.text(`Email: ${COMPANY.email}`, margin, y);
  y += 4.5;
  doc.text(`Tel: ${COMPANY.phone}`, margin, y);
  y += 4.5;
  doc.text(`Web: ${COMPANY.website}`, margin, y);

  const billY = 52;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.navyDark);
  doc.text("Prepared For", pageW / 2 + 4, billY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text(INVOICE.billTo.contact, pageW / 2 + 4, billY + 5);
  doc.text(`Tel: ${INVOICE.billTo.phone}`, pageW / 2 + 4, billY + 10);
  doc.setTextColor(...BRAND.muted);
  doc.text(INVOICE.billTo.organisation, pageW / 2 + 4, billY + 15);

  y = Math.max(y, billY + 22) + 4;

  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  const intro =
    "Thank you for your enquiry. Following our discussion, please find below a formal quotation " +
    `for the design and development of an institutional website similar in scope and quality to ` +
    `${INVOICE.referenceSite}. This quote covers a modern, mobile-responsive platform with ` +
    "content management so your team can update news, events, and programmes independently.";
  const introLines = doc.splitTextToSize(intro, pageW - margin * 2);
  doc.text(introLines, margin, y);
  y += introLines.length * 4.5 + 6;

  autoTable(doc, {
    startY: y,
    head: [["Description", "Amount (GHS)"]],
    body: INVOICE.lineItems.map((row) => [
      row.description,
      formatAmount(row.amount),
    ]),
    foot: [
      [
        "Total Project Investment",
        { content: formatAmount(total), styles: { halign: "right" } },
      ],
      [
        `${INVOICE.depositPct}% mobilisation deposit (upon acceptance)`,
        { content: formatAmount(deposit), styles: { halign: "right" } },
      ],
      [
        "Balance due on completion & client sign-off",
        { content: formatAmount(total - deposit), styles: { halign: "right" } },
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: BRAND.navy,
      textColor: 255,
      fontSize: 9,
      fontStyle: "bold",
    },
    footStyles: {
      fillColor: [240, 245, 252],
      textColor: BRAND.navyDark,
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: { fontSize: 8.5, textColor: [30, 30, 30], cellPadding: 3 },
    columnStyles: {
      0: { halign: "left", cellWidth: pageW - margin * 2 - 32 },
      1: { halign: "right", cellWidth: 32 },
    },
    didParseCell(data) {
      if (data.section === "foot" && data.column.index === 1) {
        data.cell.styles.halign = "right";
      }
    },
    margin: { left: margin, right: margin },
  });

  let footY = (doc.lastAutoTable?.finalY ?? y + 50) + 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.navyDark);
  doc.text("Terms & Notes", margin, footY);
  footY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const terms = [
    `Estimated delivery: ${INVOICE.timelineWeeks} weeks from deposit receipt and content handover.`,
    "Hosting and domain registration are quoted separately if required (annual renewal applies).",
    "Two rounds of design revisions and one round of content amendments are included.",
    "Additional features (e-commerce, member portals, multilingual) can be scoped on request.",
    `Quote valid until ${INVOICE.validUntil}. Prices are in Ghana Cedis (GHS).`,
  ];
  for (const line of terms) {
    const lines = doc.splitTextToSize(`• ${line}`, pageW - margin * 2);
    doc.text(lines, margin, footY);
    footY += lines.length * 4 + 1.5;
  }
  footY += 4;

  if (footY > pageH - 70) {
    doc.addPage();
    footY = margin;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.navyDark);
  doc.text("Payment Details (upon acceptance)", margin, footY);
  footY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const payIntro = doc.splitTextToSize(
    `To commence work, kindly remit the mobilisation deposit of ${formatGhs(deposit)} using the details below. Reference: ${INVOICE.number}.`,
    pageW - margin * 2,
  );
  doc.text(payIntro, margin, footY);
  footY += payIntro.length * 4.2 + 4;

  doc.setFont("helvetica", "bold");
  doc.text("Mobile Money (MoMo)", margin, footY);
  footY += 4.5;
  doc.setFont("helvetica", "normal");
  doc.text(`MoMo Number: ${PAYMENT.momo.number}`, margin, footY);
  footY += 4.5;
  doc.text(`Registered Name: ${PAYMENT.momo.registeredName}`, margin, footY);
  footY += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Bank Transfer", margin, footY);
  footY += 4.5;
  doc.setFont("helvetica", "normal");
  doc.text(`Bank: ${PAYMENT.bank.name}`, margin, footY);
  footY += 4.5;
  doc.text(`Branch: ${PAYMENT.bank.branch}`, margin, footY);
  footY += 4.5;
  doc.text(`Account Name: ${PAYMENT.bank.accountName}`, margin, footY);
  footY += 4.5;
  doc.text(`Account Number: ${PAYMENT.bank.accountNumber}`, margin, footY);
  footY += 6;

  const queryLines = doc.splitTextToSize(
    `For queries, contact ${COMPANY.email} or ${COMPANY.phone}.`,
    pageW - margin * 2,
  );
  doc.text(queryLines, margin, footY);
  footY += queryLines.length * 4.2 + 10;

  doc.setDrawColor(...BRAND.navy);
  doc.setLineWidth(0.3);
  doc.line(margin, footY, pageW - margin, footY);
  footY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text("Best regards,", margin, footY);
  footY += 6;
  doc.setFont("helvetica", "bold");
  doc.text(INVOICE.preparedBy, margin, footY);
  footY += 4.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND.muted);
  doc.text(`${COMPANY.name} · ${COMPANY.tagline}`, margin, footY);

  const outPath = path.join(ROOT, "Quotation-Isaac-Mensah-2026-06-26.pdf");
  fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
  return outPath;
}

const logo = await loadLogoAsset();
const pdfPath = await generatePdf(logo);
console.log("Created:", pdfPath);
