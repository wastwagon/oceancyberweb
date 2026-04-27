"use client";

import { useFxOptional } from "@/components/currency/FxProvider";
import { formatGhsAsCurrency } from "@/lib/format-fx";
import type { FxCurrencyCode } from "@/lib/fx-currencies";
import { cn } from "@/lib/utils";

type Props = {
  /** Amount in Ghana cedis (source of truth). */
  amountGhs: number;
  /** e.g. "/mo", "/yr" */
  suffix?: string;
  className?: string;
  /** When true, show "from" before the amount (marketing). */
  showFrom?: boolean;
  /** Use "₵" instead of "GH₵" when currency is GHS. */
  compactGhsSymbol?: boolean;
};

/**
 * Renders a GHS-based price converted to the visitor’s selected currency.
 */
export function FxPrice({
  amountGhs,
  suffix = "",
  className,
  showFrom = false,
  compactGhsSymbol = false,
}: Props) {
  const fx = useFxOptional();
  const currency: FxCurrencyCode = fx?.currency ?? "GHS";
  const rates = fx?.rates ?? { GHS: 1 as const };
  const formattedRaw = formatGhsAsCurrency(amountGhs, currency, rates);
  const formatted =
    compactGhsSymbol && currency === "GHS"
      ? formattedRaw.replace(/^GH₵\s?/, "₵")
      : formattedRaw;

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-1", className)}>
      {showFrom ? (
        <span className="text-sm font-semibold text-slate-500">from</span>
      ) : null}
      <span className="font-semibold tabular-nums text-slate-900">{formatted}</span>
      {suffix ? (
        <span className="text-sm font-medium text-slate-500">{suffix}</span>
      ) : null}
    </span>
  );
}
