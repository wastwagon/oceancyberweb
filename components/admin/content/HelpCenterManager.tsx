"use client";

import { useCallback, useEffect, useState } from "react";
import {
  helpArticleCategories,
  type HelpArticle,
  type HelpArticleCategory,
} from "@/lib/help-center/content";
import { AppAlert } from "@/components/ui/AppAlert";

function emptyArticle(): HelpArticle {
  return {
    id: "",
    title: "",
    category: "support",
    body: "",
    actions: [{ label: "", href: "" }],
  };
}

export function HelpCenterManager() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/help-center", { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load help articles");
      const data = (await res.json()) as { articles: HelpArticle[] };
      setArticles(data.articles);
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

  function updateArticle(index: number, patch: Partial<HelpArticle>) {
    setArticles((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  }

  function updateAction(articleIndex: number, actionIndex: number, field: "label" | "href", value: string) {
    setArticles((prev) =>
      prev.map((article, i) => {
        if (i !== articleIndex) return article;
        const actions = article.actions.map((action, j) =>
          j === actionIndex ? { ...action, [field]: value } : action,
        );
        return { ...article, actions };
      }),
    );
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/help-center", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articles }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setToast("Help center saved. Live on /help-center now.");
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
          <h2 className="text-lg font-bold text-white">Help center articles</h2>
          <p className="mt-1 text-sm text-sa-muted/80">
            Powers <code className="rounded bg-sa-bg px-1">/help-center</code> knowledge base search results.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-sa-border px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setArticles((prev) => [...prev, emptyArticle()])}
          >
            Add article
          </button>
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => void save()}
            className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save help center"}
          </button>
        </div>
      </div>

      {toast ? <AppAlert variant="success" className="mt-4">{toast}</AppAlert> : null}
      {error ? <AppAlert variant="error" className="mt-4">{error}</AppAlert> : null}

      {loading ? (
        <p className="mt-6 text-sm text-sa-muted/80">Loading articles…</p>
      ) : (
        <div className="mt-6 space-y-6">
          {articles.map((article, index) => (
            <div
              key={`${article.id || "new"}-${index}`}
              className="rounded-xl border border-sa-border bg-sa-bg/50 p-4 md:p-5"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">
                  Article {index + 1}
                  {article.id ? ` · ${article.id}` : ""}
                </p>
                <button
                  type="button"
                  className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-700"
                  onClick={() => {
                    if (!confirm(`Remove "${article.title || "this article"}"?`)) return;
                    setArticles((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-sa-muted/80">
                  ID (slug)
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={article.id}
                    onChange={(e) => updateArticle(index, { id: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80">
                  Category
                  <select
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={article.category}
                    onChange={(e) =>
                      updateArticle(index, { category: e.target.value as HelpArticleCategory })
                    }
                  >
                    {helpArticleCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-sa-muted/80 sm:col-span-2">
                  Title
                  <input
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    value={article.title}
                    onChange={(e) => updateArticle(index, { title: e.target.value })}
                  />
                </label>
                <label className="text-xs text-sa-muted/80 sm:col-span-2">
                  Body
                  <textarea
                    className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                    rows={3}
                    value={article.body}
                    onChange={(e) => updateArticle(index, { body: e.target.value })}
                  />
                </label>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">
                    Action links
                  </p>
                  <button
                    type="button"
                    className="rounded border border-sa-border px-2 py-1 text-xs font-semibold text-white"
                    onClick={() =>
                      updateArticle(index, {
                        actions: [...article.actions, { label: "", href: "" }],
                      })
                    }
                  >
                    Add link
                  </button>
                </div>
                {article.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <input
                      className="rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      placeholder="Label"
                      value={action.label}
                      onChange={(e) => updateAction(index, actionIndex, "label", e.target.value)}
                    />
                    <input
                      className="rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      placeholder="/dashboard"
                      value={action.href}
                      onChange={(e) => updateAction(index, actionIndex, "href", e.target.value)}
                    />
                    <button
                      type="button"
                      className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-700"
                      onClick={() =>
                        updateArticle(index, {
                          actions: article.actions.filter((_, j) => j !== actionIndex),
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
