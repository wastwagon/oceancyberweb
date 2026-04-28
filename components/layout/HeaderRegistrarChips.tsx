"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FxPrice } from "@/components/currency/FxPrice";
import { cn } from "@/lib/utils";
import { HEADER_TLD_PRICING_SNAPSHOT } from "@/lib/domain-tld-pricing";

type Props = {
  className?: string;
  /** Tighter for mobile drawer */
  dense?: boolean;
};

/**
 * Premium registrar strip: GHS first, optional FX when visitor changes currency
 * in the global header selector.
 */
export function HeaderRegistrarChips({ className, dense }: Props) {
  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full flex-col items-stretch gap-1",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-1",
          dense ? "px-0" : "",
        )}
      >
        <p className="shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Domains
        </p>
        <Link
          href="/domains"
          className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-ocean-600 transition hover:text-ocean-800"
        >
          Search
          <ChevronRight
            className="mb-0.5 ml-0.5 inline h-2.5 w-2.5"
            aria-hidden
          />
        </Link>
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-wrap items-center",
          dense ? "gap-1" : "gap-1.5",
        )}
        role="list"
        aria-label="Indicative domain prices per year"
      >
        {HEADER_TLD_PRICING_SNAPSHOT.map(
          ({ tld, priceAnnualGhs, highlight }) => (
            <div
              key={tld}
              role="listitem"
              className={cn(
                "inline-flex max-w-full items-baseline gap-0.5 rounded-md border px-1.5 py-0.5",
                highlight
                  ? "border-amber-200/90 bg-gradient-to-b from-amber-50/95 to-white ring-1 ring-amber-100/80"
                  : "border-slate-200/80 bg-white/80 ring-1 ring-slate-200/30",
                dense && "px-1 py-0.5",
              )}
            >
              <span className="shrink-0 text-[10px] font-bold text-slate-800 sm:text-[11px]">
                {tld}
              </span>
              <FxPrice
                amountGhs={priceAnnualGhs}
                suffix="/yr"
                compactGhsSymbol
                className="[font-size:9px] sm:[font-size:10px] [&>span]:font-bold [&>span]:text-ocean-700"
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
