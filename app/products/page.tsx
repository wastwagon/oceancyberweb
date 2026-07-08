import type { Metadata } from "next";
import { ProductsHubPage } from "@/components/products/ProductsHubPage";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Products",
    description:
      "OceanCyber subscription software — OceanCyber POS for Ghanaian retail and hospitality. Self-serve signup, your own MoMo keys, or offline payments.",
  },
  "/products",
);

export default function ProductsPage() {
  return <ProductsHubPage />;
}
