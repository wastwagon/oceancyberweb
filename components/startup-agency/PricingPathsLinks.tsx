import Link from "next/link";
import { SITE_CTA } from "@/lib/marketing/site-cta";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "inline" | "stack" | "compact";
  className?: string;
};

/** Pricing context links — packages and estimator (intake lives on tab bar / page CTAs). */
export function PricingPathsLinks({
  variant = "inline",
  className,
}: Props) {
  if (variant === "compact") {
    return (
      <p className={cn("text-sm text-sa-muted/80", className)}>
        Packages from{" "}
        <Link href="/pricing#startup" className="sa-text-link">
          GHS 6,000
        </Link>
        .{" "}
        <Link href="/pricing" className="sa-text-link font-medium">
          Compare tiers
        </Link>
        {" · "}
        <Link href="/tools/project-cost" className="sa-text-link font-medium">
          Estimate scope
        </Link>
      </p>
    );
  }

  const links = (
    <>
      <Link
        href={SITE_CTA.comparePackages.href}
        className={
          variant === "stack"
            ? "sa-btn-outline w-full min-h-[44px]"
            : "inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline underline-offset-4 hover:text-white"
        }
      >
        {SITE_CTA.comparePackages.label}
      </Link>
      <Link
        href={SITE_CTA.estimateInCedis.href}
        className={
          variant === "stack"
            ? "sa-btn-outline w-full min-h-[44px]"
            : "inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline underline-offset-4 hover:text-white"
        }
      >
        {SITE_CTA.estimateInCedis.label}
      </Link>
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
