import type { Metadata } from "next";
import { appShellNoIndexMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...appShellNoIndexMetadata(),
  title: {
    default: "Dashboard",
    template: "%s · Dashboard | OceanCyber",
  },
  description: "Billing, renewals, wallet, and project requests for your OceanCyber account.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
