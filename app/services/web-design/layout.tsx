import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { buildServiceLayoutMetadata } from "@/lib/seo/service-layout-metadata";
import { ghanaServiceKeywords } from "@/lib/site-facts";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceLayoutMetadata("/services/web-design", "Web design services in Ghana", {
    keywords: [...ghanaServiceKeywords],
    alternates: { canonical: "/services/web-design" },
  });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/web-design">{children}</ServiceLayoutWithJsonLd>
  );
}
