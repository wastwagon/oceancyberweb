import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const seo = getServicePageSeo("/services/software-development");

export const metadata: Metadata = {
  title: "Software development services",
  description: seo?.description,
  alternates: { canonical: "/services/software-development" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/software-development">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
