import { Injectable, Logger } from "@nestjs/common";

const UPSTREAM = "https://latest.currency-api.pages.dev/v1/currencies/ghs.json";
const TARGETS = ["GHS", "NGN", "ZAR", "KES", "XOF", "USD", "EUR", "GBP"];

@Injectable()
export class FxService {
  private readonly logger = new Logger(FxService.name);
  private cachedRates: any = null;
  private lastFetch: number = 0;

  async getRates() {
    const now = Date.now();
    if (this.cachedRates && now - this.lastFetch < 3600000) {
      return this.cachedRates;
    }

    try {
      // In a real project, use @nestjs/axios or plain fetch
      const res = await fetch(UPSTREAM);
      if (!res.ok) throw new Error("Upstream failed");
      
      const data = (await res.json()) as any;
      const row = data.ghs;
      if (!row) throw new Error("Invalid payload");

      const rates: Record<string, number> = { GHS: 1 };
      for (const code of TARGETS) {
        if (code === "GHS") continue;
        const v = row[code.toLowerCase()];
        if (typeof v === "number" && v > 0) {
          rates[code] = v;
        }
      }

      this.cachedRates = {
        base: "GHS",
        date: data.date ?? null,
        rates,
        source: "currency-api.pages.dev",
      };
      this.lastFetch = now;
      return this.cachedRates;
    } catch (e) {
      this.logger.error("Failed to fetch FX rates", e);
      return {
        base: "GHS",
        date: null,
        rates: { GHS: 1 },
        source: "fallback",
        reason: "fetch_failed",
      };
    }
  }
}
