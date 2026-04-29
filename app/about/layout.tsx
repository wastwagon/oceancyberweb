import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the OceanCyber team, our approach to delivery, and how we support teams in Ghana and the region.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
