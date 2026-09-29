import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const seo = getServicePageSeo("/services/ecommerce");

export const metadata: Metadata = {
  title: "E-commerce development in Ghana",
  description: seo?.description,
  alternates: { canonical: "/services/ecommerce" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/ecommerce">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
