import type { Metadata } from "next";
import { HelpCenterPageClient } from "@/components/help-center/HelpCenterPageClient";
import { getHelpArticles } from "@/lib/data/help-center-loader";
import { withCanonical } from "@/lib/seo/canonical";

export const revalidate = 60;

export const metadata: Metadata = withCanonical(
  {
    title: "Help Center",
    description:
      "Answers on billing, renewals, project requests, and security — plus guided support paths.",
  },
  "/help-center",
);

export default async function HelpCenterPage() {
  const articles = await getHelpArticles();
  return <HelpCenterPageClient articles={articles} />;
}
