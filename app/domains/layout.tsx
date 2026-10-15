import { withCanonical } from "@/lib/seo/canonical";
import { serviceImages } from "@/lib/startup-agency/service-images";
import type { Metadata } from "next";

const title = "Buy a domain name in Ghana";
const description =
  "Register a domain in Ghana. Search availability, add SSL or hosting, and pay in GHS with Paystack. Accra support from OceanCyber.";

export const metadata: Metadata = withCanonical(
  {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/domains",
      images: [
        {
          url: serviceImages.cloudHosting,
          alt: "Domain registration and hosting for Ghana businesses",
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
  "/domains",
);

export default function DomainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
