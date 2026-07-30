import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AppAlertVariant = "success" | "error" | "warning" | "info";

const VARIANT_STYLES: Record<AppAlertVariant, string> = {
  success: "border-sa-success/30 bg-sa-success-muted text-sa-success",
  error: "border-sa-danger/40 bg-sa-danger-muted text-sa-danger",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  info: "border-sa-primary/30 bg-sa-success-muted text-sa-primary",
};

type AppAlertProps = {
  variant?: AppAlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "title" | "children">;

export function AppAlert({
  variant = "info",
  title,
  children,
  className,
  role = "alert",
  ...props
}: AppAlertProps) {
  return (
    <div
      className={cn("rounded-sa-lg border px-4 py-3 text-sm", VARIANT_STYLES[variant], className)}
      role={role}
      {...props}
    >
      {title ? <p className="mb-1 text-xs font-bold uppercase tracking-widest">{title}</p> : null}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
