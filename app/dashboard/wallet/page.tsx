"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { initializeWalletTopup } from "@/lib/auth-client";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Loader2 } from "lucide-react";

export default function WalletTopupPage() {
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await initializeWalletTopup(amount);
      window.location.href = data.authorizationUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not initialize Paystack");
      setLoading(false);
    }
  }

  return (
    <main className="sa-shell min-h-screen bg-sa-bg pt-28 pb-16 md:py-36">
      <div className="sa-container max-w-3xl space-y-6">
        <header className="sa-card p-6 border-sa-border md:p-8">
          <p className="sa-eyebrow inline-flex">Dashboard</p>
          <h1 className="sa-title !text-left mt-3 text-2xl md:text-3xl">Top up wallet</h1>
          <p className="mt-3 text-sm leading-relaxed text-sa-muted/80 max-w-xl">
            Add funds in cedis using Paystack. Renewals and milestone invoices can then draw from wallet balance.
          </p>
          <DashboardNav className="mt-8" />
        </header>

        <div className="sa-card p-6 border-sa-border md:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">Amount (₵)</label>
              <input
                type="number"
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
                className="w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white focus:border-sa-primary focus:outline-none transition-colors"
                required
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="sa-btn-primary min-h-[48px] px-8 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  "Continue to Paystack"
                )}
              </button>
              <Link
                href="/dashboard"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-sa-border bg-sa-surface px-6 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary hover:text-white"
              >
                Back to dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
