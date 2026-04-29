import type { Metadata } from "next";
import { privateSurfaceMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...privateSurfaceMetadata("/checkout/cart"),
  title: "Cart",
};

export default function CheckoutCartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
