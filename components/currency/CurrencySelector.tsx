"use client";

import { useFx } from "@/components/currency/FxProvider";
import { FX_CURRENCIES, type FxCurrencyCode } from "@/lib/fx-currencies";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Compact = icon-free, smaller padding for header toolbar */
  compact?: boolean;
};

export function CurrencySelector({ className, compact }: Props) {
  const { currency, setCurrency, status } = useFx();

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5",
        compact ? "" : "min-w-[10rem]",
        className,
      )}
    >
      <label
        htmlFor="oc-fx-currency"
        className={cn(
          "font-semibold text-slate-600",
          compact ? "sr-only" : "text-[10px] uppercase tracking-widest",
        )}
      >
        Display currency
      </label>
      <select
        id="oc-fx-currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as FxCurrencyCode)}
        title={
          compact
            ? status === "error"
              ? "Rates unavailable — amounts shown in GHS."
              : "Indicative conversion; you pay in Ghana cedis (e.g. via Paystack)."
            : undefined
        }
        className={cn(
          "rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 shadow-sm outline-none transition focus:border-ocean-400 focus:ring-2 focus:ring-ocean-200",
          compact
            ? "h-9 max-w-[9.5rem] cursor-pointer py-1 pl-2 pr-7 text-xs"
            : "cursor-pointer px-3 py-2 text-sm",
        )}
        aria-describedby={compact ? undefined : "oc-fx-currency-hint"}
      >
        {FX_CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} · {c.label}
          </option>
        ))}
      </select>
      {!compact ? (
        <p id="oc-fx-currency-hint" className="text-[10px] text-slate-500">
          {status === "error"
            ? "Live rates unavailable — showing GHS only."
            : "Indicative rates from a public feed. You pay in GHS via Paystack."}
        </p>
      ) : null}
    </div>
  );
}
