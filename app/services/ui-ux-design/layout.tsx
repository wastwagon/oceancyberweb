import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";

export const metadata: Metadata = {
  title: "UI and brand design services",
  description:
    "UI/UX design, brand identity, and Figma prototypes from GHS 3,500. Hire-focused Accra page: /services/ui-ux-design-in-accra.",
  alternates: { canonical: "/services/ui-ux-design" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLayoutWithJsonLd path="/services/ui-ux-design">
      {children}
    </ServiceLayoutWithJsonLd>
  );
}
