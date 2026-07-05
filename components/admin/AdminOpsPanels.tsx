"use client";

import { CreditCard, AlertTriangle } from "lucide-react";
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
  planName: string;
  planCode: string;
  amountMinor: string;
  autoRenew: boolean;
};

interface AdminOpsPanelsProps {
  transactions: AdminTransaction[] | null;
  issues: AdminRenewalIssue[] | null;
}

function money(amountMinor: string, currency: string) {
  return `${currency} ${(Number(amountMinor) / 100).toFixed(2)}`;
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

export function AdminOpsPanels({ transactions, issues }: AdminOpsPanelsProps) {
  const txs = transactions ?? [];
  const renewalIssues = issues ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Renewal issues */}
      <section className="sa-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-sa-border p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
              <AlertTriangle size={16} />
            </div>
            <h2 className="font-heading text-xl font-bold text-white">
              Renewal issues
            </h2>
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
              {renewalIssues.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-5 md:px-8">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{r.userEmail}</p>
                    <p className="mt-1 text-[11px] font-medium text-sa-muted/70">
                      {r.planName}
                      <span className="mx-2 text-sa-border">|</span>
                      {money(r.amountMinor, "GHS")}
                      <span className="mx-2 text-sa-border">|</span>
                      next {new Date(r.nextRenewalAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                      issueStatusClass(r.status),
                    )}
                  >
                    {r.status.replace(/_/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Recent transactions */}
      <section className="sa-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-sa-border p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sa-primary/10 text-sa-primary">
              <CreditCard size={16} />
            </div>
            <h2 className="font-heading text-xl font-bold text-white">
              Recent transactions
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
            {txs.length} shown
          </span>
        </div>
        <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
          {txs.length === 0 ? (
            <p className="p-6 text-sm text-sa-muted/60 md:p-8">
              No transactions recorded yet.
            </p>
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
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-heading text-sm font-bold text-white">
                      {money(t.amountMinor, t.currency)}
                    </span>
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
