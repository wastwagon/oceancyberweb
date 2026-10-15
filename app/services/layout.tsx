import type { Metadata } from "next";

/**
 * Hub-only defaults. Do NOT set alternates.canonical here — child routes
 * (/services/web-development, geo pages, etc.) must own their own canonicals.
 * Forcing /services as canonical on this layout risks consolidating the whole
 * subtree onto the hub in Google.
 */
export const metadata: Metadata = {
  title: {
    default: "Web, mobile, and cybersecurity services in Accra and Ghana",
    template: "%s | OceanCyber",
  },
  description:
    "Web design, development, mobile apps, ecommerce, and cybersecurity for Accra and Ghana. Packages from GHS 6,000. Rated 4.9 from 54 Google reviews.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
