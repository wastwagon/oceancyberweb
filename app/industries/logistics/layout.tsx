import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("logistics");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "logistics",
  description: industry?.description,
  alternates: { canonical: "/industries/logistics" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
