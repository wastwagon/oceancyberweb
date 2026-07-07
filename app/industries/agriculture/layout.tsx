import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agriculture & AgriTech",
  description:
    "Farmer apps, agri marketplaces, and traceability platforms for Africa — OceanCyber.",
  alternates: { canonical: "/industries/agriculture" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
