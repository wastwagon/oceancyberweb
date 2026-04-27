/** Currencies we expose in the selector (GHS is canonical / source). */
export const FX_CURRENCIES = [
  { code: "GHS" as const, label: "Ghana cedis", short: "₵", region: "Ghana" },
  { code: "NGN" as const, label: "Nigerian naira", short: "₦", region: "Nigeria" },
  { code: "ZAR" as const, label: "South African rand", short: "R", region: "South Africa" },
  { code: "KES" as const, label: "Kenyan shilling", short: "KSh", region: "Kenya" },
  { code: "XOF" as const, label: "West African CFA", short: "CFA", region: "WAEMU" },
  { code: "USD" as const, label: "US dollar", short: "$", region: "International" },
  { code: "EUR" as const, label: "Euro", short: "€", region: "International" },
  { code: "GBP" as const, label: "British pound", short: "£", region: "International" },
] as const;

export type FxCurrencyCode = (typeof FX_CURRENCIES)[number]["code"];

export const FX_CURRENCY_CODES: readonly FxCurrencyCode[] = FX_CURRENCIES.map(
  (c) => c.code,
);

/** BCP 47 locale hints for Intl (display only). */
export const FX_INTL_LOCALE: Record<FxCurrencyCode, string> = {
  GHS: "en-GH",
  NGN: "en-NG",
  ZAR: "en-ZA",
  KES: "en-KE",
  XOF: "fr-SN",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
};
