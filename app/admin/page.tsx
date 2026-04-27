"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  clearAccessToken,
  getAdminContactPresetCounts,
  getAdminContacts,
  type AdminContactRow,
  getAdminRenewalIssues,
  getAdminSummary,
  getAdminTransactions,
  getAdminUsers,
  getProfile,
  patchAdminContact,
  downloadAdminContactsCsv,
  getAdminHelpCenterFeedbackSummary,
} from "@/lib/auth-client";

const LEAD_FILTER_PRESETS = [
  { id: "all", label: "All leads", status: "all", source: "all", q: "", dateRange: "all" },
  { id: "new", label: "New only", status: "new", source: "all", q: "", dateRange: "all" },
  {
    id: "project-calc",
    label: "Project calculator",
    status: "all",
    source: "project_calculator",
    q: "",
    dateRange: "all",
  },
  { id: "chat", label: "Chat follow-ups", status: "all", source: "chat", q: "", dateRange: "all" },
] as const;

const HELP_ARTICLE_LABELS: Record<string, string> = {
  "wallet-topup": "How to top up wallet and pay renewals",
  "past-due": "What to do when a renewal is past due",
  "intake-vs-proposal": "Intake request vs formal proposal request",
  "project-estimate": "How to generate a project estimate in GHS",
  "secure-launch": "Security checks before website launch",
};

function projectCalcMidGhsLabel(metadata: unknown): string | null {
  if (metadata == null || typeof metadata !== "object" || !("totalMidGhs" in metadata)) {
    return null;
  }
  const n = (metadata as { totalMidGhs?: unknown }).totalMidGhs;
  if (typeof n === "number" && Number.isFinite(n)) {
    return `~₵${Math.round(n).toLocaleString("en-GH")} mid`;
  }
  return null;
}

