import { withCanonical } from "@/lib/seo/canonical";
import { serviceImages } from "@/lib/startup-agency/service-images";
import type { Metadata } from "next";
import { ServiceLayoutWithJsonLd } from "@/components/seo/ServiceLayoutWithJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

const path = "/ssl";
const fallbackTitle = "Buy SSL certificates in Ghana, from GHS 45/yr";
const fallbackDescription =
  "PositiveSSL from GHS 45 a year — renews at the same list price. Wildcard and EV options. Pay in GHS with Paystack. Accra install help from OceanCyber.";

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
          alt: "SSL certificates for Ghana websites from OceanCyber",
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

export default async function SslLayout({ children }: { children: React.ReactNode }) {
  return <ServiceLayoutWithJsonLd path={path}>{children}</ServiceLayoutWithJsonLd>;
}
