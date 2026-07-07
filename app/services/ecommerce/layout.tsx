import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/services/ecommerce" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/ecommerce">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
