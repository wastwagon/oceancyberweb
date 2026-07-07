"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { agricultureIndustryContent } from "@/lib/data/industry-pages";

export default function AgricultureIndustryPage() {
  return <IndustryPremiumPage content={agricultureIndustryContent} />;
}
