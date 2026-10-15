import type { Metadata } from "next";
import { StartupAgencyHomeClassic } from "@/components/startup-agency/StartupAgencyHomeClassic";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

/** ISR: avoid serving a year-stale HTML shell from CDN/Next after deploys (see next/cache + s-maxage). */
export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "Best web design company in Accra and Ghana | OceanCyber",
  },
  description: `Best web design company in Accra and Ghana. Websites from GHS 6,000, mobile apps from GHS 12,000, cybersecurity from GHS 4,500. ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}, rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews.`,
  alternates: {
    canonical: "/",
  },
};

/** Active homepage — classic lime Startup Agency shell. */
export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={serviceImages.webDevelopment}
        media="(min-width: 768px)"
      />
      <StartupAgencyHomeClassic />
    </>
  );
}
