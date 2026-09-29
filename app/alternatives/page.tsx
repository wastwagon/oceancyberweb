import { SeoIntentHub, intentHubMetadata } from "@/components/seo/SeoIntentHub";

export const metadata = intentHubMetadata("alternative");

export default function AlternativesPage() {
  return <SeoIntentHub kind="alternative" />;
}
