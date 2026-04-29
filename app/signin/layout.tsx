import type { Metadata } from "next";
import { privateSurfaceMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...privateSurfaceMetadata("/signin"),
  title: "Sign in",
  description: "Sign in to your OceanCyber account for billing, renewals, and services.",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
