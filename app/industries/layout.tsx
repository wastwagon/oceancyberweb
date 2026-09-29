import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Industries we build for",
    template: "%s | OceanCyber",
  },
  description:
    "How OceanCyber builds software for financial services, healthcare, retail, education, and other industries in Ghana.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
