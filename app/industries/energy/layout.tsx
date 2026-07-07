import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy & Utilities",
  description:
    "Utility billing, metering, and field operations software — OceanCyber, Ghana.",
  alternates: { canonical: "/industries/energy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
