import type { Metadata } from "next";
import { CreativeAgencyHome } from "@/components/creative-agency/CreativeAgencyHome";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Creative Agency home (preview)",
  description:
    "Aeolla-inspired Creative Agency homepage preview — not the live site home.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/home-creative" },
};

/**
 * WIP Aeolla “01_Creative agency” homepage.
 * Live site home is classic at `/`.
 */
export default function HomeCreativePage() {
  return <CreativeAgencyHome />;
}
