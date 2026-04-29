import type { Metadata } from "next";
import { privateSurfaceMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...privateSurfaceMetadata("/signup"),
  title: "Create account",
  description: "Create an OceanCyber account to manage domains, hosting, and billing.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
