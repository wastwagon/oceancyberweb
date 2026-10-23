import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security consulting journey in Ghana",
  description:
    "How OceanCyber runs security consulting — assessment, remediation, and review cadence from Accra. Not MSSP or 24/7 SOC services.",
  alternates: { canonical: "/security-journey" },
};

export default function SecurityJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
