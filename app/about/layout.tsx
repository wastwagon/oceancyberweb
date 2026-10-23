import type { Metadata } from "next";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return {
    title: "About OceanCyber in Accra",
    description: `Accra web, mobile, and security company since ${googleBusinessProfile.foundedYear}. ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}. ${reviewsOnly}.`,
    alternates: { canonical: "/about" },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
