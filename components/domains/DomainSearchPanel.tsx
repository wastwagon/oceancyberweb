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
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-sa-muted/50">
        Popular extensions · cedis/year
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {HERO_TLD_PRICING.map(({ tld, priceAnnualGhs, highlight }) => (
          <div
            key={tld}
            className={cn(
              "inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-left transition sm:px-3",
              highlight
                ? "border-sa-primary/50 bg-sa-primary/10"
                : "border-sa-border bg-sa-surface/50",
            )}
          >
            <span className="font-heading text-xs font-bold text-white sm:text-sm">{tld}</span>
            <FxPrice
              amountGhs={priceAnnualGhs}
              suffix="/yr"
              compactGhsSymbol
              className="text-[10px] text-sa-primary sm:text-xs [&>span]:font-bold"
            />
          </div>
        ))}
      </div>
      <p className="text-center text-[9px] leading-relaxed text-sa-muted/40">
        Indicative pricing in Ghana cedis. Live availability and final totals (GHS, Paystack) are
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
          label: "Domain privacy",
          priceGhs: 0,
          selected: true,
          required: true,
        },
        {
          id: "ssl-positivessl",
          label: "PositiveSSL",
          priceGhs: 45,
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
          "flex flex-col gap-3 border border-sa-border bg-sa-surface p-2 sm:flex-row sm:items-stretch",
          variant === "hero"
            ? "rounded-2xl p-1.5 shadow-2xl shadow-sa-primary/5 sm:p-2"
            : "rounded-2xl p-2 shadow-xl shadow-black/20",
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
            className="pointer-events-none absolute left-4 h-5 w-5 text-sa-muted/50"
            aria-hidden
          />
          <input
            id="domain-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a name or full domain"
            className="h-full w-full rounded-xl border border-sa-border bg-sa-bg py-3 pl-12 pr-4 text-base text-white outline-none ring-sa-primary/50 transition placeholder:text-sa-muted/30 focus:border-sa-primary focus:ring-1"
            autoComplete="off"
            maxLength={200}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="sa-btn-primary min-h-[52px] shrink-0"
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
          className="mt-4 rounded-xl border border-sa-primary/20 bg-sa-primary/5 px-4 py-3 text-sm text-sa-primary"
          role="alert"
        >
          <p className="font-bold">Check failed</p>
          <p className="mt-1 opacity-90">{error}</p>
        </div>
      ) : null}

      {rows && rows.length > 0 ? (
        <ul className="mt-6 divide-y divide-sa-border overflow-hidden rounded-2xl border border-sa-border bg-sa-surface shadow-sm">
          {rows.map((r) => (
            <li
              key={r.domain}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"
            >
              <div>
                <p className="font-heading text-base font-bold text-white">
                  {r.domain}
                </p>
                <p className="text-xs text-sa-muted/70">
                  {r.available ? "Available to register" : "Not available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    r.available
                      ? "bg-sa-primary text-sa-bg"
                      : "bg-sa-border text-sa-muted"
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
                      className="rounded-lg bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-sa-bg transition hover:bg-sa-primary"
                    >
                      Checkout
                    </Link>
                    <button
                      type="button"
                      onClick={() => addDomainToCart(r.domain)}
                      className="rounded-lg border border-sa-border bg-sa-bg px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-sa-muted transition hover:border-sa-primary hover:text-white"
                    >
                      Add to cart
                    </button>
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
          className="sa-card p-6"
        >
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-sa-muted/70">{body}</p>
        </div>
      ))}
    </div>
  );
}
