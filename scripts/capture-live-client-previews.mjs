/**
 * Capture viewport screenshots of live client sites for portfolio cards.
 * Output: public/images/portfolio-live/{slug}.webp
 *
 * Usage: npm run capture:live-previews
 */
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/portfolio-live");

const CLIENTS = [
  { slug: "fitch-advisory", url: "https://www.fitchadvisory.com/" },
  { slug: "fitch-attorneys", url: "https://www.fitchattorneys.com/" },
  { slug: "africa-governance-centre", url: "https://www.africagovernancecentre.org/" },
  { slug: "thinq-shopping", url: "https://thinqshopping.app/" },
];

const VIEWPORT = { width: 1440, height: 900 };

async function captureClient(browser, { slug, url }) {
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForLoadState("load", { timeout: 20_000 }).catch(() => undefined);
    await page.waitForTimeout(2500);

    const png = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: Math.round(VIEWPORT.height * 0.62) },
    });

    const outPath = path.join(OUT_DIR, `${slug}.webp`);
    await sharp(png)
      .webp({ quality: 86, effort: 4 })
      .toFile(outPath);

    console.log(`✓ ${slug} → ${path.relative(ROOT, outPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ ${slug} (${url}):`, error instanceof Error ? error.message : error);
    return false;
  } finally {
    await page.close();
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let failed = 0;
  try {
    for (const client of CLIENTS) {
      const ok = await captureClient(browser, client);
      if (!ok) failed += 1;
    }
  } finally {
    await browser.close();
  }

  if (failed > 0) {
    console.error(`\n${failed} capture(s) failed. Re-run after checking network or site availability.`);
    process.exit(1);
  }

  console.log("\nDone. Commit public/images/portfolio-live/*.webp");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
