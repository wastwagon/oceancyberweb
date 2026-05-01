"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FxCurrencyCode } from "@/lib/fx-currencies";
import { FX_CURRENCY_CODES } from "@/lib/fx-currencies";
import type { FxRatesMap } from "@/lib/format-fx";
import { formatGhsAsCurrency } from "@/lib/format-fx";
import { getApiBaseUrl } from "@/lib/api-config";

const STORAGE_KEY = "oceancyber_fx_currency";

type FxStatus = "idle" | "loading" | "ready" | "error";

type FxResponse = {
  base: "GHS";
  date: string | null;
  rates: Record<string, number>;
};

type FxContextValue = {
  currency: FxCurrencyCode;
  setCurrency: (c: FxCurrencyCode) => void;
  status: FxStatus;
  rates: FxRatesMap | null;
  /** Format a GHS amount into the active display currency. */
  formatGhs: (amountGhs: number) => string;
};

const FxContext = createContext<FxContextValue | null>(null);

function readStoredCurrency(): FxCurrencyCode {
  if (typeof window === "undefined") return "GHS";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && (FX_CURRENCY_CODES as readonly string[]).includes(raw)) {
      return raw as FxCurrencyCode;
    }
  } catch {
    /* ignore */
  }
  return "GHS";
}

export function FxProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<FxCurrencyCode>("GHS");
  const [status, setStatus] = useState<FxStatus>("idle");
  const [rates, setRates] = useState<FxRatesMap | null>(null);

  useEffect(() => {
    setCurrencyState(readStoredCurrency());
  }, []);

  const setCurrency = useCallback((c: FxCurrencyCode) => {
    setCurrencyState(c);
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus((s) => (s === "idle" ? "loading" : s));
    fetch(`${getApiBaseUrl()}/fx/rates`)
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<FxResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        const merged: FxRatesMap = { GHS: 1, ...data.rates } as FxRatesMap;
        setRates(merged);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setRates({ GHS: 1 });
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const formatGhs = useCallback(
    (amountGhs: number) => formatGhsAsCurrency(amountGhs, currency, rates),
    [currency, rates],
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      status,
      rates,
      formatGhs,
    }),
    [currency, setCurrency, status, rates, formatGhs],
  );

  return <FxContext.Provider value={value}>{children}</FxContext.Provider>;
}

export function useFx() {
  const ctx = useContext(FxContext);
  if (!ctx) {
    throw new Error("useFx must be used within FxProvider");
  }
  return ctx;
}

/** Safe when provider is missing (e.g. tests); falls back to GHS formatting. */
export function useFxOptional(): FxContextValue | null {
  return useContext(FxContext);
}
