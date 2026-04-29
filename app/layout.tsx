import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatBot } from "@/components/ui/ChatBot";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { WebVitals } from "@/components/analytics/WebVitals";
import { AppProviders } from "@/components/providers/AppProviders";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "OceanCyber | Web & Mobile App Development in Ghana",
    template: "%s | OceanCyber",
  },
  description:
    "Web and mobile app development partner in Ghana. We design, build, and secure digital products for teams across multiple industries.",
  keywords: [
    "web development Ghana",
    "mobile app development Accra",
    "IT services Ghana",
    "digital transformation Ghana",
    "website design Accra",
    "software development Ghana",
  ],
  authors: [{ name: "OceanCyber" }],
  creator: "OceanCyber",
  publisher: "OceanCyber",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://oceancyber.net",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://oceancyber.net",
    siteName: "OceanCyber",
    title: "OceanCyber | Web & Mobile App Development in Ghana",
    description:
      "We help teams in Ghana design, build, and secure digital products with clear delivery and local support.",
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
    title: "OceanCyber | Web & Mobile App Development in Ghana",
    description:
      "We help teams in Ghana design, build, and secure digital products with clear delivery and local support.",
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
};

export const viewport: Viewport = {
  themeColor: "#0066CC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProviders>
          <OrganizationJsonLd />
          <WebVitals />
          <Header />
          <main className="flex-1 pt-24 lg:pt-36">{children}</main>
          <Footer />
          <ScrollToTop />
          <ChatBot />
        </AppProviders>
      </body>
    </html>
  );
}
