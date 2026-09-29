import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "inline" | "stack" | "compact";
  className?: string;
  /** When true, show Get started as the primary action. */
  showQuote?: boolean;
  /** Hide the Get started text link. Use on the intake page itself. */
  omitStart?: boolean;
};

/**
 * Shared pricing → next-step links.
 * Hierarchy: Get started (primary) → packages → estimator → talk to team.
 */
export function PricingPathsLinks({
  variant = "inline",
  className,
  showQuote = false,
  omitStart = false,
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
        {omitStart ? null : (
          <>
            {" · "}
            <Link href="/get-started" className="text-sa-primary hover:underline">
              Get started
            </Link>
          </>
        )}
      </p>
    );
  }

  const links = (
    <>
      {showQuote ? (
        <Link
          href="/get-started"
          className={
            variant === "stack"
              ? "sa-btn-primary w-full min-h-[44px]"
              : "sa-btn-primary min-h-11 px-5 text-sm"
          }
        >
          Get started
        </Link>
      ) : null}
      <Link
        href="/pricing"
        className={
          variant === "stack"
            ? "sa-btn-outline w-full min-h-[44px]"
            : "inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
        }
      >
        Compare packages
      </Link>
      <Link
        href="/tools/project-cost"
        className={
          variant === "stack"
            ? "sa-btn-outline w-full min-h-[44px]"
            : "inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
        }
      >
        Estimate in GHS
      </Link>
      {showQuote ? (
        <Link
          href="/contact"
          className={
            variant === "stack"
              ? "sa-btn-outline w-full min-h-[44px]"
              : "inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
          }
        >
          Talk to our team
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
