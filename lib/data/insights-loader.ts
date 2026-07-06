import { readFile } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import {
  insightPosts as defaultInsightPosts,
  type InsightPost,
} from "@/lib/insights/content";

const INSIGHTS_JSON = path.join(process.cwd(), "public", "data", "insights.json");

export type { InsightPost };

async function readInsightPostsFromDisk(): Promise<InsightPost[]> {
  try {
    const raw = await readFile(INSIGHTS_JSON, "utf8");
    const parsed = JSON.parse(raw) as InsightPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultInsightPosts;
    }
    return parsed;
  } catch {
    return defaultInsightPosts;
  }
}

export const getInsightPosts = unstable_cache(
  readInsightPostsFromDisk,
  ["marketing-insight-posts"],
  { revalidate: 60, tags: ["insights"] },
);

export async function getInsightPostBySlug(slug: string): Promise<InsightPost | undefined> {
  const posts = await getInsightPosts();
  return posts.find((p) => p.slug === slug);
}
