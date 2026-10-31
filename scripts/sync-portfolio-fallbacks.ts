#!/usr/bin/env npx tsx
/**
 * Align Postgres Project rows with lib/data/projects.ts (descriptions, metrics, concept source, liveUrl).
 * Requires DATABASE_URL. Safe to re-run after deploy or fallback edits.
 *
 * Usage: npm run sync:portfolio
 * Post-deploy (with migrate): npm run postdeploy:portfolio
 */
import { PrismaClient } from "@prisma/client";
import { seedPortfolioFromFallbacks } from "../prisma/seed-portfolio-fallbacks";

const prisma = new PrismaClient();

async function main() {
  const count = await seedPortfolioFromFallbacks(prisma);
  console.log(`Synced ${count} portfolio row(s) from fallbacks.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
