"use client";

import {
  IndustryPremiumPage,
  type IndustryPageContent,
} from "@/components/industries/IndustryPremiumPage";
import { IndustryPageExtras } from "@/components/industries/IndustryPageExtras";

const content: IndustryPageContent = {
  heroEyebrow: "Tourism & hospitality",
  heroPrefix: "Tourism & ",
  heroHighlight: "hospitality",
  heroSuffix: "",
  heroDescription:
    "Booking engines, guest experience platforms, and operations software for hotels, resorts, and travel brands across Ghana and West Africa.",
  pills: ["Booking systems", "Guest experience", "Operations"],
  solutionsEyebrow: "Solutions",
  solutionsTitle: "Travel & hospitality technology",
  solutionsSubtitle:
    "From discovery to checkout to on-property service — unified digital journeys that convert and retain guests.",
  services: [
    {
      title: "Booking & reservation platforms",
      description:
        "Real-time availability, payments, and confirmations across web and mobile channels.",
    },
    {
      title: "Hotel management systems",
      description:
        "Front desk, housekeeping, and billing workflows in one operational view.",
    },
    {
      title: "Travel & tour apps",
      description:
        "Itineraries, guides, and on-trip support with offline-friendly patterns.",
    },
    {
      title: "Guest experience portals",
      description:
        "Pre-arrival, in-stay, and post-stay touchpoints that reduce front-desk load.",
    },
    {
      title: "Channel & OTA integration",
      description:
        "Sync inventory and rates across partners without double-booking risk.",
    },
    {
      title: "Analytics & revenue insight",
      description:
        "Occupancy, ADR, and campaign performance dashboards for leadership.",
    },
  ],
  capabilitiesEyebrow: "Stack",
  capabilitiesTitle: "Technologies & patterns",
  capabilitiesSubtitle:
    "Reliable uptime, mobile-first UX, and payment rails suited to local and international guests.",
  technologies: [
    { title: "Mobile-first UX", description: "Fast booking on mid-range devices" },
    { title: "Payment integration", description: "Cards, MoMo, and multi-currency where needed" },
    { title: "Maps & location", description: "Property discovery and on-ground navigation" },
    { title: "Notifications", description: "SMS, email, and push for booking lifecycle" },
    { title: "CMS & content", description: "Seasonal offers and destination storytelling" },
    { title: "API integrations", description: "PMS, channel managers, and accounting tools" },
  ],
  storiesEyebrow: "Outcomes",
  storiesTitle: "Representative engagements",
  storiesSubtitle: "Directional results — scope and stack vary by property type and scale.",
  caseStudies: [
    {
      title: "Boutique hotel booking revamp",
      client: "Hospitality group",
      result: "Higher direct bookings and shorter front-desk check-in times.",
    },
    {
      title: "Tour operator mobile app",
      client: "Regional travel brand",
      result: "Improved on-trip engagement and repeat booking rates.",
    },
    {
      title: "Resort operations dashboard",
      client: "Coastal resort",
      result: "Unified housekeeping and occupancy visibility for managers.",
    },
  ],
  ctaTitle: "Ready to elevate guest experience?",
  ctaDescription:
    "Share your property mix, channels, and timeline — we'll propose architecture, milestones, and a realistic GHS estimate.",
};

export default function TourismIndustryPage() {
  return (
    <>
      <IndustryPremiumPage content={content} />
      <IndustryPageExtras industrySlug="tourism" />
    </>
  );
}
