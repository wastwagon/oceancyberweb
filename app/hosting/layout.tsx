import { withCanonical } from "@/lib/seo/canonical";
import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { serviceImages } from "@/lib/startup-agency/service-images";

const title = "Web hosting in Ghana, from GHS 69/mo";
const description =
  "cPanel hosting with SSL, backups, and Accra support. Launch from GHS 69 a month. Pay in Ghana cedis with Paystack.";

export const metadata: Metadata = withCanonical(
  {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/hosting",
      images: [
        {
          url: serviceImages.cloudHosting,
          alt: "cPanel web hosting in Ghana from OceanCyber",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [serviceImages.cloudHosting],
    },
  },
  "/hosting",
);

export default function HostingLayout({ children }: { children: React.ReactNode }) {
  return <ServiceLayoutWithJsonLd path="/hosting">{children}</ServiceLayoutWithJsonLd>;
}
