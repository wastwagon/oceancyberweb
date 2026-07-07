"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import { energyIndustryContent } from "@/lib/data/industry-pages";

export default function EnergyIndustryPage() {
  return <IndustryPremiumPage content={energyIndustryContent} />;
}
