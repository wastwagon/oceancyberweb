import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SaSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  density?: "default" | "compact" | "micro";
  invalid?: boolean;
};

export const SaSelect = forwardRef<HTMLSelectElement, SaSelectProps>(
  function SaSelect({ className, density = "default", invalid, children, ...props }, ref) {
    const densityClass =
      density === "micro"
        ? "sa-select-micro"
        : density === "compact"
          ? "sa-select-compact"
          : "sa-select";

    return (
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(densityClass, className)}
        {...props}
      >
        {children}
      </select>
    );
  },
);
