"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { IndustryPageExtras } from "@/components/industries/IndustryPageExtras";
import { mediaEntertainmentIndustryContent } from "@/lib/data/industry-pages";

export default function MediaEntertainmentIndustryPage() {
  return (
    <>
      <IndustryPremiumPage content={mediaEntertainmentIndustryContent} />
      <IndustryPageExtras industrySlug="media-entertainment" />
    </>
  );
}
