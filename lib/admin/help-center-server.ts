import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  defaultHelpArticles,
  helpArticleCategories,
  type HelpArticle,
  type HelpArticleCategory,
} from "@/lib/help-center/content";

const HELP_JSON = path.join(process.cwd(), "public", "data", "help-center.json");

const VALID_CATEGORIES = new Set<string>(helpArticleCategories);

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizeAction(raw: unknown): { label: string; href: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const label = typeof row.label === "string" ? row.label.trim() : "";
  const href = typeof row.href === "string" ? row.href.trim() : "";
  if (!label || !href) return null;
  return { label, href };
}

function sanitizeArticle(raw: unknown, index: number): HelpArticle | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const title = typeof row.title === "string" ? row.title.trim() : "";
  if (!title) return null;

  const id =
    typeof row.id === "string" && row.id.trim()
      ? slugify(row.id)
      : slugify(title) || `article-${index + 1}`;

  const categoryRaw = typeof row.category === "string" ? row.category.trim() : "support";
  const category = (VALID_CATEGORIES.has(categoryRaw)
    ? categoryRaw
    : "support") as HelpArticleCategory;

  const actions = Array.isArray(row.actions)
    ? row.actions
        .map((a) => sanitizeAction(a))
        .filter((a): a is { label: string; href: string } => a !== null)
    : [];

  return {
    id,
    title,
    category,
    body: typeof row.body === "string" ? row.body.trim() : "",
    actions,
  };
}

export async function readHelpCenterFile(): Promise<HelpArticle[]> {
  try {
    const raw = await readFile(HELP_JSON, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return defaultHelpArticles;
    const articles = parsed
      .map((row, i) => sanitizeArticle(row, i))
      .filter((a): a is HelpArticle => a !== null);
    return articles.length > 0 ? articles : defaultHelpArticles;
  } catch {
    return defaultHelpArticles;
  }
}

export async function writeHelpCenterFile(articles: HelpArticle[]): Promise<void> {
  const sanitized = articles
    .map((row, i) => sanitizeArticle(row, i))
    .filter((a): a is HelpArticle => a !== null);
  if (sanitized.length === 0) {
    throw new Error("At least one help article is required");
  }
  const ids = new Set<string>();
  for (const article of sanitized) {
    if (ids.has(article.id)) {
      throw new Error(`Duplicate article id: ${article.id}`);
    }
    ids.add(article.id);
  }
  await mkdir(path.dirname(HELP_JSON), { recursive: true });
  await writeFile(HELP_JSON, `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
}
