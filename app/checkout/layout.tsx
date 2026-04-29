import type { Metadata } from "next";
import { appShellNoIndexMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...appShellNoIndexMetadata(),
  title: {
    default: "Checkout",
    template: "%s · Checkout | OceanCyber",
  },
  description: "Complete your OceanCyber order securely.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
