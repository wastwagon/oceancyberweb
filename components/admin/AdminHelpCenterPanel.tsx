"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { defaultHelpArticles } from "@/lib/help-center/content";
import { cn } from "@/lib/utils";

type HelpFeedbackSummary = {
  totalFeedback: number;
  articles: Array<{
    articleId: string;
    yes: number;
    no: number;
    total: number;
    helpfulRate: number;
  }>;
};

interface AdminHelpCenterPanelProps {
  all: HelpFeedbackSummary | null;
  last7d: HelpFeedbackSummary | null;
  last30d: HelpFeedbackSummary | null;
}

const RANGES = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "all", label: "All time" },
] as const;

export function AdminHelpCenterPanel({
  all,
  last7d,
  last30d,
}: AdminHelpCenterPanelProps) {
  const [range, setRange] = useState<(typeof RANGES)[number]["id"]>("30d");
  const [articleLabels, setArticleLabels] = useState<Record<string, string>>(() =>
    Object.fromEntries(defaultHelpArticles.map((a) => [a.id, a.title])),
  );

  useEffect(() => {
    void fetch("/api/admin/help-center", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { articles?: Array<{ id: string; title: string }> } | null) => {
        if (!data?.articles?.length) return;
        setArticleLabels(Object.fromEntries(data.articles.map((a) => [a.id, a.title])));
      })
      .catch(() => undefined);
  }, []);

  const active =
    range === "7d" ? last7d : range === "30d" ? last30d : all;
  const articles = active?.articles ?? [];

  return (
    <section className="sa-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sa-border p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sa-primary/10 text-sa-primary">
            <BookOpen size={16} />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">Help center feedback</h2>
            <p className="mt-1 text-[11px] font-medium text-sa-muted/60">
              {active?.totalFeedback ?? 0} responses in this window
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all",
                range === r.id
                  ? "border-sa-primary bg-sa-primary text-black"
                  : "border-sa-border bg-sa-surface text-sa-muted hover:text-white",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        {articles.length === 0 ? (
          <p className="p-6 text-sm text-sa-muted/60 md:p-8">
            No help-center feedback recorded for this period.
          </p>
        ) : (
          <table className="w-full min-w-[640px] text-left whitespace-nowrap">
            <thead className="bg-sa-surface/30 text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
              <tr>
                <th className="px-8 py-4">Article</th>
                <th className="px-6 py-4">Helpful</th>
                <th className="px-6 py-4">Not helpful</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-8 py-4 text-right">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sa-border/20">
              {articles.map((a) => (
                <tr key={a.articleId} className="hover:bg-sa-surface/10 transition-colors">
                  <td className="max-w-xs px-8 py-4 text-sm font-bold text-white whitespace-normal">
                    {articleLabels[a.articleId] ?? a.articleId}
                  </td>
                  <td className="px-6 py-4 text-sm text-emerald-400">{a.yes}</td>
                  <td className="px-6 py-4 text-sm text-rose-400">{a.no}</td>
                  <td className="px-6 py-4 text-sm text-sa-muted">{a.total}</td>
                  <td className="px-8 py-4 text-right">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                        a.helpfulRate >= 70
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : a.helpfulRate >= 40
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                            : "border-rose-500/30 bg-rose-500/10 text-rose-400",
                      )}
                    >
                      {a.helpfulRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
