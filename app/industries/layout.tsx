import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "How OceanCyber serves financial services, healthcare, retail, education, and more.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
