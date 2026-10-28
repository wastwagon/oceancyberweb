#!/usr/bin/env npx tsx
/**
 * Writes public/data/help-center.json from lib/help-center/content.ts defaults.
 * Run after adding help articles in code: npm run sync:help-center
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultHelpArticles } from "../lib/help-center/content";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "data", "help-center.json");
writeFileSync(out, `${JSON.stringify(defaultHelpArticles, null, 2)}\n`, "utf8");
console.log(`Wrote ${defaultHelpArticles.length} articles to ${out}`);
