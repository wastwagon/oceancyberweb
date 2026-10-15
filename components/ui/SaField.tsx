import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
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

type ControlA11yProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-required"?: boolean | "true" | "false";
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
  const hintId = id && hint && !error ? `${id}-hint` : undefined;
  const errorId = id && error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const enhanced = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<ControlA11yProps>;
    const existingDescribedBy = el.props["aria-describedby"];
    const mergedDescribedBy = [existingDescribedBy, describedBy]
      .filter(Boolean)
      .join(" ")
      .trim() || undefined;

    return cloneElement(el, {
      id: el.props.id ?? id,
      "aria-describedby": mergedDescribedBy,
      "aria-invalid": error ? true : el.props["aria-invalid"],
      "aria-required": required ? true : el.props["aria-required"],
    });
  });

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
      {enhanced}
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
