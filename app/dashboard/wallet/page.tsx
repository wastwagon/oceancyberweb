"use client";

import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getBillingDashboard, initializeWalletTopup } from "@/lib/auth-client";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { PaystackReturnBanner } from "@/components/payments/PaystackReturnBanner";
import { usePaystackReturn } from "@/hooks/usePaystackReturn";
import { AppAlert } from "@/components/ui/AppAlert";
import { Loader2, RefreshCcw, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000] as const;

function WalletTopupContent() {
  const params = useSearchParams();
  const paystackRef = (params.get("reference") || params.get("trxref") || "").trim();

  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceLabel, setBalanceLabel] = useState("₵0.00");
  const [error, setError] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    setBalanceLoading(true);
    try {
      const dashboard = await getBillingDashboard();
      setBalanceLabel(`₵${dashboard.wallet.balanceDisplay.toFixed(2)}`);
    } catch {
      /* balance card stays at last known value */
    } finally {
      setBalanceLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBalance();
  }, [loadBalance]);

  const payState = usePaystackReturn(paystackRef, {
    onPaid: () => {
      void loadBalance();
    },
  });

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
    <div className="sa-container max-w-3xl space-y-6 py-8 md:py-12">
      <header className="sa-card border-sa-border p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="sa-eyebrow inline-flex">Dashboard</p>
            <h1 className="sa-title !text-left mt-3 text-2xl md:text-3xl">Top up wallet</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-sa-muted/80">
              Add funds in cedis using Paystack. Renewals and milestone invoices can then draw from wallet balance.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadBalance()}
            disabled={balanceLoading}
            className="rounded-full border border-sa-border bg-sa-surface/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:text-white disabled:opacity-50"
          >
            <RefreshCcw size={12} className={cn("mr-1.5 inline", balanceLoading && "animate-spin")} />
            Refresh
          </button>
        </div>
        <DashboardNav className="mt-8" />
      </header>

      <div className="sa-card flex items-center gap-4 border-sa-border p-6 md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sa-primary/10 text-sa-primary">
          <Wallet size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sa-muted/60">Current balance</p>
          <p className="mt-1 font-heading text-3xl font-bold text-white">
            {balanceLoading ? "…" : balanceLabel}
          </p>
        </div>
      </div>

      <PaystackReturnBanner
        state={payState}
        successTitle="Wallet top-up confirmed"
        successMessage="Your wallet balance will update shortly. You can return to the dashboard to manage renewals."
        backHref="/dashboard"
        backLabel="Back to dashboard"
      />

      <div className="sa-card border-sa-border p-6 md:p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
              Amount (₵)
            </label>
            <input
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value || 0))}
              className="w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-colors focus:border-sa-primary focus:outline-none"
              required
              disabled={payState === "verifying"}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  disabled={payState === "verifying"}
                  onClick={() => setAmount(value)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition",
                    amount === value
                      ? "border-sa-primary bg-sa-primary text-black"
                      : "border-sa-border bg-sa-surface text-sa-muted hover:text-white",
                  )}
                >
                  ₵{value}
                </button>
              ))}
            </div>
          </div>

          {error ? <AppAlert variant="error">{error}</AppAlert> : null}

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              disabled={loading || payState === "verifying" || amount < 1}
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
  );
}

export default function WalletTopupPage() {
  return (
    <main className="min-h-screen pb-16">
      <Suspense
        fallback={
          <div className="sa-container flex min-h-[40vh] items-center justify-center py-12 text-sm text-sa-muted">
            Loading wallet...
          </div>
        }
      >
        <WalletTopupContent />
      </Suspense>
    </main>
  );
}
