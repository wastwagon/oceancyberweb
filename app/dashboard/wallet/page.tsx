"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { initializeWalletTopup } from "@/lib/auth-client";

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
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <header className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Top up wallet</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add funds in cedis using Paystack. Renewals and milestone invoices can then draw from wallet balance.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Amount (₵)</label>
              <input
                type="number"
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-ocean-500 focus:ring-2"
                required
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-5 py-3 font-bold text-white hover:brightness-110 disabled:opacity-60"
              >
                {loading ? "Initializing..." : "Continue to Paystack"}
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:border-slate-400"
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

