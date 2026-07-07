import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/services/cybersecurity" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/cybersecurity">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
