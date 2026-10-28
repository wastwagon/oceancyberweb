import type { Metadata } from "next";
import { ServicesHubPage } from "@/components/services/ServicesHubPage";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Web, mobile, and cybersecurity services in Accra, Ghana",
    description:
      "Service hub for OceanCyber: best web design and website development company in Accra, Ghana. Mobile apps, ecommerce, cybersecurity, and UI/UX from GHS 6,000. Accra and Ghana local pages linked below.",
  },
  "/services",
);

export default function ServicesPage() {
  return <ServicesHubPage />;
}
