import type { Metadata } from "next";
import { ProductsHubPage } from "@/components/products/ProductsHubPage";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "OceanCyber POS and software",
    description:
      "OceanCyber POS is subscription software for retail and hospitality in Ghana. Start a trial, or ask the company to build a custom platform.",
  },
  "/products",
);

export default function ProductsPage() {
  return <ProductsHubPage />;
}
