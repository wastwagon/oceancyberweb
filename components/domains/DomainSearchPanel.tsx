"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Search, ShieldCheck, Globe2, Sparkles } from "lucide-react";
import { FxPrice } from "@/components/currency/FxPrice";
import { useCart } from "@/components/commerce/CartProvider";
import { HERO_TLD_PRICING } from "@/lib/domain-tld-pricing";
import { cn } from "@/lib/utils";
import { getApiBaseUrl } from "@/lib/api-config";


type CheckRow = { domain: string; available: boolean };

export function TldPriceChips() {
  return (
    <div
      className="flex w-full flex-col gap-2"
      role="region"
      aria-label="Example domain extension pricing per year, Ghana cedis first"
    >
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
        Popular extensions · cedis/year
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {HERO_TLD_PRICING.map(({ tld, priceAnnualGhs, highlight }) => (
          <div
            key={tld}
            className={cn(
              "inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-left shadow-sm transition sm:px-3",
              highlight
                ? "border-amber-200/90 bg-gradient-to-b from-amber-50 to-orange-50/80 ring-1 ring-amber-200/50"
                : "border-slate-200/90 bg-white/90 ring-1 ring-slate-200/30",
            )}
          >
            <span className="text-xs font-bold text-slate-900 sm:text-sm">{tld}</span>
            <FxPrice
              amountGhs={priceAnnualGhs}
              suffix="/yr"
              compactGhsSymbol
              className="text-[10px] text-ocean-800 sm:text-xs [&>span]:font-bold [&>span]:text-ocean-700"
            />
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] text-slate-500">
        Indicative pricing in Ghana cedis; other currencies use a public rate feed
        for guidance only. Live availability and final totals (cedis, Paystack) are
        confirmed at checkout.
      </p>
    </div>
  );
}

type PanelVariant = "default" | "hero";

type DomainSearchPanelProps = {
  variant?: PanelVariant;
  className?: string;
};

export function DomainSearchPanel({
  variant = "default",
  className,
}: DomainSearchPanelProps) {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<CheckRow[] | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setRows(null);
    setLoading(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/domains/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = (await res.json()) as {
        error?: string;
        checked?: CheckRow[];
      };
      if (!res.ok) {
        setError(data.error || "Request failed.");
        return;
      }
      setRows(data.checked ?? []);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function addDomainToCart(domain: string) {
    addItem({
      id: `domain-${domain}-${Date.now()}`,
      kind: "domain",
      label: domain,
      planCode: "domain-standard-yearly",
      priceGhs: 120,
      interval: "year",
      reference: `DOMAIN-${domain}`,
      addons: [
        {
          id: "privacy",
          label: "Domain privacy (Withheld for Privacy)",
          priceGhs: 0,
          selected: true,
          required: true,
        },
        {
          id: "ssl-positivessl",
          label: "PositiveSSL (recommended)",
          priceGhs: 45,
          selected: false,
        },
        {
          id: "premium-dns",
          label: "Premium DNS",
          priceGhs: 35,
          selected: false,
        },
      ],
    });
  }

  return (
    <div
      className={cn(
        "mx-auto w-full",
        variant === "hero" ? "max-w-2xl" : "max-w-3xl",
        className,
      )}
    >
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex flex-col gap-3 border border-slate-200/90 bg-white p-2 sm:flex-row sm:items-stretch",
          variant === "hero"
            ? "rounded-2xl p-1.5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.04)] sm:p-2"
            : "rounded-2xl p-2 shadow-lg shadow-slate-200/60",
        )}
      >
        <label className="sr-only" htmlFor="domain-search">
          Domain or brand name
        </label>
        <div
          className={cn(
            "relative flex min-h-[52px] flex-1 items-center",
            variant === "hero" && "min-h-14",
          )}
        >
          <Search
            className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400"
            aria-hidden
          />
          <input
            id="domain-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a name (e.g. oceancyber) or full domain"
            className="h-full w-full rounded-xl border border-transparent bg-slate-50 py-3 pl-12 pr-4 text-base text-slate-900 outline-none ring-ocean-500 transition placeholder:text-slate-400 focus:bg-white focus:ring-2"
            autoComplete="off"
            maxLength={200}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-sm font-bold text-white shadow-md transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Checking
            </>
          ) : (
            <>
              <Globe2 className="h-4 w-4" aria-hidden />
              Search
            </>
          )}
        </button>
      </form>

      {error ? (
        <div
          className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="alert"
        >
          <p className="font-semibold">Could not reach Namecheap</p>
          <p className="mt-1 text-amber-900/90">{error}</p>
          <p className="mt-2 text-xs text-amber-900/80">
            Confirm API access is ON, your API user/key are in server env vars, and
            your server&apos;s public IPv4 is whitelisted in Namecheap API Access.
          </p>
        </div>
      ) : null}

      {rows && rows.length > 0 ? (
        <ul className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {rows.map((r) => (
            <li
              key={r.domain}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"
            >
              <div>
                <p className="font-mono text-base font-semibold text-slate-900">
                  {r.domain}
                </p>
                <p className="text-sm text-slate-500">
                  {r.available ? "Available to register" : "Not available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    r.available
                      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                      : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {r.available ? "Available" : "Taken"}
                </span>
                {r.available ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/checkout/renewal?plan=domain-standard-yearly&label=${encodeURIComponent(
                        r.domain,
                      )}&ref=${encodeURIComponent(`DOMAIN-${r.domain}`)}`}
                      className="rounded-lg bg-ocean-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-ocean-700"
                    >
                      Quick checkout
                    </Link>
                    <button
                      type="button"
                      onClick={() => addDomainToCart(r.domain)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      Add to cart
                    </button>
                    <Link
                      href="/checkout/cart"
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      View cart
                    </Link>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function RegistrarValueProps() {
  const items = [
    {
      icon: Globe2,
      title: "Domains",
      body: "Search popular TLDs in one step. Registration and DNS are completed through our team with your Namecheap account.",
    },
    {
      icon: ShieldCheck,
      title: "SSL certificates",
      body: "PositiveSSL, EV, and multi-domain options via Namecheap (create, activate, renew). Ideal for ecommerce and compliance-led launches.",
    },
    {
      icon: Sparkles,
      title: "Managed setup",
      body: "We align hosting, DNS, email, and security the same way global registrars bundle professional services—without sacrificing your brand.",
    },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 inline-flex rounded-xl bg-slate-50 p-3 text-ocean-600 ring-1 ring-slate-100">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
        </div>
      ))}
    </div>
  );
}
