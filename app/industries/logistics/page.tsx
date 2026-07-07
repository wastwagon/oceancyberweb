"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { logisticsIndustryContent } from "@/lib/data/industry-pages";

export default function LogisticsIndustryPage() {
  return <IndustryPremiumPage content={logisticsIndustryContent} />;
}
