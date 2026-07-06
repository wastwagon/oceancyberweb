"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppTopBar } from "@/components/app/AppTopBar";
import { isAppRoute } from "@/lib/routes";

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
      <main className="flex-1 pt-24 lg:pt-36">{children}</main>
      {footer}
      {scrollToTop}
      {chatBot}
    </>
  );
}
