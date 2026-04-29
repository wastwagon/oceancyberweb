"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  addAdminClientProjectActivity,
  clearAccessToken,
  createAdminClientProject,
  getAdminContactPresetCounts,
  getAdminContacts,
  type AdminContactRow,
  getAdminRenewalIssues,
  getAdminSummary,
  getAdminTransactions,
  getAdminUsers,
  getProfile,
  listAdminClientProjects,
  patchAdminContact,
  unlockAdminClientProjectMilestone,
  updateAdminClientProjectStatus,
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
  {
    id: "namecheap-checkout",
    label: "Namecheap checkout",
    status: "all",
    source: "namecheap_unified_checkout",
    q: "",
    dateRange: "all",
  },
  {
    id: "website-to-app",
    label: "Website-to-Mobile App Conversion Quote",
    status: "all",
    source: "website_to_app_quote",
    q: "",
    dateRange: "all",
  },
] as const;

const HELP_ARTICLE_LABELS: Record<string, string> = {
  "wallet-topup": "How to top up wallet and pay renewals",
  "past-due": "What to do when a renewal is past due",
  "intake-vs-proposal": "Intake request vs formal proposal request",
  "project-estimate": "How to generate a project estimate in GHS",
  "secure-launch": "Security checks before website launch",
};

const PROJECT_ACTIVITY_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "client_feedback", label: "Client feedback" },
  { id: "dev_update", label: "Dev update" },
  { id: "blocker", label: "Blocker" },
  { id: "approval", label: "Approval" },
] as const;

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

function projectCalcMidGhs(metadata: unknown): number | null {
  if (metadata == null || typeof metadata !== "object" || !("totalMidGhs" in metadata)) {
    return null;
  }
  const n = (metadata as { totalMidGhs?: unknown }).totalMidGhs;
  if (typeof n === "number" && Number.isFinite(n) && n > 0) {
    return Math.round(n);
  }
  return null;
}

function websiteToAppBudgetSuggestion(metadata: unknown): number | null {
  if (metadata == null || typeof metadata !== "object" || !("budgetBand" in metadata)) {
    return null;
  }
  const band = (metadata as { budgetBand?: unknown }).budgetBand;
  if (typeof band !== "string") return null;
  if (band.includes("60,000+")) return 60000;
  if (band.includes("30,000 - 60,000")) return 45000;
  if (band.includes("15,000 - 30,000")) return 22500;
  if (band.includes("Below GHS 15,000")) return 12000;
  return null;
}

