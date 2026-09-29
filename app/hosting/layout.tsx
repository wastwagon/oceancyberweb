import { withCanonical } from "@/lib/seo/canonical";
import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";

export const metadata: Metadata = withCanonical(
  {
    title: "Web hosting in Ghana",
    description:
      "cPanel hosting with SSL, backups, and support from Accra. Pay in Ghana cedis with Paystack.",
  },
  "/hosting",
);

export default function HostingLayout({ children }: { children: React.ReactNode }) {
  return <ServiceLayoutWithJsonLd path="/hosting">{children}</ServiceLayoutWithJsonLd>;
}
