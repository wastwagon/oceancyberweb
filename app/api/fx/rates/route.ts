import { NextResponse } from "next/server";
import type { FxCurrencyCode } from "@/lib/fx-currencies";

/**
 * Free, no-key JSON feed (Fawaz Ahmed / currency-api on Cloudflare Pages).
 * @see https://github.com/fawazahmed0/currency-api
 */
const UPSTREAM =
  "https://latest.currency-api.pages.dev/v1/currencies/ghs.json";

const TARGETS: FxCurrencyCode[] = [
  "GHS",
  "NGN",
  "ZAR",
  "KES",
  "XOF",
  "USD",
  "EUR",
  "GBP",
];

export const revalidate = 3600;

const FALLBACK_RATES: Record<string, number> = { GHS: 1 };

function fallbackFxResponse(reason: "build" | "upstream_failed" | "invalid_payload" | "fetch_failed") {
  return NextResponse.json(
    {
      base: "GHS" as const,
      date: null,
      rates: FALLBACK_RATES,
      source: "fallback",
      reason,
    },
    { status: 200 },
  );
}

export async function GET() {
  // Avoid network-dependent failures/noise during static production build.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return fallbackFxResponse("build");
  }

  try {
    const res = await fetch(UPSTREAM, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return fallbackFxResponse("upstream_failed");
    }
    const data = (await res.json()) as {
      date?: string;
      ghs?: Record<string, number>;
    };
    const row = data.ghs;
    if (!row || typeof row !== "object") {
      return fallbackFxResponse("invalid_payload");
    }

    const rates: Record<string, number> = { GHS: 1 };
    for (const code of TARGETS) {
      if (code === "GHS") continue;
      const v = row[code.toLowerCase()];
      if (typeof v === "number" && Number.isFinite(v) && v > 0) {
        rates[code] = v;
      }
    }

    return NextResponse.json(
      {
        base: "GHS" as const,
        date: data.date ?? null,
        rates,
        source: "currency-api.pages.dev",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch {
    return fallbackFxResponse("fetch_failed");
  }
}
