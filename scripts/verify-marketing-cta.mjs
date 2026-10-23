#!/usr/bin/env node
/**
 * Guard against duplicate marketing CTA copy outside @oceancyber/shared.
 * Run: npm run verify:marketing-cta
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const allowPaths = new Set([
  "packages/shared/src/marketing-cta.ts",
  "packages/shared/src/marketing-cta.test.ts",
  "app/get-started/page.tsx",
  "lib/trust/review-trust.ts",
  "lib/seo/web-design-geo-faqs.ts",
  "app/llms.txt/route.ts",
  "components/legal/LegalPageFooter.tsx",
  "components/tools/SecurityAssessmentWizard.tsx",
  "lib/security-assessment/generate-report-pdf.ts",
]);

const rules = [
  {
    name: 'hardcoded label: "Get started"',
    re: /label:\s*["']Get started["']/,
  },
  {
    name: 'hardcoded JSX ">Get started<"',
    re: />\s*Get started\s*</,
  },
  {
    name: 'hardcoded "View portfolio" button',
    re: />\s*View portfolio\s*</,
  },
  {
    name: 'hardcoded "Compare pricing" (use Compare packages)',
    re: />\s*Compare pricing\s*</,
  },
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "dist") continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, files);
    else if (/\.(tsx?|jsx?)$/.test(name)) files.push(path);
  }
  return files;
}

const failures = [];
for (const file of walk(root)) {
  const rel = relative(root, file).replace(/\\/g, "/");
  if (!rel.startsWith("app/") && !rel.startsWith("components/") && !rel.startsWith("lib/")) {
    continue;
  }
  if (allowPaths.has(rel)) continue;
  const text = readFileSync(file, "utf8");
  for (const { name, re } of rules) {
    if (re.test(text)) failures.push(`${rel}: ${name}`);
  }
}

if (failures.length) {
  console.error("Marketing CTA drift detected:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("\nUse SITE_CTA from @oceancyber/shared (via @/lib/marketing/site-cta).");
  process.exit(1);
}

console.log("Marketing CTA check passed.");
