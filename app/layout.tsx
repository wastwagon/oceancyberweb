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
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { WebVitals } from "@/components/analytics/WebVitals";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAnalyticsRouteTracker } from "@/components/analytics/GoogleAnalyticsRouteTracker";
import { AppProviders } from "@/components/providers/AppProviders";
import { CreativeEnhancements } from "@/components/shared/CreativeEnhancements";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

const ChatBot = dynamic(
  () => import("@/components/ui/ChatBot").then((mod) => mod.ChatBot),
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

export const metadata: Metadata = {
  title: {
    default: "Best web design company in Accra and Ghana | OceanCyber",
    template: "%s | OceanCyber",
  },
  description:
    `Best web design company in Accra and Ghana. Websites from GHS 6,000, apps from GHS 12,000. ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}, rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews.`,
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
    title: "Best web design company in Accra and Ghana | OceanCyber",
    description:
      `Best web design company in Accra and Ghana. Websites from GHS 6,000, apps from GHS 12,000. Rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews at ${googleBusinessProfile.address.street}.`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Best web design company in Accra and Ghana — OceanCyber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best web design company in Accra and Ghana | OceanCyber",
    description:
      `Best web design company in Accra and Ghana. Websites from GHS 6,000, apps from GHS 12,000. Rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews.`,
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
      <body className="sa-shell min-h-screen font-sans antialiased" style={{ backgroundColor: "#000000", color: "#e9e9e9" }}>
        <GoogleAnalytics />
        <AppProviders>
          <Suspense fallback={null}>
            <GoogleAnalyticsRouteTracker />
          </Suspense>
          <CreativeEnhancements />
          <OrganizationJsonLd />
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
