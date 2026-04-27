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
    <main className="bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Top up wallet</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add funds in cedis using Paystack. Renewals can then draw from wallet balance.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
              className="inline-flex items-center justify-center rounded-xl bg-ocean-600 px-5 py-3 font-bold text-white hover:bg-ocean-700 disabled:opacity-60"
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
    </main>
  );
}

