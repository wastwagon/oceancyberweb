"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, HelpCircle, ArrowRight, MessageSquare, Check, X } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api-config";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";

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
      const res = await fetch(`${getApiBaseUrl()}/api/v1/contact/feedback`, {
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
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      {/* Hero */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
              <HelpCircle className="h-4 w-4" aria-hidden />
              Support
            </span>
            <h1 className="sa-title mx-auto max-w-4xl text-balance">
              Help center &
              <span className="text-sa-primary"> guided support</span>
            </h1>
            <p className="sa-subtitle mx-auto mt-6">
              Find answers quickly, then follow guided next steps for billing, renewals, and project requests.
            </p>
            <div className="relative mx-auto mt-10 max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sa-muted/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search help articles..."
                className="h-14 w-full rounded-2xl border border-sa-border bg-sa-surface pl-12 pr-4 text-white outline-none ring-sa-primary/50 transition placeholder:text-sa-muted/30 focus:border-sa-primary focus:ring-1"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Knowledge Base */}
            <motion.div {...fadeUpProps}>
              <div className="flex items-center justify-between border-b border-sa-border pb-6">
                <h2 className="font-heading text-xl font-bold text-white">Knowledge base</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-sa-muted/50">
                  {results.length} article(s)
                </span>
              </div>
              <div className="mt-8 space-y-6">
                {results.map((a, index) => (
                  <motion.article
                    key={a.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={staggerDelay(index, 0.05)}
                    className="sa-card group p-6"
                  >
                    <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                      {a.category}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-white group-hover:text-sa-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">{a.body}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {a.actions.map((x) => (
                        <Link
                          key={x.href + x.label}
                          href={x.href}
                          className="flex h-10 items-center justify-center rounded-xl border border-sa-border bg-sa-surface px-5 text-[10px] font-bold uppercase tracking-wider text-sa-muted transition hover:border-sa-primary hover:text-white"
                        >
                          {x.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-4 border-t border-sa-border/50 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">
                        Helpful?
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => sendFeedback(a.id, true)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-sa-border bg-sa-surface text-sa-muted transition hover:border-sa-primary hover:text-white"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => sendFeedback(a.id, false)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-sa-border bg-sa-surface text-sa-muted transition hover:border-rose-500/50 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {feedbackState[a.id] === "saved" && (
                        <span className="text-[10px] font-bold text-sa-primary uppercase tracking-widest">
                          Thank you
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))}
                {results.length === 0 && (
                  <div className="sa-card p-10 text-center">
                    <p className="text-sm text-sa-muted">
                      No matching articles found. Try a different keyword.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Guided Support */}
            <motion.aside {...fadeUpProps} className="lg:sticky lg:top-32 h-fit">
              <div className="sa-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h2 className="mt-6 font-heading text-xl font-bold text-white">Guided support</h2>
                <p className="mt-2 text-sm text-sa-muted/70">
                  Select your issue type for a step-by-step resolution path.
                </p>
                
                <div className="mt-8 space-y-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">
                      I need help with
                    </label>
                    <select
                      value={issue}
                      onChange={(e) => setIssue(e.target.value as GuidedIssue)}
                      className="mt-2 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white outline-none focus:border-sa-primary transition"
                    >
                      <option value="payment_failed">Payment or renewal failed</option>
                      <option value="need_quote">Need quote or proposal</option>
                      <option value="site_issue">Website issue</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div className="rounded-2xl border border-sa-border bg-sa-bg/50 p-6">
                    <h3 className="font-heading text-base font-bold text-white">{guided.title}</h3>
                    <ol className="mt-4 space-y-3">
                      {guided.steps.map((s, idx) => (
                        <li key={s} className="flex gap-3 text-sm text-sa-muted/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sa-surface border border-sa-border text-[10px] font-bold text-sa-primary">
                            {idx + 1}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Link
                    href={guided.cta.href}
                    className="sa-btn-primary w-full"
                  >
                    {guided.cta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="sa-card mt-6 p-6 border-sa-primary/20 bg-sa-primary/5">
                <p className="text-xs font-bold text-sa-primary uppercase tracking-widest">Still stuck?</p>
                <p className="mt-2 text-sm text-sa-muted/80">
                  Our engineers are available for direct triage and technical advice.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-sm font-bold text-white hover:text-sa-primary transition-colors"
                >
                  Contact technical team →
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
      <StartupAgencyMobileQuickBar />
    </main>
  );
}
