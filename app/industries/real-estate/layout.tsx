import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("real-estate");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "real-estate",
  description: industry?.description,
  alternates: { canonical: "/industries/real-estate" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
