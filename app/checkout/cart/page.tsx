"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { FxPrice } from "@/components/currency/FxPrice";
import { useCart } from "@/components/commerce/CartProvider";
import { getApiBaseUrl } from "@/lib/api-config";


function intervalLabel(interval: "month" | "year") {
  return interval === "month" ? "/mo" : "/yr";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCountryCode(country: string) {
  return /^[A-Z]{2}$/.test(country.trim().toUpperCase());
}

function isValidPostalCode(postalCode: string) {
  return /^[a-zA-Z0-9\-\s]{2,20}$/.test(postalCode.trim());
}

function isValidPhone(phone: string) {
  return /^\+[0-9().\-\s]{7,20}$/.test(phone.trim());
}

export default function CheckoutCartPage() {
  const { items, removeItem, toggleAddon, clearCart, totalGhs } = useCart();
  const [domainContact, setDomainContact] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "GH",
    phone: "",
    emailAddress: "",
    organizationName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkoutRef, setCheckoutRef] = useState<string | null>(null);
  const [submitResults, setSubmitResults] = useState<
    Array<{
      kind: string;
      label: string;
      status: string;
      message?: string;
      orderId?: string;
      certificateId?: string;
    }>
  >([]);

  const cartWithTotals = useMemo(
    () =>
      items.map((item) => {
        const addOnsTotal = item.addons
          .filter((a) => a.selected || a.required)
          .reduce((sum, a) => sum + a.priceGhs, 0);
        return {
          ...item,
          addOnsTotal,
          total: item.priceGhs + addOnsTotal,
        };
      }),
    [items],
  );

  const hasDomainItems = items.some((item) => item.kind === "domain");

  function onDomainContactChange(
    key: keyof typeof domainContact,
    value: string,
  ) {
    setDomainContact((prev) => ({ ...prev, [key]: value }));
  }

  function validateDomainContact(): string | null {
    if (
      !domainContact.firstName.trim() ||
      !domainContact.lastName.trim() ||
      !domainContact.address1.trim() ||
      !domainContact.city.trim() ||
      !domainContact.stateProvince.trim() ||
      !domainContact.postalCode.trim() ||
      !domainContact.country.trim() ||
      !domainContact.phone.trim() ||
      !domainContact.emailAddress.trim()
    ) {
      return "Please complete all registrant contact fields for domain checkout.";
    }
    if (!isValidEmail(domainContact.emailAddress)) {
      return "Use a valid registrant email address.";
    }
    if (!isValidCountryCode(domainContact.country)) {
      return "Country must be a 2-letter code (for example, GH).";
    }
    if (!isValidPostalCode(domainContact.postalCode)) {
      return "Postal code may only contain letters, numbers, spaces, and hyphens.";
    }
    if (!isValidPhone(domainContact.phone)) {
      return "Phone must start with + and include country code (for example, +233201234567).";
    }
    return null;
  }

  async function checkoutAllNow() {
    if (items.length === 0) return;
    if (hasDomainItems) {
      const validationError = validateDomainContact();
      if (validationError) {
        setSubmitError(validationError);
        return;
      }
    }
    setSubmitting(true);
    setSubmitError(null);
    setCheckoutRef(null);
    setSubmitResults([]);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/v1/domains/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            kind: item.kind,
            label: item.label,
            planCode: item.planCode,
            reference: item.reference,
            addons: item.addons.map((a) => ({
              id: a.id,
              label: a.label,
              selected: a.selected,
              required: a.required,
            })),
          })),
          domainContact: hasDomainItems
            ? {
                firstName: domainContact.firstName.trim(),
                lastName: domainContact.lastName.trim(),
                address1: domainContact.address1.trim(),
                city: domainContact.city.trim(),
                stateProvince: domainContact.stateProvince.trim(),
                postalCode: domainContact.postalCode.trim(),
                country: domainContact.country.trim().toUpperCase(),
                phone: domainContact.phone.trim(),
                emailAddress: domainContact.emailAddress.trim(),
                organizationName:
                  domainContact.organizationName.trim() || undefined,
              }
            : undefined,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        checkoutRef?: string;
        results?: Array<{
          kind: string;
          label: string;
          status: string;
          message?: string;
          orderId?: string;
          certificateId?: string;
        }>;
      };
      if (!res.ok) {
        setSubmitError(data.error || "Unified checkout failed.");
        return;
      }
      setCheckoutRef(data.checkoutRef || null);
      setSubmitResults(data.results ?? []);
    } catch {
      setSubmitError("Network error while running unified checkout.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-slate-50 px-4 py-14 md:py-20">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">
              Cart
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Domain, hosting and SSL checkout cart
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Namecheap-style flow: choose products, add-ons, then continue to secure checkout.
            </p>
          </div>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {cartWithTotals.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-700">Your cart is empty.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/domains"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ocean-600 px-4 text-sm font-bold text-white hover:bg-ocean-700"
              >
                Search domain
              </Link>
              <Link
                href="/hosting"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                Browse hosting
              </Link>
            </div>
          </div>
        ) : (
          <>
            {hasDomainItems ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Domain registrant contact
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Required by Namecheap for domain registration.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    value={domainContact.firstName}
                    onChange={(e) =>
                      onDomainContactChange("firstName", e.target.value)
                    }
                    placeholder="First name"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.lastName}
                    onChange={(e) =>
                      onDomainContactChange("lastName", e.target.value)
                    }
                    placeholder="Last name"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.emailAddress}
                    onChange={(e) =>
                      onDomainContactChange("emailAddress", e.target.value)
                    }
                    placeholder="Email"
                    type="email"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.phone}
                    onChange={(e) => onDomainContactChange("phone", e.target.value)}
                    placeholder="Phone (+233.xxx...)"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.organizationName}
                    onChange={(e) =>
                      onDomainContactChange("organizationName", e.target.value)
                    }
                    placeholder="Organization (optional)"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                  />
                  <input
                    value={domainContact.address1}
                    onChange={(e) =>
                      onDomainContactChange("address1", e.target.value)
                    }
                    placeholder="Address line 1"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                  />
                  <input
                    value={domainContact.city}
                    onChange={(e) => onDomainContactChange("city", e.target.value)}
                    placeholder="City"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.stateProvince}
                    onChange={(e) =>
                      onDomainContactChange("stateProvince", e.target.value)
                    }
                    placeholder="State / Province"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.postalCode}
                    onChange={(e) =>
                      onDomainContactChange("postalCode", e.target.value)
                    }
                    placeholder="Postal code"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={domainContact.country}
                    onChange={(e) =>
                      onDomainContactChange("country", e.target.value.toUpperCase())
                    }
                    placeholder="Country code (e.g. GH)"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    maxLength={2}
                  />
                </div>
              </div>
            ) : null}

            <ul className="space-y-4">
              {cartWithTotals.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {item.kind}
                      </p>
                      <h2 className="text-lg font-bold text-slate-900">{item.label}</h2>
                      <p className="text-xs text-slate-500">
                        Plan: <span className="font-mono">{item.planCode}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[1fr,auto] md:items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Add-ons
                      </p>
                      <div className="mt-2 space-y-2">
                        {item.addons.length === 0 ? (
                          <p className="text-sm text-slate-500">No optional add-ons.</p>
                        ) : (
                          item.addons.map((addon) => (
                            <label
                              key={addon.id}
                              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                            >
                              <span className="text-sm text-slate-700">{addon.label}</span>
                              <span className="flex items-center gap-3">
                                <FxPrice
                                  amountGhs={addon.priceGhs}
                                  suffix={item.interval === "year" ? "/yr" : ""}
                                  className="text-sm font-semibold text-slate-800"
                                />
                                <input
                                  type="checkbox"
                                  checked={addon.selected || addon.required}
                                  disabled={addon.required}
                                  onChange={(e) =>
                                    toggleAddon(item.id, addon.id, e.target.checked)
                                  }
                                />
                              </span>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                      <p>
                        Base:{" "}
                        <FxPrice
                          amountGhs={item.priceGhs}
                          suffix={intervalLabel(item.interval)}
                          className="font-semibold text-slate-900"
                        />
                      </p>
                      <p className="mt-1">
                        Add-ons:{" "}
                        <FxPrice
                          amountGhs={item.addOnsTotal}
                          className="font-semibold text-slate-900"
                        />
                      </p>
                      <p className="mt-2 border-t border-slate-200 pt-2 font-semibold text-slate-900">
                        Total:{" "}
                        <FxPrice
                          amountGhs={item.total}
                          suffix={intervalLabel(item.interval)}
                          className="font-bold text-ocean-700"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/checkout/renewal?plan=${encodeURIComponent(
                        item.planCode,
                      )}&label=${encodeURIComponent(item.label)}&ref=${encodeURIComponent(
                        item.reference,
                      )}`}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ocean-600 px-4 text-sm font-bold text-white hover:bg-ocean-700"
                    >
                      Continue checkout
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">Cart estimated total</p>
                <FxPrice
                  amountGhs={totalGhs}
                  className="text-xl font-bold text-ocean-700"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Final totals and applicable fees are confirmed at payment step.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={checkoutAllNow}
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ocean-600 px-4 text-sm font-bold text-white hover:bg-ocean-700 disabled:opacity-60"
                >
                  {submitting ? "Processing unified checkout..." : "Checkout all now"}
                </button>
                <p className="text-xs text-slate-500">
                  Runs Namecheap API for domain/SSL and keeps hosting on local checkout.
                </p>
              </div>
            </div>

            {submitError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            ) : null}

            {submitResults.length > 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Unified checkout results
                </h3>
                {checkoutRef ? (
                  <p className="mt-1 text-xs text-slate-500">
                    Reference: <span className="font-mono">{checkoutRef}</span>
                  </p>
                ) : null}
                <ul className="mt-3 space-y-2">
                  {submitResults.map((row, i) => (
                    <li
                      key={`${row.kind}-${row.label}-${i}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                    >
                      <p className="font-semibold text-slate-900">
                        {row.label} <span className="text-slate-500">({row.kind})</span>
                      </p>
                      <p className="text-slate-700">Status: {row.status}</p>
                      {row.orderId ? (
                        <p className="text-xs text-slate-500">Order ID: {row.orderId}</p>
                      ) : null}
                      {row.certificateId ? (
                        <p className="text-xs text-slate-500">
                          Certificate ID: {row.certificateId}
                        </p>
                      ) : null}
                      {row.message ? <p className="text-xs text-amber-700">{row.message}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
