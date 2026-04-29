import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security journey",
  description:
    "A phased approach to assessing risk, hardening systems, and sustaining secure operations.",
  alternates: { canonical: "/security-journey" },
};

export default function SecurityJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
