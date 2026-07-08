"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookieConsent, setCookieConsent } from "@/lib/analytics/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  function accept() {
    setCookieConsent("accepted");
    setVisible(false);
  }

  function decline() {
    setCookieConsent("declined");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-sa-border bg-sa-surface/95 p-4 shadow-2xl backdrop-blur-md md:p-5"
    >
      <div className="sa-container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-consent-title" className="font-heading text-sm font-bold text-white">
            Cookies & analytics
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm leading-relaxed text-sa-muted">
            We use essential cookies for security and optional analytics to improve the site. See our{" "}
            <Link href="/cookies" className="text-sa-primary underline-offset-2 hover:underline">
              cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={decline}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border px-5 text-xs font-semibold uppercase tracking-wider text-sa-muted transition hover:border-white/30 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="sa-btn-primary min-h-[44px] px-5 text-xs"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
