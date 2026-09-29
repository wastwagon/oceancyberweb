"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { CreditCard, CheckCircle2, AlertCircle, Clock, ArrowRight, Wallet } from "lucide-react";
import {
  checkBrowserSession,
  createRenewal,
  getPaymentStatus,
  initializeProductCheckout,
} from "@/lib/auth-client";
import { fadeUpProps } from "@/lib/scroll-reveal";

const PLAN_LABELS: Record<string, string> = {
  "hosting-basic-monthly": "Hosting Basic",
  "hosting-launch-monthly": "Hosting Launch",
  "hosting-grow-monthly": "Hosting Grow",
  "hosting-scale-monthly": "Hosting Scale",
  "hosting-launch-yearly": "Hosting Launch (Annual)",
  "hosting-grow-yearly": "Hosting Grow (Annual)",
  "hosting-scale-yearly": "Hosting Scale (Annual)",
  "domain-standard-yearly": "Domain Renewal",
};

/** Indicative prices (GHS) — same order of magnitude as server `planPresets` */
const PLAN_PRICES: Record<string, { amount: string; every: "month" | "year" }> = {
  "hosting-basic-monthly": { amount: "99.00", every: "month" },
  "hosting-launch-monthly": { amount: "79.00", every: "month" },
  "hosting-grow-monthly": { amount: "149.00", every: "month" },
  "hosting-scale-monthly": { amount: "329.00", every: "month" },
  "hosting-launch-yearly": { amount: "708.00", every: "year" },
  "hosting-grow-yearly": { amount: "1272.00", every: "year" },
  "hosting-scale-yearly": { amount: "2388.00", every: "year" },
  "domain-standard-yearly": { amount: "120.00", every: "year" },
};

function RenewalCheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [payBusy, setPayBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payState, setPayState] = useState<"idle" | "verifying" | "paid" | "stale" | "failed">("idle");
  const [hasSession, setHasSession] = useState(false);

  const planCode = (params.get("plan") || "").trim();
  const externalRef = (params.get("ref") || "").trim();
  const label = (params.get("label") || "").trim();
  const paystackRef = (params.get("reference") || params.get("trxref") || "").trim();

  const knownPlan = Boolean(PLAN_LABELS[planCode]);
  const displayLabel = label || PLAN_LABELS[planCode] || "Selected product";
  const price = PLAN_PRICES[planCode];

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const ok = await checkBrowserSession();
      if (!cancelled) setHasSession(ok);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const nextTarget = useMemo(() => {
    const q = new URLSearchParams();
    if (planCode) q.set("plan", planCode);
    if (externalRef) q.set("ref", externalRef);
    if (label) q.set("label", label);
    return `/checkout/renewal${q.toString() ? `?${q.toString()}` : ""}`;
  }, [planCode, externalRef, label]);

  useEffect(() => {
    if (!hasSession || !paystackRef) return;

    setPayState("verifying");
    let attempts = 0;
    const maxAttempts = 36;
    const id = setInterval(async () => {
      attempts += 1;
      if (attempts > maxAttempts) {
        setPayState("stale");
        clearInterval(id);
        return;
      }
      try {
        const s = await getPaymentStatus(paystackRef);
        if (s.found && s.status === "success") {
          setPayState("paid");
          clearInterval(id);
        }
        if (s.found && s.status === "failed") {
          setPayState("failed");
          clearInterval(id);
        }
      } catch {
        /* still pending or API warming up */
      }
    }, 2500);

    return () => clearInterval(id);
  }, [hasSession, paystackRef]);

  async function onAddSubscriptionOnly() {
    if (!knownPlan) {
      setError("Invalid checkout plan code.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await createRenewal(planCode, true, externalRef || undefined);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not create subscription");
    } finally {
      setBusy(false);
    }
  }

  async function onPayWithPaystack() {
    if (!knownPlan) {
      setError("Invalid checkout plan code.");
      return;
    }
    setPayBusy(true);
    setError(null);
    try {
      const res = await initializeProductCheckout(
        planCode,
        externalRef || undefined,
      );
      if (res.authorizationUrl) {
        window.location.assign(res.authorizationUrl);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not start payment");
    } finally {
      setPayBusy(false);
    }
  }

  return (
    <main className="sa-shell sa-mobile-tab-pad relative min-h-screen bg-sa-bg text-sa-muted">
      <div className="sa-container relative z-10 flex items-start justify-center pb-6 pt-24 md:min-h-[calc(100vh-80px)] md:items-center md:py-20">
        <motion.div {...fadeUpProps} className="sa-card w-full max-w-xl p-5 md:p-12">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary md:mb-8">
            <CreditCard className="h-6 w-6" />
          </div>
          <span className="sa-eyebrow mb-4">Checkout</span>
          <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Confirm your <span className="text-sa-primary">subscription</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">
            Pay now with Paystack, or add the plan to your dashboard and pay from your wallet later.
          </p>

          {/* Status Alerts */}
          <div className="mt-6 space-y-4">
            {payState === "verifying" && (
              <div className="flex gap-3 rounded-xl border border-sa-primary/20 bg-sa-primary/5 p-4 text-sm text-sa-primary">
                <Clock className="h-5 w-5 shrink-0" />
                <p>Verifying payment with Paystack. This usually takes a few seconds.</p>
              </div>
            )}
            {payState === "paid" && (
              <div className="flex flex-col gap-4 rounded-xl border border-sa-primary/20 bg-sa-primary/10 p-5 text-sm text-sa-primary">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p>Payment received. Your subscription is active and ready for use.</p>
                </div>
                <Link
                  href="/dashboard"
                  className="sa-btn-primary w-full"
                >
                  Go to dashboard
                </Link>
              </div>
            )}
            {payState === "stale" && (
              <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-500">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>
                  We couldn&apos;t confirm the payment in time. Check your email or visit your{" "}
                  <Link href="/dashboard" className="font-bold underline underline-offset-4">dashboard</Link>
                  {" "}to see if the status updated.
                </p>
              </div>
            )}
            {payState === "failed" && (
              <div className="flex gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-500">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>Payment was not successful. Please try again or use your wallet balance.</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="mt-6 space-y-4 rounded-2xl border border-sa-border bg-sa-bg/50 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-sa-muted/50">Product</span>
              <span className="font-bold text-white">{displayLabel}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-sa-muted/70">Plan code</span>
              <span className="font-mono text-white/80">{planCode || "—"}</span>
            </div>
            {price && (
              <div className="flex justify-between items-end border-t border-sa-border pt-4 mt-4">
                <span className="text-sm text-sa-muted/70">Amount due</span>
                <span className="text-xl font-bold text-sa-primary">
                  ₵{price.amount} <span className="text-xs text-sa-muted/50">/ {price.every}</span>
                </span>
              </div>
            )}
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-sa-muted/70">Reference</span>
              <span className="font-mono text-sa-muted/60">{externalRef || "—"}</span>
            </div>
          </div>

          {!hasSession ? (
            <div className="mt-6 p-5 rounded-2xl border border-sa-primary/20 bg-sa-primary/5 text-center">
              <p className="text-base font-semibold text-white">Sign in to pay</p>
              <p className="mt-2 text-sm text-sa-muted/80">Sign in to complete this purchase.</p>
              <div className="mt-4 flex flex-col items-stretch gap-1">
                <Link
                  href={`/signin?next=${encodeURIComponent(nextTarget)}`}
                  className="sa-btn-primary w-full"
                >
                  Sign in
                </Link>
                <Link
                  href={`/signup?next=${encodeURIComponent(nextTarget)}`}
                  className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </div>
          ) : payState === "verifying" || payState === "paid" ? null : (
            <div className="mt-10 space-y-3">
              <button
                type="button"
                onClick={onPayWithPaystack}
                disabled={payBusy || !knownPlan}
                className="sa-btn-primary w-full"
              >
                {payBusy ? "Redirecting..." : "Pay with Paystack"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <div className="mt-3 flex flex-col items-start gap-1">
                <button
                  type="button"
                  onClick={onAddSubscriptionOnly}
                  disabled={busy || !knownPlan}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-white underline-offset-4 hover:text-sa-primary hover:underline disabled:opacity-50"
                >
                  {busy ? "Working…" : "Add to dashboard"}
                </button>
                <Link
                  href="/dashboard/wallet"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-muted underline-offset-4 hover:text-sa-primary hover:underline"
                >
                  <Wallet className="h-4 w-4" aria-hidden />
                  Top up wallet
                </Link>
              </div>
            </div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-sm font-medium text-rose-400"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    </main>
  );
}

export default function RenewalCheckoutPage() {
  return (
    <Suspense fallback={
      <main className="sa-shell bg-sa-bg flex items-center justify-center min-h-screen">
        <div className="text-sm font-medium text-sa-muted">
          Loading checkout…
        </div>
      </main>
    }>
      <RenewalCheckoutContent />
    </Suspense>
  );
}
