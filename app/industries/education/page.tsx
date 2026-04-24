"use client";

import {
  IndustryPremiumPage,
  type IndustryPageContent,
} from "@/components/industries/IndustryPremiumPage";

const content: IndustryPageContent = {
  heroEyebrow: "Education",
  heroPrefix: "",
  heroHighlight: "Education",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Learning platforms, virtual classrooms, and analytics that scale from schools to enterprises, accessible, engaging, and built for Africa.",
  pills: ["Interactive learning", "Student engagement", "Future-ready"],
  solutionsEyebrow: "Solutions",
  solutionsTitle: "Programs we deliver",
  solutionsSubtitle:
    "From LMS rollouts to assessment tooling, engineered for adoption, not shelf-ware.",
  services: [
    {
      title: "Learning management systems",
      description:
        "Course delivery, cohorts, and outcomes in one governed platform.",
    },
    {
      title: "Virtual classrooms",
      description:
        "Live instruction, breakout rooms, and participation analytics.",
    },
    {
      title: "Educational apps",
      description:
        "Mobile and web experiences tuned for low bandwidth and real devices.",
    },
    {
      title: "Student analytics",
      description:
        "Progress signals, early warnings, and reporting leadership can trust.",
    },
    {
      title: "Content management",
      description:
        "Authoring, versioning, and distribution for curriculum teams.",
    },
    {
      title: "Assessment tools",
      description:
        "Secure online testing, proctoring patterns, and automated grading hooks.",
    },
  ],
  capabilitiesEyebrow: "Stack",
  capabilitiesTitle: "Capabilities we bring",
  capabilitiesSubtitle:
    "Patterns we combine for resilient, measurable learning products.",
  technologies: [
    { title: "E-learning platforms", description: "Scalable learning environments" },
    { title: "Interactive content", description: "Engaging multimedia delivery" },
    { title: "AI tutoring", description: "Personalized assistance within policy" },
    { title: "Gamification", description: "Motivation loops tied to outcomes" },
    { title: "Mobile learning", description: "Offline-first where it matters" },
    { title: "Data analytics", description: "Learning insights and KPIs" },
  ],
  storiesEyebrow: "Outcomes",
  storiesTitle: "Representative engagements",
  storiesSubtitle:
    "Illustrative outcomes: every institution is different.",
  caseStudies: [
    {
      title: "University LMS implementation",
      client: "Higher education institution",
      result: "Served 5,000+ students with improved engagement.",
    },
    {
      title: "K–12 virtual classroom",
      client: "School district",
      result: "Remote learning for 2,000+ students with stable operations.",
    },
    {
      title: "Educational mobile app",
      client: "EdTech startup",
      result: "50,000+ downloads in year one with strong retention.",
    },
  ],
  ctaTitle: "Ready to modernize learning?",
  ctaDescription:
    "Tell us about learners, compliance, and timelines, and we'll propose architecture, rollout, and success metrics.",
};

export default function EducationPage() {
  return <IndustryPremiumPage content={content} />;
}
