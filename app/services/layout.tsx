import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Web & Mobile Development in Ghana",
  description:
    "Web, mobile apps, e-commerce, UI/UX, cybersecurity, and hosting for Ghana teams — packages from GHS 6,000 with clear milestones and GHS billing.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
