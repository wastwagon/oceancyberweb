import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OceanCyber in Accra",
  description:
    "OceanCyber is an Accra company. See how the team designs, builds, and supports web, mobile, and security work.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
