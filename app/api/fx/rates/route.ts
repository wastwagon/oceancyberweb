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

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "upstream_failed", status: res.status },
        { status: 502 },
      );
    }
    const data = (await res.json()) as {
      date?: string;
      ghs?: Record<string, number>;
    };
    const row = data.ghs;
    if (!row || typeof row !== "object") {
      return NextResponse.json({ error: "invalid_payload" }, { status: 502 });
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
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
