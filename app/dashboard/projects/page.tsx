"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  initializeProjectInvoicePayment,
  listMyProjects,
  type ClientProjectInvoice,
  type ClientProjectRow,
} from "@/lib/auth-client";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { cn } from "@/lib/utils";

function money(amountMinor: string, currency: string) {
  return `${currency} ${(Number(amountMinor) / 100).toFixed(2)}`;
}

function badgeClass(status: string) {
  if (status === "paid") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  if (status === "issued") return "border-blue-500/30 bg-blue-500/10 text-blue-400";
  if (status === "unlocked") return "border-cyan-500/30 bg-cyan-500/10 text-cyan-400";
  if (status === "locked" || status === "draft") return "border-sa-border bg-sa-bg text-sa-muted/60";
  return "border-sa-border bg-sa-surface text-sa-muted";
}

type ProjectActivity = NonNullable<ClientProjectRow["activities"]>[number];

function activityCategory(a: ProjectActivity): string {
  const raw = a.metadata?.category;
  return typeof raw === "string" && raw.trim() ? raw : "general";
}

/** Activities that make sense for a client to see (hide internal blocker chatter). */
function clientVisibleActivities(activities: ClientProjectRow["activities"]): ProjectActivity[] {
  if (!activities) return [];
  return activities.filter((a) => {
    const category = activityCategory(a);
    if (category === "blocker") return false;
    const note = (a.note || "").toLowerCase();
    if (note.startsWith("blocker resolved:")) return false;
    return true;
  });
}

function activityLabel(category: string): { label: string; cls: string } {
  if (category === "dev_update")
    return { label: "Update", cls: "border-sa-primary/30 bg-sa-primary/10 text-sa-primary" };
  if (category === "approval")
    return { label: "Approval", cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" };
  if (category === "client_feedback")
    return { label: "Feedback", cls: "border-blue-500/30 bg-blue-500/10 text-blue-400" };
  return { label: "Note", cls: "border-sa-border bg-sa-surface text-sa-muted" };
}

export default function DashboardProjectsPage() {
  const [rows, setRows] = useState<ClientProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyInvoiceId, setBusyInvoiceId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listMyProjects();
      setRows(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load your projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const totals = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((r) => ["active", "in_review", "ready_for_launch"].includes(r.status)).length;
    const dueInvoices = rows.flatMap((r) => r.invoices).filter((i) => i.status === "issued").length;
    return { total, active, dueInvoices };
  }, [rows]);

  async function payInvoice(projectId: string, invoice: ClientProjectInvoice) {
    setBusyInvoiceId(invoice.id);
    setError(null);
    try {
      const res = await initializeProjectInvoicePayment(projectId, invoice.id);
      window.location.href = res.authorizationUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not initialize payment.");
    } finally {
      setBusyInvoiceId(null);
    }
  }

  return (
    <main className="sa-shell min-h-screen bg-sa-bg pt-28 pb-16 md:py-36">
      <div className="sa-container max-w-5xl space-y-6">
        <header className="sa-card p-6 border-sa-border md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="sa-eyebrow inline-flex">Dashboard</p>
              <h1 className="sa-title !text-left mt-3 text-2xl md:text-3xl">Projects & milestone invoices</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sa-muted/80">
                Pay milestones in sequence: kickoff, build, then launch handover.
              </p>
            </div>
            <div className="rounded-2xl border border-sa-primary/20 bg-sa-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
              30 / 30 / 40 workflow
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DashboardNav />
            <Link
              href="/services/website-to-mobile-app"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:border-sa-primary hover:text-white"
            >
              App Quote
            </Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="sa-card p-6 border-sa-border md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Projects</p>
            <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">{totals.total}</p>
          </div>
          <div className="sa-card p-6 border-sa-border md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Active pipeline</p>
            <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">{totals.active}</p>
          </div>
          <div className="sa-card p-6 border-sa-border md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Invoices due</p>
            <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">{totals.dueInvoices}</p>
          </div>
        </section>

        {loading ? <p className="text-sa-muted text-sm px-2">Loading projects...</p> : null}
        {error ? (
          <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-5 py-4 text-sm text-rose-400">{error}</div>
        ) : null}

        {!loading && rows.length === 0 ? (
          <div className="rounded-2xl border border-sa-border border-dashed p-8 text-center text-sm text-sa-muted/80">
            No client projects yet. Ask admin to create your project timeline to start milestone payments.
          </div>
        ) : null}

        {rows.map((project) => (
          <section key={project.id} className="sa-card p-6 border-sa-border md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">{project.title}</h2>
                <p className="mt-2 text-sm text-sa-muted/80 max-w-2xl">{project.description || "No project summary added yet."}</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-sa-muted">
                  Project total: <span className="text-white">{money(project.totalAmountMinor, project.currency)}</span>
                </p>
              </div>
              <span className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest", badgeClass(project.status))}>
                {project.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-sa-border bg-sa-bg p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Milestones</p>
                <ul className="mt-4 space-y-3">
                  {project.milestones.map((m) => (
                    <li key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-sa-border bg-sa-surface p-4 transition-colors hover:border-sa-primary/30">
                      <div>
                        <p className="text-sm font-bold text-white">{m.title}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/80">
                          {m.percentage}% <span className="text-sa-border mx-1">|</span> {money(m.amountMinor, project.currency)}
                        </p>
                      </div>
                      <span className={cn("inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest self-start sm:self-auto", badgeClass(m.status))}>
                        {m.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-sa-border bg-sa-bg p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Invoices</p>
                <ul className="mt-4 space-y-3">
                  {project.invoices.map((invoice) => (
                    <li key={invoice.id} className="rounded-xl border border-sa-border bg-sa-surface p-4 transition-colors hover:border-sa-primary/30">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-white">{invoice.title}</p>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/80">
                            {invoice.invoiceNumber} <span className="text-sa-border mx-1">|</span> <span className="text-white">{money(invoice.amountMinor, invoice.currency)}</span>
                          </p>
                        </div>
                        <span className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest", badgeClass(invoice.status))}>
                          {invoice.status}
                        </span>
                      </div>
                      {invoice.status === "issued" ? (
                        <button
                          type="button"
                          disabled={busyInvoiceId === invoice.id}
                          onClick={() => payInvoice(project.id, invoice)}
                          className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-primary bg-sa-primary/20 px-5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:bg-sa-primary hover:text-white disabled:opacity-60"
                        >
                          {busyInvoiceId === invoice.id ? "Initializing..." : "Pay now"}
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(() => {
              const feed = clientVisibleActivities(project.activities);
              if (feed.length === 0) return null;
              return (
                <div className="mt-8 rounded-2xl border border-sa-border bg-sa-bg p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                    Progress updates
                  </p>
                  <ul className="mt-4 space-y-4">
                    {feed.map((a) => {
                      const meta = activityLabel(activityCategory(a));
                      return (
                        <li key={a.id} className="flex flex-col gap-1.5 border-l-2 border-sa-border pl-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={cn(
                                "inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                                meta.cls,
                              )}
                            >
                              {meta.label}
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-sa-muted/50">
                              {new Date(a.createdAt).toLocaleString()}
                            </span>
                          </div>
                          {a.note ? (
                            <p className="text-sm leading-relaxed text-sa-muted/90">{a.note}</p>
                          ) : (
                            <p className="text-sm leading-relaxed text-sa-muted/60">
                              {a.action.replace(/_/g, " ")}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })()}
          </section>
        ))}
      </div>
    </main>
  );
}
