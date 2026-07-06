import type { Metadata } from "next";
import { StartupAgencyHome } from "@/components/startup-agency/StartupAgencyHome";
import { getClientLogoEntries } from "@/lib/data/client-logos-loader";

/** ISR: avoid serving a year-stale HTML shell from CDN/Next after deploys (see next/cache + s-maxage). */
export const revalidate = 300;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const clientLogos = await getClientLogoEntries();
  return <StartupAgencyHome clientLogos={clientLogos} />;
}
