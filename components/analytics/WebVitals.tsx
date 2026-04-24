"use client";

import { useReportWebVitals } from "next/web-vitals";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug("[web-vitals]", metric.name, metric.value, metric.rating);
    }
    const gtag = (typeof window !== "undefined" ? (window as GtagWindow).gtag : undefined);
    if (gtag) {
      gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });
  return null;
}
