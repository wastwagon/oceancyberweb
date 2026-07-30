import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const saBadgeVariants = cva("sa-badge", {
  variants: {
    variant: {
      primary: "sa-badge-primary",
      muted: "sa-badge-muted",
      danger: "sa-badge-danger",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type SaBadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof saBadgeVariants> & {
    children: ReactNode;
  };

export function SaBadge({ className, variant, children, ...props }: SaBadgeProps) {
  return (
    <span className={cn(saBadgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { saBadgeVariants };
