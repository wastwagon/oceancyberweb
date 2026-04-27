import type { FxCurrencyCode } from "@/lib/fx-currencies";
import { FX_INTL_LOCALE } from "@/lib/fx-currencies";

/** Units of each code per 1 GHS (upstream `ghs` row). */
export type FxRatesMap = Partial<Record<FxCurrencyCode, number>> & {
  GHS: 1;
};

/**
 * `rates[c]` = how many units of `c` equal 1 GHS (from currency-api GHS row).
 */
export function formatGhsAsCurrency(
  amountGhs: number,
  currency: FxCurrencyCode,
  rates: FxRatesMap | null,
): string {
  const rate = rates?.[currency];
  if (
    currency === "GHS" ||
    !rates ||
    rate == null ||
    !Number.isFinite(rate) ||
    rate <= 0
  ) {
    return new Intl.NumberFormat(FX_INTL_LOCALE.GHS, {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(amountGhs);
  }
  const converted = amountGhs * rate;
  const locale = FX_INTL_LOCALE[currency] ?? "en-US";
  const maxFrac =
    currency === "USD" || currency === "EUR" || currency === "GBP" ? 2 : 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: maxFrac,
    minimumFractionDigits: 0,
  }).format(converted);
}
