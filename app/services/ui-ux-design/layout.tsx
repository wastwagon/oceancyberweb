import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { buildServiceLayoutMetadata } from "@/lib/seo/service-layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceLayoutMetadata("/services/ui-ux-design", "UI/UX and brand design services", {
    alternates: { canonical: "/services/ui-ux-design" },
  });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/ui-ux-design">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
