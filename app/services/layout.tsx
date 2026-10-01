import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Best web and mobile development in Accra and Ghana",
    template: "%s | OceanCyber",
  },
  description:
    "Best web design, mobile apps, e-commerce, and cybersecurity in Accra and Ghana. Packages start from GHS 6,000. Rated 4.9 from 54 Google reviews.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
