import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StartupAgencyNavbar } from "@/components/startup-agency/StartupAgencyNavbar";
import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatBot } from "@/components/ui/ChatBot";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { WebVitals } from "@/components/analytics/WebVitals";
import { AppProviders } from "@/components/providers/AppProviders";
import { CreativeEnhancements } from "@/components/shared/CreativeEnhancements";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "OceanCyber | Engineering Digital Products that Scale",
    template: "%s | OceanCyber",
  },
  description:
    "We build and secure high-performance digital products for teams across Ghana. From GH¢3T MoMo ecosystems to zero-trust security — we ship solid code with zero fluff.",
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
    title: "OceanCyber | Engineering Digital Products that Scale",
    description:
      "No-fluff engineering for Ghanaian businesses. We build secure, scalable web and mobile platforms that actually work.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OceanCyber Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OceanCyber | Engineering Digital Products that Scale",
    description:
      "No-fluff engineering for Ghanaian businesses. We build secure, scalable web and mobile platforms that actually work.",
    images: ["/images/og-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#00F3FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="sa-shell min-h-screen font-sans antialiased">
        <AppProviders>
          <CreativeEnhancements />
          <OrganizationJsonLd />
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
