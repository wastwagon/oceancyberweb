import type { Metadata } from "next";
import { ServicesHubPage } from "@/components/services/ServicesHubPage";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Web, mobile, and cybersecurity services in Accra and Ghana",
    description:
      "Service hub for OceanCyber: web design, web development, mobile apps, ecommerce, cybersecurity, and UI/UX. Packages from GHS 6,000. Hire pages for Accra and Ghana linked below.",
  },
  "/services",
);

export default function ServicesPage() {
  return <ServicesHubPage />;
}
