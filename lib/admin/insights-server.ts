import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  insightPosts as defaultInsightPosts,
  insightCategories,
  type InsightPost,
} from "@/lib/insights/content";

const INSIGHTS_JSON = path.join(process.cwd(), "public", "data", "insights.json");

const VALID_CATEGORIES = new Set<string>(
  insightCategories.filter((c): c is Exclude<(typeof insightCategories)[number], "All"> => c !== "All"),
);

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizePost(raw: unknown, index: number): InsightPost | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const title = typeof row.title === "string" ? row.title.trim() : "";
  if (!title) return null;

  const slug =
    typeof row.slug === "string" && row.slug.trim()
      ? slugify(row.slug)
      : slugify(title) || `post-${index + 1}`;

  const categoryRaw = typeof row.category === "string" ? row.category.trim() : "";
  const category =
    categoryRaw && VALID_CATEGORIES.has(categoryRaw)
      ? (categoryRaw as InsightPost["category"])
      : "Technology";

  const paragraphs = Array.isArray(row.paragraphs)
    ? row.paragraphs
        .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
        .map((p) => p.trim())
    : [];

  return {
    slug,
    title,
    excerpt: typeof row.excerpt === "string" ? row.excerpt.trim() : "",
    paragraphs: paragraphs.length > 0 ? paragraphs : [""],
    image: typeof row.image === "string" && row.image.trim() ? row.image.trim() : "/images/EGP Ghana.webp",
    category,
    date: typeof row.date === "string" ? row.date.trim() : "January 1, 2024",
    readTime: typeof row.readTime === "string" ? row.readTime.trim() : "5 min read",
  };
}

export async function readInsightsFile(): Promise<InsightPost[]> {
  try {
    const raw = await readFile(INSIGHTS_JSON, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return defaultInsightPosts;
    const posts = parsed
      .map((row, i) => sanitizePost(row, i))
      .filter((p): p is InsightPost => p !== null);
    return posts.length > 0 ? posts : defaultInsightPosts;
  } catch {
    return defaultInsightPosts;
  }
}

export async function writeInsightsFile(posts: InsightPost[]): Promise<void> {
  const sanitized = posts
    .map((row, i) => sanitizePost(row, i))
    .filter((p): p is InsightPost => p !== null);
  if (sanitized.length === 0) {
    throw new Error("At least one insight post is required");
  }
  const slugs = new Set<string>();
  for (const post of sanitized) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate slug: ${post.slug}`);
    }
    slugs.add(post.slug);
  }
  await mkdir(path.dirname(INSIGHTS_JSON), { recursive: true });
  await writeFile(INSIGHTS_JSON, `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
}
