import { withCanonical } from "@/lib/seo/canonical";
import type { Metadata } from "next";

export const metadata: Metadata = withCanonical(
  {
    title: "cPanel & WHM hosting",
    description:
      "cPanel hosting in Ghana cedis on our Namecheap reseller + WHM stack—optional currency preview, Paystack checkout in GHS, local support from Accra.",
  },
  "/hosting",
);

export default function HostingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
