import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const seo = getServicePageSeo("/services/website-to-mobile-app");

export const metadata: Metadata = {
  title: "Website to mobile app in Ghana",
  description: seo?.description,
  alternates: { canonical: "/services/website-to-mobile-app" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/website-to-mobile-app">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
