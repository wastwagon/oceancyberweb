/**
 * Rich proposal PDF: KHDA training institute (Dubai).
 * Renders branded HTML → PDF via Playwright for print-quality layout.
 * Usage: node scripts/generate-dubai-training-proposal.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright";

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
  bank: {
    name: "Stanbic Bank",
    branch: "Achimota, Ghana",
    accountName: "OCEANCYBER CO. LTD",
    accountNumber: "9040008425080",
    swift: "SBICGHAC",
  },
};

const PROPOSAL = {
  number: "OCEAN-QUO-20260706-002",
  date: "6 July 2026",
  validUntil: "6 August 2026",
  billTo: {
    organisation: "KHDA-Approved Computer Skills Training Institute",
    location: "Dubai, United Arab Emirates",
    contact: "Admissions / IT Contact — to be confirmed",
  },
  preparedBy: "Amidu Kwabena Gilbert",
  currency: "USD",
  depositPct: 50,
  timelineWeeks: "16–18",
  total: 18500,
  pages: [
    "Home", "About Us", "Training Programs", "Corporate Training", "BootCamp Programs",
    "Training Locations", "Upcoming Intakes", "Admissions", "Certificate Verification",
    "Blog & News", "Careers", "Contact Us",
  ],
  lineItems: [
    {
      title: "Discovery & Premium UI Design",
      detail: "Brand-aligned wireframes, page templates, and responsive design system.",
      amount: 2500,
    },
    {
      title: "Frontend — 12 Core Pages",
      detail: "All programme, admissions, and institutional pages — mobile-first and SEO-ready.",
      amount: 4500,
    },
    {
      title: "Custom CMS Admin Panel",
      detail: "WordPress-equivalent manageability — pages, courses, blog, FAQs, testimonials, enquiries.",
      amount: 3000,
    },
    {
      title: "Certificate Verification System",
      detail: "Unique numbers, QR codes, public lookup, admin create/edit/search/revoke.",
      amount: 2500,
    },
    {
      title: "Admissions & Google Workspace",
      detail: "Apply Now flows, Forms → Sheets + Gmail, Calendar, Maps, Analytics.",
      amount: 2000,
    },
    {
      title: "Calendar, Instructors & Content Modules",
      detail: "Intake schedules, instructor bios, FAQ, and testimonial sections.",
      amount: 1500,
    },
    {
      title: "Multilingual-Ready Architecture",
      detail: "English Phase 1; Arabic added in Phase 2 without platform rebuild.",
      amount: 1000,
    },
    {
      title: "Deployment, Docs, Training & Support",
      detail: "SSL deployment, source code handover, admin training, 60-day post-launch support.",
      amount: 1500,
    },
  ],
  stack: [
    { name: "Next.js 14+", role: "Frontend", note: "Fast, responsive, SEO-optimised" },
    { name: "NestJS", role: "API Layer", note: "Secure integrations & business logic" },
    { name: "PostgreSQL", role: "Database", note: "Courses, certificates, admissions" },
    { name: "Custom Admin CMS", role: "Content", note: "No plugins — full control" },
    { name: "Google Workspace", role: "Integrations", note: "Forms, Sheets, Gmail, Calendar" },
    { name: "Stripe Links", role: "Payments", note: "Secure manual payment links" },
  ],
  customFeatures: [
    "Certificate verification (number + QR scan)",
    "Training programmes catalogue with Apply Now CTAs",
    "Admissions pipeline → Google Sheets + email alerts",
    "Training calendar & upcoming intakes",
    "Instructor profiles, FAQ & testimonials",
    "Course & location management in admin",
    "Multilingual-ready (Arabic in Phase 2)",
  ],
  timeline: [
    { phase: "Weeks 1–2", label: "Discovery & Design", desc: "Content audit, wireframes, design approval" },
    { phase: "Weeks 3–6", label: "Frontend Build", desc: "All 12 pages, responsive QA" },
    { phase: "Weeks 7–10", label: "CMS & Integrations", desc: "Admin panel, certificates, Google Workspace" },
    { phase: "Weeks 11–13", label: "Content & SEO", desc: "Population, performance tuning, UAT" },
    { phase: "Weeks 14–16", label: "Launch", desc: "Deployment, SSL, training, go-live" },
    { phase: "Weeks 17–18", label: "Support Window", desc: "Revisions + 60-day defect support begins" },
  ],
  deliverables: [
    "Fully functional website with administrator access",
    "Google Workspace, Forms & Calendar integrations",
    "Certificate Verification System (Phase 1)",
    "Full source code ownership",
    "Technical documentation",
    "Production deployment with SSL",
    "Live administrator training session",
    "60-day post-launch support",
  ],
  recommendations: [
    {
      title: "Custom stack over WordPress",
      text: "Avoids Astra/Elementor licence renewals, plugin conflicts, and costly rebuild when adding LMS or student portal.",
    },
    {
      title: "Google Forms for Phase 1 admissions",
      text: "Fast to launch, familiar to your team. Native forms can be added in Phase 2 if needed.",
    },
    {
      title: "Stripe Payment Links (manual)",
      text: "Matches your consultation-first workflow without complex checkout in Phase 1.",
    },
    {
      title: "Arabic in Phase 2",
      text: "Content translation on existing i18n structure — no redesign required.",
    },
    {
      title: "Modular future expansion",
      text: "LMS, student portal, SIS, CRM, and mobile apps extend the same platform — not a new website.",
    },
  ],
};

function formatAmount(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function depositAmount() {
  return Math.round((PROPOSAL.total * PROPOSAL.depositPct) / 100);
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

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(logo) {
  const deposit = depositAmount();
  const balance = PROPOSAL.total - deposit;

  const pageChips = PROPOSAL.pages
    .map((p) => `<span class="chip">${esc(p)}</span>`)
    .join("");

  const stackCards = PROPOSAL.stack
    .map(
      (s) => `
      <div class="stack-card">
        <div class="stack-role">${esc(s.role)}</div>
        <div class="stack-name">${esc(s.name)}</div>
        <div class="stack-note">${esc(s.note)}</div>
      </div>`,
    )
    .join("");

  const compareRows = `
    <tr><td>Performance & page speed</td><td class="warn">Plugin-dependent</td><td class="good">Optimised by design</td></tr>
    <tr><td>Content management</td><td>WordPress admin + Elementor</td><td class="good">Custom admin dashboard</td></tr>
    <tr><td>Certificate verification</td><td>Plugin or heavy customisation</td><td class="good">Built-in, Phase 1</td></tr>
    <tr><td>Future LMS / student portal</td><td class="warn">Often requires rebuild</td><td class="good">Same platform, modular</td></tr>
    <tr><td>Security & maintenance</td><td class="warn">Plugin updates, theme conflicts</td><td class="good">Controlled codebase</td></tr>
    <tr><td>Annual licence costs</td><td class="warn">Astra Pro + Elementor Pro</td><td class="good">No theme/plugin fees</td></tr>
    <tr><td>Source code ownership</td><td>Theme/plugin licences</td><td class="good">Full ownership</td></tr>`;

  const featureItems = PROPOSAL.customFeatures
    .map((f) => `<li>${esc(f)}</li>`)
    .join("");

  const timelineHtml = PROPOSAL.timeline
    .map(
      (t) => `
      <div class="timeline-item">
        <div class="timeline-phase">${esc(t.phase)}</div>
        <div class="timeline-body">
          <strong>${esc(t.label)}</strong>
          <span>${esc(t.desc)}</span>
        </div>
      </div>`,
    )
    .join("");

  const pricingRows = PROPOSAL.lineItems
    .map(
      (row) => `
      <tr>
        <td>
          <div class="line-title">${esc(row.title)}</div>
          <div class="line-detail">${esc(row.detail)}</div>
        </td>
        <td class="num">${formatAmount(row.amount)}</td>
      </tr>`,
    )
    .join("");

  const recCards = PROPOSAL.recommendations
    .map(
      (r) => `
      <div class="rec-card">
        <h4>${esc(r.title)}</h4>
        <p>${esc(r.text)}</p>
      </div>`,
    )
    .join("");

  const deliverableItems = PROPOSAL.deliverables
    .map((d) => `<li><span class="check">✓</span> ${esc(d)}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Proposal ${esc(PROPOSAL.number)} — ${esc(COMPANY.name)}</title>
  <style>
    @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0e3c78;
    --navy-dark: #0a2d5c;
    --navy-deep: #071e3d;
    --accent: #1a8cff;
    --accent-soft: #e8f3ff;
    --gold: #c9a227;
    --text: #1a2332;
    --muted: #5a6578;
    --border: #d8e3f0;
    --surface: #f6f9fc;
    --white: #ffffff;
  }
  body {
    font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
    color: var(--text);
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Cover ── */
  .cover {
    min-height: 297mm;
    background: linear-gradient(145deg, var(--navy-deep) 0%, var(--navy) 45%, #1565b8 100%);
    color: var(--white);
    padding: 22mm 18mm 18mm;
    display: flex;
    flex-direction: column;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: "";
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .cover::after {
    content: "";
    position: absolute;
    bottom: -120px; left: -60px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: rgba(26,140,255,0.12);
  }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 1; }
  .cover-logo { height: 44px; width: auto; filter: brightness(0) invert(1); }
  .cover-badge {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 999px;
    padding: 6px 14px;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .cover-main { flex: 1; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 1; padding: 24px 0; }
  .cover-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    margin-bottom: 14px;
    font-weight: 600;
  }
  .cover h1 {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    max-width: 16ch;
    margin-bottom: 16px;
  }
  .cover-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.85);
    max-width: 52ch;
    line-height: 1.55;
    margin-bottom: 32px;
  }
  .cover-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    max-width: 100%;
  }
  .stat-box {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    padding: 16px 14px;
    backdrop-filter: blur(4px);
  }
  .stat-value { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
  .stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.7); margin-top: 4px; }
  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(255,255,255,0.2);
    padding-top: 16px;
    font-size: 11px;
    color: rgba(255,255,255,0.75);
    position: relative; z-index: 1;
  }
  .cover-client strong { display: block; color: #fff; font-size: 13px; margin-bottom: 2px; }

  /* ── Content pages ── */
  .page {
    padding: 14mm 16mm 16mm;
    min-height: 297mm;
    page-break-after: always;
    position: relative;
  }
  .page:last-child { page-break-after: auto; }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--navy);
    margin-bottom: 18px;
  }
  .page-header img { height: 28px; }
  .page-header-meta { text-align: right; font-size: 10px; color: var(--muted); line-height: 1.5; }
  .page-header-meta strong { color: var(--navy); }

  .section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }
  h2.section-title {
    font-size: 20px;
    font-weight: 800;
    color: var(--navy-dark);
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  .lead {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 20px;
    max-width: 68ch;
  }

  .highlight-box {
    background: linear-gradient(135deg, var(--accent-soft), #f0f6ff);
    border-left: 4px solid var(--navy);
    border-radius: 0 10px 10px 0;
    padding: 14px 16px;
    margin-bottom: 20px;
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--text);
  }
  .highlight-box strong { color: var(--navy); }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
  .info-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
  }
  .info-card h3 {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--navy);
    margin-bottom: 8px;
    font-weight: 700;
  }
  .info-card p, .info-card li { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .info-card ul { list-style: none; }
  .info-card li + li { margin-top: 4px; }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 18px;
  }
  .stack-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    border-top: 3px solid var(--navy);
  }
  .stack-role { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); font-weight: 700; margin-bottom: 4px; }
  .stack-name { font-size: 13px; font-weight: 800; color: var(--navy-dark); margin-bottom: 4px; }
  .stack-note { font-size: 10.5px; color: var(--muted); line-height: 1.4; }

  table.compare {
    width: 100%;
    border-collapse: collapse;
    font-size: 11.5px;
    margin-bottom: 18px;
  }
  table.compare th {
    background: var(--navy);
    color: #fff;
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
  }
  table.compare th:first-child { border-radius: 8px 0 0 0; }
  table.compare th:last-child { border-radius: 0 8px 0 0; }
  table.compare td {
    padding: 9px 12px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  table.compare tr:nth-child(even) td { background: var(--surface); }
  table.compare td.good { color: #0d7a4e; font-weight: 600; }
  table.compare td.warn { color: #b45309; }

  .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .chip {
    background: var(--accent-soft);
    color: var(--navy);
    border: 1px solid #c5daf5;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 10px;
    font-weight: 600;
  }

  .feature-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 16px;
    list-style: none;
    margin-bottom: 18px;
  }
  .feature-list li {
    font-size: 11.5px;
    padding-left: 18px;
    position: relative;
    color: var(--text);
    line-height: 1.45;
  }
  .feature-list li::before {
    content: "";
    position: absolute;
    left: 0; top: 6px;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }

  .timeline { margin-bottom: 18px; }
  .timeline-item {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    align-items: start;
  }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-phase {
    font-size: 10px;
    font-weight: 800;
    color: var(--navy);
    background: var(--accent-soft);
    border-radius: 6px;
    padding: 6px 8px;
    text-align: center;
    line-height: 1.3;
  }
  .timeline-body strong { display: block; font-size: 12px; color: var(--navy-dark); margin-bottom: 2px; }
  .timeline-body span { font-size: 11px; color: var(--muted); }

  table.pricing {
    width: 100%;
    border-collapse: collapse;
    font-size: 11.5px;
    margin-bottom: 14px;
  }
  table.pricing thead th {
    background: var(--navy);
    color: #fff;
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
  }
  table.pricing thead th.num { text-align: right; }
  table.pricing tbody td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  table.pricing tbody tr:nth-child(even) td { background: var(--surface); }
  table.pricing td.num { text-align: right; font-weight: 700; color: var(--navy-dark); white-space: nowrap; }
  .line-title { font-weight: 700; color: var(--navy-dark); font-size: 12px; margin-bottom: 2px; }
  .line-detail { font-size: 10.5px; color: var(--muted); line-height: 1.4; }

  .totals-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 18px;
  }
  .total-card {
    border-radius: 10px;
    padding: 14px;
    text-align: center;
  }
  .total-card.primary { background: var(--navy); color: #fff; }
  .total-card.secondary { background: var(--surface); border: 1px solid var(--border); }
  .total-card .amount { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
  .total-card.primary .amount { color: #fff; }
  .total-card.secondary .amount { color: var(--navy); }
  .total-card .label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; opacity: 0.85; }

  .rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px; }
  .rec-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
  }
  .rec-card h4 { font-size: 11.5px; color: var(--navy); margin-bottom: 6px; font-weight: 700; }
  .rec-card p { font-size: 10.5px; color: var(--muted); line-height: 1.5; }

  .deliverables {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
    margin-bottom: 18px;
  }
  .deliverables li {
    font-size: 11.5px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.4;
  }
  .check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #dcfce7;
    color: #15803d;
    font-size: 10px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .payment-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 16px;
  }
  .payment-box h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--navy); margin-bottom: 10px; }
  .payment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; font-size: 11.5px; }
  .payment-grid dt { color: var(--muted); font-weight: 600; }
  .payment-grid dd { color: var(--text); margin-bottom: 6px; }

  .signoff {
    border-top: 1px solid var(--border);
    padding-top: 14px;
    margin-top: 8px;
    font-size: 12px;
  }
  .signoff .name { font-weight: 800; color: var(--navy-dark); font-size: 13px; margin-top: 6px; }
  .signoff .role { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .page-footer {
    position: absolute;
    bottom: 10mm;
    left: 16mm; right: 16mm;
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 6px;
  }
  </style>
</head>
<body>

  <!-- COVER -->
  <section class="cover">
    <div class="cover-top">
      <img class="cover-logo" src="${logo.dataUrl}" alt="${esc(COMPANY.name)}" />
      <div class="cover-badge">Confidential Proposal</div>
    </div>
    <div class="cover-main">
      <div class="cover-eyebrow">Digital Platform Proposal · Phase 1</div>
      <h1>Training Institute Website &amp; Certificate Platform</h1>
      <p class="cover-sub">
        A premium, scalable digital platform for your KHDA-approved Computer Skills Training Institute —
        designed to match institutional quality, power admissions workflows, and grow into LMS &amp; student portal without rebuilding.
      </p>
      <div class="cover-stats">
        <div class="stat-box">
          <div class="stat-value">${PROPOSAL.currency} ${formatAmount(PROPOSAL.total)}</div>
          <div class="stat-label">Total Investment</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${esc(PROPOSAL.timelineWeeks)}</div>
          <div class="stat-label">Weeks Delivery</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">12 Pages</div>
          <div class="stat-label">+ Admin CMS</div>
        </div>
      </div>
    </div>
    <div class="cover-footer">
      <div class="cover-client">
        <strong>${esc(PROPOSAL.billTo.organisation)}</strong>
        ${esc(PROPOSAL.billTo.location)}
      </div>
      <div>
        <div>${esc(PROPOSAL.number)}</div>
        <div>${esc(PROPOSAL.date)} · Valid until ${esc(PROPOSAL.validUntil)}</div>
      </div>
    </div>
  </section>

  <!-- PAGE 2: Executive summary -->
  <section class="page">
    <header class="page-header">
      <img src="${logo.dataUrl}" alt="${esc(COMPANY.name)}" />
      <div class="page-header-meta">
        <strong>${esc(PROPOSAL.number)}</strong><br />
        ${esc(COMPANY.name)} · ${esc(COMPANY.website)}
      </div>
    </header>

    <div class="section-label">Executive Summary</div>
    <h2 class="section-title">Why Ocean Cyber — not WordPress</h2>
    <p class="lead">
      You requested WordPress with Astra Pro and Elementor Pro. After reviewing your full brief — certificate verification,
      admissions workflow, Google Workspace integration, and future LMS expansion — we recommend our proven custom
      development stack. It delivers WordPress-level content manageability with stronger performance, security, and a
      clear path to Phase 2 features without rebuilding the platform.
    </p>

    <div class="highlight-box">
      <strong>Our recommendation:</strong> The same technology stack behind institutional platforms such as
      <em>africagovernancecentre.org</em> — a modern, API-driven architecture your team can manage through a dedicated
      admin dashboard, with no plugin conflicts or annual theme licence fees.
    </div>

    <div class="two-col">
      <div class="info-card">
        <h3>Prepared By</h3>
        <p><strong>${esc(COMPANY.name)}</strong><br />
        ${COMPANY.addressLines.map(esc).join("<br />")}<br />
        ${esc(COMPANY.email)} · ${esc(COMPANY.phone)}</p>
      </div>
      <div class="info-card">
        <h3>Prepared For</h3>
        <p><strong>${esc(PROPOSAL.billTo.organisation)}</strong><br />
        ${esc(PROPOSAL.billTo.location)}<br />
        ${esc(PROPOSAL.billTo.contact)}</p>
      </div>
    </div>

    <div class="section-label">Scope — 12 Pages</div>
    <div class="chips">${pageChips}</div>

    <table class="compare">
      <thead>
        <tr>
          <th>Capability</th>
          <th>WordPress (Requested)</th>
          <th>Ocean Cyber Stack (Recommended)</th>
        </tr>
      </thead>
      <tbody>${compareRows}</tbody>
    </table>

    <footer class="page-footer">
      <span>${esc(COMPANY.name)} — Confidential</span>
      <span>Page 2</span>
    </footer>
  </section>

  <!-- PAGE 3: Technology & features -->
  <section class="page">
    <header class="page-header">
      <img src="${logo.dataUrl}" alt="${esc(COMPANY.name)}" />
      <div class="page-header-meta"><strong>${esc(PROPOSAL.number)}</strong></div>
    </header>

    <div class="section-label">Section 1</div>
    <h2 class="section-title">Recommended Technology Stack</h2>
    <div class="stack-grid">${stackCards}</div>

    <div class="section-label">Section 2</div>
    <h2 class="section-title">Custom-Developed Features (Phase 1)</h2>
    <ul class="feature-list">${featureItems}</ul>

    <div class="highlight-box" style="margin-bottom: 14px;">
      <strong>Configured integrations (not custom-built):</strong>
      Google Analytics 4, SSL certificate, Google Workspace app links (Classroom, Meet, Drive),
      and Stripe Payment Links sent manually after consultation.
    </div>

    <div class="section-label">Admissions Workflow</div>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-phase">Step 1</div>
        <div class="timeline-body"><strong>Browse programmes</strong><span>Students explore training courses and upcoming intakes</span></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-phase">Step 2</div>
        <div class="timeline-body"><strong>Apply or book consultation</strong><span>Apply Now / Book a Consultation CTAs on every programme</span></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-phase">Step 3</div>
        <div class="timeline-body"><strong>Online application</strong><span>Google Form submission → Gmail notification + Google Sheets record</span></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-phase">Step 4</div>
        <div class="timeline-body"><strong>Admissions follow-up</strong><span>Your team contacts applicants by phone, WhatsApp, or email</span></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-phase">Step 5</div>
        <div class="timeline-body"><strong>Payment &amp; enrolment</strong><span>Secure Stripe payment link sent manually; student enrolled after confirmation</span></div>
      </div>
    </div>

    <footer class="page-footer">
      <span>${esc(COMPANY.name)} — Confidential</span>
      <span>Page 3</span>
    </footer>
  </section>

  <!-- PAGE 4: Timeline & pricing -->
  <section class="page">
    <header class="page-header">
      <img src="${logo.dataUrl}" alt="${esc(COMPANY.name)}" />
      <div class="page-header-meta"><strong>${esc(PROPOSAL.number)}</strong></div>
    </header>

    <div class="section-label">Section 3</div>
    <h2 class="section-title">Development Timeline — ${esc(PROPOSAL.timelineWeeks)} Weeks</h2>
    <div class="timeline" style="margin-bottom: 22px;">${timelineHtml}</div>

    <div class="section-label">Section 4</div>
    <h2 class="section-title">Project Investment</h2>

    <table class="pricing">
      <thead>
        <tr>
          <th>Deliverable</th>
          <th class="num">Amount (${esc(PROPOSAL.currency)})</th>
        </tr>
      </thead>
      <tbody>${pricingRows}</tbody>
    </table>

    <div class="totals-bar">
      <div class="total-card primary">
        <div class="amount">${PROPOSAL.currency} ${formatAmount(PROPOSAL.total)}</div>
        <div class="label">Total Project Investment</div>
      </div>
      <div class="total-card secondary">
        <div class="amount">${PROPOSAL.currency} ${formatAmount(deposit)}</div>
        <div class="label">${PROPOSAL.depositPct}% Mobilisation Deposit</div>
      </div>
      <div class="total-card secondary">
        <div class="amount">${PROPOSAL.currency} ${formatAmount(balance)}</div>
        <div class="label">Balance on Completion</div>
      </div>
    </div>

    <footer class="page-footer">
      <span>${esc(COMPANY.name)} — Confidential</span>
      <span>Page 4</span>
    </footer>
  </section>

  <!-- PAGE 5: Recommendations, deliverables, payment -->
  <section class="page">
    <header class="page-header">
      <img src="${logo.dataUrl}" alt="${esc(COMPANY.name)}" />
      <div class="page-header-meta"><strong>${esc(PROPOSAL.number)}</strong></div>
    </header>

    <div class="section-label">Section 5</div>
    <h2 class="section-title">Recommendations for Scalability</h2>
    <div class="rec-grid">${recCards}</div>

    <div class="section-label">Deliverables Included</div>
    <ul class="deliverables">${deliverableItems}</ul>

    <div class="section-label">Terms</div>
    <div class="highlight-box" style="font-size: 11px; margin-bottom: 14px;">
      Quote valid until <strong>${esc(PROPOSAL.validUntil)}</strong>. All amounts in <strong>${esc(PROPOSAL.currency)}</strong>.
      Client provides logo, brand colours, course content, and KHDA copy. Two design revision rounds included.
      Domain and annual hosting quoted separately. Phase 2 (LMS, Arabic, CRM) scoped separately.
    </div>

    <div class="payment-box">
      <h3>Payment Details — Upon Acceptance</h3>
      <p style="font-size: 11.5px; color: var(--muted); margin-bottom: 10px;">
        Mobilisation deposit: <strong style="color: var(--navy);">${PROPOSAL.currency} ${formatAmount(deposit)}</strong>
        &nbsp;·&nbsp; Reference: <strong>${esc(PROPOSAL.number)}</strong>
        &nbsp;·&nbsp; International wire transfer in USD. Stripe invoice available on request.
      </p>
      <dl class="payment-grid">
        <dt>Bank</dt><dd>${esc(PAYMENT.bank.name)}</dd>
        <dt>Branch</dt><dd>${esc(PAYMENT.bank.branch)}</dd>
        <dt>Account Name</dt><dd>${esc(PAYMENT.bank.accountName)}</dd>
        <dt>Account Number</dt><dd>${esc(PAYMENT.bank.accountNumber)}</dd>
        <dt>SWIFT / BIC</dt><dd>${esc(PAYMENT.bank.swift)}</dd>
        <dt>Contact</dt><dd>${esc(COMPANY.email)} · ${esc(COMPANY.phone)}</dd>
      </dl>
    </div>

    <div class="signoff">
      <p>We look forward to partnering with your institute to deliver a platform that reflects the quality of your KHDA-approved training programmes.</p>
      <p style="margin-top: 10px;">Best regards,</p>
      <p class="name">${esc(PROPOSAL.preparedBy)}</p>
      <p class="role">${esc(COMPANY.name)} · ${esc(COMPANY.tagline)}</p>
    </div>

    <footer class="page-footer">
      <span>${esc(COMPANY.name)} — Confidential</span>
      <span>Page 5</span>
    </footer>
  </section>

</body>
</html>`;
}

async function generatePdf(html) {
  const htmlPath = path.join(ROOT, "Proposal-Dubai-Training-Institute-2026-07-06.html");
  const pdfPath = path.join(ROOT, "Proposal-Dubai-Training-Institute-2026-07-06.pdf");
  fs.writeFileSync(htmlPath, html, "utf8");

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
  } finally {
    await browser.close();
  }

  return { pdfPath, htmlPath };
}

const logo = await loadLogoAsset();
const html = buildHtml(logo);
const { pdfPath, htmlPath } = await generatePdf(html);
console.log("Created:", pdfPath);
console.log("Created:", htmlPath);
console.log("Total:", `USD ${formatAmount(PROPOSAL.total)}`);
