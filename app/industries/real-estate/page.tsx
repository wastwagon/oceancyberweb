"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { realEstateIndustryContent } from "@/lib/data/industry-pages";

export default function RealEstateIndustryPage() {
  return <IndustryPremiumPage content={realEstateIndustryContent} />;
}
