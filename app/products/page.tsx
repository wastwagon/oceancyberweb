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
      title: "Domains, SSL, and hosting",
      description: `Register a domain, SSL, or cPanel hosting in Ghana cedis (Paystack). ${reviewsOnly}.`,
    },
    "/products",
  );
}

export default function ProductsPage() {
  return <ProductsHubPage />;
}
