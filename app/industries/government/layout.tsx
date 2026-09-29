import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("government");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "government",
  description: industry?.description,
  alternates: { canonical: "/industries/government" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
