"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { FxPrice } from "@/components/currency/FxPrice";
import { cn } from "@/lib/utils";
import { HOSTING_PACKAGES, type HostingPackage } from "@/lib/hosting-packages";

function planContactHref(pkg: HostingPackage) {
  const q = new URLSearchParams({
    topic: `cPanel hosting — ${pkg.name} (${pkg.id})`,
  });
  return `/contact?${q.toString()}`;
}

function planCheckoutCodeByCycle(
  pkg: HostingPackage,
  billingCycle: "monthly" | "annual",
) {
  if (pkg.id === "launch") {
    return billingCycle === "annual"
      ? "hosting-launch-yearly"
      : "hosting-launch-monthly";
  }
  if (pkg.id === "grow") {
    return billingCycle === "annual"
      ? "hosting-grow-yearly"
      : "hosting-grow-monthly";
  }
  return billingCycle === "annual"
    ? "hosting-scale-yearly"
    : "hosting-scale-monthly";
}

export function HostingPackagesSection({
  className,
  id,
  initialBillingCycle = "monthly",
}: {
  className?: string;
  id?: string;
  initialBillingCycle?: "monthly" | "annual";
}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    initialBillingCycle,
  );

  const pricing = useMemo(
    () =>
      HOSTING_PACKAGES.map((pkg) => {
        const annualMonthlyEquivalent = Math.round(
          pkg.priceMonthlyGhs * (1 - pkg.annualDiscountPct / 100),
        );
        const annualBilledTotal = annualMonthlyEquivalent * 12;
        return { pkg, annualMonthlyEquivalent, annualBilledTotal };
      }),
    [],
  );
  const maxAnnualDiscount = useMemo(
    () =>
      HOSTING_PACKAGES.reduce(
        (max, pkg) => Math.max(max, pkg.annualDiscountPct),
        0,
      ),
    [],
  );

  return (
    <section
      id={id}
      className={cn("container mx-auto max-w-6xl px-4 py-16 md:px-6", className)}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          cPanel hosting packages
        </h2>
        <p className="mt-3 text-slate-600">
          Straightforward tiers you can compare with global hosts. We provision
          accounts on our{" "}
          <strong className="text-slate-800">Namecheap-linked reseller</strong>{" "}
          stack and use <strong className="text-slate-800">WHM</strong> to issue
          secure, isolated cPanel logins. Amounts are quoted in{" "}
          <strong className="text-slate-800">Ghana cedis</strong>; other
          currencies are indicative. Checkout runs in{" "}
          <strong className="text-slate-800">GHS via Paystack</strong>.
        </p>

        <div className="mt-6 inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            aria-pressed={billingCycle === "monthly"}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
              billingCycle === "monthly"
                ? "bg-ocean-600 text-white"
                : "text-slate-700 hover:bg-slate-50",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            aria-pressed={billingCycle === "annual"}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
              billingCycle === "annual"
                ? "bg-ocean-600 text-white"
                : "text-slate-700 hover:bg-slate-50",
            )}
          >
            Annual (save more)
            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
              Up to {maxAnnualDiscount}% off
            </span>
          </button>
        </div>
      </div>

      <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {billingCycle === "annual" ? (
          <li className="lg:col-span-3">
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-medium text-emerald-800">
              Annual billing is recommended for better value and lower effective monthly cost.
            </p>
          </li>
        ) : null}
        {pricing.map(({ pkg, annualMonthlyEquivalent, annualBilledTotal }) => (
          <li
            key={pkg.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md",
              pkg.popular
                ? "border-ocean-300 ring-2 ring-ocean-200/60 lg:scale-[1.02] lg:shadow-lg"
                : "border-slate-200",
            )}
          >
            {pkg.popular ? (
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ocean-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                Most popular
              </p>
            ) : null}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{pkg.tagline}</p>
            </div>
            <div className="mb-6">
              <FxPrice
                amountGhs={
                  billingCycle === "monthly"
                    ? pkg.priceMonthlyGhs
                    : annualMonthlyEquivalent
                }
                showFrom
                suffix="/mo"
                className="text-4xl font-extrabold tracking-tight text-slate-900 [&>span]:font-extrabold"
              />
              {billingCycle === "annual" ? (
                <div className="mt-1 space-y-1">
                  <p className="text-xs text-slate-500">
                    Billed yearly at{" "}
                    <span className="font-semibold text-slate-700">
                      GHS {annualBilledTotal.toLocaleString("en-GH")}
                    </span>
                    .
                  </p>
                  <p className="text-xs font-medium text-emerald-700">
                    Save {pkg.annualDiscountPct}% vs monthly (
                    <span className="line-through decoration-slate-400">
                      GHS {(pkg.priceMonthlyGhs * 12).toLocaleString("en-GH")}
                    </span>
                    ).
                  </p>
                </div>
              ) : (
                <p className="mt-1 text-xs text-slate-500">{pkg.billingNote}</p>
              )}
            </div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
              Includes
            </p>
            <ul className="mb-6 flex-1 space-y-2.5 text-sm text-slate-700">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="mb-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Best for:</span>{" "}
              {pkg.idealFor}
            </p>
            <Link
              href={`/checkout/renewal?plan=${encodeURIComponent(
                planCheckoutCodeByCycle(pkg, billingCycle),
              )}&label=${encodeURIComponent(
                `${pkg.name} (${billingCycle === "annual" ? "Annual" : "Monthly"})`,
              )}&ref=${encodeURIComponent(
                `HOST-${pkg.id.toUpperCase()}-${billingCycle === "annual" ? "YEARLY" : "MONTHLY"}`,
              )}`}
              className={cn(
                "mt-auto inline-flex min-h-[48px] w-full items-center justify-center rounded-xl px-4 text-sm font-bold transition",
                pkg.popular
                  ? "bg-ocean-600 text-white shadow-md hover:bg-ocean-700"
                  : "border border-slate-200 bg-slate-50 text-slate-900 hover:border-ocean-200 hover:bg-white",
              )}
            >
              Start {billingCycle === "annual" ? "annual" : "monthly"} checkout
            </Link>
            <Link
              href={planContactHref(pkg)}
              className="mt-2 inline-flex min-h-[40px] w-full items-center justify-center rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Talk to sales instead
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
