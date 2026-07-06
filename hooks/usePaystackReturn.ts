"use client";

import { useEffect, useRef, useState } from "react";
import { getPaymentStatus } from "@/lib/auth-client";

export type PaystackReturnState = "idle" | "verifying" | "paid" | "stale" | "failed";

type Options = {
  /** Called once when Paystack confirms success. */
  onPaid?: () => void;
};

/**
 * Polls billing payment status after Paystack redirects back with `?reference=`.
 * Mirrors the flow used on `/checkout/renewal`.
 */
export function usePaystackReturn(
  reference: string | null | undefined,
  options?: Options,
): PaystackReturnState {
  const [state, setState] = useState<PaystackReturnState>("idle");
  const onPaidRef = useRef(options?.onPaid);
  onPaidRef.current = options?.onPaid;

  useEffect(() => {
    const ref = reference?.trim();
    if (!ref) {
      setState("idle");
      return;
    }

    setState("verifying");
    let attempts = 0;
    const maxAttempts = 36;
    const id = setInterval(async () => {
      attempts += 1;
      if (attempts > maxAttempts) {
        setState("stale");
        clearInterval(id);
        return;
      }
      try {
        const status = await getPaymentStatus(ref);
        if (status.found && status.status === "success") {
          setState("paid");
          clearInterval(id);
          onPaidRef.current?.();
        }
        if (status.found && status.status === "failed") {
          setState("failed");
          clearInterval(id);
        }
      } catch {
        /* still pending or API warming up */
      }
    }, 2500);

    return () => clearInterval(id);
  }, [reference]);

  return state;
}
