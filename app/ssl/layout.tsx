import { withCanonical } from "@/lib/seo/canonical";
import { serviceImages } from "@/lib/startup-agency/service-images";
import type { Metadata } from "next";

const title = "Buy SSL certificates in Ghana, from GHS 45/yr";
const description =
  "PositiveSSL from GHS 45 a year — renews at the same list price. Wildcard and EV options. Pay in GHS with Paystack. Accra install help from OceanCyber.";

export const metadata: Metadata = withCanonical(
  {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/ssl",
      images: [
        {
          url: serviceImages.cloudHosting,
          alt: "SSL certificates for Ghana websites from OceanCyber",
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
  "/ssl",
);

export default function SslLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
