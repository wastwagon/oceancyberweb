import type { Metadata } from "next";
import { appShellNoIndexMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...appShellNoIndexMetadata(),
  title: {
    default: "Admin",
    template: "%s · Admin | OceanCyber",
  },
  description: "OceanCyber internal administration.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
