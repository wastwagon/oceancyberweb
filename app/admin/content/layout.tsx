import type { Metadata } from "next";
import { privateSurfaceMetadata } from "@/lib/seo/canonical";

export const metadata: Metadata = {
  ...privateSurfaceMetadata("/admin/content"),
  title: "Content",
  description: "Manage marketing and site content.",
};

export default function AdminContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
