import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("energy");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "energy",
  description: industry?.description,
  alternates: { canonical: "/industries/energy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
