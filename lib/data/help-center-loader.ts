import { readFile } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import {
  defaultHelpArticles,
  type HelpArticle,
} from "@/lib/help-center/content";

const HELP_JSON = path.join(process.cwd(), "public", "data", "help-center.json");

export type { HelpArticle };

async function readHelpArticlesFromDisk(): Promise<HelpArticle[]> {
  try {
    const raw = await readFile(HELP_JSON, "utf8");
    const parsed = JSON.parse(raw) as HelpArticle[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultHelpArticles;
    }
    return parsed;
  } catch {
    return defaultHelpArticles;
  }
}

export const getHelpArticles = unstable_cache(
  readHelpArticlesFromDisk,
  ["marketing-help-articles"],
  { revalidate: 60, tags: ["help-center"] },
);
