import type { Metadata } from "next";
import { getIndustryBySlug } from "@/lib/data/industries-catalog";

const industry = getIndustryBySlug("media-entertainment");

export const metadata: Metadata = {
  title: industry ? `${industry.title} software in Ghana` : "media-entertainment",
  description: industry?.description,
  alternates: { canonical: "/industries/media-entertainment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
