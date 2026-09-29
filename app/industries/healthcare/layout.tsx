import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("healthcare");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "healthcare",
  description: industry?.description,
  alternates: { canonical: "/industries/healthcare" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
