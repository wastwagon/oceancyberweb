import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  insightPosts as defaultInsightPosts,
  insightCategories,
  type InsightLink,
  type InsightPost,
  type InsightSection,
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

function sanitizeLinks(raw: unknown): InsightLink[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const links = raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const href = typeof row.href === "string" ? row.href.trim() : "";
    const label = typeof row.label === "string" ? row.label.trim() : "";
    if (!href.startsWith("/") || !label) return [];
    return [{ href, label }];
  });
  return links.length > 0 ? links : undefined;
}

function sanitizeSections(raw: unknown): InsightSection[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const sections = raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const heading = typeof row.heading === "string" ? row.heading.trim() : "";
    const paragraphs = Array.isArray(row.paragraphs)
      ? row.paragraphs
          .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
          .map((p) => p.trim())
      : [];
    if (!heading || paragraphs.length === 0) return [];
    const bullets = Array.isArray(row.bullets)
      ? row.bullets
          .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
          .map((b) => b.trim())
      : undefined;
    const links = sanitizeLinks(row.links);
    return [
      {
        heading,
        paragraphs,
        ...(bullets && bullets.length > 0 ? { bullets } : {}),
        ...(links ? { links } : {}),
      },
    ];
  });
  return sections.length > 0 ? sections : undefined;
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

  const sections = sanitizeSections(row.sections);
  const related = sanitizeLinks(row.related);

  return {
    slug,
    title,
    excerpt: typeof row.excerpt === "string" ? row.excerpt.trim() : "",
    paragraphs: paragraphs.length > 0 ? paragraphs : [""],
    ...(sections ? { sections } : {}),
    ...(related ? { related } : {}),
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
