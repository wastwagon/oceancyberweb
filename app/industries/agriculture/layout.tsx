import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("agriculture");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "agriculture",
  description: industry?.description,
  alternates: { canonical: "/industries/agriculture" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
