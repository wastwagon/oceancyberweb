import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile apps, e‑commerce, cybersecurity, and hosting — scoped delivery with clear milestones.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
