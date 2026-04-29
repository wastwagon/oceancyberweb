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
  clearAccessToken,
  createRenewal,
  getBillingDashboard,
  getProfile,
  listRenewalPlans,
  pauseRenewal,
  resumeRenewal,
} from "@/lib/auth-client";

type DashboardData = Awaited<ReturnType<typeof getBillingDashboard>>;

function statusStyles(status: string) {
  switch (status) {
    case "active":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "paused":
      return "border-amber-200 bg-amber-50 text-amber-900";
    case "past_due":
      return "border-orange-200 bg-orange-50 text-orange-900";
    case "suspended":
      return "border-red-200 bg-red-50 text-red-800";
    case "cancelled":
      return "border-slate-200 bg-slate-100 text-slate-600";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
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
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Dashboard</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Billing & renewals</h1>
              <p className="mt-1 text-sm text-slate-600">{email || "Signed-in user"}</p>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Manage wallet funding, recurring renewals, and project invoices in one place.
              </p>
            </div>
            <div className="rounded-xl border border-ocean-200 bg-ocean-50 px-3 py-2 text-xs font-semibold text-ocean-800">
              Live account overview
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard/requests"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Requests
            </Link>
            <Link
              href="/dashboard/projects"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Projects
            </Link>
            <Link
              href="/dashboard/statements"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Statements
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

        {loading ? <p className="text-slate-600">Loading dashboard...</p> : null}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {data ? (
          <>
            {pastDueCount > 0 || suspendedCount > 0 ? (
              <section className="rounded-2xl border border-orange-200 bg-orange-50 p-4 shadow-sm">
                <p className="text-sm font-semibold text-orange-900">
                  Action needed: {pastDueCount} past due {pastDueCount === 1 ? "renewal" : "renewals"}
                  {suspendedCount > 0
                    ? `, ${suspendedCount} suspended ${suspendedCount === 1 ? "service" : "services"}`
                    : ""}
                  .
                </p>
                <p className="mt-1 text-sm text-orange-800">
                  Add wallet funds, then use <span className="font-semibold">Charge wallet</span> on each affected
                  renewal to restore service quickly.
                </p>
              </section>
            ) : null}

            <section className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Wallet balance</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{balanceLabel}</p>
                <p className="mt-2 text-sm text-slate-600">
                  Top up with Paystack. Renewals can auto-charge every 10 minutes when due, or you can pay manually.
                </p>
                <Link
                  href="/dashboard/wallet"
                  className="mt-4 inline-flex rounded-xl bg-ocean-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-ocean-700"
                >
                  Top up wallet
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Subscriptions</p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{data.renewals.length}</p>
                <p className="mt-2 text-sm text-slate-600">Pause, resume, or cancel anytime.</p>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Need a new build quote?</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Already have a website? Submit a conversion request and receive a scoped mobile app quote.
                  </p>
                </div>
                <Link
                  href="/services/website-to-mobile-app"
                  className="inline-flex min-h-[42px] items-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-4 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Start conversion request
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-900">Recurring renewals</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedPlanCode}
                    onChange={(e) => setSelectedPlanCode(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
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
                  <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
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
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50"
                  >
                    {creating ? "Creating..." : "Add renewal"}
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {data.renewals.length === 0 ? (
                  <p className="text-sm text-slate-600">No renewals yet.</p>
                ) : (
                  data.renewals.map((row: BillingRenewal) => {
                    const isBusy = busyId === row.id;
                    const canCharge = row.status === "active" || row.status === "past_due";
                    const showPause = row.status === "active" || row.status === "past_due";
                    return (
                      <div
                        key={row.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-slate-900">{row.plan.name}</p>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles(row.status)}`}
                              >
                                {row.status.replace("_", " ")}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              Next renewal: {new Date(row.nextRenewalAt).toLocaleDateString()}
                              {row.autoRenewUsingWallet ? " · Auto-pay from wallet" : " · Manual only"}
                            </p>
                            {row.externalRef ? (
                              <p className="text-xs font-mono text-slate-500">Ref: {row.externalRef}</p>
                            ) : null}
                            {row.status === "past_due" && row.graceEndsAt ? (
                              <p className="text-xs font-medium text-orange-800">
                                Grace until {new Date(row.graceEndsAt).toLocaleString()} — add funds or pay from wallet.
                              </p>
                            ) : null}
                            {row.status === "suspended" ? (
                              <p className="text-xs font-medium text-red-800">
                                Suspended after grace — contact support to reactivate.
                              </p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {canCharge ? (
                              <button
                                type="button"
                                disabled={isBusy || row.status === "paused"}
                                onClick={() =>
                                  withRenewalAction(row.id, () => chargeRenewal(row.id))
                                }
                                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-black disabled:opacity-50"
                              >
                                {isBusy ? "..." : "Charge wallet"}
                              </button>
                            ) : null}
                            {row.status === "paused" ? (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => withRenewalAction(row.id, () => resumeRenewal(row.id))}
                                className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-emerald-800 hover:bg-emerald-50"
                              >
                                Resume
                              </button>
                            ) : showPause && row.status !== "cancelled" ? (
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => withRenewalAction(row.id, () => pauseRenewal(row.id))}
                                className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-amber-900 hover:bg-amber-50"
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
                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-700 hover:bg-slate-100"
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
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-slate-900">Recent wallet activity</h2>
                  <Link href="/dashboard/statements" className="text-sm font-semibold text-ocean-600 hover:text-ocean-700">
                    View all →
                  </Link>
                </div>
                <ul className="mt-3 divide-y divide-slate-100 text-sm">
                  {data.recentLedger.map((e: BillingLedgerEntry) => (
                    <li key={e.id} className="flex flex-wrap justify-between gap-2 py-2">
                      <span className="text-slate-600">{e.description || e.type}</span>
                      <span className="tabular-nums font-medium text-slate-900">
                        {e.type === "debit" ? "−" : "+"}₵{(Number(e.amountMinor) / 100).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Recent transactions</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentTransactions.length === 0 ? (
                      <tr>
                        <td className="py-3 text-slate-600" colSpan={4}>
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      data.recentTransactions.map((tx: BillingTransaction) => (
                        <tr key={tx.id} className="border-t border-slate-100">
                          <td className="py-3 pr-4">{tx.type}</td>
                          <td className="py-3 pr-4">{tx.status}</td>
                          <td className="py-3 pr-4">₵{(Number(tx.amountMinor) / 100).toFixed(2)}</td>
                          <td className="py-3 pr-4">{new Date(tx.createdAt).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Receipts: open <Link href="/dashboard/statements" className="font-semibold text-ocean-600">Statements</Link>.
              </p>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
