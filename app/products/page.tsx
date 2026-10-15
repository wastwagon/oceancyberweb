import type { Metadata } from "next";
import { ProductsHubPage } from "@/components/products/ProductsHubPage";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Domains, SSL, and hosting",
    description:
      "Register a domain, buy an SSL certificate, or start cPanel hosting. Prices are in Ghana cedis, paid with Paystack.",
  },
  "/products",
);

export default function ProductsPage() {
  return <ProductsHubPage />;
}
