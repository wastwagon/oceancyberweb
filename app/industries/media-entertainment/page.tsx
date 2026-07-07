"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { mediaEntertainmentIndustryContent } from "@/lib/data/industry-pages";

export default function MediaEntertainmentIndustryPage() {
  return <IndustryPremiumPage content={mediaEntertainmentIndustryContent} />;
}
