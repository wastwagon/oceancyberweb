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
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Dashboard</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Wallet & statements</h1>
              <p className="mt-1 text-sm text-slate-600">{email || "Signed-in user"}</p>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Review ledger movements, transaction history, and download receipts or invoice documents.
              </p>
            </div>
            <div className="rounded-xl border border-ocean-200 bg-ocean-50 px-3 py-2 text-xs font-semibold text-ocean-800">
              Financial records
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Back to billing
            </Link>
            <Link
              href="/dashboard/wallet"
              className="rounded-xl border border-ocean-300 bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-800 hover:border-ocean-400"
            >
              Top up wallet
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

        {loading ? <p className="text-slate-600">Loading...</p> : null}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {!loading && !error ? (
          <>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Wallet ledger</h2>
              <p className="mt-1 text-sm text-slate-600">Credits and debits applied to your balance.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Reference</th>
                      <th className="py-2 pr-4">Note</th>
                      <th className="py-2 pr-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger.length === 0 ? (
                      <tr>
                        <td className="py-3 text-slate-600" colSpan={5}>
                          No ledger entries yet.
                        </td>
                      </tr>
                    ) : (
                      ledger.map((row) => (
                        <tr key={row.id} className="border-t border-slate-100">
                          <td className="py-3 pr-4 capitalize">{row.type}</td>
                          <td className="py-3 pr-4 tabular-nums">
                            {row.type === "debit" ? "−" : "+"}₵{(Number(row.amountMinor) / 100).toFixed(2)}
                          </td>
                          <td className="py-3 pr-4 font-mono text-xs text-slate-600">{row.reference ?? "—"}</td>
                          <td className="py-3 pr-4 text-slate-600">{row.description ?? "—"}</td>
                          <td className="py-3 pr-4 whitespace-nowrap text-slate-600">
                            {new Date(row.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Payment transactions</h2>
              <p className="mt-1 text-sm text-slate-600">Download a plain-text receipt for successful payments.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td className="py-3 text-slate-600" colSpan={5}>
                          No transactions yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="border-t border-slate-100">
                          <td className="py-3 pr-4">{tx.type}</td>
                          <td className="py-3 pr-4">{tx.status}</td>
                          <td className="py-3 pr-4 tabular-nums">₵{(Number(tx.amountMinor) / 100).toFixed(2)}</td>
                          <td className="py-3 pr-4 whitespace-nowrap text-slate-600">
                            {new Date(tx.createdAt).toLocaleString()}
                          </td>
                          <td className="py-3 pr-4">
                            {tx.status === "success" ? (
                              <div className="flex flex-wrap gap-x-3 gap-y-1">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      await downloadTransactionReceipt(tx.id);
                                    } catch (err: unknown) {
                                      setError(err instanceof Error ? err.message : "Download failed");
                                    }
                                  }}
                                  className="text-sm font-semibold text-ocean-600 hover:text-ocean-700"
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
                                  className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                                >
                                  HTML invoice
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
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
