import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const seo = getServicePageSeo("/services/web-development");

export const metadata: Metadata = {
  title: "Web development in Accra and Ghana",
  description: seo?.description,
  alternates: { canonical: "/services/web-development" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/web-development">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
