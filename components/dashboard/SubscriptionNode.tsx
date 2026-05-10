"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingRenewal } from "@/lib/auth-client";

interface SubscriptionNodeProps {
  renewal: BillingRenewal;
  busyId: string | null;
  onAction: (id: string, action: () => Promise<unknown>) => void;
  chargeRenewal: (id: string) => Promise<unknown>;
  pauseRenewal: (id: string) => Promise<unknown>;
  resumeRenewal: (id: string) => Promise<unknown>;
  cancelRenewal: (id: string) => Promise<unknown>;
}

function statusStyles(status: string) {
  switch (status) {
    case "active":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "paused":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    case "past_due":
      return "border-orange-500/30 bg-orange-500/10 text-orange-400";
    case "suspended":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    case "cancelled":
      return "border-sa-border bg-sa-surface/50 text-sa-muted/60";
    default:
      return "border-sa-border bg-sa-surface text-sa-muted";
  }
}

export function SubscriptionNode({
  renewal,
  busyId,
  onAction,
  chargeRenewal,
  pauseRenewal,
  resumeRenewal,
  cancelRenewal
}: SubscriptionNodeProps) {
  const isBusy = busyId === renewal.id;
  const canCharge = renewal.status === "active" || renewal.status === "past_due";
  const showPause = renewal.status === "active" || renewal.status === "past_due";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="sa-card group relative overflow-hidden transition-all hover:border-sa-primary/40 hover:bg-sa-surface/40"
    >
      <div className="p-6 md:p-8 flex flex-col lg:flex-row items-start justify-between gap-8">
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading font-bold text-white text-xl">{renewal.plan.name}</h3>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] backdrop-blur-md",
                statusStyles(renewal.status)
              )}
            >
              {renewal.status.replace("_", " ")}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
             <div className="flex items-center gap-2 text-[11px] font-bold text-sa-muted/60 uppercase tracking-widest">
               <Clock size={12} className="text-sa-primary" />
               Next: <span className="text-white">{new Date(renewal.nextRenewalAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
             </div>
             <div className="h-1 w-1 rounded-full bg-sa-border" />
             <div className="flex items-center gap-2 text-[11px] font-bold text-sa-muted/60 uppercase tracking-widest">
               <ShieldCheck size={12} className={renewal.autoRenewUsingWallet ? "text-sa-primary" : "text-sa-muted/30"} />
               {renewal.autoRenewUsingWallet ? "Auto-Billing On" : "Manual Billing"}
             </div>
          </div>

          {renewal.status === "past_due" && (
            <p className="inline-flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-400">
              <AlertCircle size={12} /> Grace period active
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {canCharge && (
            <button
              type="button"
              disabled={isBusy || renewal.status === "paused"}
              onClick={() => onAction(renewal.id, () => chargeRenewal(renewal.id))}
              className="group flex items-center gap-2 rounded-xl bg-sa-primary px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isBusy ? "Processing..." : "Charge Wallet"}
              {!isBusy && <ChevronRight size={14} />}
            </button>
          )}
          
          <div className="flex gap-2">
            {renewal.status === "paused" ? (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onAction(renewal.id, () => resumeRenewal(renewal.id))}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/20"
              >
                Resume
              </button>
            ) : showPause && renewal.status !== "cancelled" ? (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onAction(renewal.id, () => pauseRenewal(renewal.id))}
                className="rounded-xl border border-sa-border bg-sa-surface px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-sa-muted hover:text-white"
              >
                Pause
              </button>
            ) : null}

            {renewal.status !== "cancelled" && (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => {
                  if (!confirm("Deactivate this node? Services will be interrupted.")) return;
                  onAction(renewal.id, () => cancelRenewal(renewal.id));
                }}
                className="rounded-xl border border-sa-border bg-sa-surface p-3 text-sa-muted/40 hover:text-rose-400 hover:border-rose-500/50 transition-all"
              >
                <AlertCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
