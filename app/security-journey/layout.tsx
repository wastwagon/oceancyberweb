import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security programmes in Ghana",
  description:
    "A phased way to assess risk, harden systems, and keep them secure. Based in Accra.",
  alternates: { canonical: "/security-journey" },
};

export default function SecurityJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
