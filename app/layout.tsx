import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "OceanCyber - Ghana's Premier Tech Partner | Web & Mobile App Development",
    template: "%s | OceanCyber",
  },
  description: "Ghana's leading technology solutions provider. We deliver cutting-edge web design, mobile app development, IT consulting, and digital transformation services across 12+ industries.",
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
  metadataBase: new URL("https://oceancyber.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://oceancyber.net",
    siteName: "OceanCyber",
    title: "OceanCyber - Ghana's Premier Tech Partner",
    description: "Transforming Ghana's digital future with cutting-edge technology solutions",
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
    title: "OceanCyber - Ghana's Premier Tech Partner",
    description: "Transforming Ghana's digital future with cutting-edge technology solutions",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
