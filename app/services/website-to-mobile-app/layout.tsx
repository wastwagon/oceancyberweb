import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { buildServiceLayoutMetadata } from "@/lib/seo/service-layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceLayoutMetadata("/services/website-to-mobile-app", "Website to mobile app", {
    alternates: { canonical: "/services/website-to-mobile-app" },
  });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/website-to-mobile-app">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
