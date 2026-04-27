"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type HelpArticle = {
  id: string;
  title: string;
  category: "billing" | "renewals" | "websites" | "security" | "support";
  body: string;
  actions: { label: string; href: string }[];
};

const ARTICLES: HelpArticle[] = [
  {
    id: "wallet-topup",
    title: "How to top up wallet and pay renewals",
    category: "billing",
    body: "Go to Dashboard > Wallet, add funds with Paystack, then return to Dashboard and click Charge wallet on any due renewal.",
    actions: [
      { label: "Open wallet", href: "/dashboard/wallet" },
      { label: "Open renewals dashboard", href: "/dashboard" },
    ],
  },
  {
    id: "past-due",
    title: "What to do when a renewal is past due",
    category: "renewals",
    body: "Past due means payment was not collected on schedule. Add funds and charge manually before grace ends to avoid suspension.",
    actions: [{ label: "Go to billing dashboard", href: "/dashboard" }],
  },
  {
    id: "intake-vs-proposal",
    title: "Intake request vs formal proposal request",
    category: "support",
    body: "Use interactive intake to describe needs quickly. Use formal proposal request when you want a structured scope, timeline, and cost sections.",
    actions: [
      { label: "Start interactive intake", href: "/get-started?topic=Need quote or proposal" },
      { label: "Request formal proposal", href: "/tools/proposal?topic=Need quote or proposal" },
    ],
  },
  {
    id: "project-estimate",
    title: "How to generate a project estimate in GHS",
    category: "websites",
    body: "Use the calculator to choose platform, design, scope, and timeline. It gives a rough range and lets you download a proforma PDF.",
    actions: [{ label: "Open project calculator", href: "/tools/project-cost" }],
  },
  {
    id: "secure-launch",
    title: "Security checks before website launch",
    category: "security",
    body: "Minimum launch checks: HTTPS enabled, strong admin passwords, role-based access, backups, and monitoring alerts.",
    actions: [{ label: "View security journey", href: "/security-journey" }],
  },
];

type GuidedIssue = "payment_failed" | "need_quote" | "site_issue" | "other";

export default function HelpCenterPage() {
  const [q, setQ] = useState("");
  const [issue, setIssue] = useState<GuidedIssue>("payment_failed");
  const [feedbackState, setFeedbackState] = useState<Record<string, "idle" | "saved" | "error">>({});

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ARTICLES;
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(needle) ||
        a.body.toLowerCase().includes(needle) ||
        a.category.toLowerCase().includes(needle),
    );
  }, [q]);

  const guided = useMemo(() => {
    if (issue === "payment_failed") {
      return {
        title: "Payment or renewal failed",
        steps: [
          "Open Dashboard and check which renewal is past due or suspended.",
          "Top up wallet with enough balance.",
          "Use 'Charge wallet' on the affected renewal.",
        ],
        cta: { label: "Open dashboard", href: "/dashboard" },
      };
    }
    if (issue === "need_quote") {
      return {
        title: "Need a quote or proposal",
        steps: [
          "Use Interactive Intake for quick qualification.",
          "If you need formal scope and pricing sections, submit Formal Proposal Request.",
          "Track progress from Dashboard > Requests.",
        ],
        cta: { label: "Start guided intake", href: "/get-started?topic=Need quote or proposal" },
      };
    }
    if (issue === "site_issue") {
      return {
        title: "Website issue or performance concern",
        steps: [
          "Write the exact issue and when it started.",
          "Include page URL and screenshots if possible.",
          "Send it through Contact or Proposal request for triage.",
        ],
        cta: { label: "Open contact", href: "/contact?topic=Website issue and troubleshooting" },
      };
    }
    return {
      title: "General support",
      steps: [
        "Search articles first for a quick answer.",
        "If unresolved, submit contact request with details.",
        "Use Dashboard > Requests to track status.",
      ],
      cta: { label: "Open requests tracker", href: "/dashboard/requests" },
    };
  }, [issue]);

  async function sendFeedback(articleId: string, helpful: boolean) {
    try {
      setFeedbackState((prev) => ({ ...prev, [articleId]: "idle" }));
      const res = await fetch("/api/help-center/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          helpful,
          issue,
          query: q.trim() || undefined,
        }),
      });
      if (!res.ok) {
        setFeedbackState((prev) => ({ ...prev, [articleId]: "error" }));
        return;
      }
      setFeedbackState((prev) => ({ ...prev, [articleId]: "saved" }));
    } catch {
      setFeedbackState((prev) => ({ ...prev, [articleId]: "error" }));
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-28 md:pt-32">
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-5xl px-4 pb-8 md:px-6 md:pb-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Support</p>
          <h1 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Help center and guided support
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600">
            Find answers quickly, then follow guided next steps for billing, renewals, and project requests.
          </p>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search help articles..."
            className="mx-auto mt-6 block w-full max-w-2xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
          />
        </div>
      </section>

      <section className="container mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1.4fr_1fr] md:px-6 md:py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Knowledge base</h2>
          <p className="mt-1 text-sm text-slate-600">{results.length} article(s)</p>
          <div className="mt-4 space-y-3">
            {results.map((a) => (
              <article key={a.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-ocean-700">{a.category}</p>
                <h3 className="mt-1 font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{a.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.actions.map((x) => (
                    <Link
                      key={x.href + x.label}
                      href={x.href}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400"
                    >
                      {x.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Was this helpful?</span>
                  <button
                    type="button"
                    onClick={() => sendFeedback(a.id, true)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => sendFeedback(a.id, false)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400"
                  >
                    No
                  </button>
                  {feedbackState[a.id] === "saved" ? (
                    <span className="text-xs font-semibold text-emerald-700">Saved</span>
                  ) : null}
                  {feedbackState[a.id] === "error" ? (
                    <span className="text-xs font-semibold text-rose-700">Failed</span>
                  ) : null}
                </div>
              </article>
            ))}
            {results.length === 0 ? (
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                No matching articles yet. Try a different keyword or use guided support.
              </p>
            ) : null}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Guided support</h2>
          <label className="mt-3 block text-sm font-semibold text-slate-700">
            What do you need help with?
            <select
              value={issue}
              onChange={(e) => setIssue(e.target.value as GuidedIssue)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
            >
              <option value="payment_failed">Payment or renewal failed</option>
              <option value="need_quote">Need quote/proposal</option>
              <option value="site_issue">Website issue</option>
              <option value="other">Something else</option>
            </select>
          </label>
          <h3 className="mt-4 font-semibold text-slate-900">{guided.title}</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {guided.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <Link
            href={guided.cta.href}
            className="mt-4 inline-flex rounded-lg bg-ocean-600 px-4 py-2 text-sm font-bold text-white hover:bg-ocean-700"
          >
            {guided.cta.label}
          </Link>
        </aside>
      </section>
    </main>
  );
}
