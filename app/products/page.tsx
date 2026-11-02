import type { Metadata } from "next";
import { ProductsHubPage } from "@/components/products/ProductsHubPage";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { withCanonical } from "@/lib/seo/canonical";
import {
  DWUMAPOS_SEO_LINK_PLAIN,
} from "@/lib/marketing/company-identity";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return withCanonical(
    {
      title: "Domains, SSL, hosting & DwumaPOS",
      description: `Register domains, SSL, and cPanel hosting in Ghana cedis. ${DWUMAPOS_SEO_LINK_PLAIN} ${reviewsOnly}.`,
      openGraph: {
        title: "Products · domains, hosting & DwumaPOS | OceanCyber",
        description: `Domains, SSL, and hosting on OceanCyber. ${DWUMAPOS_SEO_LINK_PLAIN}`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Products · OceanCyber",
        description:
          "Domains, SSL, hosting in GHS. DwumaPOS for Ghana shops on dwumapos.com.",
      },
    },
    "/products",
  );
}

export default function ProductsPage() {
  return <ProductsHubPage />;
}