function truncate(s: string, n: number) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, n)}…`;
}

function ContactNotesField({
  contactId,
  initial,
  disabled,
  onSaved,
}: {
  contactId: string;
  initial: string | null;
  disabled?: boolean;
  onSaved: () => Promise<void>;
}) {
  const [text, setText] = useState(initial ?? "");
  const [saving, setSaving] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        disabled={disabled}
        className="w-full min-w-[140px] rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800"
        placeholder="Internal note…"
        aria-label="Team note"
      />
      <button
        type="button"
        disabled={saving || disabled}
        onClick={async () => {
          setSaving(true);
          try {
            await patchAdminContact(contactId, { notes: text });
            await onSaved();
          } finally {
            setSaving(false);
          }
        }}
        className="self-start rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-800 hover:bg-slate-200"
      >
        {saving ? "Saving…" : "Save note"}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const [summary, setSummary] = useState<Awaited<ReturnType<typeof getAdminSummary>> | null>(null);
  const [users, setUsers] = useState<Awaited<ReturnType<typeof getAdminUsers>> | null>(null);
  const [txs, setTxs] = useState<Awaited<ReturnType<typeof getAdminTransactions>> | null>(null);
  const [issues, setIssues] = useState<Awaited<ReturnType<typeof getAdminRenewalIssues>> | null>(null);
  const [contacts, setContacts] = useState<AdminContactRow[] | null>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");
  const [leadSourceFilter, setLeadSourceFilter] = useState("all");
  const [leadSearch, setLeadSearch] = useState("");
  const [leadSearchDebounced, setLeadSearchDebounced] = useState("");
  const [leadDateRange, setLeadDateRange] = useState("all");
  const [leadSort, setLeadSort] = useState("created_desc");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [leadLoading, setLeadLoading] = useState(false);
  const [exportingCsv, setExportingCsv] = useState(false);
  const [presetCounts, setPresetCounts] = useState<{
    all: number;
    newOnly: number;
    projectCalculator: number;
    chat: number;
  } | null>(null);
  const [helpFeedback, setHelpFeedback] = useState<Awaited<
    ReturnType<typeof getAdminHelpCenterFeedbackSummary>
  > | null>(null);
  const [helpFeedback7d, setHelpFeedback7d] = useState<Awaited<
    ReturnType<typeof getAdminHelpCenterFeedbackSummary>
  > | null>(null);
  const [helpFeedback30d, setHelpFeedback30d] = useState<Awaited<
    ReturnType<typeof getAdminHelpCenterFeedbackSummary>
  > | null>(null);
  const [toast, setToast] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [email, setEmail] = useState("");

  const sourceLabel = (s: string | null) => {
    if (s === "contact_form") return "Contact form";
    if (s === "project_calculator") return "Project calculator";
    if (s === "chat") return "Chat";
    if (s === "intake_wizard") return "Interactive intake";
    if (s === "proposal_request") return "Proposal request";
    if (s === "help_center_feedback") return "Help center feedback";
    if (s == null || s === "") return "—";
    return s;
  };

  const load = useCallback(async () => {
    setErr(null);
    setLeadLoading(true);
    const p = await getProfile();
    if (!p.isAdmin) {
      setAllowed(false);
      setLeadLoading(false);
      return;
    }
    setEmail(p.email);
    try {
      const [a, b, c, d, e, f, g, h] = await Promise.all([
        getAdminSummary(),
        getAdminUsers(40),
        getAdminTransactions(50),
        getAdminRenewalIssues(50),
        getAdminContacts(50, {
          status: leadStatusFilter,
          source: leadSourceFilter,
          q: leadSearchDebounced,
          dateRange: leadDateRange,
          sort: leadSort,
        }),
        getAdminHelpCenterFeedbackSummary({ dateRange: leadDateRange }),
        getAdminHelpCenterFeedbackSummary({ dateRange: "7d" }),
        getAdminHelpCenterFeedbackSummary({ dateRange: "30d" }),
      ]);
      setSummary(a);
      setUsers(b);
      setTxs(c);
      setIssues(d);
      setContacts(e);
      setHelpFeedback(f);
      setHelpFeedback7d(g);
      setHelpFeedback30d(h);
      const counts = await getAdminContactPresetCounts({
        q: leadSearchDebounced,
        dateRange: leadDateRange,
      });
      setPresetCounts(counts);
    } finally {
      setLeadLoading(false);
    }
  }, [leadDateRange, leadSearchDebounced, leadSort, leadSourceFilter, leadStatusFilter]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("oceancyber_admin_lead_filters");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        status?: string;
        source?: string;
        q?: string;
        dateRange?: string;
        sort?: string;
        presetId?: string | null;
      };
      if (parsed.status) setLeadStatusFilter(parsed.status);
      if (parsed.source) setLeadSourceFilter(parsed.source);
      if (typeof parsed.q === "string") {
        setLeadSearch(parsed.q);
        setLeadSearchDebounced(parsed.q);
      }
      if (typeof parsed.dateRange === "string") setLeadDateRange(parsed.dateRange);
      if (typeof parsed.sort === "string") setLeadSort(parsed.sort);
      if (typeof parsed.presetId === "string" || parsed.presetId === null) {
        setActivePresetId(parsed.presetId);
      }
    } catch {
      // ignore bad localStorage payload
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        if (!p.isAdmin) {
          setAllowed(false);
          return;
        }
        setAllowed(true);
        await load();
      } catch {
        setAllowed(false);
        setErr("Not signed in or not authorized.");
      }
    })();
  }, [load]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "oceancyber_admin_lead_filters",
      JSON.stringify({
        status: leadStatusFilter,
        source: leadSourceFilter,
        q: leadSearch,
        dateRange: leadDateRange,
        sort: leadSort,
        presetId: activePresetId,
      }),
    );
  }, [leadDateRange, leadSearch, leadSort, leadSourceFilter, leadStatusFilter, activePresetId]);

  useEffect(() => {
    const t = window.setTimeout(() => setLeadSearchDebounced(leadSearch), 300);
    return () => window.clearTimeout(t);
  }, [leadSearch]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (allowed === null) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <p className="text-slate-600">Loading…</p>
      </main>
    );
  }

  if (allowed === false) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-lg font-bold text-slate-900">Not authorized</h1>
          <p className="mt-2 text-sm text-slate-600">
            {err || "You need an admin account or to be listed in ADMIN_EMAILS on the server."}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
          >
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        {toast ? (
          <div
            className={`rounded-xl border px-3 py-2 text-sm ${
              toast.kind === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800"
            }`}
          >
            {toast.text}
          </div>
        ) : null}
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Operations</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Admin overview</h1>
            <p className="mt-1 text-sm text-slate-600">{email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                void load();
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-slate-400"
            >
              Refresh
            </button>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              My dashboard
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAccessToken();
                window.location.href = "/signin";
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Sign out
            </button>
          </div>
        </header>

        {summary ? (
          <>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {[
                { k: "Users", v: summary.userCount },
                { k: "24h tx", v: summary.transactions24h },
                { k: "Past due", v: summary.pastDueCount },
                { k: "Suspended", v: summary.suspendedCount },
                { k: "Pending pay", v: summary.pendingPayments },
                { k: "Site leads 7d", v: summary.contacts7d },
                { k: "Project calc 7d", v: summary.projectCalculatorLeads7d },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{k}</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{v}</p>
                </div>
              ))}
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Renewals by status
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm text-slate-800">
                {Object.entries(summary.renewalsByStatus).map(([status, n]) => (
                  <li
                    key={status}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1"
                  >
                    {status}: <span className="font-semibold">{n}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Inbound (website)</h2>
          <p className="mt-1 text-sm text-slate-600">
            Form, project calculator, and (optional) chat follow-ups. Status and notes are saved to the same{" "}
            <code>Contact</code> rows.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEAD_FILTER_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={leadLoading}
                onClick={() => {
                  setLeadStatusFilter(p.status);
                  setLeadSourceFilter(p.source);
                  setLeadSearch(p.q);
                  setLeadDateRange(p.dateRange);
                  setActivePresetId(p.id);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activePresetId === p.id
                    ? "bg-ocean-600 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {p.label}
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activePresetId === p.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {p.id === "all"
                    ? (presetCounts?.all ?? 0)
                    : p.id === "new"
                      ? (presetCounts?.newOnly ?? 0)
                      : p.id === "project-calc"
                        ? (presetCounts?.projectCalculator ?? 0)
                        : (presetCounts?.chat ?? 0)}
                </span>
              </button>
            ))}
            <button
              type="button"
              disabled={leadLoading}
              onClick={() => {
                setLeadStatusFilter("all");
                setLeadSourceFilter("all");
                setLeadSearch("");
                setLeadDateRange("all");
                setActivePresetId(null);
              }}
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400"
            >
              Clear
            </button>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-6">
            <label className="text-xs font-semibold text-slate-600">
              Status
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900"
                value={leadStatusFilter}
                disabled={leadLoading}
                onChange={(e) => {
                  setLeadStatusFilter(e.target.value);
                  setActivePresetId(null);
                }}
              >
                <option value="all">All</option>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="won">won</option>
                <option value="lost">lost</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Source
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900"
                value={leadSourceFilter}
                disabled={leadLoading}
                onChange={(e) => {
                  setLeadSourceFilter(e.target.value);
                  setActivePresetId(null);
                }}
              >
                <option value="all">All</option>
                <option value="contact_form">Contact form</option>
                <option value="project_calculator">Project calculator</option>
                <option value="chat">Chat</option>
                <option value="intake_wizard">Interactive intake</option>
                <option value="proposal_request">Proposal request</option>
                <option value="help_center_feedback">Help center feedback</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Date range
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900"
                value={leadDateRange}
                disabled={leadLoading}
                onChange={(e) => {
                  setLeadDateRange(e.target.value);
                  setActivePresetId(null);
                }}
              >
                <option value="all">All time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </label>
            <label className="sm:col-span-2 text-xs font-semibold text-slate-600">
              Search (name or email)
              <input
                value={leadSearch}
                disabled={leadLoading}
                onChange={(e) => {
                  setLeadSearch(e.target.value);
                  setActivePresetId(null);
                }}
                placeholder="john@company.com"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Sort
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900"
                value={leadSort}
                disabled={leadLoading}
                onChange={(e) => {
                  setLeadSort(e.target.value);
                  setActivePresetId(null);
                }}
              >
                <option value="created_desc">Newest first</option>
                <option value="created_asc">Oldest first</option>
                <option value="status">Status (A-Z)</option>
                <option value="source">Source (A-Z)</option>
              </select>
            </label>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              disabled={leadLoading || exportingCsv}
              onClick={async () => {
                try {
                  setErr(null);
                  setExportingCsv(true);
                  await downloadAdminContactsCsv({
                    take: 1000,
                    status: leadStatusFilter,
                    source: leadSourceFilter,
                    q: leadSearch,
                    dateRange: leadDateRange,
                    sort: leadSort,
                  });
                  setToast({ kind: "success", text: "CSV export started." });
                } catch (e) {
                  const m = e instanceof Error ? e.message : "Could not export CSV";
                  setErr(m);
                  setToast({ kind: "error", text: m });
                } finally {
                  setExportingCsv(false);
                }
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-slate-400"
            >
              {exportingCsv ? "Exporting…" : "Export filtered CSV"}
            </button>
          </div>
          {leadLoading ? (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs text-slate-700">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
              Updating leads…
            </div>
          ) : null}
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-500">
                  <th className="py-2 pr-2">When</th>
                  <th className="py-2 pr-2">Name</th>
                  <th className="py-2 pr-2">Email</th>
                  <th className="py-2 pr-2">Source</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="min-w-[140px] py-2 pr-2">Team notes</th>
                  <th className="py-2 pr-2">Preview</th>
                </tr>
              </thead>
              <tbody>
                {(contacts ?? []).map((c) => {
                  const ghs = c.source === "project_calculator" ? projectCalcMidGhsLabel(c.metadata) : null;
                  return (
                    <tr key={c.id} className="border-t border-slate-100">
                      <td className="whitespace-nowrap py-2 pr-2 text-slate-600">
                        {new Date(c.createdAt).toLocaleString()}
                      </td>
                      <td className="max-w-[100px] truncate py-2 pr-2" title={c.name}>
                        {c.name}
                      </td>
                      <td className="max-w-[180px] truncate py-2 pr-2 text-xs" title={c.email}>
                        {c.email}
                      </td>
                      <td className="py-2 pr-2">{sourceLabel(c.source)}</td>
                      <td className="py-2 pr-2">
                        <label htmlFor={`st-${c.id}`} className="sr-only">
                          Status
                        </label>
                        <select
                          id={`st-${c.id}`}
                          className="max-w-[130px] rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-2 text-xs font-medium text-slate-900"
                          value={c.status || "new"}
                          disabled={leadLoading}
                          onChange={async (e) => {
                            try {
                              setErr(null);
                              await patchAdminContact(c.id, { status: e.target.value });
                              await load();
                              setToast({ kind: "success", text: "Lead status updated." });
                            } catch (x) {
                              const m = x instanceof Error ? x.message : "Could not update status";
                              setErr(m);
                              setToast({ kind: "error", text: m });
                            }
                          }}
                        >
                          {(["new", "contacted", "won", "lost"] as const).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="min-w-[160px] max-w-xs py-2 pr-2 align-top">
                        <ContactNotesField
                          key={`${c.id}-${c.updatedAt}`}
                          contactId={c.id}
                          initial={c.notes}
                          disabled={leadLoading}
                          onSaved={async () => {
                            setErr(null);
                            await load();
                            setToast({ kind: "success", text: "Lead note saved." });
                          }}
                        />
                      </td>
                      <td
                        className="max-w-sm py-2 pr-2 text-slate-700"
                        title={c.message.length > 200 ? c.message : undefined}
                      >
                        {ghs ? <span className="mr-2 font-semibold text-slate-900">{ghs}</span> : null}
                        {truncate(c.message, 160)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(contacts ?? []).length === 0 ? <p className="mt-2 text-sm text-slate-500">No rows yet.</p> : null}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Help center feedback summary</h2>
          <p className="mt-1 text-sm text-slate-600">
            Captured from the &quot;Was this helpful?&quot; buttons in Help Center.
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-800">
            Total feedback captured: {helpFeedback?.totalFeedback ?? 0}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Trend: 7d {helpFeedback7d?.totalFeedback ?? 0} vs 30d {helpFeedback30d?.totalFeedback ?? 0}
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Article</th>
                  <th className="py-2 pr-3">Yes</th>
                  <th className="py-2 pr-3">No</th>
                  <th className="py-2 pr-3">Helpful rate</th>
                </tr>
              </thead>
              <tbody>
                {!helpFeedback || helpFeedback.articles.length === 0 ? (
                  <tr>
                    <td className="py-3 text-slate-600" colSpan={4}>
                      No help center feedback yet.
                    </td>
                  </tr>
                ) : (
                  helpFeedback.articles.map((row) => (
                    <tr key={row.articleId} className="border-t border-slate-100">
                      <td className="py-2 pr-3 text-slate-700">
                        <p className="font-medium">{HELP_ARTICLE_LABELS[row.articleId] ?? row.articleId}</p>
                        <p className="font-mono text-[11px] text-slate-500">{row.articleId}</p>
                      </td>
                      <td className="py-2 pr-3">{row.yes}</td>
                      <td className="py-2 pr-3">{row.no}</td>
                      <td className="py-2 pr-3">{row.helpfulRate}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Users</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-500">
                  <th className="py-2 pr-2">Email</th>
                  <th className="py-2 pr-2">Role</th>
                  <th className="py-2 pr-2">Wallet</th>
                  <th className="py-2 pr-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {(users ?? []).map((u) => (
                  <tr key={u.id} className="border-t border-slate-100">
                    <td className="py-2 pr-2 font-mono text-xs">{u.email}</td>
                    <td className="py-2 pr-2">{u.role}</td>
                    <td className="py-2 pr-2 tabular-nums">
                      ₵{(Number(u.walletBalanceMinor) / 100).toFixed(2)} {u.walletCurrency}
                    </td>
                    <td className="py-2 pr-2 text-slate-600">
                      {new Date(u.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Past-due & suspended</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-500">
                  <th className="py-2 pr-2">User</th>
                  <th className="py-2 pr-2">Plan</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="py-2 pr-2">Next</th>
                </tr>
              </thead>
              <tbody>
                {(issues ?? []).map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="max-w-[200px] truncate py-2 pr-2 text-xs" title={r.userEmail}>
                      {r.userEmail}
                    </td>
                    <td className="py-2 pr-2">{r.planName}</td>
                    <td className="py-2 pr-2 font-semibold">{r.status}</td>
                    <td className="py-2 pr-2 text-slate-600">
                      {new Date(r.nextRenewalAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(issues ?? []).length === 0 ? <p className="mt-2 text-sm text-slate-500">No rows.</p> : null}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recent transactions</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-500">
                  <th className="py-2 pr-2">When</th>
                  <th className="py-2 pr-2">User</th>
                  <th className="py-2 pr-2">Type</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="py-2 pr-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(txs ?? []).map((t) => (
                  <tr key={t.id} className="border-t border-slate-100">
                    <td className="whitespace-nowrap py-2 pr-2 text-slate-600">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                    <td className="max-w-[180px] truncate py-2 pr-2 text-xs" title={t.userEmail}>
                      {t.userEmail}
                    </td>
                    <td className="py-2 pr-2">{t.type}</td>
                    <td className="py-2 pr-2">{t.status}</td>
                    <td className="py-2 pr-2 tabular-nums">
                      ₵{(Number(t.amountMinor) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