function truncate(s: string, n: number) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, n)}…`;
}

function linkedProjectIdFromNotes(notes: string | null): string | null {
  if (!notes) return null;
  const m = /Linked project:\s*([a-z0-9]+)/i.exec(notes);
  return m?.[1] ?? null;
}

function activityCategory(activity: { metadata?: { category?: string } }): string {
  const raw = activity.metadata?.category;
  return typeof raw === "string" && raw.trim() ? raw : "general";
}

function projectHasOpenBlocker(
  activities: Array<{ note?: string | null; metadata?: { category?: string }; createdAt: string }> | undefined,
): boolean {
  if (!activities || activities.length === 0) return false;
  const sorted = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  for (const a of sorted) {
    const note = (a.note || "").toLowerCase();
    if (note.startsWith("blocker resolved:")) return false;
    if (activityCategory(a) === "blocker") return true;
  }
  return false;
}

function checkoutRef(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const maybe = (metadata as { checkoutRef?: unknown }).checkoutRef;
  return typeof maybe === "string" && maybe.trim() ? maybe : null;
}

type UnifiedResultRow = {
  kind?: string;
  label?: string;
  status?: string;
  orderId?: string;
  certificateId?: string;
  message?: string;
};

type UnifiedCheckoutItem = {
  kind: "domain" | "hosting" | "ssl";
  label: string;
  planCode: string;
  reference: string;
  addons: Array<{
    id: string;
    label: string;
    selected?: boolean;
    required?: boolean;
  }>;
};

function unifiedResults(metadata: unknown): UnifiedResultRow[] {
  if (!metadata || typeof metadata !== "object") return [];
  const rows = (metadata as { results?: unknown }).results;
  if (!Array.isArray(rows)) return [];
  return rows.filter((r): r is UnifiedResultRow => typeof r === "object" && r !== null);
}

function unifiedItems(metadata: unknown): UnifiedCheckoutItem[] {
  if (!metadata || typeof metadata !== "object") return [];
  const rows = (metadata as { items?: unknown }).items;
  if (!Array.isArray(rows)) return [];
  return rows.filter((r): r is UnifiedCheckoutItem => typeof r === "object" && r !== null);
}

function unifiedDomainContact(metadata: unknown): Record<string, unknown> | undefined {
  if (!metadata || typeof metadata !== "object") return undefined;
  const contact = (metadata as { domainContact?: unknown }).domainContact;
  if (contact && typeof contact === "object") return contact as Record<string, unknown>;
  return undefined;
}

function parentCheckoutRef(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const maybe = (metadata as { parentCheckoutRef?: unknown }).parentCheckoutRef;
  return typeof maybe === "string" && maybe.trim() ? maybe : null;
}

function relatedCheckoutRefs(
  rows: Array<{ metadata: unknown }>,
  anchorRef: string,
): Set<string> {
  const byRef = new Map<string, string | null>();
  for (const row of rows) {
    const ref = checkoutRef(row.metadata);
    if (!ref) continue;
    byRef.set(ref, parentCheckoutRef(row.metadata));
  }

  // Resolve to root by walking parent pointers.
  let root = anchorRef;
  const seenUp = new Set<string>();
  while (true) {
    if (seenUp.has(root)) break;
    seenUp.add(root);
    const parent = byRef.get(root);
    if (!parent) break;
    root = parent;
  }

  // Collect full descendant tree from root.
  const related = new Set<string>([root]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [ref, parent] of byRef) {
      if (parent && related.has(parent) && !related.has(ref)) {
        related.add(ref);
        changed = true;
      }
    }
  }
  return related;
}

function checkoutDepth(
  rows: Array<{ metadata: unknown }>,
  targetRef: string,
): number {
  const byRef = new Map<string, string | null>();
  for (const row of rows) {
    const ref = checkoutRef(row.metadata);
    if (!ref) continue;
    byRef.set(ref, parentCheckoutRef(row.metadata));
  }

  let depth = 0;
  let cursor: string | null = targetRef;
  const seen = new Set<string>();
  while (cursor) {
    if (seen.has(cursor)) break;
    seen.add(cursor);
    const parent: string | null = byRef.get(cursor) ?? null;
    if (!parent) break;
    depth += 1;
    cursor = parent;
  }
  return depth;
}

function depthBadgeClass(depth: number): string {
  if (depth === 0) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (depth <= 2) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }
  return "border-rose-200 bg-rose-50 text-rose-800";
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
  const [retryingRef, setRetryingRef] = useState<string | null>(null);
  const [activeOrderChainRef, setActiveOrderChainRef] = useState<string | null>(null);
  const [adminProjects, setAdminProjects] = useState<
    Awaited<ReturnType<typeof listAdminClientProjects>> | null
  >(null);
  const [projectForm, setProjectForm] = useState({
    userEmail: "",
    title: "",
    description: "",
    totalAmountGhs: "",
  });
  const [projectBusy, setProjectBusy] = useState(false);
  const [convertingLeadId, setConvertingLeadId] = useState<string | null>(null);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectActivityDraft, setProjectActivityDraft] = useState<Record<string, string>>({});
  const [projectActivityCategoryDraft, setProjectActivityCategoryDraft] = useState<Record<string, string>>({});
  const [projectActivityFilter, setProjectActivityFilter] = useState<Record<string, string>>({});

  const sourceLabel = (s: string | null) => {
    if (s === "contact_form") return "Contact form";
    if (s === "project_calculator") return "Project calculator";
    if (s === "chat") return "Chat";
    if (s === "intake_wizard") return "Interactive intake";
    if (s === "proposal_request") return "Proposal request";
    if (s === "help_center_feedback") return "Help center feedback";
    if (s === "namecheap_unified_checkout") return "Namecheap unified checkout";
    if (s === "website_to_app_quote") return "Website-to-Mobile App Conversion Quote";
    if (s == null || s === "") return "—";
    return s;
  };

  const normalizedProjectSearch = projectSearch.trim().toLowerCase();
  const blockedProjects = (adminProjects ?? []).filter((p) => projectHasOpenBlocker(p.activities));

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
      const [a, b, c, d, e, f, g, h, i] = await Promise.all([
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
        listAdminClientProjects(),
      ]);
      setSummary(a);
      setUsers(b);
      setTxs(c);
      setIssues(d);
      setContacts(e);
      setHelpFeedback(f);
      setHelpFeedback7d(g);
      setHelpFeedback30d(h);
      setAdminProjects(i);
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
            <Link
              href="/admin/content"
              className="rounded-xl border border-ocean-200 bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-900 hover:bg-ocean-100"
            >
              Site content
            </Link>
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

        <section id="admin-client-projects" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Client projects (30/30/40)</h2>
          <p className="mt-1 text-sm text-slate-600">
            Create project milestones from accepted estimates, then unlock build/launch stages as delivery progresses.
          </p>
          <form
            className="mt-3 grid gap-2 sm:grid-cols-4"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                setProjectBusy(true);
                setErr(null);
                await createAdminClientProject({
                  userEmail: projectForm.userEmail.trim(),
                  title: projectForm.title.trim(),
                  description: projectForm.description.trim() || undefined,
                  totalAmountGhs: Number(projectForm.totalAmountGhs),
                  kickoffPercent: 30,
                  buildPercent: 30,
                  launchPercent: 40,
                });
                setProjectForm({ userEmail: "", title: "", description: "", totalAmountGhs: "" });
                setToast({ kind: "success", text: "Project created with 30/30/40 milestones." });
                await load();
              } catch (x) {
                const m = x instanceof Error ? x.message : "Could not create project";
                setErr(m);
                setToast({ kind: "error", text: m });
              } finally {
                setProjectBusy(false);
              }
            }}
          >
            <input
              value={projectForm.userEmail}
              onChange={(e) => setProjectForm((p) => ({ ...p, userEmail: e.target.value }))}
              placeholder="Client email"
              type="email"
              required
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <input
              value={projectForm.title}
              onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Project title"
              required
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <input
              value={projectForm.totalAmountGhs}
              onChange={(e) => setProjectForm((p) => ({ ...p, totalAmountGhs: e.target.value }))}
              placeholder="Total (GHS)"
              type="number"
              min={100}
              required
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <button
              type="submit"
              disabled={projectBusy}
              className="rounded-lg bg-ocean-600 px-3 py-2 text-sm font-semibold text-white hover:bg-ocean-700 disabled:opacity-60"
            >
              {projectBusy ? "Creating..." : "Create project"}
            </button>
            <input
              value={projectForm.description}
              onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Optional description"
              className="sm:col-span-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            />
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              value={projectSearch}
              onChange={(e) => setProjectSearch(e.target.value)}
              placeholder="Filter by project ID, title, or email"
              className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            />
            {projectSearch ? (
              <button
                type="button"
                onClick={() => setProjectSearch("")}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400"
              >
                Clear filter
              </button>
            ) : null}
          </div>

          <div className="mt-4 space-y-3">
            {blockedProjects.length > 0 ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Blocked projects ({blockedProjects.length})
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {blockedProjects.map((p) => (
                    <button
                      key={`blocked-${p.id}`}
                      type="button"
                      onClick={() => {
                        setProjectSearch(p.id);
                        const target = document.getElementById(`project-card-${p.id}`);
                        target?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="rounded-lg border border-rose-300 bg-white px-2 py-1 text-xs font-semibold text-rose-900 hover:border-rose-400"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {(adminProjects ?? [])
              .filter((p) => {
                if (!normalizedProjectSearch) return true;
                return (
                  p.id.toLowerCase().includes(normalizedProjectSearch) ||
                  p.title.toLowerCase().includes(normalizedProjectSearch) ||
                  p.user.email.toLowerCase().includes(normalizedProjectSearch)
                );
              })
              .map((p) => (
              <div
                id={`project-card-${p.id}`}
                key={p.id}
                className={`rounded-xl p-3 ${
                  projectHasOpenBlocker(p.activities)
                    ? "border border-rose-300 bg-rose-50/40"
                    : "border border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{p.title}</p>
                    <p className="text-xs text-slate-600">
                      {p.user.email} · ₵{(Number(p.totalAmountMinor) / 100).toFixed(2)}
                    </p>
                    <p className="mt-0.5 text-[11px] font-mono text-slate-500">{p.id}</p>
                  </div>
                  <select
                    value={p.status}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800"
                    onChange={async (e) => {
                      try {
                        setProjectBusy(true);
                        await updateAdminClientProjectStatus(p.id, { status: e.target.value });
                        setToast({ kind: "success", text: "Project status updated." });
                        await load();
                      } catch (x) {
                        const m = x instanceof Error ? x.message : "Could not update status";
                        setErr(m);
                        setToast({ kind: "error", text: m });
                      } finally {
                        setProjectBusy(false);
                      }
                    }}
                  >
                    {["planning", "active", "in_review", "ready_for_launch", "launched", "on_hold", "cancelled"].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                {projectHasOpenBlocker(p.activities) ? (
                  <div className="mt-2">
                    <button
                      type="button"
                      disabled={projectBusy}
                      onClick={async () => {
                        const details =
                          window.prompt("Resolution note", "Issue resolved and work resumed.")?.trim() ||
                          "Issue resolved and work resumed.";
                        try {
                          setProjectBusy(true);
                          await addAdminClientProjectActivity(
                            p.id,
                            `Blocker resolved: ${details}`,
                            "approval",
                          );
                          setToast({ kind: "success", text: "Blocker marked as resolved." });
                          await load();
                        } catch (x) {
                          const msg = x instanceof Error ? x.message : "Could not resolve blocker";
                          setErr(msg);
                          setToast({ kind: "error", text: msg });
                        } finally {
                          setProjectBusy(false);
                        }
                      }}
                      className="rounded-md border border-emerald-300 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:border-emerald-400 disabled:opacity-60"
                    >
                      Resolve blocker
                    </button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <button
                      type="button"
                      disabled={projectBusy}
                      onClick={async () => {
                        const details =
                          window.prompt("Blocker details", "Regression detected during QA/UAT.")?.trim() ||
                          "Regression detected during QA/UAT.";
                        try {
                          setProjectBusy(true);
                          await addAdminClientProjectActivity(p.id, details, "blocker");
                          setToast({ kind: "success", text: "Blocker reopened." });
                          await load();
                        } catch (x) {
                          const msg = x instanceof Error ? x.message : "Could not reopen blocker";
                          setErr(msg);
                          setToast({ kind: "error", text: msg });
                        } finally {
                          setProjectBusy(false);
                        }
                      }}
                      className="rounded-md border border-rose-300 bg-white px-2.5 py-1 text-xs font-semibold text-rose-800 hover:border-rose-400 disabled:opacity-60"
                    >
                      Re-open blocker
                    </button>
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.milestones.map((m) => (
                    <div key={m.id} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs">
                      <p className="font-semibold text-slate-800">
                        {m.title} ({m.percentage}%)
                      </p>
                      <p className="text-slate-600">Status: {m.status}</p>
                      {m.status === "locked" ? (
                        <button
                          type="button"
                          disabled={projectBusy}
                          onClick={async () => {
                            try {
                              setProjectBusy(true);
                              await unlockAdminClientProjectMilestone(p.id, m.id);
                              setToast({ kind: "success", text: `${m.title} unlocked.` });
                              await load();
                            } catch (x) {
                              const msg =
                                x instanceof Error ? x.message : "Could not unlock milestone";
                              setErr(msg);
                              setToast({ kind: "error", text: msg });
                            } finally {
                              setProjectBusy(false);
                            }
                          }}
                          className="mt-1 rounded-md border border-slate-300 bg-white px-2 py-0.5 font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-60"
                        >
                          Unlock
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <select
                    value={projectActivityCategoryDraft[p.id] || "general"}
                    onChange={(e) =>
                      setProjectActivityCategoryDraft((prev) => ({
                        ...prev,
                        [p.id]: e.target.value,
                      }))
                    }
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800"
                  >
                    {PROJECT_ACTIVITY_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <input
                    value={projectActivityDraft[p.id] || ""}
                    onChange={(e) =>
                      setProjectActivityDraft((prev) => ({ ...prev, [p.id]: e.target.value }))
                    }
                    placeholder="Add project note (e.g. Awaiting client content)"
                    className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    disabled={projectBusy || !(projectActivityDraft[p.id] || "").trim()}
                    onClick={async () => {
                      const note = (projectActivityDraft[p.id] || "").trim();
                      if (!note) return;
                      const category = projectActivityCategoryDraft[p.id] || "general";
                      try {
                        setProjectBusy(true);
                        await addAdminClientProjectActivity(
                          p.id,
                          note,
                          category as "general" | "client_feedback" | "dev_update" | "blocker" | "approval",
                        );
                        setProjectActivityDraft((prev) => ({ ...prev, [p.id]: "" }));
                        setToast({ kind: "success", text: "Project note added." });
                        await load();
                      } catch (x) {
                        const msg = x instanceof Error ? x.message : "Could not add project note";
                        setErr(msg);
                        setToast({ kind: "error", text: msg });
                      } finally {
                        setProjectBusy(false);
                      }
                    }}
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-60"
                  >
                    Add note
                  </button>
                </div>
                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Recent activity
                    </p>
                    <select
                      value={projectActivityFilter[p.id] || "all"}
                      onChange={(e) =>
                        setProjectActivityFilter((prev) => ({ ...prev, [p.id]: e.target.value }))
                      }
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700"
                    >
                      <option value="all">All categories</option>
                      {PROJECT_ACTIVITY_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {p.activities && p.activities.length > 0 ? (
                    <ul className="mt-1 space-y-1.5">
                      {p.activities
                        .filter((a) => {
                          const active = projectActivityFilter[p.id] || "all";
                          if (active === "all") return true;
                          const cat = activityCategory(a);
                          return cat === active;
                        })
                        .map((a) => (
                        <li key={a.id} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5 text-[11px]">
                          <p className="font-semibold text-slate-700">
                            {a.action.replace(/_/g, " ")} ·{" "}
                            <span className="text-slate-500">{a.actorType}</span>
                          </p>
                          <p className="mt-0.5">
                            <span className="rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                              {a.metadata && typeof a.metadata === "object" && "category" in a.metadata
                                ? activityCategory(a).replace(/_/g, " ")
                                : "general"}
                            </span>
                          </p>
                          {a.note ? <p className="text-slate-600">{a.note}</p> : null}
                          <p className="text-slate-500">{new Date(a.createdAt).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500">No activity events yet.</p>
                  )}
                </div>
              </div>
            ))}
            {(adminProjects ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">No client projects created yet.</p>
            ) : normalizedProjectSearch &&
              (adminProjects ?? []).filter((p) => {
                return (
                  p.id.toLowerCase().includes(normalizedProjectSearch) ||
                  p.title.toLowerCase().includes(normalizedProjectSearch) ||
                  p.user.email.toLowerCase().includes(normalizedProjectSearch)
                );
              }).length === 0 ? (
              <p className="text-sm text-slate-500">No projects match this filter.</p>
            ) : null}
          </div>
        </section>

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
                        : p.id === "chat"
                          ? (presetCounts?.chat ?? 0)
                          : "•"}
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
                <option value="namecheap_unified_checkout">Namecheap unified checkout</option>
                <option value="website_to_app_quote">Website-to-Mobile App Conversion Quote</option>
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
                  const midGhs = c.source === "project_calculator" ? projectCalcMidGhs(c.metadata) : null;
                  const websiteToAppSuggestedGhs =
                    c.source === "website_to_app_quote"
                      ? websiteToAppBudgetSuggestion(c.metadata)
                      : null;
                  const linkedProjectId = linkedProjectIdFromNotes(c.notes);
                  const unifiedRef =
                    c.source === "namecheap_unified_checkout"
                      ? checkoutRef(c.metadata)
                      : null;
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
                        {linkedProjectId ? (
                          <div className="mt-1 space-y-1">
                            <p className="text-[11px] text-slate-500">
                              Linked project:{" "}
                              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-mono text-emerald-800">
                                {linkedProjectId}
                              </span>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await navigator.clipboard.writeText(linkedProjectId);
                                    setToast({ kind: "success", text: "Project ID copied." });
                                  } catch {
                                    setToast({ kind: "error", text: "Could not copy project ID." });
                                  }
                                }}
                                className="rounded-md border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:border-slate-400"
                              >
                                Copy ID
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setProjectSearch(linkedProjectId);
                                  const target = document.getElementById("admin-client-projects");
                                  target?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className="rounded-md border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:border-slate-400"
                              >
                                Find in projects
                              </button>
                            </div>
                          </div>
                        ) : null}
                        {c.source === "project_calculator" || c.source === "website_to_app_quote" ? (
                          <div className="mt-2">
                            <button
                              type="button"
                              disabled={projectBusy || convertingLeadId === c.id}
                              onClick={async () => {
                                const defaultTitle =
                                  c.source === "website_to_app_quote"
                                    ? `${c.name || "Client"} website-to-app project`
                                    : `${c.name || "Client"} project`;
                                const title = window
                                  .prompt("Project title", defaultTitle)
                                  ?.trim();
                                if (!title) return;

                                const suggested =
                                  c.source === "website_to_app_quote"
                                    ? (websiteToAppSuggestedGhs ?? 0)
                                    : (midGhs ?? 0);
                                const amountRaw = window
                                  .prompt(
                                    "Total project amount (GHS)",
                                    suggested > 0 ? String(suggested) : "",
                                  )
                                  ?.trim();
                                if (!amountRaw) return;
                                const totalAmountGhs = Number(amountRaw);
                                if (!Number.isFinite(totalAmountGhs) || totalAmountGhs < 100) {
                                  setToast({
                                    kind: "error",
                                    text: "Enter a valid project amount in GHS (minimum 100).",
                                  });
                                  return;
                                }

                                try {
                                  setConvertingLeadId(c.id);
                                  setProjectBusy(true);
                                  const created = await createAdminClientProject({
                                    userEmail: c.email,
                                    title,
                                    description:
                                      c.source === "website_to_app_quote"
                                        ? `Created from website-to-app quote lead ${c.id}.`
                                        : `Created from project calculator lead ${c.id}.`,
                                    totalAmountGhs,
                                    kickoffPercent: 30,
                                    buildPercent: 30,
                                    launchPercent: 40,
                                  });
                                  const baseNote = c.notes?.trim();
                                  const linkNote = `Linked project: ${created.id}`;
                                  const mergedNotes = baseNote ? `${baseNote}\n${linkNote}` : linkNote;
                                  await patchAdminContact(c.id, { notes: mergedNotes });
                                  setToast({
                                    kind: "success",
                                    text:
                                      c.source === "website_to_app_quote"
                                        ? "Website-to-app lead converted to client project (30/30/40)."
                                        : "Lead converted to client project (30/30/40).",
                                  });
                                  await load();
                                } catch (x) {
                                  const m =
                                    x instanceof Error ? x.message : "Could not convert lead to project";
                                  setErr(m);
                                  setToast({ kind: "error", text: m });
                                } finally {
                                  setConvertingLeadId(null);
                                  setProjectBusy(false);
                                }
                              }}
                              className="rounded-md border border-ocean-300 bg-white px-2 py-1 text-[11px] font-semibold text-ocean-800 hover:border-ocean-400 disabled:opacity-60"
                            >
                              {convertingLeadId === c.id
                                ? "Converting..."
                                : "Convert to project"}
                            </button>
                          </div>
                        ) : null}
                        {unifiedRef ? (
                          <p className="mt-1 text-[11px] text-slate-500">
                            Ref: <span className="font-mono">{unifiedRef}</span>
                          </p>
                        ) : null}
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
          <h2 className="text-lg font-bold text-slate-900">Namecheap orders</h2>
          <p className="mt-1 text-sm text-slate-600">
            Unified checkout attempts with per-item domain, SSL, and hosting outcomes.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
            <span className="font-semibold text-slate-700">Depth legend:</span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800">
              Root
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-semibold text-amber-800">
              Depth 1-2
            </span>
            <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 font-semibold text-rose-800">
              Depth 3+
            </span>
          </div>
          {activeOrderChainRef ? (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-ocean-200 bg-ocean-50 px-3 py-1.5 text-xs text-ocean-900">
              Showing related retries for{" "}
              <span className="font-mono font-semibold">{activeOrderChainRef}</span>
              <button
                type="button"
                onClick={() => setActiveOrderChainRef(null)}
                className="rounded-md border border-ocean-300 bg-white px-2 py-0.5 font-semibold text-ocean-800 hover:border-ocean-400"
              >
                Clear
              </button>
            </div>
          ) : null}
          {(() => {
            const allUnified = (contacts ?? []).filter(
              (c) => c.source === "namecheap_unified_checkout",
            );
            const chainRefs = activeOrderChainRef
              ? relatedCheckoutRefs(allUnified, activeOrderChainRef)
              : null;
            const filteredUnified = chainRefs
              ? allUnified.filter((c) => {
                  const ref = checkoutRef(c.metadata);
                  return Boolean(ref && chainRefs.has(ref));
                })
              : allUnified;

            return (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-500">
                  <th className="py-2 pr-3">When</th>
                  <th className="py-2 pr-3">Checkout ref</th>
                  <th className="py-2 pr-3">User</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnified
                  .map((c) => {
                    const ref = checkoutRef(c.metadata);
                    const parentRef = parentCheckoutRef(c.metadata);
                    const chainRef = parentRef || ref || null;
                    const depth =
                      ref && activeOrderChainRef
                        ? checkoutDepth(filteredUnified, ref)
                        : ref
                          ? checkoutDepth(
                              (contacts ?? []).filter(
                                (x) => x.source === "namecheap_unified_checkout",
                              ),
                              ref,
                            )
                          : 0;
                    const rows = unifiedResults(c.metadata);
                    const items = unifiedItems(c.metadata);
                    const failedKeys = new Set(
                      rows
                        .filter((r) => (r.status || "").toLowerCase() === "failed")
                        .map((r) => `${r.kind || ""}::${r.label || ""}`),
                    );
                    const retryItems = items.filter((item) =>
                      failedKeys.has(`${item.kind}::${item.label}`),
                    );
                    const contactPayload = unifiedDomainContact(c.metadata);
                    return (
                      <tr key={c.id} className="border-t border-slate-100 align-top">
                        <td className="whitespace-nowrap py-2 pr-3 text-slate-600">
                          {new Date(c.createdAt).toLocaleString()}
                        </td>
                        <td className="py-2 pr-3">
                          <span className="font-mono text-xs text-slate-800">{ref || "N/A"}</span>
                          <p className="mt-1 text-[11px] text-slate-500">
                            <span
                              className={`rounded-full border px-1.5 py-0.5 font-semibold uppercase tracking-wide ${depthBadgeClass(
                                depth,
                              )}`}
                            >
                              {depth === 0 ? "root" : `depth-${depth}`}
                            </span>
                          </p>
                          {parentRef ? (
                            <p className="mt-1 text-[11px] text-slate-500">
                              Retry of <span className="font-mono">{parentRef}</span>
                            </p>
                          ) : null}
                          {chainRef ? (
                            <button
                              type="button"
                              onClick={() => setActiveOrderChainRef(chainRef)}
                              className="mt-1 block rounded-md border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:border-slate-400"
                            >
                              View related retries
                            </button>
                          ) : null}
                        </td>
                        <td className="max-w-[200px] truncate py-2 pr-3 text-xs text-slate-700" title={c.email}>
                          {c.email}
                        </td>
                        <td className="py-2 pr-3">
                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                            {c.status}
                          </span>
                          {retryItems.length > 0 ? (
                            <div className="mt-2">
                              <button
                                type="button"
                                disabled={retryingRef === (ref || c.id)}
                                onClick={async () => {
                                  const targetRef = ref || c.id;
                                  const confirmList = retryItems
                                    .map((item) => `- ${item.kind}: ${item.label}`)
                                    .join("\n");
                                  const ok = window.confirm(
                                    `Retry ${retryItems.length} failed item(s)?\n\n${confirmList}`,
                                  );
                                  if (!ok) return;
                                  try {
                                    setRetryingRef(targetRef);
                                    const res = await fetch("/api/namecheap/checkout/unified", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({
                                        items: retryItems,
                                        domainContact: contactPayload,
                                        parentCheckoutRef: ref || c.id,
                                      }),
                                    });
                                    const data = (await res.json().catch(() => ({}))) as {
                                      error?: string;
                                      checkoutRef?: string;
                                    };
                                    if (!res.ok) {
                                      throw new Error(data.error || "Retry failed");
                                    }
                                    setToast({
                                      kind: "success",
                                      text: `Retry started. New ref: ${data.checkoutRef || "generated"}`,
                                    });
                                    await load();
                                  } catch (e) {
                                    setToast({
                                      kind: "error",
                                      text: e instanceof Error ? e.message : "Retry failed",
                                    });
                                  } finally {
                                    setRetryingRef(null);
                                  }
                                }}
                                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-60"
                              >
                                {retryingRef === (ref || c.id)
                                  ? "Retrying…"
                                  : `Retry failed (${retryItems.length})`}
                              </button>
                            </div>
                          ) : null}
                        </td>
                        <td className="py-2 pr-3">
                          {rows.length === 0 ? (
                            <p className="text-xs text-slate-500">No item rows recorded.</p>
                          ) : (
                            <ul className="space-y-1.5">
                              {rows.map((r, idx) => (
                                <li
                                  key={`${c.id}-result-${idx}`}
                                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5"
                                >
                                  <p className="text-xs font-semibold text-slate-800">
                                    {r.label || "Item"}{" "}
                                    <span className="text-slate-500">
                                      ({r.kind || "unknown"})
                                    </span>
                                  </p>
                                  <p className="text-[11px] text-slate-600">Status: {r.status || "unknown"}</p>
                                  {r.orderId ? (
                                    <p className="text-[11px] text-slate-500">
                                      Order ID: <span className="font-mono">{r.orderId}</span>
                                    </p>
                                  ) : null}
                                  {r.certificateId ? (
                                    <p className="text-[11px] text-slate-500">
                                      Certificate ID:{" "}
                                      <span className="font-mono">{r.certificateId}</span>
                                    </p>
                                  ) : null}
                                  {r.message ? (
                                    <p className="text-[11px] text-amber-700">{r.message}</p>
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {filteredUnified.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No Namecheap unified orders yet.</p>
            ) : null}
          </div>
            );
          })()}
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
