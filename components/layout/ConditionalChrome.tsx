"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppTopBar } from "@/components/app/AppTopBar";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { isAppRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

const MOBILE_QUICK_BAR_EXCLUDED = ["/signin", "/signup"] as const;

/** Pages that own their own footer + tab bar (avoid double chrome). */
function ownsOwnChrome(pathname: string) {
  return pathname === "/" || pathname === "/home-creative";
}

function shouldShowMobileQuickBar(pathname: string, appRoute: boolean, selfChrome: boolean) {
  if (appRoute || selfChrome) return false;
  return !MOBILE_QUICK_BAR_EXCLUDED.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * Marketing chrome on public pages; minimal workspace shell on `/dashboard` and `/admin`.
 * `/` and `/home-creative` render their own footer + tab bar — layout skips those.
 */
export function ConditionalChrome({
  header,
  footer,
  scrollToTop,
  chatBot,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  scrollToTop: ReactNode;
  chatBot: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const appRoute = isAppRoute(pathname);
  const selfChrome = ownsOwnChrome(pathname);
  const showMobileQuickBar = shouldShowMobileQuickBar(pathname, appRoute, selfChrome);

  if (appRoute) {
    return (
      <div className="sa-workspace-shell flex min-h-screen flex-col">
        <AppTopBar />
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  if (selfChrome) {
    // Shell pages own `<main>` — do not wrap again (avoids nested landmarks).
    return (
      <>
        {header}
        {children}
        {scrollToTop}
        {chatBot}
      </>
    );
  }

  return (
    <>
      {header}
      {/* Pages/components own `<main>` when they need a landmark; avoid nesting. */}
      <div
        className={cn(
          "flex-1 md:pt-36",
          showMobileQuickBar && "sa-mobile-tab-pad md:pb-0",
        )}
      >
        {children}
      </div>
      {footer}
      {scrollToTop}
      {chatBot}
      {showMobileQuickBar ? <StartupAgencyMobileQuickBar /> : null}
    </>
  );
}
