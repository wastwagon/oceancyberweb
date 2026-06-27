/**
 * One-off generator: branded deposit invoice PDF for ATA, Agile Media, and APPI.
 * Usage: node scripts/generate-deposit-invoice.mjs
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
  number: "OCEAN-INV-20260619-001",
  date: "19 June 2026",
  dueDate: "Upon receipt",
  billTo: "",
  preparedBy: "Amidu Kwabena Gilbert",
  lineItems: [
    {
      description: "ATA Website — Development",
      contractValue: 15000,
      depositPct: 60,
      amount: 9000,
    },
    {
      description: "Agile Media Website — Development",
      contractValue: 8000,
      depositPct: 60,
      amount: 4800,
    },
    {
      description: "APPI Website — Development",
      contractValue: 8000,
      depositPct: 60,
      amount: 4800,
    },
  ],
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
  const margin = 16;
  let y = 14;

  if (logo?.dataUrl) {
    const { widthMm, heightMm } = logoDimensionsMm(logo.width, logo.height, 12);
    doc.addImage(logo.dataUrl, "PNG", margin, y, widthMm, heightMm);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...BRAND.navyDark);
  doc.text("INVOICE", pageW - margin, y + 4, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.muted);
  doc.text(`Invoice No: ${INVOICE.number}`, pageW - margin, y + 11, { align: "right" });
  doc.text(`Date: ${INVOICE.date}`, pageW - margin, y + 16, { align: "right" });
  doc.text(`Due: ${INVOICE.dueDate}`, pageW - margin, y + 21, { align: "right" });

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
  doc.text("Bill To", pageW / 2 + 4, billY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  if (INVOICE.billTo) {
    doc.text(INVOICE.billTo, pageW / 2 + 4, billY + 5);
  }

  y = Math.max(y, billY + 12) + 6;

  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  const intro =
    "Thank you for the recent project update meeting. To maintain momentum and fulfil our mutual " +
    "contract obligations, please find below the requested 60% milestone deposits for the three " +
    "website projects currently in progress.";
  const introLines = doc.splitTextToSize(intro, pageW - margin * 2);
  doc.text(introLines, margin, y);
  y += introLines.length * 4.5 + 6;

  autoTable(doc, {
    startY: y,
    head: [["Description", "Contract Value (GHS)", "Deposit", "Amount Due (GHS)"]],
    body: INVOICE.lineItems.map((row) => [
      row.description,
      formatAmount(row.contractValue),
      `${row.depositPct}%`,
      formatAmount(row.amount),
    ]),
    foot: [
      [
        "Total Due",
        "",
        "",
        { content: formatAmount(18600), styles: { halign: "right" } },
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
      fontSize: 10,
      fontStyle: "bold",
      halign: "left",
    },
    bodyStyles: { fontSize: 9, textColor: [30, 30, 30] },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" },
      2: { halign: "center" },
      3: { halign: "right" },
    },
    didParseCell(data) {
      if (data.section === "foot" && data.column.index === 3) {
        data.cell.styles.halign = "right";
      }
    },
    margin: { left: margin, right: margin },
  });

  const jsp = doc;
  let footY = (jsp.lastAutoTable?.finalY ?? y + 50) + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.navyDark);
  doc.text("Payment Details", margin, footY);
  footY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const payLines = doc.splitTextToSize(
    "Kindly remit the total amount of " + formatGhs(18600) + " at your earliest convenience.",
    pageW - margin * 2,
  );
  doc.text(payLines, margin, footY);
  footY += payLines.length * 4.2 + 4;

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
  doc.setFont("helvetica", "normal");
  const payRefLines = doc.splitTextToSize(
    "For queries, contact " + COMPANY.email + " or " + COMPANY.phone + ".",
    pageW - margin * 2,
  );
  doc.text(payRefLines, margin, footY);
  footY += payRefLines.length * 4.2 + 12;

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

  const outPath = path.join(ROOT, "Invoice-Deposit-2026-06-19.pdf");
  const buf = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync(outPath, buf);
  return outPath;
}

async function generateHtml(logo) {
  const rows = INVOICE.lineItems
    .map(
      (row) => `
      <tr>
        <td>${row.description}</td>
        <td class="num">${formatAmount(row.contractValue)}</td>
        <td class="center">${row.depositPct}%</td>
        <td class="num">${formatAmount(row.amount)}</td>
      </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Invoice ${INVOICE.number} — ${COMPANY.name}</title>
  <style>
    @page { size: A4; margin: 18mm 16mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", Helvetica, Arial, sans-serif;
      color: #1e1e1e;
      background: #f4f6f9;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      max-width: 210mm;
      min-height: 297mm;
      margin: 24px auto;
      background: #fff;
      box-shadow: 0 4px 24px rgba(14, 60, 120, 0.12);
      padding: 16mm 16mm 14mm;
    }
    @media print {
      body { background: #fff; }
      .page { margin: 0; box-shadow: none; max-width: none; min-height: auto; }
    }
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      padding-bottom: 14px;
      border-bottom: 2px solid #0e3c78;
      margin-bottom: 18px;
    }
    .logo { height: 48px; width: auto; max-width: 100%; object-fit: contain; display: block; }
    .invoice-title { text-align: right; }
    .invoice-title h1 {
      font-size: 26px;
      letter-spacing: 0.06em;
      color: #142d55;
      font-weight: 700;
    }
    .meta { margin-top: 8px; font-size: 12px; color: #555; }
    .meta div + div { margin-top: 2px; }
    .addresses {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 20px;
      font-size: 13px;
    }
    .addresses h2 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0e3c78;
      margin-bottom: 6px;
    }
    .company-lines { color: #444; }
    .company-lines p + p { margin-top: 2px; }
    .intro {
      font-size: 13px;
      color: #333;
      margin-bottom: 18px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
      margin-bottom: 18px;
    }
    thead th {
      background: #0e3c78;
      color: #fff;
      text-align: left;
      padding: 10px 12px;
      font-weight: 600;
    }
    thead th.num,
    tbody td.num,
    tfoot td.num {
      text-align: right;
      white-space: nowrap;
    }
    tbody td {
      padding: 10px 12px;
      border: 1px solid #d8e0ea;
      vertical-align: top;
    }
    tbody tr:nth-child(even) td { background: #f8fafc; }
    tfoot td {
      padding: 12px;
      border: 1px solid #d8e0ea;
      background: #eef3fa;
      font-weight: 700;
      color: #142d55;
    }
    .num { text-align: right; white-space: nowrap; }
    .center { text-align: center; }
    .section { margin-bottom: 16px; }
    .section h3 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #0e3c78;
      margin-bottom: 6px;
    }
    .section p { font-size: 12.5px; color: #444; }
    .signoff {
      margin-top: 28px;
      padding-top: 14px;
      border-top: 1px solid #c5d0de;
      font-size: 13px;
    }
    .signoff .name { font-weight: 700; margin-top: 8px; color: #142d55; }
    .signoff .role { font-size: 12px; color: #666; margin-top: 2px; }
  </style>
</head>
<body>
  <article class="page">
    <header class="letterhead">
      <img class="logo" src="${logo.dataUrl}" width="${logo.width}" height="${logo.height}" alt="${COMPANY.name} logo" />
      <div class="invoice-title">
        <h1>INVOICE</h1>
        <div class="meta">
          <div><strong>Invoice No:</strong> ${INVOICE.number}</div>
          <div><strong>Date:</strong> ${INVOICE.date}</div>
          <div><strong>Due:</strong> ${INVOICE.dueDate}</div>
        </div>
      </div>
    </header>

    <section class="addresses">
      <div>
        <h2>From</h2>
        <div class="company-lines">
          <p><strong>${COMPANY.name}</strong></p>
          ${COMPANY.addressLines.map((l) => `<p>${l}</p>`).join("")}
          <p>${COMPANY.email}</p>
          <p>${COMPANY.phone}</p>
          <p>${COMPANY.website}</p>
        </div>
      </div>
      <div>
        <h2>Bill To</h2>
        <p>${INVOICE.billTo ? `<strong>${INVOICE.billTo}</strong>` : "&nbsp;"}</p>
      </div>
    </section>

    <p class="intro">
      Thank you for the recent project update meeting. To maintain momentum and fulfil our mutual
      contract obligations, please find below the requested 60% milestone deposits for the three
      website projects currently in progress.
    </p>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th class="num">Contract Value (GHS)</th>
          <th class="center">Deposit</th>
          <th class="num">Amount Due (GHS)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td>Total Due</td>
          <td></td>
          <td></td>
          <td class="num">${formatAmount(18600)}</td>
        </tr>
      </tfoot>
    </table>

    <div class="section">
      <h3>Payment Details</h3>
      <p>
        Kindly remit the total amount of <strong>${formatGhs(18600)}</strong> at your earliest
        convenience.
      </p>
      <p style="margin-top: 10px;"><strong>Mobile Money (MoMo)</strong></p>
      <p style="margin-top: 4px;">
        <strong>MoMo Number:</strong> ${PAYMENT.momo.number}<br />
        <strong>Registered Name:</strong> ${PAYMENT.momo.registeredName}
      </p>
      <p style="margin-top: 10px;"><strong>Bank Transfer</strong></p>
      <p style="margin-top: 4px;">
        <strong>Bank:</strong> ${PAYMENT.bank.name}<br />
        <strong>Branch:</strong> ${PAYMENT.bank.branch}<br />
        <strong>Account Name:</strong> ${PAYMENT.bank.accountName}<br />
        <strong>Account Number:</strong> ${PAYMENT.bank.accountNumber}
      </p>
      <p style="margin-top: 8px;">
        For queries, contact ${COMPANY.email} or ${COMPANY.phone}.
      </p>
    </div>

    <footer class="signoff">
      <p>Best regards,</p>
      <p class="name">${INVOICE.preparedBy}</p>
      <p class="role">${COMPANY.name} · ${COMPANY.tagline}</p>
    </footer>
  </article>
</body>
</html>`;

  const outPath = path.join(ROOT, "Invoice-Deposit-2026-06-19.html");
  fs.writeFileSync(outPath, html, "utf8");
  return outPath;
}

const logo = await loadLogoAsset();
const pdfPath = await generatePdf(logo);
const htmlPath = await generateHtml(logo);
console.log("Created:", pdfPath);
console.log("Created:", htmlPath);
