"use client";

import {
  IndustryPremiumPage,
  type IndustryPageContent,
} from "@/components/industries/IndustryPremiumPage";
import { IndustryPageExtras } from "@/components/industries/IndustryPageExtras";

const content: IndustryPageContent = {
  heroEyebrow: "Healthcare",
  heroPrefix: "",
  heroHighlight: "Healthcare",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Clinic and hospital systems for Ghana — appointments, records, and telemedicine with privacy and uptime built in.",
  pills: ["Telemedicine", "Health records", "Clinic ops"],
  solutionsEyebrow: "Solutions",
  solutionsTitle: "Health systems clinicians can run",
  solutionsSubtitle:
    "Clear audit trails, role-based access, and workflows that match how Accra and regional facilities work.",
  services: [
    {
      title: "Electronic health records",
      description:
        "Structured records, consent, and integrations that respect clinical pace.",
    },
    {
      title: "Telemedicine platforms",
      description:
        "Scheduling, visits, and follow-ups with quality-of-service in mind.",
    },
    {
      title: "Medical data analytics",
      description:
        "Dashboards and pipelines for operational and population insights.",
    },
    {
      title: "Patient management systems",
      description:
        "Scheduling, care coordination, and communication in one place.",
    },
    {
      title: "Healthcare mobile apps",
      description:
        "Engagement, reminders, and remote monitoring where appropriate.",
    },
    {
      title: "Medical imaging solutions",
      description:
        "Workflow support around imaging data and specialist handoffs.",
    },
  ],
  capabilitiesEyebrow: "Stack",
  capabilitiesTitle: "Capabilities we bring",
  capabilitiesSubtitle:
    "Security, interoperability, and maintainability, not buzzwords on a slide.",
  technologies: [
    { title: "DPA-aligned health data controls", description: "Controls aligned to sensitive health data under Ghana law" },
    { title: "Cloud healthcare", description: "Resilient hosting and DR patterns" },
    { title: "AI diagnostics support", description: "Decision support within governance" },
    { title: "IoT integration", description: "Connected devices with clear trust boundaries" },
    { title: "Data encryption", description: "At rest, in transit, and in process" },
    { title: "Real-time monitoring", description: "Signals for clinical and IT teams" },
  ],
  storiesEyebrow: "Outcomes",
  storiesTitle: "Representative engagements",
  storiesSubtitle:
    "Illustrative outcomes: facilities and regulations vary by market.",
  caseStudies: [
    {
      title: "Hospital management system",
      client: "Regional hospital",
      result: "Improved patient throughput and ward coordination.",
    },
    {
      title: "Telemedicine platform",
      client: "Healthcare provider",
      result: "High-volume remote consultations with stable uptime.",
    },
    {
      title: "Medical records digitization",
      client: "Clinic network",
      result: "Lower administrative overhead and faster retrieval.",
    },
  ],
  ctaTitle: "Need health software for your facility?",
  ctaDescription:
    "Tell us your workflows, integrations, and compliance needs — we will propose a phased plan in cedis.",
};

export default function HealthcarePage() {
  return (
    <>
      <IndustryPremiumPage content={content} />
      <IndustryPageExtras industrySlug="healthcare" />
    </>
  );
}
