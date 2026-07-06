"use client";

import { CreditCard, AlertTriangle, Wallet } from "lucide-react";
import { formatMoney } from "@/lib/ops/format";
import { cn } from "@/lib/utils";

type AdminTransaction = {
  id: string;
  userEmail: string;
  type: string;
  status: string;
  amountMinor: string;
  currency: string;
  provider: string;
  providerReference: string;
  createdAt: string;
};

type AdminRenewalIssue = {
  id: string;
  status: string;
  nextRenewalAt: string;
  graceEndsAt: string | null;
  userEmail: string;
  userId: string;
  walletBalanceMinor: string;
  planName: string;
  planCode: string;
  amountMinor: string;
  autoRenew: boolean;
};

interface AdminOpsPanelsProps {
  transactions: AdminTransaction[] | null;
  issues: AdminRenewalIssue[] | null;
  busyRenewalId?: string | null;
  busyTransactionId?: string | null;
  onChargeRenewal?: (renewalId: string) => Promise<void>;
  onReconcileTransaction?: (transactionId: string) => Promise<void>;
}

function txStatusClass(status: string) {
  if (status === "success" || status === "completed" || status === "paid")
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  if (status === "pending")
    return "border-amber-500/30 bg-amber-500/10 text-amber-400";
  if (status === "failed" || status === "cancelled")
    return "border-rose-500/30 bg-rose-500/10 text-rose-400";
  return "border-sa-border bg-sa-surface text-sa-muted";
}

function issueStatusClass(status: string) {
  if (status === "past_due")
    return "border-orange-500/30 bg-orange-500/10 text-orange-400";
  if (status === "suspended")
    return "border-rose-500/30 bg-rose-500/10 text-rose-400";
  return "border-sa-border bg-sa-surface text-sa-muted";
}

function canChargeIssue(issue: AdminRenewalIssue): boolean {
  return issue.status === "past_due" || issue.status === "active";
}

export function AdminOpsPanels({
  transactions,
  issues,
  busyRenewalId = null,
  busyTransactionId = null,
  onChargeRenewal,
  onReconcileTransaction,
}: AdminOpsPanelsProps) {
  const txs = transactions ?? [];
  const renewalIssues = issues ?? [];
  const pendingCount = txs.filter((t) => t.status === "pending").length;

  return (
    <div id="admin-ops-panels" className="scroll-mt-28 grid gap-6 lg:grid-cols-2">
      <section className="sa-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-sa-border p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
              <AlertTriangle size={16} />
            </div>
            <h2 className="font-heading text-xl font-bold text-white">Renewal issues</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
            {renewalIssues.length} flagged
          </span>
        </div>
        <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
          {renewalIssues.length === 0 ? (
            <p className="p-6 text-sm text-sa-muted/60 md:p-8">
              No past-due or suspended renewals. All subscriptions are healthy.
            </p>
          ) : (
            <ul className="divide-y divide-sa-border/20">
              {renewalIssues.map((r) => {
                const walletMinor = Number(r.walletBalanceMinor);
                const dueMinor = Number(r.amountMinor);
                const hasFunds = walletMinor >= dueMinor;
                const chargeable = canChargeIssue(r) && onChargeRenewal;

                return (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-5 md:px-8">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">{r.userEmail}</p>
                      <p className="mt-1 text-[11px] font-medium text-sa-muted/70">
                        {r.planName}
                        <span className="mx-2 text-sa-border">|</span>
                        due {formatMoney(r.amountMinor, "GHS")}
                        <span className="mx-2 text-sa-border">|</span>
                        next {new Date(r.nextRenewalAt).toLocaleDateString()}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-sa-muted/50">
                        <Wallet size={12} />
                        Wallet {formatMoney(r.walletBalanceMinor, "GHS")}
                        {!hasFunds && r.status === "past_due" ? (
                          <span className="text-orange-400">· insufficient for charge</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {chargeable ? (
                        <button
                          type="button"
                          disabled={busyRenewalId === r.id || !hasFunds}
                          onClick={() => void onChargeRenewal(r.id)}
                          className="rounded-full border border-sa-primary/30 bg-sa-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition hover:bg-sa-primary hover:text-black disabled:opacity-40"
                          title={
                            hasFunds
                              ? "Charge renewal from user wallet"
                              : "User needs wallet top-up first"
                          }
                        >
                          {busyRenewalId === r.id ? "Charging…" : "Charge wallet"}
                        </button>
                      ) : null}
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                          issueStatusClass(r.status),
                        )}
                      >
                        {r.status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section id="admin-transactions-panel" className="sa-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-sa-border p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sa-primary/10 text-sa-primary">
              <CreditCard size={16} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">Recent transactions</h2>
              {pendingCount > 0 ? (
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  {pendingCount} pending — reconcile with Paystack if paid
                </p>
              ) : null}
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
            {txs.length} shown
          </span>
        </div>
        <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
          {txs.length === 0 ? (
            <p className="p-6 text-sm text-sa-muted/60 md:p-8">No transactions recorded yet.</p>
          ) : (
            <ul className="divide-y divide-sa-border/20">
              {txs.map((t) => (
                <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 p-5 md:px-8">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{t.userEmail}</p>
                    <p className="mt-1 text-[11px] font-medium text-sa-muted/70">
                      {t.type.replace(/_/g, " ")}
                      <span className="mx-2 text-sa-border">|</span>
                      {t.provider}
                      <span className="mx-2 text-sa-border">|</span>
                      {new Date(t.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <span className="font-heading text-sm font-bold text-white">
                      {formatMoney(t.amountMinor, t.currency)}
                    </span>
                    {t.status === "pending" && t.provider === "paystack" && onReconcileTransaction ? (
                      <button
                        type="button"
                        disabled={busyTransactionId === t.id}
                        onClick={() => void onReconcileTransaction(t.id)}
                        className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-300 transition hover:bg-amber-500/20 disabled:opacity-40"
                        title="Verify with Paystack and apply payment if successful"
                      >
                        {busyTransactionId === t.id ? "Checking…" : "Reconcile"}
                      </button>
                    ) : null}
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                        txStatusClass(t.status),
                      )}
                    >
                      {t.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
