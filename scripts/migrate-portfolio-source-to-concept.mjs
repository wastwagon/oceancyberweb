#!/usr/bin/env node
/**
 * Rewrites legacy Project.details.v1.portfolioSource "studio" → "concept" in Postgres.
 * Safe to run multiple times. Requires DATABASE_URL.
 *
 * Usage: npm run migrate:portfolio-source
 * Then align copy/metrics from repo fallbacks: npm run sync:portfolio
 * Or both: npm run postdeploy:portfolio
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.project.findMany({ select: { id: true, slug: true, details: true } });
  let updated = 0;

  for (const row of rows) {
    const d = row.details;
    if (!d || typeof d !== "object" || !("v" in d) || d.v !== 1) continue;
    if (d.portfolioSource !== "studio") continue;

    await prisma.project.update({
      where: { id: row.id },
      data: {
        details: {
          ...d,
          portfolioSource: "concept",
        },
      },
    });
    updated += 1;
    console.log(`Updated ${row.slug}: portfolioSource studio → concept`);
  }

  console.log(updated ? `Done. ${updated} row(s) updated.` : "No legacy studio portfolioSource rows found.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
