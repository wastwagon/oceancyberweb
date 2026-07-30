"use client";

import { useCallback, useEffect, useState } from "react";
import { insightCategories, type InsightPost } from "@/lib/insights/content";
import { AppAlert } from "@/components/ui/AppAlert";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";
import { SaSelect } from "@/components/ui/SaSelect";

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
          <SaButton
            type="button"
            variant="secondary"
            size="sm"
            className="rounded-lg normal-case tracking-normal"
            onClick={() => setPosts((prev) => [...prev, emptyPost()])}
          >
            Add article
          </SaButton>
          <SaButton
            type="button"
            size="sm"
            disabled={saving || loading}
            onClick={() => void save()}
            className="rounded-lg normal-case tracking-normal"
          >
            {saving ? "Saving…" : "Save insights"}
          </SaButton>
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
                  className="rounded border border-sa-danger/40 px-2 py-1 text-xs font-semibold text-sa-danger"
                  onClick={() => {
                    if (!confirm(`Remove "${post.title || "this article"}"?`)) return;
                    setPosts((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <SaField id={`insight-title-${index}`} label="Title" labelTone="cms">
                  <SaInput
                    id={`insight-title-${index}`}
                    density="micro"
                    value={post.title}
                    onChange={(e) => updatePost(index, { title: e.target.value })}
                  />
                </SaField>
                <SaField id={`insight-slug-${index}`} label="Slug" labelTone="cms">
                  <SaInput
                    id={`insight-slug-${index}`}
                    density="micro"
                    placeholder="my-article-slug"
                    value={post.slug}
                    onChange={(e) => updatePost(index, { slug: e.target.value })}
                  />
                </SaField>
                <SaField id={`insight-cat-${index}`} label="Category" labelTone="cms">
                  <SaSelect
                    id={`insight-cat-${index}`}
                    density="micro"
                    value={post.category}
                    onChange={(e) => updatePost(index, { category: e.target.value })}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </SaSelect>
                </SaField>
                <SaField id={`insight-image-${index}`} label="Hero image path" labelTone="cms">
                  <SaInput
                    id={`insight-image-${index}`}
                    density="micro"
                    value={post.image}
                    onChange={(e) => updatePost(index, { image: e.target.value })}
                  />
                </SaField>
                <SaField id={`insight-date-${index}`} label="Date label" labelTone="cms">
                  <SaInput
                    id={`insight-date-${index}`}
                    density="micro"
                    value={post.date}
                    onChange={(e) => updatePost(index, { date: e.target.value })}
                  />
                </SaField>
                <SaField id={`insight-read-${index}`} label="Read time" labelTone="cms">
                  <SaInput
                    id={`insight-read-${index}`}
                    density="micro"
                    value={post.readTime}
                    onChange={(e) => updatePost(index, { readTime: e.target.value })}
                  />
                </SaField>
                <SaField
                  id={`insight-excerpt-${index}`}
                  label="Excerpt"
                  labelTone="cms"
                  className="sm:col-span-2"
                >
                  <SaTextarea
                    id={`insight-excerpt-${index}`}
                    density="micro"
                    rows={2}
                    value={post.excerpt}
                    onChange={(e) => updatePost(index, { excerpt: e.target.value })}
                  />
                </SaField>
                <SaField
                  id={`insight-body-${index}`}
                  label="Body paragraphs"
                  labelTone="cms"
                  className="sm:col-span-2"
                >
                  <SaTextarea
                    id={`insight-body-${index}`}
                    density="micro"
                    rows={6}
                    value={paragraphsToText(post.paragraphs)}
                    onChange={(e) =>
                      updatePost(index, { paragraphs: textToParagraphs(e.target.value) })
                    }
                  />
                </SaField>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
