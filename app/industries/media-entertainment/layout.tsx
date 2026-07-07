import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Entertainment",
  description:
    "Streaming, content platforms, and fan apps for media brands — OceanCyber, Accra.",
  alternates: { canonical: "/industries/media-entertainment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
