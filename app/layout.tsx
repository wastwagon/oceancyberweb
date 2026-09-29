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

const ChatBot = dynamic(
  () => import("@/components/ui/ChatBot").then((mod) => mod.ChatBot),
  { ssr: false },
);

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
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
    default: "OceanCyber | Web, mobile, and cybersecurity in Ghana",
    template: "%s | OceanCyber",
  },
  description:
    "OceanCyber designs and builds websites, mobile apps, and secure digital products for businesses in Accra and across Africa.",
  keywords: [
    "web development Ghana",
    "mobile app development Accra",
    "cybersecurity services Ghana",
    "e-commerce solutions West Africa",
    "software engineering Accra",
    "fintech development Ghana",
  ],
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
    title: "OceanCyber | Web, mobile, and cybersecurity in Ghana",
    description:
      "Websites, mobile apps, and cybersecurity for teams in Ghana. Clear scope, secure delivery, and local support from Accra.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OceanCyber Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OceanCyber | Web, mobile, and cybersecurity in Ghana",
    description:
      "Websites, mobile apps, and cybersecurity for teams in Ghana. Clear scope, secure delivery, and local support from Accra.",
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
