"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { serviceHeroCta } from "@/lib/marketing/site-cta";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

const content: ServicePageContent = {
  heroEyebrow: "Design",
  heroPrefix: "Web ",
  heroHighlight: "design",
  heroSuffix: " for Ghana businesses",
  heroHighlightTone: "gradient",
  heroDescription:
    "Company websites, landing pages, and online stores — mobile-first layouts, clear messaging, and builds that load fast on Ghana networks. Packages from GHS 6,000 with published timelines.",
  heroCtaLabel: serviceHeroCta.label,
  heroCtaHref: serviceHeroCta.href,
  hireGeoHref: "/services/web-design-in-ghana",
  hireGeoLabel: "Web design in Ghana →",
  heroImage: serviceImages.webDevelopment,
  pills: ["Mobile-first", "SEO-ready", "Paystack / MoMo"],
  showAtAGlance: true,
  showOwnership: true,
  serviceHubPath: "/services/web-design",
  focusEyebrow: "What we design",
  focusTitle: "Sites that look credible and convert on a phone",
  focusSubtitle:
    "Structure, visuals, and content hierarchy before development — so your Accra or nationwide audience understands you in seconds.",
  focusAreas: [
    {
      title: "Company and marketing sites",
      description:
        "Home, services, about, work, and contact — tuned for local search and WhatsApp follow-up.",
    },
    {
      title: "Landing pages",
      description:
        "Campaign pages with one clear action: call, form, or checkout.",
    },
    {
      title: "Online store UX",
      description:
        "Catalog, cart, and checkout flows with MoMo-friendly error handling.",
    },
    {
      title: "Design + build",
      description:
        "One team takes Figma to production — designer and developer sit in the same Accra office.",
    },
  ],
  stackEyebrow: "How we work",
  stackTitle: "From brief to launch",
  stackSubtitle:
    "Fixed packages with optional add-ons — see our pricing page and website cost in Ghana guide.",
  stack: [
    { title: "Discovery", description: "Pages, goals, and whether you take payment online." },
    { title: "UX & UI", description: "Wireframes or full custom UI depending on package." },
    { title: "Content", description: "You supply copy or we scope writing as an add-on." },
    { title: "Build", description: "Responsive Next.js delivery with SEO metadata." },
    { title: "Payments", description: "Paystack or Mobile Money when the brief requires checkout." },
    { title: "Launch", description: "Staging review, DNS, and post-launch support window." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you receive",
  deliverSubtitle: "Aligned to Startup, Professional, or Enterprise on the pricing page.",
  deliverables: [
    {
      title: "Responsive pages",
      description: "Layouts tested on common Ghana phone sizes and mobile data speeds.",
    },
    {
      title: "Brand styling",
      description: "Your colours and typography on proven or custom layouts.",
    },
    {
      title: "Forms and leads",
      description: "Contact flows that email your team or feed your CRM.",
    },
    {
      title: "Search basics",
      description: "Titles, descriptions, and structure Google can index.",
    },
    {
      title: "Handover docs",
      description: "Access list, hosting notes, and what was built where.",
    },
    {
      title: "Support window",
      description: "30, 90, or 180 days depending on package — defects fixed, not new scope.",
    },
  ],
  outcomesEyebrow: "Proof",
  outcomesTitle: "Published Ghana work",
  outcomesSubtitle: "Live sites you can click through before you commit.",
  outcomes: [
    {
      title: "Fitch Advisory",
      client: "Professional services",
      result: "Client portal and booking — see fitchadvisory.com",
    },
    {
      title: "ThinQ Shopping",
      client: "Retail",
      result: "MoMo-ready mobile store — see thinqshopping.app",
    },
  ],
  ctaTitle: "Share your pages and launch date",
  ctaDescription:
    "We match your brief to Startup, Professional, or Enterprise and list domain, hosting, and support separately.",
  pricing: servicePricingHints.webDesign,
};

export default function WebDesignServicePage() {
  return <ServicePremiumPage content={content} />;
}
