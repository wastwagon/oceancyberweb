"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BillingLedgerEntry,
  BillingTransaction,
  clearAccessToken,
  downloadTransactionReceipt,
  getProfile,
  getWalletLedger,
  listBillingTransactions,
  openTransactionInvoiceHtml,
} from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function StatementsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [ledger, setLedger] = useState<BillingLedgerEntry[]>([]);
  const [transactions, setTransactions] = useState<BillingTransaction[]>([]);

  async function load() {
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
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="sa-shell min-h-screen bg-sa-bg pt-28 pb-16 md:py-36">
      <div className="sa-container max-w-5xl space-y-6">
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
            <div className="rounded-2xl border border-sa-primary/20 bg-sa-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
              Financial records
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
            >
              Back to billing
            </Link>
            <Link
              href="/dashboard/wallet"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:border-sa-primary hover:text-white"
            >
              Top up wallet
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAccessToken();
                window.location.href = "/signin";
              }}
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 px-5 text-[10px] font-bold uppercase tracking-widest text-rose-400 transition-colors hover:border-rose-500 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </header>

        {loading ? <p className="text-sa-muted text-sm px-2">Loading...</p> : null}
        {error ? (
          <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-5 py-4 text-sm text-rose-400">{error}</div>
        ) : null}

        {!loading && !error ? (
          <>
            <section className="sa-card p-6 border-sa-border md:p-8">
              <h2 className="font-heading text-xl font-bold text-white">Wallet ledger</h2>
              <p className="mt-2 text-sm text-sa-muted/80">Credits and debits applied to your balance.</p>
              <div className="mt-6 overflow-x-auto">
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
                        <td className="py-6 text-sa-muted/80 text-center" colSpan={5}>
                          No ledger entries yet.
                        </td>
                      </tr>
                    ) : (
                      ledger.map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-sa-surface/50">
                          <td className="py-4 pr-6 text-white capitalize">{row.type}</td>
                          <td className="py-4 pr-6 font-heading font-bold text-white tabular-nums">
                            {row.type === "debit" ? "−" : "+"}₵{(Number(row.amountMinor) / 100).toFixed(2)}
                          </td>
                          <td className="py-4 pr-6 font-mono text-[10px] text-sa-muted/60">{row.reference ?? "—"}</td>
                          <td className="py-4 pr-6 text-sa-muted/80">{row.description ?? "—"}</td>
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
              <h2 className="font-heading text-xl font-bold text-white">Payment transactions</h2>
              <p className="mt-2 text-sm text-sa-muted/80">Download a plain-text receipt for successful payments.</p>
              <div className="mt-6 overflow-x-auto">
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
                        <td className="py-6 text-sa-muted/80 text-center" colSpan={5}>
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="transition-colors hover:bg-sa-surface/50">
                          <td className="py-4 pr-6 text-white">{tx.type}</td>
                          <td className="py-4 pr-6 text-sa-muted capitalize">{tx.status.replace("_", " ")}</td>
                          <td className="py-4 pr-6 font-heading font-bold text-white tabular-nums">₵{(Number(tx.amountMinor) / 100).toFixed(2)}</td>
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
                                      setError(err instanceof Error ? err.message : "Could not open invoice");
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
        ) : null}
      </div>
    </main>
  );
}
