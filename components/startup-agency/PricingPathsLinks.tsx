import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "inline" | "stack" | "compact";
  className?: string;
  showQuote?: boolean;
};

export function PricingPathsLinks({
  variant = "inline",
  className,
  showQuote = false,
}: Props) {
  if (variant === "compact") {
    return (
      <p className={cn("text-sm text-sa-muted/80", className)}>
        Packages from{" "}
        <Link href="/pricing#startup" className="font-semibold text-sa-primary hover:underline">
          GHS 6,000
        </Link>
        .{" "}
        <Link href="/pricing" className="text-sa-primary hover:underline">
          Compare tiers
        </Link>
        {" · "}
        <Link href="/tools/project-cost" className="text-sa-primary hover:underline">
          Estimate scope
        </Link>
      </p>
    );
  }

  const links = (
    <>
      <Link
        href="/pricing"
        className={
          variant === "stack"
            ? "sa-btn-outline w-full min-h-[44px]"
            : "sa-btn-outline min-h-[44px] px-5 text-xs"
        }
      >
        Compare packages
      </Link>
      <Link
        href="/tools/project-cost"
        className={
          variant === "stack"
            ? "sa-btn-outline w-full min-h-[44px]"
            : "sa-btn-outline min-h-[44px] px-5 text-xs"
        }
      >
        Estimate in GHS
      </Link>
      {showQuote ? (
        <Link
          href="/contact"
          className={
            variant === "stack"
              ? "sa-btn-primary w-full min-h-[44px]"
              : "sa-btn-primary min-h-[44px] px-5 text-xs"
          }
        >
          Request formal quote
        </Link>
      ) : null}
    </>
  );

  return (
    <div
      className={cn(
        variant === "stack"
          ? "flex flex-col gap-3"
          : "flex flex-wrap justify-center gap-4",
        className,
      )}
    >
      {links}
    </div>
  );
}
