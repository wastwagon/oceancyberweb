import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Detailed case studies with scope, technical approach, and outcomes across OceanCyber engagements.",
  alternates: { canonical: "/portfolio" },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
