"use client";

import Script from "next/script";
import { useEffect, useId, useState } from "react";
import { CALENDLY_URL, isCalendlyConfigured } from "@/lib/booking/calendly";

type CalendlyEmbedProps = {
  className?: string;
  minHeight?: number;
  /** Prefill query string, e.g. `name=Jane&email=jane@co.com` */
  prefill?: string;
};

export function CalendlyEmbed({
  className = "",
  minHeight = 680,
  prefill,
}: CalendlyEmbedProps) {
  const widgetId = useId().replace(/:/g, "");
  const [ready, setReady] = useState(false);

  const embedUrl = prefill
    ? `${CALENDLY_URL}?${prefill.replace(/^\?/, "")}`
    : CALENDLY_URL;

  useEffect(() => {
    if (!ready || !isCalendlyConfigured()) return;
    const w = window as Window & {
      Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
    };
    const parent = document.getElementById(widgetId);
    if (w.Calendly && parent) {
      parent.innerHTML = "";
      w.Calendly.initInlineWidget({ url: embedUrl, parentElement: parent });
    }
  }, [ready, embedUrl, widgetId]);

  if (!isCalendlyConfigured()) return null;

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
      />
      <div
        id={widgetId}
        className={`calendly-inline-widget overflow-hidden rounded-2xl border border-sa-border bg-sa-surface ${className}`}
        style={{ minWidth: 320, minHeight }}
        data-url={embedUrl}
      />
    </>
  );
}
