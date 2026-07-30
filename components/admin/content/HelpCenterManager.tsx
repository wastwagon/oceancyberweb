"use client";

import { useCallback, useEffect, useState } from "react";
import {
  helpArticleCategories,
  type HelpArticle,
  type HelpArticleCategory,
} from "@/lib/help-center/content";
import { AppAlert } from "@/components/ui/AppAlert";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";
import { SaSelect } from "@/components/ui/SaSelect";

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
          <SaButton
            type="button"
            variant="secondary"
            size="sm"
            className="rounded-lg normal-case tracking-normal"
            onClick={() => setArticles((prev) => [...prev, emptyArticle()])}
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
            {saving ? "Saving…" : "Save help center"}
          </SaButton>
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
                  className="rounded border border-sa-danger/40 px-2 py-1 text-xs font-semibold text-sa-danger"
                  onClick={() => {
                    if (!confirm(`Remove "${article.title || "this article"}"?`)) return;
                    setArticles((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <SaField id={`help-id-${index}`} label="ID (slug)" labelTone="cms">
                  <SaInput
                    id={`help-id-${index}`}
                    density="micro"
                    value={article.id}
                    onChange={(e) => updateArticle(index, { id: e.target.value })}
                  />
                </SaField>
                <SaField id={`help-cat-${index}`} label="Category" labelTone="cms">
                  <SaSelect
                    id={`help-cat-${index}`}
                    density="micro"
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
                  </SaSelect>
                </SaField>
                <SaField id={`help-title-${index}`} label="Title" labelTone="cms" className="sm:col-span-2">
                  <SaInput
                    id={`help-title-${index}`}
                    density="micro"
                    value={article.title}
                    onChange={(e) => updateArticle(index, { title: e.target.value })}
                  />
                </SaField>
                <SaField id={`help-body-${index}`} label="Body" labelTone="cms" className="sm:col-span-2">
                  <SaTextarea
                    id={`help-body-${index}`}
                    density="micro"
                    rows={3}
                    value={article.body}
                    onChange={(e) => updateArticle(index, { body: e.target.value })}
                  />
                </SaField>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">
                    Action links
                  </p>
                  <SaButton
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-lg normal-case tracking-normal"
                    onClick={() =>
                      updateArticle(index, {
                        actions: [...article.actions, { label: "", href: "" }],
                      })
                    }
                  >
                    Add link
                  </SaButton>
                </div>
                {article.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <SaInput
                      density="micro"
                      placeholder="Label"
                      value={action.label}
                      onChange={(e) => updateAction(index, actionIndex, "label", e.target.value)}
                    />
                    <SaInput
                      density="micro"
                      placeholder="/dashboard"
                      value={action.href}
                      onChange={(e) => updateAction(index, actionIndex, "href", e.target.value)}
                    />
                    <button
                      type="button"
                      className="rounded border border-sa-danger/40 px-2 py-1 text-xs font-semibold text-sa-danger"
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
