import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("retail");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "retail",
  description: industry?.description,
  alternates: { canonical: "/industries/retail" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
