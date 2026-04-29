import type { Metadata } from "next";
import { StartupAgencyHome } from "@/components/startup-agency/StartupAgencyHome";

/** ISR: avoid serving a year-stale HTML shell from CDN/Next after deploys (see next/cache + s-maxage). */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "OceanCyber | Web & Mobile App Development in Ghana",
  description:
    "Web and mobile app development partner in Ghana. Modern delivery, clear milestones, and local support — homepage styled in the Start-Up Agency visual language.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <StartupAgencyHome />;
}
