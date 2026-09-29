import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("tourism");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "tourism",
  description: industry?.description,
  alternates: { canonical: "/industries/tourism" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
