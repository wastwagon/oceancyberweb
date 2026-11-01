import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StartupAgencyNavbar } from "@/components/startup-agency/StartupAgencyNavbar";
import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { DwumaPosProductJsonLd } from "@/components/seo/DwumaPosProductJsonLd";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { WebVitals } from "@/components/analytics/WebVitals";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAnalyticsRouteTracker } from "@/components/analytics/GoogleAnalyticsRouteTracker";
import { AppProviders } from "@/components/providers/AppProviders";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import {
  OG_IMAGE_ALT,
  SITE_DEFAULT_TITLE,
  buildSiteMetaDescription,
} from "@/lib/marketing/agency-positioning";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

const ChatBot = dynamic(
  () => import("@/components/ui/ChatBot").then((mod) => mod.ChatBot),
  { ssr: false },
);

const CreativeEnhancements = dynamic(
  () =>
    import("@/components/shared/CreativeEnhancements").then(
      (mod) => mod.CreativeEnhancements,
    ),
  { ssr: false },
);

/** Body font: do not preload — frees bandwidth for Outfit (LCP text on mobile). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  const description = buildSiteMetaDescription({
    reviewsOnly,
    teamSize: googleBusinessProfile.teamSize,
    street: googleBusinessProfile.address.street,
  });

  return {
    title: {
      default: SITE_DEFAULT_TITLE,
      template: "%s | OceanCyber",
    },
    description,
    authors: [{ name: "OceanCyber" }],
    creator: "OceanCyber",
    publisher: "OceanCyber",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://oceancyber.net",
    ),
    openGraph: {
      type: "website",
      locale: "en_GH",
      url: "https://oceancyber.net",
      siteName: "OceanCyber",
      title: SITE_DEFAULT_TITLE,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_DEFAULT_TITLE,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE || undefined,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0c0c10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} style={{ backgroundColor: "#000000" }}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="OceanCyber — LLM-readable site summary"
        />
      </head>
      <body className="sa-shell min-h-screen font-sans antialiased" style={{ backgroundColor: "#000000", color: "#e9e9e9" }}>
        <GoogleAnalytics />
        <AppProviders>
          <Suspense fallback={null}>
            <GoogleAnalyticsRouteTracker />
          </Suspense>
          <CreativeEnhancements />
          <OrganizationJsonLd />
          <DwumaPosProductJsonLd />
          <LocalBusinessJsonLd />
          <WebSiteJsonLd />
          <WebVitals />
          <ConditionalChrome
            header={<StartupAgencyNavbar />}
            footer={<StartupAgencyFooter />}
            scrollToTop={<ScrollToTop />}
            chatBot={<ChatBot />}
          >
            {children}
          </ConditionalChrome>
        </AppProviders>
      </body>
    </html>
  );
}
