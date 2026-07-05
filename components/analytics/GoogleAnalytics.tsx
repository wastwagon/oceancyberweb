import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/analytics";

/** Loads GA4 when `NEXT_PUBLIC_GA_ID` is set (Coolify build arg + runtime env). */
export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
