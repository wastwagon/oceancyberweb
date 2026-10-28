import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  CREATIVE_HUB_LEGACY_TITLE,
  creativeHubLegacyMetaDescription,
} from "@/lib/marketing/agency-positioning";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: CREATIVE_HUB_LEGACY_TITLE,
    description: creativeHubLegacyMetaDescription(),
    robots: { index: false, follow: true },
  },
  "/creative-hub",
);

/** Legacy route — concept gallery now lives on /portfolio?tab=creative */
export default function CreativeHubPage() {
  redirect("/portfolio?tab=creative");
}
