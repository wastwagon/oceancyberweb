import { SeoIntentHub, intentHubMetadata } from "@/components/seo/SeoIntentHub";

export const metadata = intentHubMetadata("guide");

export default function GuidesPage() {
  return <SeoIntentHub kind="guide" />;
}
