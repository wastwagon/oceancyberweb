import type { Metadata } from "next";
import { StartupAgencyHomeClassic } from "@/components/startup-agency/StartupAgencyHomeClassic";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { buildTrustBlurb } from "@/lib/trust/review-trust";
import { getHomeTrustContent } from "@/lib/trust/home-trust";

/** ISR: avoid serving a year-stale HTML shell from CDN/Next after deploys (see next/cache + s-maxage). */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return {
    title: {
      absolute: "Best web design company in Accra, Ghana | OceanCyber",
    },
    description: `Best web design company in Accra, Ghana. Websites from GHS 6,000, mobile apps from GHS 12,000, cybersecurity from GHS 4,500. ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}. ${reviewsOnly}.`,
    alternates: {
      canonical: "/",
    },
  };
}

/** Active homepage — classic lime Startup Agency shell. */
export default async function Home() {
  const homeTrust = await getHomeTrustContent();
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={serviceImages.webDevelopment}
        media="(min-width: 768px)"
      />
      <StartupAgencyHomeClassic homeTrust={homeTrust} />
    </>
  );
}
