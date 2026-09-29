import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("legal");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "legal",
  description: industry?.description,
  alternates: { canonical: "/industries/legal" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
