import type { Metadata } from "next";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

/**
 * Hub-only defaults. Do NOT set alternates.canonical here — child routes
 * (/services/web-development, geo pages, etc.) must own their own canonicals.
 */
export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return {
    title: {
      default: "Web, mobile, and cybersecurity services in Accra and Ghana",
      template: "%s | OceanCyber",
    },
    description: `Web design, development, mobile apps, ecommerce, and cybersecurity for Accra and Ghana. Packages from GHS 6,000. ${reviewsOnly}.`,
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
