import { withCanonical } from "@/lib/seo/canonical";
import type { Metadata } from "next";

export const metadata: Metadata = withCanonical(
  {
    title: "Domain names in Ghana",
    description:
      "Search domain availability and add SSL or hosting. Checkout in Ghana cedis with Paystack.",
  },
  "/domains",
);

export default function DomainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
