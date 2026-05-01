"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Trash2, ShoppingCart, User, CreditCard, ArrowRight, Check } from "lucide-react";
import { FxPrice } from "@/components/currency/FxPrice";
import { useCart } from "@/components/commerce/CartProvider";
import { getApiBaseUrl } from "@/lib/api-config";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

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
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      {/* Hero */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" aria-hidden />
                Secure Checkout
              </span>
              <h1 className="sa-title !text-left">
                Review your
                <span className="text-sa-primary"> digital cart</span>
              </h1>
              <p className="sa-subtitle mt-4 !text-left">
                Configure your domain, hosting, and security services before finalization.
              </p>
            </motion.div>
            {items.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                type="button"
                onClick={clearCart}
                className="mb-2 flex h-10 items-center justify-center rounded-xl border border-sa-border bg-sa-surface px-5 text-[10px] font-bold uppercase tracking-wider text-sa-muted transition hover:border-rose-500/50 hover:text-white"
              >
                Clear cart
              </motion.button>
            )}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          {cartWithTotals.length === 0 ? (
            <motion.div {...fadeUpProps} className="sa-card p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-sa-border bg-sa-surface text-sa-muted/40">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <p className="mt-6 text-sa-muted">Your cart is currently empty.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/domains"
                  className="sa-btn-primary"
                >
                  Search domain
                </Link>
                <Link
                  href="/hosting"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sa-border px-8 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:border-sa-primary hover:text-white"
                >
                  Browse hosting
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
              <div className="space-y-10">
                {/* Contact Form */}
                {hasDomainItems && (
                  <motion.div {...fadeUpProps} className="sa-card p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        Domain Registrant Contact
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-sa-muted/70">
                      Required by ICANN for domain registration. Use valid details.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {[
                        { label: "First name", key: "firstName" },
                        { label: "Last name", key: "lastName" },
                        { label: "Email address", key: "emailAddress", type: "email" },
                        { label: "Phone (+233...)", key: "phone" },
                        { label: "Organization (optional)", key: "organizationName", colSpan: "sm:col-span-2" },
                        { label: "Address line 1", key: "address1", colSpan: "sm:col-span-2" },
                        { label: "City", key: "city" },
                        { label: "State / Province", key: "stateProvince" },
                        { label: "Postal code", key: "postalCode" },
                        { label: "Country code (e.g. GH)", key: "country" },
                      ].map((field) => (
                        <div key={field.key} className={field.colSpan}>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">
                            {field.label}
                          </label>
                          <input
                            value={domainContact[field.key as keyof typeof domainContact]}
                            onChange={(e) =>
                              onDomainContactChange(field.key as keyof typeof domainContact, field.key === "country" ? e.target.value.toUpperCase() : e.target.value)
                            }
                            type={field.type || "text"}
                            maxLength={field.key === "country" ? 2 : undefined}
                            className="w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-2.5 text-sm text-white outline-none focus:border-sa-primary transition"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Cart Items */}
                <ul className="space-y-6">
                  {cartWithTotals.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={revealViewport}
                      transition={staggerDelay(index, 0.05)}
                      className="sa-card overflow-hidden"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-sa-border/50 p-6 md:p-8">
                        <div>
                          <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                            {item.kind}
                          </p>
                          <h2 className="mt-2 font-heading text-xl font-bold text-white">{item.label}</h2>
                          <p className="mt-1 text-xs text-sa-muted/50">
                            Reference: <span className="font-mono">{item.reference}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-muted transition hover:border-rose-500/50 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>

                      <div className="grid gap-8 p-6 md:grid-cols-[1fr,240px] md:p-8">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-4">
                            Optional Add-ons
                          </p>
                          <div className="space-y-3">
                            {item.addons.length === 0 ? (
                              <p className="text-sm text-sa-muted/50">No optional add-ons for this item.</p>
                            ) : (
                              item.addons.map((addon) => (
                                <label
                                  key={addon.id}
                                  className={cn(
                                    "flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-sa-border bg-sa-bg/50 px-4 py-3 transition",
                                    (addon.selected || addon.required) && "border-sa-primary/30 bg-sa-primary/5"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={addon.selected || addon.required}
                                      disabled={addon.required}
                                      onChange={(e) =>
                                        toggleAddon(item.id, addon.id, e.target.checked)
                                      }
                                      className="h-4 w-4 rounded border-sa-border bg-sa-surface text-sa-primary focus:ring-sa-primary/50"
                                    />
                                    <span className="text-sm font-medium text-sa-muted">{addon.label}</span>
                                  </div>
                                  <FxPrice
                                    amountGhs={addon.priceGhs}
                                    suffix={item.interval === "year" ? "/yr" : ""}
                                    className="text-xs font-bold text-white"
                                  />
                                </label>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-sa-border bg-sa-surface/50 p-6 h-fit">
                          <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-sa-muted/60">Base Price</span>
                              <FxPrice amountGhs={item.priceGhs} suffix={intervalLabel(item.interval)} className="font-bold text-white" />
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-sa-muted/60">Add-ons</span>
                              <FxPrice amountGhs={item.addOnsTotal} className="font-bold text-white" />
                            </div>
                            <div className="pt-3 border-t border-sa-border flex justify-between items-end">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-sa-muted/40">Item Total</span>
                              <FxPrice
                                amountGhs={item.total}
                                suffix={intervalLabel(item.interval)}
                                className="text-lg font-bold text-sa-primary"
                              />
                            </div>
                          </div>
                          <Link
                            href={`/checkout/renewal?plan=${encodeURIComponent(item.planCode)}&label=${encodeURIComponent(item.label)}&ref=${encodeURIComponent(item.reference)}`}
                            className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-white text-[10px] font-bold uppercase tracking-wider text-sa-bg transition hover:bg-sa-primary"
                          >
                            Single item pay
                          </Link>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <aside className="lg:sticky lg:top-32 h-fit">
                <motion.div {...fadeUpProps} className="sa-card p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-white">Order Summary</h3>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-sa-border/50 pb-4">
                      <span className="text-sm text-sa-muted/60">Total Estimated</span>
                      <FxPrice
                        amountGhs={totalGhs}
                        className="text-2xl font-bold text-sa-primary"
                      />
                    </div>
                    <p className="text-[10px] leading-relaxed text-sa-muted/40">
                      Final totals and local taxes are confirmed at the payment step. Checkout is processed in GHS via Paystack.
                    </p>

                    <button
                      type="button"
                      onClick={checkoutAllNow}
                      disabled={submitting}
                      className="sa-btn-primary w-full mt-4"
                    >
                      {submitting ? "Processing..." : "Checkout all now"}
                      {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs font-medium text-rose-500"
                  >
                    {submitError}
                  </motion.div>
                )}

                {submitResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sa-card mt-6 p-6"
                  >
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-4">Checkout Log</h4>
                    <ul className="space-y-3">
                      {submitResults.map((row, i) => (
                        <li key={i} className="rounded-lg border border-sa-border bg-sa-bg/50 p-3 text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{row.label}</span>
                            <span className={cn(
                              "font-black uppercase",
                              row.status.toLowerCase() === "success" ? "text-sa-primary" : "text-rose-500"
                            )}>{row.status}</span>
                          </div>
                          {row.message && <p className="mt-1 text-sa-muted/60">{row.message}</p>}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
  );
}
