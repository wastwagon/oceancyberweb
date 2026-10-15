"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

const content: ServicePageContent = {
  heroEyebrow: "Mobile",
  heroPrefix: "",
  heroHighlight: "Mobile apps",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "iOS and Android apps built in Accra for Ghana phones and data — offline-aware flows, MoMo or Paystack when needed, and help getting into the stores. From GHS 12,000 per platform.",
  heroCtaLabel: "Get started",
  heroCtaHref: "/get-started",
  hireGeoHref: "/services/mobile-app-development-in-accra",
  hireGeoLabel: "Mobile apps in Accra →",
  heroImage: serviceImages.mobileApps,
  pills: ["iOS", "Android", "MoMo / Paystack"],
  focusEyebrow: "What we build",
  focusTitle: "Apps people keep on mid-range Android",
  focusSubtitle:
    "Designed for real Ghana devices, patchy data, and one-handed use — not just demo-day screenshots.",
  focusAreas: [
    {
      title: "Customer apps",
      description:
        "Bookings, wallets, catalogs, and account areas that stay usable when the network drops.",
    },
    {
      title: "Staff and field apps",
      description:
        "Tools for delivery, sales, and ops teams who work outside the office.",
    },
    {
      title: "Payments in-app",
      description:
        "Paystack and Mobile Money wired with clear success and failure states.",
    },
    {
      title: "Store submission",
      description:
        "Privacy text, screenshots, and review notes so App Store and Play Store review is less painful.",
    },
  ],
  stackEyebrow: "Tools we use",
  stackTitle: "Paths that fit your budget and timeline",
  stackSubtitle:
    "Native or cross-platform — chosen for your users and your maintenance plan.",
  stack: [
    { title: "iOS", description: "SwiftUI or UIKit when Apple-first quality matters." },
    { title: "Android", description: "Kotlin builds tuned for mid-range Ghana devices." },
    { title: "React Native / Flutter", description: "Shared code when one team ships both stores." },
    { title: "Push and deep links", description: "Notifications and links that open the right screen." },
    { title: "CI for apps", description: "Repeatable builds and store upload checklists." },
    { title: "Crash reporting", description: "See what breaks on real devices after launch." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you leave with",
  deliverSubtitle: "Files and access your team can keep shipping after handover.",
  deliverables: [
    {
      title: "Store-ready builds",
      description: "Release candidates with icons, splash, and versioning.",
    },
    {
      title: "Source and docs",
      description: "Repo access, environment notes, and how to cut the next build.",
    },
    {
      title: "QA on real devices",
      description: "Test notes from phones Ghana users actually own.",
    },
    {
      title: "Launch support window",
      description: "Help through first store review and early crash triage.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Mobile work in context",
  outcomesSubtitle: "Illustrative results — scope and start point always differ.",
  outcomes: [
    {
      title: "Commerce on phones",
      client: "Retail client",
      result: "Browse and checkout that hold up on mobile data.",
    },
    {
      title: "Client engagement",
      client: "Advisory firm",
      result: "Booking and document access without email ping-pong.",
    },
    {
      title: "Website to app path",
      client: "Existing site owners",
      result: "Clear quote to wrap or rebuild for the stores.",
    },
  ],
  ctaTitle: "Ready to ship an app?",
  ctaDescription:
    "Tell us iOS, Android, or both — plus budget and timeline — and we will reply with a scoped next step.",
  pricing: servicePricingHints.mobileApps,
};

export default function MobileAppsPage() {
  return <ServicePremiumPage content={content} />;
}
