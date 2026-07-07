import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Creative Hub",
    description:
      "OceanCyber studio concepts and illustrative UI — browse via the Creative Hub tab on our portfolio.",
  },
  "/creative-hub",
);

/** Legacy route — studio gallery now lives on /portfolio?tab=creative */
export default function CreativeHubPage() {
  redirect("/portfolio?tab=creative");
}
