import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const saButtonVariants = cva("", {
  variants: {
    variant: {
      primary: "sa-btn-primary",
      outline: "sa-btn-outline",
      secondary: "sa-btn-secondary",
    },
    size: {
      default: "",
      lg: "min-h-[56px]",
      sm: "min-h-[44px] px-5 text-xs",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type SaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof saButtonVariants>;

export const SaButton = forwardRef<HTMLButtonElement, SaButtonProps>(
  function SaButton({ className, variant, size, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(saButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { saButtonVariants };
