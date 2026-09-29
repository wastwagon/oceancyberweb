import { SeoIntentHub, intentHubMetadata } from "@/components/seo/SeoIntentHub";

export const metadata = intentHubMetadata("compare");

export default function ComparePage() {
  return <SeoIntentHub kind="compare" />;
}
