import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AppAlertVariant = "success" | "error" | "warning" | "info";

const VARIANT_STYLES: Record<AppAlertVariant, string> = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  error: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  info: "border-sa-primary/30 bg-sa-primary/10 text-sa-primary",
};

type AppAlertProps = {
  variant?: AppAlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function AppAlert({ variant = "info", title, children, className }: AppAlertProps) {
  return (
    <div
      className={cn("rounded-xl border px-4 py-3 text-sm", VARIANT_STYLES[variant], className)}
      role="alert"
    >
      {title ? <p className="mb-1 text-xs font-bold uppercase tracking-widest">{title}</p> : null}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
