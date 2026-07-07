"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Briefcase, Mail, Rocket } from "lucide-react";
import { useCart } from "@/components/commerce/CartProvider";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Work", href: "/portfolio", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Start", href: "/get-started", icon: Rocket, primary: true },
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
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      className="sa-ios-tab-bar"
      aria-label="Quick navigation"
      data-app-print-hide-chrome
    >
      <div className="mx-auto grid w-full max-w-lg grid-cols-3 px-2 pt-1.5">
        {quickActions.map((action) => {
          const active = isActive(action.href);
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className={cn(
                "sa-pressable relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium leading-none transition-colors",
                active
                  ? "text-sa-primary"
                  : "text-white/55",
                "primary" in action && action.primary && !active && "text-sa-primary/90",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <Icon
                  className={cn("h-[22px] w-[22px]", active && "stroke-[2.25px]")}
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden
                />
                {action.href === "/get-started" && itemCount > 0 ? (
                  <span
                    className={cn(
                      "absolute -right-2 -top-1 inline-flex min-w-[16px] items-center justify-center rounded-full bg-sa-primary px-1 text-[9px] font-bold leading-4 text-sa-bg transition",
                      animateBadge ? "scale-110" : "scale-100",
                    )}
                    title={`${itemCount} item(s) in cart`}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                ) : null}
              </span>
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
