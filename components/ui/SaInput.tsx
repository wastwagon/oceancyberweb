import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Density = "default" | "compact" | "micro";

type SharedProps = {
  /** denser admin / checkout fields; micro for CMS editors */
  density?: Density;
  invalid?: boolean;
};

function inputClass(density: Density) {
  if (density === "micro") return "sa-input-micro";
  if (density === "compact") return "sa-input-compact";
  return "sa-input";
}

export type SaInputProps = SharedProps & InputHTMLAttributes<HTMLInputElement>;

export const SaInput = forwardRef<HTMLInputElement, SaInputProps>(
  function SaInput({ className, density = "default", invalid, ...props }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(inputClass(density), className)}
        {...props}
      />
    );
  },
);

export type SaTextareaProps = SharedProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const SaTextarea = forwardRef<HTMLTextAreaElement, SaTextareaProps>(
  function SaTextarea({ className, density = "default", invalid, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          density === "default" ? "sa-textarea" : cn(inputClass(density), "resize-none"),
          className,
        )}
        {...props}
      />
    );
  },
);
