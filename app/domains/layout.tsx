import { withCanonical } from "@/lib/seo/canonical";
import { serviceImages } from "@/lib/startup-agency/service-images";
import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const path = "/domains";
const fallbackTitle = "Buy a domain name in Ghana";
const fallbackDescription =
  "Register a domain in Ghana. Search availability, add SSL or hosting, and pay in GHS with Paystack. Accra support from OceanCyber.";

export const metadata: Metadata = withCanonical(
  {
    title: getServicePageSeo(path)?.name ?? fallbackTitle,
    description: getServicePageSeo(path)?.description ?? fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      type: "website",
      url: path,
      images: [
        {
          url: serviceImages.cloudHosting,
          alt: "Domain registration and hosting for Ghana businesses",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDescription,
      images: [serviceImages.cloudHosting],
    },
  },
  path,
);

export default async function DomainsLayout({ children }: { children: React.ReactNode }) {
  return <ServiceLayoutWithJsonLd path={path}>{children}</ServiceLayoutWithJsonLd>;
}
