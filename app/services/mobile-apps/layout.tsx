import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const seo = getServicePageSeo("/services/mobile-apps");

export const metadata: Metadata = {
  title: "Mobile app development in Ghana",
  description: seo?.description,
  alternates: { canonical: "/services/mobile-apps" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/mobile-apps">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
