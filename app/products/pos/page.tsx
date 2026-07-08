import type { Metadata } from "next";
import { PosProductPage } from "@/components/products/PosProductPage";
import { posProduct } from "@/lib/data/products-catalog";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "OceanCyber POS",
    description:
      "Ghana-ready SaaS point of sale — self-register, connect Paystack or Hubtel, or use cash and manual MoMo. From GHS 99/mo with 14-day trial.",
  },
  "/products/pos",
);

export default function PosProductRoutePage() {
  return <PosProductPage product={posProduct} />;
}
