import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SaFieldProps = {
  id?: string;
  label: ReactNode;
  /** Compact uppercase label used in admin / checkout denser forms. */
  labelTone?: "default" | "caps" | "cms";
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

export function SaField({
  id,
  label,
  labelTone = "default",
  hint,
  error,
  required,
  optional,
  children,
  className,
}: SaFieldProps) {
  const hintId = id && hint ? `${id}-hint` : undefined;
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div className={cn("space-y-sa-sm", className)}>
      <label
        htmlFor={id}
        className={
          labelTone === "caps"
            ? "sa-label-caps"
            : labelTone === "cms"
              ? "sa-label-cms"
              : "sa-label"
        }
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-sa-primary" aria-hidden>
            *
          </span>
        ) : null}
        {optional ? (
          <span className="ml-1 font-normal normal-case tracking-normal text-sa-fg-subtle">
            (optional)
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="sa-hint px-1">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="sa-field-error px-1" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
