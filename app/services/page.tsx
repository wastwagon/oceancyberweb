import type { Metadata } from "next";
import { ServicesHubPage } from "@/components/services/ServicesHubPage";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Web, mobile, and cybersecurity services in Accra, Ghana",
    description:
      "Web, mobile, ecommerce, UI/UX, cybersecurity, and hosting from OceanCyber in Accra — fixed GHS packages from GHS 6,000. Accra and Ghana local guides linked on the hub.",
  },
  "/services",
);

export default function ServicesPage() {
  return <ServicesHubPage />;
}
