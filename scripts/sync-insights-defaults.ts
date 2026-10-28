#!/usr/bin/env npx tsx
/**
 * Writes public/data/insights.json from lib/insights/content.ts defaults.
 * Run after adding insights in code: npm run sync:insights
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { insightPosts } from "../lib/insights/content";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "data", "insights.json");
writeFileSync(out, `${JSON.stringify(insightPosts, null, 2)}\n`, "utf8");
console.log(`Wrote ${insightPosts.length} posts to ${out}`);
