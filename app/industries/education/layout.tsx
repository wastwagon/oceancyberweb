import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("education");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "education",
  description: industry?.description,
  alternates: { canonical: "/industries/education" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
