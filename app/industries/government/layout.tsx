import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government & Public Sector",
  description:
    "Citizen portals, e-services, and secure public sector platforms — OceanCyber.",
  alternates: { canonical: "/industries/government" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
