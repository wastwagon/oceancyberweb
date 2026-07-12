"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { IndustryPageExtras } from "@/components/industries/IndustryPageExtras";
import { realEstateIndustryContent } from "@/lib/data/industry-pages";

export default function RealEstateIndustryPage() {
  return (
    <>
      <IndustryPremiumPage content={realEstateIndustryContent} />
      <IndustryPageExtras industrySlug="real-estate" />
    </>
  );
}
