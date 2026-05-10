import type { Metadata } from "next";
import { RequireClientSession } from "@/components/auth/RequireClientSession";
import { appShellNoIndexMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...appShellNoIndexMetadata(),
  title: {
    default: "Control Center",
    template: "%s · Control Center | OceanCyber",
  },
  description: "Secure gateway for billing, infrastructure management, and project collaboration.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireClientSession>{children}</RequireClientSession>;
}
