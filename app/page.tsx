import type { Metadata } from "next";
import { StartupAgencyHomeClassic } from "@/components/startup-agency/StartupAgencyHomeClassic";
import { serviceImages } from "@/lib/startup-agency/service-images";

/** ISR: avoid serving a year-stale HTML shell from CDN/Next after deploys (see next/cache + s-maxage). */
export const revalidate = 300;

export const metadata: Metadata = {
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
