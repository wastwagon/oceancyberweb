import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logistics & Supply Chain",
  description:
    "Fleet, warehouse, and last-mile software for logistics operators in Ghana — OceanCyber.",
  alternates: { canonical: "/industries/logistics" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
