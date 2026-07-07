import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate & Property",
  description:
    "Property listings, tenant portals, and real estate platforms in Ghana — OceanCyber.",
  alternates: { canonical: "/industries/real-estate" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
