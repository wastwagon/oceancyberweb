"use client";

import { useCallback, useEffect, useState } from "react";
import { insightCategories, type InsightPost } from "@/lib/insights/content";
import { AppAlert } from "@/components/ui/AppAlert";

const CATEGORY_OPTIONS = insightCategories.filter((c) => c !== "All");

function emptyPost(): InsightPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    paragraphs: [""],
    image: "/images/EGP Ghana.webp",
    category: "Technology",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read",
  };
}

function paragraphsToText(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

function textToParagraphs(value: string): string[] {
  const parts = value
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [""];
}

export function InsightsManager() {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/insights", { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load insights");
      const data = (await res.json()) as { posts: InsightPost[] };
      setPosts(data.posts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  function updatePost(index: number, patch: Partial<InsightPost>) {
    setPosts((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/insights", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setToast("Insights saved. Live on /insights now.");
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-sa-border bg-sa-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Insights articles</h2>
          <p className="mt-1 text-sm text-sa-muted/80">
            Powers <code className="rounded bg-sa-bg px-1">/insights</code>. Separate paragraphs with a blank line.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-sa-border px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setPosts((prev) => [...prev, emptyPost()])}
          >
            Add article
          </button>
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => void save()}
            className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save insights"}
          </button>
        </div>
      </div>

      {toast ? <AppAlert variant="success" className="mt-4">{toast}</AppAlert> : null}
      {error ? <AppAlert variant="error" className="mt-4">{error}</AppAlert> : null}

      {loading ? (
        <p className="mt-6 text-sm text-sa-muted/80">Loading insights…</p>
      ) : (
        <div className="mt-6 space-y-6">
          {posts.map((post, index) => (
            <div
              key={`${post.slug || "new"}-${index}`}
              className="rounded-xl border border-sa-border bg-sa-bg/50 p-4 md:p-5"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">
                  Article {index + 1}
                  {post.slug ? ` · /insights/${post.slug}` : ""}
                </p>
                <button
                  type="button"
                  className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-700"
                  onClick={() => {
                    if (!confirm(`Remove "${post.title || "this article"}"?`)) return;
                    setPosts((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-sa-muted/80">
                  Title
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={post.title}
                    onChange={(e) => updatePost(index, { title: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80">
                  Slug
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    placeholder="my-article-slug"
                    value={post.slug}
                    onChange={(e) => updatePost(index, { slug: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80">
                  Category
                  <select
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={post.category}
                    onChange={(e) => updatePost(index, { category: e.target.value })}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-sa-muted/80">
                  Hero image path
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={post.image}
                    onChange={(e) => updatePost(index, { image: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80">
                  Date label
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={post.date}
                    onChange={(e) => updatePost(index, { date: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80">
                  Read time
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={post.readTime}
                    onChange={(e) => updatePost(index, { readTime: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80 sm:col-span-2">
                  Excerpt
                  <textarea
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    rows={2}
                    value={post.excerpt}
                    onChange={(e) => updatePost(index, { excerpt: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80 sm:col-span-2">
                  Body paragraphs
                  <textarea
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    rows={6}
                    value={paragraphsToText(post.paragraphs)}
                    onChange={(e) =>
                      updatePost(index, { paragraphs: textToParagraphs(e.target.value) })
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
