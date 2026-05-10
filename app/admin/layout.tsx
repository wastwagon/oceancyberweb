import type { Metadata } from "next";
import { RequireClientSession } from "@/components/auth/RequireClientSession";
import { appShellNoIndexMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...appShellNoIndexMetadata(),
  title: {
    default: "Command Center",
    template: "%s · Command Center | OceanCyber",
  },
  description: "Internal operational control and project lifecycle management hub.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireClientSession requireAdmin>{children}</RequireClientSession>;
}
