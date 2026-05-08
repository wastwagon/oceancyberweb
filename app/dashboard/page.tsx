"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BillingLedgerEntry,
  BillingRenewalPlan,
  BillingRenewal,
  BillingTransaction,
  cancelRenewal,
  chargeRenewal,
  createRenewal,
  getBillingDashboard,
  getProfile,
  listRenewalPlans,
  pauseRenewal,
  resumeRenewal,
  signOut,
} from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type DashboardData = Awaited<ReturnType<typeof getBillingDashboard>>;

function statusStyles(status: string) {
  switch (status) {
    case "active":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "paused":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    case "past_due":
      return "border-orange-500/30 bg-orange-500/10 text-orange-400";
    case "suspended":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    case "cancelled":
      return "border-sa-border bg-sa-bg text-sa-muted/60";
    default:
      return "border-sa-border bg-sa-surface text-sa-muted";
  }
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [plans, setPlans] = useState<BillingRenewalPlan[]>([]);
  const [selectedPlanCode, setSelectedPlanCode] = useState("");
  const [autoRenewUsingWallet, setAutoRenewUsingWallet] = useState(true);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [profile, dashboard, availablePlans] = await Promise.all([
        getProfile(),
        getBillingDashboard(),
        listRenewalPlans(),
      ]);
      setEmail(profile.email);
      setData(dashboard);
      setPlans(availablePlans);
      setSelectedPlanCode((prev) => prev || availablePlans[0]?.code || "");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const balanceLabel = useMemo(() => {
    if (!data) return "₵0.00";
    return `₵${data.wallet.balanceDisplay.toFixed(2)}`;
  }, [data]);

  const pastDueCount = data?.renewals.filter((r) => r.status === "past_due").length ?? 0;
  const suspendedCount = data?.renewals.filter((r) => r.status === "suspended").length ?? 0;

  async function withRenewalAction(renewalId: string, fn: () => Promise<unknown>) {
    setBusyId(renewalId);
    setError(null);
    try {
      await fn();
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="sa-shell min-h-screen bg-sa-bg pt-28 pb-16 md:py-36">
      <div className="sa-container max-w-5xl space-y-6">
        <header className="sa-card p-6 border-sa-border md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="sa-eyebrow inline-flex">Dashboard</p>
              <h1 className="sa-title !text-left mt-3 text-2xl md:text-3xl">Billing & renewals</h1>
              <p className="mt-1 text-sm text-sa-muted/80">{email || "Signed-in user"}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sa-muted/80">
                Manage wallet funding, recurring renewals, and project invoices in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-sa-primary/20 bg-sa-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
              Live account overview
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard/requests"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
            >
              Requests
            </Link>
            <Link
              href="/dashboard/projects"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/dashboard/statements"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
            >
              Statements
            </Link>
            <Link
              href="/services/website-to-mobile-app"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:border-sa-primary hover:text-white"
            >
              App Quote
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 px-5 text-[10px] font-bold uppercase tracking-widest text-rose-400 transition-colors hover:border-rose-500 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </header>

        {loading ? <p className="text-sa-muted text-sm px-2">Loading dashboard...</p> : null}
        {error ? (
          <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-5 py-4 text-sm text-rose-400">{error}</div>
        ) : null}

        {data ? (
          <>
            {pastDueCount > 0 || suspendedCount > 0 ? (
              <section className="rounded-3xl border border-orange-500/30 bg-orange-500/10 p-6 shadow-sm">
                <p className="text-sm font-bold text-orange-400">
                  Action needed: {pastDueCount} past due {pastDueCount === 1 ? "renewal" : "renewals"}
                  {suspendedCount > 0
                    ? `, ${suspendedCount} suspended ${suspendedCount === 1 ? "service" : "services"}`
                    : ""}
                  .
                </p>
                <p className="mt-2 text-sm text-orange-400/80">
                  Add wallet funds, then use <span className="font-bold text-orange-400">Charge wallet</span> on each affected
                  renewal to restore service quickly.
                </p>
              </section>
            ) : null}

            <section className="grid gap-6 md:grid-cols-3">
              <div className="sa-card p-6 border-sa-border md:col-span-2 md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Wallet balance</p>
                <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">{balanceLabel}</p>
                <p className="mt-3 text-sm text-sa-muted/80 leading-relaxed max-w-md">
                  Top up with Paystack. Renewals can auto-charge every 10 minutes when due, or you can pay manually.
                </p>
                <Link
                  href="/dashboard/wallet"
                  className="sa-btn-primary mt-6 min-h-[44px] px-6 text-[10px]"
                >
                  Top up wallet
                </Link>
              </div>
              <div className="sa-card p-6 border-sa-border md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Subscriptions</p>
                <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">{data.renewals.length}</p>
                <p className="mt-3 text-sm text-sa-muted/80 leading-relaxed">Pause, resume, or cancel anytime.</p>
              </div>
            </section>

            <section className="sa-card p-6 border-sa-border md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Need a new build quote?</h2>
                  <p className="mt-2 text-sm text-sa-muted/80 max-w-xl">
                    Already have a website? Submit a conversion request and receive a scoped mobile app quote.
                  </p>
                </div>
                <Link
                  href="/services/website-to-mobile-app"
                  className="sa-btn-primary min-h-[44px] px-6 text-[10px]"
                >
                  Request conversion quote
                </Link>
              </div>
            </section>

            <section className="sa-card p-6 border-sa-border md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h2 className="font-heading text-xl font-bold text-white">Recurring renewals</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedPlanCode}
                    onChange={(e) => setSelectedPlanCode(e.target.value)}
                    className="rounded-xl border border-sa-border bg-sa-bg px-4 py-2.5 text-sm text-white focus:border-sa-primary focus:outline-none"
                    disabled={creating || plans.length === 0}
                  >
                    {plans.length === 0 ? (
                      <option value="">No plans available</option>
                    ) : (
                      plans.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name} - {(Number(p.amountMinor) / 100).toFixed(2)} {p.currency}/
                          {p.interval === "yearly" ? "yr" : "mo"}
                        </option>
                      ))
                    )}
                  </select>
                  <label className="inline-flex items-center gap-2 rounded-xl border border-sa-border bg-sa-surface px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-sa-muted cursor-pointer hover:border-sa-primary/50">
                    <input
                      type="checkbox"
                      className="accent-sa-primary"
                      checked={autoRenewUsingWallet}
                      onChange={(e) => setAutoRenewUsingWallet(e.target.checked)}
                    />
                    Auto-renew
                  </label>
                  <button
                    type="button"
                    disabled={creating || !selectedPlanCode}
                    onClick={async () => {
                      setCreating(true);
                      setError(null);
                      try {
                        await createRenewal(selectedPlanCode, autoRenewUsingWallet);
                        await load();
                      } catch (err: unknown) {
                        setError(err instanceof Error ? err.message : "Could not create renewal");
                      } finally {
                        setCreating(false);
                      }
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-sa-border bg-sa-surface px-6 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white disabled:opacity-50"
                  >
                    {creating ? "Creating..." : "Add renewal"}
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {data.renewals.length === 0 ? (
                  <p className="text-sm text-sa-muted/80 rounded-2xl border border-sa-border border-dashed p-8 text-center">No renewals yet.</p>
                ) : (
                  data.renewals.map((row: BillingRenewal) => {
                    const isBusy = busyId === row.id;
                    const canCharge = row.status === "active" || row.status === "past_due";
                    const showPause = row.status === "active" || row.status === "past_due";
                    return (
                      <div
                        key={row.id}
                        className="rounded-2xl border border-sa-border bg-sa-bg px-5 py-5 transition-colors hover:border-sa-primary/50"
                      >
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
                          <div className="min-w-0 space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                              <p className="font-heading font-bold text-white text-lg">{row.plan.name}</p>
                              <span
                                className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest", statusStyles(row.status))}
                              >
                                {row.status.replace("_", " ")}
                              </span>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                              Next renewal: <span className="text-sa-muted">{new Date(row.nextRenewalAt).toLocaleDateString()}</span>
                              <span className="text-sa-border mx-2">|</span>
                              {row.autoRenewUsingWallet ? "Auto-pay from wallet" : "Manual only"}
                            </p>
                            {row.externalRef ? (
                              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">Ref: {row.externalRef}</p>
                            ) : null}
                            {row.status === "past_due" && row.graceEndsAt ? (
                              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mt-2">
                                Grace until {new Date(row.graceEndsAt).toLocaleString()} — add funds or pay from wallet.
                              </p>
                            ) : null}
                            {row.status === "suspended" ? (
                              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mt-2">
                                Suspended after grace — contact support to reactivate.
                              </p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                            {canCharge ? (
                              <button
                                type="button"
                                disabled={isBusy || row.status === "paused"}
                                onClick={() =>
                                  withRenewalAction(row.id, () => chargeRenewal(row.id))
                                }
                                className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-sa-primary bg-sa-primary/20 px-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:bg-sa-primary hover:text-white disabled:opacity-50"
                              >
                                {isBusy ? "..." : "Charge wallet"}
                              </button>
                            ) : null}
                            {row.status === "paused" ? (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => withRenewalAction(row.id, () => resumeRenewal(row.id))}
                                className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 text-[10px] font-bold uppercase tracking-widest text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-white disabled:opacity-50"
                              >
                                Resume
                              </button>
                            ) : showPause && row.status !== "cancelled" ? (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => withRenewalAction(row.id, () => pauseRenewal(row.id))}
                                className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 text-[10px] font-bold uppercase tracking-widest text-amber-400 transition-colors hover:bg-amber-500 hover:text-white disabled:opacity-50"
                              >
                                Pause
                              </button>
                            ) : null}
                            {row.status !== "cancelled" ? (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => {
                                  if (!confirm("Cancel this renewal? Auto-pay will stop.")) return;
                                  withRenewalAction(row.id, () => cancelRenewal(row.id));
                                }}
                                className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-4 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {data.recentLedger?.length ? (
              <section className="sa-card p-6 border-sa-border md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-heading text-xl font-bold text-white">Recent wallet activity</h2>
                  <Link href="/dashboard/statements" className="text-[10px] font-bold uppercase tracking-widest text-sa-primary hover:text-white transition-colors">
                    View all →
                  </Link>
                </div>
                <ul className="mt-6 divide-y divide-sa-border text-sm">
                  {data.recentLedger.map((e: BillingLedgerEntry) => (
                    <li key={e.id} className="flex flex-wrap justify-between items-center gap-3 py-3">
                      <span className="text-sa-muted">{e.description || e.type}</span>
                      <span className="font-heading font-bold text-white text-base">
                        {e.type === "debit" ? "−" : "+"}₵{(Number(e.amountMinor) / 100).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="sa-card p-6 border-sa-border md:p-8">
              <h2 className="font-heading text-xl font-bold text-white">Recent transactions</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 border-b border-sa-border">
                    <tr>
                      <th className="py-3 pr-6">Type</th>
                      <th className="py-3 pr-6">Status</th>
                      <th className="py-3 pr-6">Amount</th>
                      <th className="py-3 pr-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sa-border/50">
                    {data.recentTransactions.length === 0 ? (
                      <tr>
                        <td className="py-6 text-sa-muted/80 text-center" colSpan={4}>
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      data.recentTransactions.map((tx: BillingTransaction) => (
                        <tr key={tx.id} className="transition-colors hover:bg-sa-surface/50">
                          <td className="py-4 pr-6 text-white">{tx.type}</td>
                          <td className="py-4 pr-6 text-sa-muted capitalize">{tx.status.replace("_", " ")}</td>
                          <td className="py-4 pr-6 font-heading font-bold text-white">₵{(Number(tx.amountMinor) / 100).toFixed(2)}</td>
                          <td className="py-4 pr-6 text-sa-muted/80">{new Date(tx.createdAt).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                Receipts: open <Link href="/dashboard/statements" className="text-sa-primary hover:text-white transition-colors">Statements</Link>.
              </p>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
