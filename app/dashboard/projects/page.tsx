"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  clearAccessToken,
  initializeProjectInvoicePayment,
  listMyProjects,
  type ClientProjectInvoice,
  type ClientProjectRow,
} from "@/lib/auth-client";

function money(amountMinor: string, currency: string) {
  return `${currency} ${(Number(amountMinor) / 100).toFixed(2)}`;
}

function badgeClass(status: string) {
  if (status === "paid") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "issued") return "border-blue-200 bg-blue-50 text-blue-800";
  if (status === "unlocked") return "border-cyan-200 bg-cyan-50 text-cyan-800";
  if (status === "locked" || status === "draft") return "border-slate-200 bg-slate-100 text-slate-700";
  return "border-slate-200 bg-slate-50 text-slate-700";
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
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Dashboard</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Projects & milestone invoices</h1>
              <p className="mt-1 text-sm text-slate-600">
                Pay milestones in sequence: kickoff, build, then launch handover.
              </p>
            </div>
            <div className="rounded-xl border border-ocean-200 bg-ocean-50 px-3 py-2 text-xs font-semibold text-ocean-800">
              30 / 30 / 40 project workflow
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Billing dashboard
            </Link>
            <Link
              href="/services/website-to-mobile-app"
              className="rounded-xl border border-ocean-300 bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-800 hover:border-ocean-400"
            >
              Website to app quote
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAccessToken();
                window.location.href = "/signin";
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Projects</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totals.total}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Active pipeline</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totals.active}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Invoices due</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totals.dueInvoices}</p>
          </div>
        </section>

        {loading ? <p className="text-sm text-slate-600">Loading projects...</p> : null}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {!loading && rows.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No client projects yet. Ask admin to create your project timeline to start milestone payments.
          </div>
        ) : null}

        {rows.map((project) => (
          <section key={project.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{project.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{project.description || "No project summary added yet."}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Project total: {money(project.totalAmountMinor, project.currency)}
                </p>
              </div>
              <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${badgeClass(project.status)}`}>
                {project.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Milestones</p>
                <ul className="mt-2 space-y-2">
                  {project.milestones.map((m) => (
                    <li key={m.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{m.title}</p>
                        <p className="text-xs text-slate-500">
                          {m.percentage}% · {money(m.amountMinor, project.currency)}
                        </p>
                      </div>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase ${badgeClass(m.status)}`}>
                        {m.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Invoices</p>
                <ul className="mt-2 space-y-2">
                  {project.invoices.map((invoice) => (
                    <li key={invoice.id} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{invoice.title}</p>
                          <p className="text-xs text-slate-500">
                            {invoice.invoiceNumber} · {money(invoice.amountMinor, invoice.currency)}
                          </p>
                        </div>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase ${badgeClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                      {invoice.status === "issued" ? (
                        <button
                          type="button"
                          disabled={busyInvoiceId === invoice.id}
                          onClick={() => payInvoice(project.id, invoice)}
                          className="mt-2 inline-flex min-h-[38px] items-center rounded-lg bg-ocean-600 px-3 text-xs font-bold text-white hover:bg-ocean-700 disabled:opacity-60"
                        >
                          {busyInvoiceId === invoice.id ? "Initializing..." : "Pay now"}
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
