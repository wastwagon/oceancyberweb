"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/components/commerce/CartProvider";
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
  const { addItem } = useCart();
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
      className={cn("sa-section relative z-10", className)}
    >
      <div className="sa-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="sa-title">
            cPanel hosting packages
          </h2>
          <p className="sa-subtitle mx-auto mt-4">
            Straightforward tiers you can compare with global hosts. We provision
            accounts on our{" "}
            <strong className="text-white">Namecheap-linked reseller</strong>{" "}
            stack and use <strong className="text-white">WHM</strong> to issue
            secure, isolated cPanel logins. Amounts are quoted in{" "}
            <strong className="text-white">Ghana cedis</strong>. Checkout runs in{" "}
            <strong className="text-white">GHS via Paystack</strong>.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-sa-border bg-sa-surface p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              aria-pressed={billingCycle === "monthly"}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                billingCycle === "monthly"
                  ? "bg-sa-primary text-sa-bg"
                  : "text-sa-muted hover:text-white",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              aria-pressed={billingCycle === "annual"}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                billingCycle === "annual"
                  ? "bg-sa-primary text-sa-bg"
                  : "text-sa-muted hover:text-white",
              )}
            >
              Annual
              <span className={cn(
                "ml-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter",
                billingCycle === "annual" ? "bg-black/20 text-sa-bg" : "bg-sa-primary/20 text-sa-primary"
              )}>
                -{maxAnnualDiscount}%
              </span>
            </button>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {billingCycle === "annual" ? (
            <li className="lg:col-span-3">
              <p className="rounded-xl border border-sa-primary/20 bg-sa-primary/5 px-4 py-2 text-center text-sm font-medium text-sa-primary">
                Annual billing is recommended for better value and lower effective monthly cost.
              </p>
            </li>
          ) : null}
          {pricing.map(({ pkg, annualMonthlyEquivalent, annualBilledTotal }) => (
            <li
              key={pkg.id}
              className={cn(
                "sa-card relative flex flex-col p-7 md:p-8",
                pkg.popular && "border-sa-primary ring-1 ring-sa-primary/30 shadow-xl shadow-sa-primary/5"
              )}
            >
              {pkg.popular ? (
                <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sa-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-sa-bg">
                  Most popular
                </p>
              ) : null}
              <div className="mb-4">
                <h3 className="font-heading text-xl font-bold text-white md:text-2xl">{pkg.name}</h3>
                <p className="mt-2 text-sm text-sa-muted/80">{pkg.tagline}</p>
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
                  className="font-heading text-3xl font-bold tracking-tight text-sa-primary md:text-4xl"
                />
                {billingCycle === "annual" ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-sa-muted">
                      Billed yearly at{" "}
                      <span className="font-semibold text-white">
                        GHS {annualBilledTotal.toLocaleString("en-GH")}
                      </span>
                      .
                    </p>
                    <p className="text-xs font-medium text-sa-primary">
                      Save {pkg.annualDiscountPct}% vs monthly (
                      <span className="line-through decoration-sa-muted/40">
                        GHS {(pkg.priceMonthlyGhs * 12).toLocaleString("en-GH")}
                      </span>
                      ).
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-sa-muted">{pkg.billingNote}</p>
                )}
              </div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-sa-muted/50">
                Includes
              </p>
              <ul className="mb-8 flex-1 space-y-3.5 text-sm text-sa-muted/90">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary"
                      aria-hidden
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-sa-border pt-6">
                <p className="mb-6 text-xs text-sa-muted/70">
                  <span className="font-bold text-white">Best for:</span>{" "}
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
                    "sa-btn-primary min-h-[48px] w-full",
                    !pkg.popular && "bg-transparent border border-sa-border hover:border-sa-primary text-white hover:text-sa-primary"
                  )}
                >
                  Start {billingCycle === "annual" ? "annual" : "monthly"} checkout
                </Link>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        id: `hosting-${pkg.id}-${billingCycle}-${Date.now()}`,
                        kind: "hosting",
                        label: `${pkg.name} (${billingCycle === "annual" ? "Annual" : "Monthly"})`,
                        planCode: planCheckoutCodeByCycle(pkg, billingCycle),
                        priceGhs:
                          billingCycle === "monthly"
                            ? pkg.priceMonthlyGhs
                            : annualMonthlyEquivalent * 12,
                        interval: billingCycle === "monthly" ? "month" : "year",
                        reference: `HOST-${pkg.id.toUpperCase()}-${billingCycle.toUpperCase()}`,
                        addons: [
                          {
                            id: "ssl-basic",
                            label: "PositiveSSL (1 domain)",
                            priceGhs: 45,
                            selected: false,
                          },
                          {
                            id: "daily-backup-plus",
                            label: "Backup Plus",
                            priceGhs: 30,
                            selected: false,
                          },
                        ],
                      })
                    }
                    className="flex min-h-[40px] items-center justify-center rounded-xl border border-sa-border px-4 text-[10px] font-bold uppercase tracking-wider text-sa-muted transition hover:border-sa-primary hover:text-white"
                  >
                    Add to cart
                  </button>
                  <Link
                    href="/checkout/cart"
                    className="flex min-h-[40px] items-center justify-center rounded-xl border border-sa-border px-4 text-[10px] font-bold uppercase tracking-wider text-sa-muted transition hover:border-sa-primary hover:text-white"
                  >
                    View cart
                  </Link>
                </div>
                <Link
                  href={planContactHref(pkg)}
                  className="mt-4 flex min-h-[32px] items-center justify-center text-[10px] font-bold uppercase tracking-widest text-sa-muted/50 transition hover:text-sa-primary"
                >
                  Talk to our team
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
