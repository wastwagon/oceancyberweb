"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { governmentIndustryContent } from "@/lib/data/industry-pages";

export default function GovernmentIndustryPage() {
  return <IndustryPremiumPage content={governmentIndustryContent} />;
}
