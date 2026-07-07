"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppTopBar } from "@/components/app/AppTopBar";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { isAppRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

const MOBILE_QUICK_BAR_EXCLUDED = ["/signin", "/signup"] as const;

function shouldShowMobileQuickBar(pathname: string, appRoute: boolean, homepage: boolean) {
  if (appRoute || homepage) return false;
  return !MOBILE_QUICK_BAR_EXCLUDED.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * Marketing chrome on public pages; minimal workspace shell on `/dashboard` and `/admin`.
 * Homepage (`/`) hides footer only — it renders its own footer in-page.
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
  const homepage = pathname === "/";
  const showMobileQuickBar = shouldShowMobileQuickBar(pathname, appRoute, homepage);

  if (appRoute) {
    return (
      <div className="sa-workspace-shell flex min-h-screen flex-col">
        <AppTopBar />
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  if (homepage) {
    return (
      <>
        {header}
        <main className="flex w-full min-h-0 flex-1 flex-col">{children}</main>
        {scrollToTop}
        {chatBot}
      </>
    );
  }

  return (
    <>
      {header}
      <main
        className={cn(
          "flex-1 md:pt-36",
          showMobileQuickBar && "sa-mobile-tab-pad md:pb-0",
        )}
      >
        {children}
      </main>
      {footer}
      {scrollToTop}
      {chatBot}
      {showMobileQuickBar ? <StartupAgencyMobileQuickBar /> : null}
    </>
  );
}
