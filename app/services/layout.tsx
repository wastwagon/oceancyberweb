import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Web and mobile development in Ghana",
    template: "%s | OceanCyber",
  },
  description:
    "Web, mobile apps, e-commerce, UI/UX, cybersecurity, and hosting for teams in Ghana. Packages start from GHS 6,000, with clear milestones and billing in Ghana cedis.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
