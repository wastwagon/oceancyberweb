import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { buildServiceLayoutMetadata } from "@/lib/seo/service-layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceLayoutMetadata("/services/cybersecurity", "Security consulting services", {
    alternates: { canonical: "/services/cybersecurity" },
  });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/cybersecurity">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
