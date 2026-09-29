import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("financial-services");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "financial-services",
  description: industry?.description,
  alternates: { canonical: "/industries/financial-services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
