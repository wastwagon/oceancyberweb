"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  createRenewal,
  getAccessToken,
  getPaymentStatus,
  initializeProductCheckout,
} from "@/lib/auth-client";

const PLAN_LABELS: Record<string, string> = {
  "hosting-basic-monthly": "Hosting Basic",
  "hosting-launch-monthly": "Hosting Launch",
  "hosting-grow-monthly": "Hosting Grow",
  "hosting-scale-monthly": "Hosting Scale",
  "domain-standard-yearly": "Domain Renewal",
};

/** Indicative prices (GHS) — same order of magnitude as server `planPresets` */
const PLAN_PRICES: Record<string, { amount: string; every: "month" | "year" }> = {
  "hosting-basic-monthly": { amount: "99.00", every: "month" },
  "hosting-launch-monthly": { amount: "79.00", every: "month" },
  "hosting-grow-monthly": { amount: "149.00", every: "month" },
  "hosting-scale-monthly": { amount: "329.00", every: "month" },
  "domain-standard-yearly": { amount: "120.00", every: "year" },
};

function RenewalCheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [payBusy, setPayBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payState, setPayState] = useState<"idle" | "verifying" | "paid" | "stale" | "failed">("idle");
  const token = getAccessToken();

  const planCode = (params.get("plan") || "").trim();
  const externalRef = (params.get("ref") || "").trim();
  const label = (params.get("label") || "").trim();
  const paystackRef = (params.get("reference") || params.get("trxref") || "").trim();

  const knownPlan = Boolean(PLAN_LABELS[planCode]);
  const displayLabel = label || PLAN_LABELS[planCode] || "Selected product";
  const price = PLAN_PRICES[planCode];

  const nextTarget = useMemo(() => {
    const q = new URLSearchParams();
    if (planCode) q.set("plan", planCode);
    if (externalRef) q.set("ref", externalRef);
    if (label) q.set("label", label);
    return `/checkout/renewal${q.toString() ? `?${q.toString()}` : ""}`;
  }, [planCode, externalRef, label]);

  useEffect(() => {
    if (!token || !paystackRef) return;

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
  }, [token, paystackRef]);

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
    <main className="bg-slate-50 px-4 py-14 md:py-20">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Checkout</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
          Confirm your subscription
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Pay the first term with <strong>Paystack</strong> (card / mobile money where enabled), or add the
          plan to your dashboard and pay from your <strong>wallet</strong> later.
        </p>

        {payState === "verifying" ? (
          <p className="mt-4 rounded-xl border border-ocean-200 bg-ocean-50 px-4 py-3 text-sm text-ocean-900">
            Verifying payment with Paystack… this usually takes a few seconds. Your subscription will appear on
            the dashboard when the webhook completes.
          </p>
        ) : null}
        {payState === "paid" ? (
          <div className="mt-4 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p>Payment received. Your subscription is active (or the webhook is finishing).</p>
            <Link
              href="/dashboard"
              className="inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
            >
              Open dashboard
            </Link>
          </div>
        ) : null}
        {payState === "stale" ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            We could not confirm the payment in time. Check your email from Paystack, then open your{" "}
            <Link href="/dashboard" className="font-semibold underline">
              dashboard
            </Link>{" "}
            or{" "}
            <Link href="/dashboard/statements" className="font-semibold underline">
              statements
            </Link>{" "}
            — the subscription appears once the webhook has processed.
          </p>
        ) : null}
        {payState === "failed" ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            This payment was not successful. You can try Paystack again or add the plan and pay from your
            wallet.
          </p>
        ) : null}

        <div className="mt-6 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p>
            <span className="font-semibold text-slate-900">Product:</span>{" "}
            <span className="text-slate-700">{displayLabel}</span>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Plan code:</span>{" "}
            <span className="font-mono text-slate-700">{planCode || "—"}</span>
          </p>
          {price ? (
            <p>
              <span className="font-semibold text-slate-900">Amount (Paystack):</span>{" "}
              <span className="text-slate-800">
                ₵{price.amount} / {price.every}
              </span>
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-slate-900">Reference:</span>{" "}
            <span className="font-mono text-slate-700">{externalRef || "—"}</span>
          </p>
        </div>

        {!token ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">Sign in or create an account to continue checkout.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/signin?next=${encodeURIComponent(nextTarget)}`}
                className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-bold text-white hover:bg-ocean-700"
              >
                Sign in
              </Link>
              <Link
                href={`/signup?next=${encodeURIComponent(nextTarget)}`}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                Create account
              </Link>
            </div>
          </div>
        ) : payState === "verifying" || payState === "paid" ? null : (
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={onPayWithPaystack}
              disabled={payBusy || !knownPlan}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ocean-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-ocean-700 disabled:opacity-50"
            >
              {payBusy ? "Redirecting to Paystack…" : "Pay with Paystack"}
            </button>
            <button
              type="button"
              onClick={onAddSubscriptionOnly}
              disabled={busy || !knownPlan}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400 disabled:opacity-50"
            >
              {busy ? "Working…" : "Add to dashboard (wallet later)"}
            </button>
            <Link
              href="/dashboard/wallet"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Top up wallet
            </Link>
          </div>
        )}

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}
      </div>
    </main>
  );
}

export default function RenewalCheckoutPage() {
  return (
    <Suspense fallback={<main className="bg-slate-50 px-4 py-14 text-slate-600">Loading checkout…</main>}>
      <RenewalCheckoutContent />
    </Suspense>
  );
}
