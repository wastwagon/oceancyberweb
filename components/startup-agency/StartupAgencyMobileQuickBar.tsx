"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/commerce/CartProvider";

const quickActions = [
  { label: "Domains", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Checkout", href: "/checkout/cart" },
] as const;

export function StartupAgencyMobileQuickBar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (itemCount <= 0) return;
    setAnimateBadge(true);
    const timeoutId = window.setTimeout(() => setAnimateBadge(false), 420);
    return () => window.clearTimeout(timeoutId);
  }, [itemCount]);

  function isActive(href: string): boolean {
    if (href === "/checkout/cart") {
      return pathname.startsWith("/checkout");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[140] border-t border-sa-border bg-black/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur-sm md:hidden">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`inline-flex min-h-[42px] items-center justify-center rounded-lg border px-2 text-center font-heading text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 ${
              isActive(action.href)
                ? "border-sa-primary bg-sa-primary/15 text-sa-primary"
                : "border-sa-border bg-sa-surface/70 text-white hover:border-sa-primary hover:text-sa-primary"
            }`}
            aria-current={isActive(action.href) ? "page" : undefined}
          >
            {action.label}
            {action.href === "/checkout/cart" && itemCount > 0 ? (
              <span
                className={`ml-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-sa-primary px-1.5 text-[9px] font-bold leading-4 text-sa-bg transition ${
                  animateBadge ? "scale-110" : "scale-100"
                }`}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
