import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/services/website-to-mobile-app" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/website-to-mobile-app">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
