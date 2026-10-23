import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { buildServiceLayoutMetadata } from "@/lib/seo/service-layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceLayoutMetadata("/services/web-development", "Web development services", {
    alternates: { canonical: "/services/web-development" },
  });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/web-development">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
