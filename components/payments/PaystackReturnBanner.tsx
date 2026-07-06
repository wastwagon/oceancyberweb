"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, Clock, Loader2 } from "lucide-react";
import type { PaystackReturnState } from "@/hooks/usePaystackReturn";
import { cn } from "@/lib/utils";

type Props = {
  state: PaystackReturnState;
  successTitle?: string;
  successMessage?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function PaystackReturnBanner({
  state,
  successTitle = "Payment confirmed",
  successMessage = "Your payment was successful. Balances and invoices update shortly.",
  backHref = "/dashboard",
  backLabel = "Back to dashboard",
  className,
}: Props) {
  if (state === "idle") return null;

  const config =
    state === "verifying"
      ? {
          icon: <Loader2 className="h-5 w-5 shrink-0 animate-spin" />,
          title: "Verifying payment",
          message: "Please wait while we confirm your Paystack transaction.",
          tone: "border-sa-primary/30 bg-sa-primary/10 text-sa-primary",
        }
      : state === "paid"
        ? {
            icon: <CheckCircle2 className="h-5 w-5 shrink-0" />,
            title: successTitle,
            message: successMessage,
            tone: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
          }
        : state === "failed"
          ? {
              icon: <AlertCircle className="h-5 w-5 shrink-0" />,
              title: "Payment failed",
              message: "Paystack reported a failed transaction. You can try again or contact support.",
              tone: "border-rose-500/30 bg-rose-500/10 text-rose-400",
            }
          : {
              icon: <Clock className="h-5 w-5 shrink-0" />,
              title: "Verification timed out",
              message:
                "We could not confirm the payment yet. Check your wallet or invoices in a few minutes, or contact support with your Paystack reference.",
              tone: "border-amber-500/30 bg-amber-500/10 text-amber-400",
            };

  return (
    <div className={cn("rounded-2xl border p-5", config.tone, className)} role="status">
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-bold">{config.title}</p>
          <p className="text-sm opacity-90">{config.message}</p>
          {state === "paid" && backHref ? (
            <Link href={backHref} className="mt-2 inline-block text-xs font-bold uppercase tracking-widest underline underline-offset-4">
              {backLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
