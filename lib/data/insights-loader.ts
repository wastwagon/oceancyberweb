import { readFile } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import {
  insightPosts as defaultInsightPosts,
  type InsightPost,
  DEFAULT_INSIGHT_AUTHOR,
  insightLastReviewedIso,
  insightAuthorName,
} from "@/lib/insights/content";

const INSIGHTS_JSON = path.join(process.cwd(), "public", "data", "insights.json");

export type { InsightPost };

function normalizeInsightPost(post: InsightPost): InsightPost {
  return {
    ...post,
    authorName: insightAuthorName(post),
    lastReviewed: insightLastReviewedIso(post),
  };
}

async function readInsightPostsFromDisk(): Promise<InsightPost[]> {
  try {
    const raw = await readFile(INSIGHTS_JSON, "utf8");
    const parsed = JSON.parse(raw) as InsightPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultInsightPosts.map(normalizeInsightPost);
    }
    return parsed.map(normalizeInsightPost);
  } catch {
    return defaultInsightPosts.map(normalizeInsightPost);
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
