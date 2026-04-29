import type { Metadata } from "next";
import { privateSurfaceMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...privateSurfaceMetadata("/checkout/renewal"),
  title: "Renewal checkout",
};

export default function CheckoutRenewalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
