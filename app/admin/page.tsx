"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout, 
  RefreshCcw, 
  Plus, 
  LogOut,
  CheckCircle2,
  XCircle,
  Search,
  AlertTriangle
} from "lucide-react";
import {
  signOut,
  getAdminContactPresetCounts,
  getAdminContacts,
  getAdminRenewalIssues,
  getAdminSummary,
  getAdminTransactions,
  getAdminUsers,
  getProfile,
  listAdminClientProjects,
  getAdminHelpCenterFeedbackSummary,
} from "@/lib/auth-client";
import { cn } from "@/lib/utils";

// Components
import { AdminStatGrid } from "@/components/admin/AdminStatGrid";
import { ProjectCard } from "@/components/admin/ProjectCard";
import { LeadPipeline } from "@/components/admin/LeadPipeline";
import { UserRegistry } from "@/components/admin/UserRegistry";
import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import { ProjectDeploymentForm } from "@/components/admin/ProjectDeploymentForm";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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
    const category = a.metadata?.category || "general";
    if (category === "blocker") return true;
  }
  return false;
}

export default function AdminPage() {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  const [txs, setTxs] = useState<any>(null);
  const [issues, setIssues] = useState<any>(null);
  const [contacts, setContacts] = useState<any>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");
  const [leadSourceFilter, setLeadSourceFilter] = useState("all");
  const [leadSearch, setLeadSearch] = useState("");
  const [leadSearchDebounced, setLeadSearchDebounced] = useState("");
  const [leadDateRange, setLeadDateRange] = useState("all");
  const [leadSort, setLeadSort] = useState("created_desc");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [leadLoading, setLeadLoading] = useState(false);
  const [presetCounts, setPresetCounts] = useState<any>(null);
  const [helpFeedback, setHelpFeedback] = useState<any>(null);
  const [helpFeedback7d, setHelpFeedback7d] = useState<any>(null);
  const [helpFeedback30d, setHelpFeedback30d] = useState<any>(null);
  const [toast, setToast] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [email, setEmail] = useState("");
  const [adminProjects, setAdminProjects] = useState<any>(null);
  const [projectBusy, setProjectBusy] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");

  const normalizedProjectSearch = projectSearch.trim().toLowerCase();
  const blockedProjects = (adminProjects ?? []).filter((p: any) => projectHasOpenBlocker(p.activities));

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
      try {
        setAdminProjects(await listAdminClientProjects());
      } catch (projectsErr: unknown) {
        setAdminProjects([]);
        setToast({
          kind: "error",
          text:
            projectsErr instanceof Error
              ? projectsErr.message
              : "Could not load client projects.",
        });
      }
      try {
        const counts = await getAdminContactPresetCounts({
          q: leadSearchDebounced,
          dateRange: leadDateRange,
        });
        setPresetCounts(counts);
      } catch {
        // preset counts are optional; leads still render
      }
    } catch (loadErr: unknown) {
      setToast({
        kind: "error",
        text: loadErr instanceof Error ? loadErr.message : "Failed to load admin data.",
      });
    } finally {
      setLeadLoading(false);
    }
  }, [leadDateRange, leadSearchDebounced, leadSort, leadSourceFilter, leadStatusFilter]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("oceancyber_admin_lead_filters");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
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
      } catch (err: unknown) {
        setAllowed(false);
        setErr(err instanceof Error ? err.message : "Not signed in or not authorized.");
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

  if (allowed === null) return <main className="min-h-screen bg-sa-bg px-4 py-32"><p className="text-sa-muted animate-pulse">Establishing secure link...</p></main>;

  if (allowed === false) {
    return (
      <main className="min-h-screen bg-sa-bg px-4 py-32">
        <div className="mx-auto max-w-md rounded-2xl border border-sa-border bg-sa-surface p-8 text-center shadow-2xl">
          <h1 className="text-2xl font-bold text-white font-heading">Not authorized</h1>
          <p className="mt-4 text-sm text-sa-muted/80 leading-relaxed">
            {err || "You need an admin account or to be listed in ADMIN_EMAILS on the server."}
          </p>
          <Link
            href="/"
            className="mt-8 sa-btn-primary w-full"
          >
            Return to Base
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-28 pb-20 md:pt-36">
      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-full -translate-x-1/2 overflow-hidden opacity-10 blur-[120px]">
        <div className="absolute inset-0 bg-gradient-to-b from-sa-primary/20 via-sa-primary/10 to-transparent" />
      </div>

      <div className="sa-container max-w-7xl space-y-10">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={cn(
                "fixed top-32 right-6 z-50 rounded-2xl border px-6 py-4 shadow-2xl backdrop-blur-md flex items-center gap-3",
                toast.kind === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-rose-500/30 bg-rose-500/10 text-rose-400"
              )}
            >
              {toast.kind === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              <span className="text-sm font-bold tracking-tight">{toast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <p className="sa-eyebrow">Operational Control</p>
            <h1 className="sa-title !text-left text-3xl md:text-5xl font-heading tracking-tight">
              Admin <span className="text-sa-muted/40">Overview</span>
            </h1>
            <p className="text-sm text-sa-muted/60 font-medium">Managing core OceanCyber systems as <span className="text-white">{email}</span></p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            <Link
              href="/admin/content"
              className="flex items-center gap-2 rounded-full border border-sa-primary/30 bg-sa-primary/10 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-all hover:bg-sa-primary hover:text-black"
            >
              <Layout size={14} />
              Site Content
            </Link>
            <button
              type="button"
              onClick={() => void load()}
              className="flex items-center gap-2 rounded-full border border-sa-border bg-sa-surface/50 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-all hover:text-white hover:border-sa-primary/50"
            >
              <RefreshCcw size={14} className={leadLoading ? "animate-spin" : ""} />
              Sync
            </button>
            <div className="h-10 w-[1px] bg-sa-border mx-2 hidden md:block" />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full border border-sa-border bg-sa-surface/50 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-sa-muted hover:text-white"
            >
              Portal
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white"
            >
              <LogOut size={14} />
              Exit
            </button>
          </motion.div>
        </header>

        {leadLoading && !summary ? <AdminSkeleton /> : null}

        {summary ? (
          <div className="space-y-10">
            <AdminStatGrid summary={summary} itemVariants={itemVariants} />

            {/* Client Projects Management */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white">Client Projects <span className="text-sa-muted/30 text-sm ml-2">30/30/40 ARCHITECTURE</span></h2>
                  <p className="text-sm text-sa-muted/60 font-medium max-w-2xl">
                    Deploying milestone-based infrastructure. Unlock build and launch stages as delivery progresses.
                  </p>
                </div>
              </div>

              <ProjectDeploymentForm load={load} setToast={setToast} />

              {/* Project Filtering & List */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sa-muted/40" size={16} />
                    <input
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Filter by Project ID, Title, or Email..."
                      className="w-full rounded-full border border-sa-border bg-sa-surface/50 px-12 py-3 text-sm text-white focus:border-sa-primary/50 focus:ring-0 transition-all"
                    />
                  </div>
                  {projectSearch && (
                    <button
                      type="button"
                      onClick={() => setProjectSearch("")}
                      className="rounded-full border border-sa-border bg-sa-surface px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-sa-muted hover:text-white"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {blockedProjects.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                        <AlertTriangle size={16} />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose-400">Stalled Deployments ({blockedProjects.length})</h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {blockedProjects.map((p: any) => (
                        <button
                          key={`blocked-${p.id}`}
                          type="button"
                          onClick={() => {
                            setProjectSearch(p.id);
                            document.getElementById(`project-card-${p.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className="rounded-full border border-rose-500/30 bg-sa-bg px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="grid gap-6">
                  <AnimatePresence mode="popLayout">
                    {(adminProjects ?? [])
                      .filter((p: any) => {
                        if (!normalizedProjectSearch) return true;
                        return (
                          p.id.toLowerCase().includes(normalizedProjectSearch) ||
                          p.title.toLowerCase().includes(normalizedProjectSearch) ||
                          p.user.email.toLowerCase().includes(normalizedProjectSearch)
                        );
                      })
                      .map((p: any) => (
                        <ProjectCard 
                          key={p.id}
                          project={p}
                          projectBusy={projectBusy}
                          setProjectBusy={setProjectBusy}
                          setToast={setToast}
                          load={load}
                          PROJECT_ACTIVITY_CATEGORIES={PROJECT_ACTIVITY_CATEGORIES}
                        />
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            <LeadPipeline 
              contacts={contacts}
              leadLoading={leadLoading}
              leadStatusFilter={leadStatusFilter}
              setLeadStatusFilter={setLeadStatusFilter}
              leadSourceFilter={leadSourceFilter}
              setLeadSourceFilter={setLeadSourceFilter}
              leadSearch={leadSearch}
              setLeadSearch={setLeadSearch}
              leadDateRange={leadDateRange}
              setLeadDateRange={setLeadDateRange}
              leadSort={leadSort}
              activePresetId={activePresetId}
              setActivePresetId={setActivePresetId}
              presetCounts={presetCounts}
              load={load}
              setToast={setToast}
              setProjectBusy={setProjectBusy}
              setProjectSearch={setProjectSearch}
              LEAD_FILTER_PRESETS={LEAD_FILTER_PRESETS}
            />

            <UserRegistry users={users} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
