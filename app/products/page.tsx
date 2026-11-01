import type { Metadata } from "next";
import { ProductsHubPage } from "@/components/products/ProductsHubPage";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { withCanonical } from "@/lib/seo/canonical";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return withCanonical(
    {
      title: "Domains, SSL, hosting & DwumaPOS",
      description: `Register domains, SSL, and cPanel hosting in Ghana cedis. DwumaPOS — POS, online shop, and delivery from GHS 149/mo. ${reviewsOnly}.`,
      openGraph: {
        title: "Products · domains, hosting & DwumaPOS | OceanCyber",
        description:
          "Domains, SSL, and hosting on OceanCyber. DwumaPOS flagship POS for Ghana shops on dwumapos.com.",
      },
      twitter: {
        card: "summary_large_image",
        title: "Products · OceanCyber",
        description:
          "Domains, SSL, hosting in GHS. DwumaPOS POS for Ghana shops on dwumapos.com.",
      },
    },
    "/products",
  );
}

export default function ProductsPage() {
  return <ProductsHubPage />;
}
