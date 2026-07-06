"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { RefreshCcw, Download } from "lucide-react";
import {
  BillingLedgerEntry,
  BillingTransaction,
  downloadTransactionReceipt,
  getProfile,
  getWalletLedger,
  listBillingTransactions,
  openTransactionInvoiceHtml,
} from "@/lib/auth-client";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { AppAlert } from "@/components/ui/AppAlert";
import { formatMoney } from "@/lib/ops/format";
import { downloadCsv } from "@/lib/ops/download-csv";
import { cn } from "@/lib/utils";

function txStatusClass(status: string) {
  if (status === "success" || status === "completed" || status === "paid") {
    return "text-emerald-400";
  }
  if (status === "pending") return "text-amber-400";
  if (status === "failed" || status === "cancelled") return "text-rose-400";
  return "text-sa-muted";
}

export default function StatementsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [ledger, setLedger] = useState<BillingLedgerEntry[]>([]);
  const [transactions, setTransactions] = useState<BillingTransaction[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profile, entries, txs] = await Promise.all([
        getProfile(),
        getWalletLedger(),
        listBillingTransactions(),
      ]);
      setEmail(profile.email);
      setLedger(entries);
      setTransactions(txs);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load statements");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const exportLedgerCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(
      `wallet-ledger-${stamp}.csv`,
      ["Type", "Amount", "Currency", "Reference", "Note", "Date"],
      ledger.map((row) => [
        row.type,
        row.type === "debit" ? `-${row.amountMinor}` : row.amountMinor,
        row.currency || "GHS",
        row.reference ?? "",
        row.description ?? "",
        new Date(row.createdAt).toISOString(),
      ]),
    );
  };

  const exportTransactionsCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(
      `payment-transactions-${stamp}.csv`,
      ["Type", "Status", "Amount", "Currency", "Date"],
      transactions.map((tx) => [
        tx.type.replace(/_/g, " "),
        tx.status.replace(/_/g, " "),
        tx.amountMinor,
        "GHS",
        new Date(tx.createdAt).toISOString(),
      ]),
    );
  };

  return (
    <main className="min-h-screen pb-16">
      <div className="sa-container max-w-5xl space-y-6 py-8 md:py-12">
        <header className="sa-card p-6 border-sa-border md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="sa-eyebrow inline-flex">Dashboard</p>
              <h1 className="sa-title !text-left mt-3 text-2xl md:text-3xl">Wallet & statements</h1>
              <p className="mt-1 text-sm text-sa-muted/80">{email || "Signed-in user"}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sa-muted/80">
                Review ledger movements, transaction history, and download receipts or invoice documents.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/wallet"
                className="rounded-full border border-sa-primary/30 bg-sa-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition hover:bg-sa-primary hover:text-black"
              >
                Top up wallet
              </Link>
              <button
                type="button"
                onClick={() => void load()}
                disabled={loading}
                className="rounded-full border border-sa-border bg-sa-surface/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:text-white disabled:opacity-50"
              >
                <RefreshCcw size={12} className={cn("mr-1.5 inline", loading && "animate-spin")} />
                Refresh
              </button>
            </div>
          </div>
          <DashboardNav className="mt-8" />
        </header>

        {error ? <AppAlert variant="error">{error}</AppAlert> : null}

        {loading ? (
          <p className="px-2 text-sm text-sa-muted/80">Loading statements…</p>
        ) : (
          <>
            <section className="sa-card p-6 border-sa-border md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Wallet ledger</h2>
                  <p className="mt-2 text-sm text-sa-muted/80">Credits and debits applied to your balance.</p>
                </div>
                <button
                  type="button"
                  onClick={exportLedgerCsv}
                  disabled={loading || ledger.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sa-border bg-sa-surface/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:text-white disabled:opacity-40"
                >
                  <Download size={12} />
                  Export CSV
                </button>
              </div>
              <div className="mt-6 overflow-x-auto custom-scrollbar">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 border-b border-sa-border">
                    <tr>
                      <th className="py-3 pr-6">Type</th>
                      <th className="py-3 pr-6">Amount</th>
                      <th className="py-3 pr-6">Reference</th>
                      <th className="py-3 pr-6">Note</th>
                      <th className="py-3 pr-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sa-border/50">
                    {ledger.length === 0 ? (
                      <tr>
                        <td className="py-6 text-center text-sa-muted/80" colSpan={5}>
                          No ledger entries yet.{" "}
                          <Link href="/dashboard/wallet" className="text-sa-primary hover:underline">
                            Top up your wallet
                          </Link>{" "}
                          to get started.
                        </td>
                      </tr>
                    ) : (
                      ledger.map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-sa-surface/50">
                          <td className="py-4 pr-6 text-white capitalize">{row.type}</td>
                          <td className="py-4 pr-6 font-heading font-bold text-white tabular-nums">
                            {row.type === "debit" ? "−" : "+"}
                            {formatMoney(row.amountMinor, row.currency || "GHS")}
                          </td>
                          <td className="py-4 pr-6 font-mono text-[10px] text-sa-muted/60">
                            {row.reference ?? "—"}
                          </td>
                          <td className="py-4 pr-6 max-w-xs truncate text-sa-muted/80">
                            {row.description ?? "—"}
                          </td>
                          <td className="py-4 pr-6 text-sa-muted/80">
                            {new Date(row.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="sa-card p-6 border-sa-border md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Payment transactions</h2>
                  <p className="mt-2 text-sm text-sa-muted/80">
                    Download a plain-text receipt or HTML invoice for successful payments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportTransactionsCsv}
                  disabled={loading || transactions.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sa-border bg-sa-surface/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:text-white disabled:opacity-40"
                >
                  <Download size={12} />
                  Export CSV
                </button>
              </div>
              <div className="mt-6 overflow-x-auto custom-scrollbar">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 border-b border-sa-border">
                    <tr>
                      <th className="py-3 pr-6">Type</th>
                      <th className="py-3 pr-6">Status</th>
                      <th className="py-3 pr-6">Amount</th>
                      <th className="py-3 pr-6">Date</th>
                      <th className="py-3 pr-6">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sa-border/50">
                    {transactions.length === 0 ? (
                      <tr>
                        <td className="py-6 text-center text-sa-muted/80" colSpan={5}>
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="transition-colors hover:bg-sa-surface/50">
                          <td className="py-4 pr-6 text-white">{tx.type.replace(/_/g, " ")}</td>
                          <td className={cn("py-4 pr-6 capitalize", txStatusClass(tx.status))}>
                            {tx.status.replace(/_/g, " ")}
                          </td>
                          <td className="py-4 pr-6 font-heading font-bold text-white tabular-nums">
                            {formatMoney(tx.amountMinor, "GHS")}
                          </td>
                          <td className="py-4 pr-6 text-sa-muted/80">
                            {new Date(tx.createdAt).toLocaleString()}
                          </td>
                          <td className="py-4 pr-6">
                            {tx.status === "success" ? (
                              <div className="flex flex-wrap gap-x-4 gap-y-2">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      await downloadTransactionReceipt(tx.id);
                                    } catch (err: unknown) {
                                      setError(err instanceof Error ? err.message : "Download failed");
                                    }
                                  }}
                                  className="text-[10px] font-bold uppercase tracking-widest text-sa-primary hover:text-white transition-colors"
                                >
                                  Receipt
                                </button>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      await openTransactionInvoiceHtml(tx.id);
                                    } catch (err: unknown) {
                                      setError(
                                        err instanceof Error ? err.message : "Could not open invoice",
                                      );
                                    }
                                  }}
                                  className="text-[10px] font-bold uppercase tracking-widest text-sa-muted hover:text-white transition-colors"
                                >
                                  HTML invoice
                                </button>
                              </div>
                            ) : (
                              <span className="text-sa-muted/40">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
