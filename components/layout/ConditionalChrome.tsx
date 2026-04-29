"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides OceanCyber chrome on `/` where the Webflow “Start-Up Agencyy” template is embedded as the homepage.
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
  const hideChrome = pathname === "/";

  if (hideChrome) {
    return (
      <main className="flex w-full min-h-0 flex-1 flex-col">{children}</main>
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
