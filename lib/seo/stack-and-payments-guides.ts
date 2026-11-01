import { SITE_CTA } from "@/lib/marketing/site-cta";
import {
  projectDepositFaqAnswer,
  projectMaintenanceFaqAnswer,
  projectTimelineFaqAnswer,
} from "@/lib/marketing/project-delivery";
import type { IntentPage } from "@/lib/seo/intent-pages";

const oceanCyberBuilds =
  "OceanCyber scopes custom websites and apps in Accra — fixed GHS packages on /pricing, code and domain handover after full payment unless your agreement says otherwise.";

/** Framework and payment integration guides (OceanCyber delivery — not DwumaPOS merchant self-serve). */
export const stackAndPaymentsGuides: readonly IntentPage[] = [
  {
    kind: "guide",
    slug: "nextjs-website-development-ghana",
    title: "Next.js website development in Ghana",
    metaTitle: "Next.js websites in Ghana | OceanCyber",
    description:
      "When Ghana businesses choose Next.js for company sites and web apps — speed, SEO, Paystack or MoMo checkout, and what OceanCyber includes from GHS 6,000.",
    dateModified: "2026-11-01",
    eyebrow: "Technology",
    image: "/images/articles/shopify-woocommerce-custom.png",
    imageAlt: "Developer workspace with a Next.js website preview",
    intro:
      "Next.js is our default stack for marketing sites and many web apps — server rendering for SEO, fast loads on Ghana mobile networks, and clean integration with Paystack or Mobile Money when you sell online.",
    introParagraphs: [oceanCyberBuilds],
    sections: [
      {
        heading: "What we build with Next.js",
        paragraphs: [
          "Company sites, landing pages, authenticated portals, and ecommerce fronts where you own the codebase — not a locked template host.",
        ],
        bullets: [
          "Responsive layouts tested on common Ghana phone sizes",
          "Metadata and structure for Google indexing",
          "Paystack or MoMo checkout on Professional tiers and above",
          "Deployment on hosting you control (OceanCyber cPanel or your cloud)",
        ],
        links: [
          { href: "/services/web-development", label: "Web development services" },
          { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
        ],
      },
      {
        heading: "Stack and ownership",
        paragraphs: [
          "We deliver TypeScript React components, API routes or headless CMS hooks as scoped, and document environment variables at handover. Third-party licences (fonts, plugins) are listed separately.",
        ],
        links: [{ href: "/terms", label: "Ownership terms" }],
      },
    ],
    faqs: [
      {
        question: "How much is a Next.js site in Ghana?",
        answer:
          "Published packages start at GHS 6,000 (Startup), GHS 14,500 (Professional), and GHS 30,000 (Enterprise) on our pricing page.",
      },
      {
        question: "Do you only use Next.js?",
        answer:
          "Next.js is our primary web stack. WordPress or Laravel are options when the brief fits — see our other technology guides.",
      },
      { question: "What deposit do you require?", answer: projectDepositFaqAnswer() },
      {
        question: "How long does a typical site take?",
        answer: projectTimelineFaqAnswer("A Startup marketing site", "about 3–5 weeks"),
      },
      { question: "What about maintenance after launch?", answer: projectMaintenanceFaqAnswer() },
    ],
    related: [
      { href: "/guides/laravel-web-development-ghana", label: "Laravel development" },
      { href: "/guides/paystack-integration-websites-ghana", label: "Paystack for custom sites" },
    ],
    cta: {
      title: "Scope a Next.js project",
      body: "Share pages, payments, and your launch date.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "react-native-mobile-apps-ghana",
    title: "React Native mobile apps in Ghana",
    metaTitle: "React Native apps in Ghana | OceanCyber",
    description:
      "When React Native fits iOS and Android delivery from one Accra team — offline-aware flows, MoMo, and store submission from GHS 12,000 per platform.",
    dateModified: "2026-11-01",
    eyebrow: "Technology",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Mobile app screens beside a phone with MoMo prompt",
    intro:
      "React Native lets one engineering team ship iOS and Android from shared code — useful when budgets cannot fund two fully native codebases but you still need installable apps.",
    introParagraphs: [oceanCyberBuilds],
    sections: [
      {
        heading: "When we recommend React Native",
        paragraphs: [
          "Catalogue apps, field tools, membership apps, and checkout-light experiences where device APIs matter but ultra-native UI is not the top priority.",
        ],
        links: [
          { href: "/services/mobile-apps", label: "Mobile app services" },
          { href: "/guides/app-development-cost-in-ghana", label: "App development cost" },
        ],
      },
    ],
    faqs: [
      {
        question: "Starting price for one app store?",
        answer: "From GHS 12,000 per platform (iOS or Android) — see /pricing and the app cost guide.",
      },
      {
        question: "React Native vs Flutter?",
        answer: "We pick stack in discovery. See our Flutter guide for comparison — both can work for Ghana buyers.",
      },
      { question: "Can the app take MoMo?", answer: "Yes when scoped — usually via Paystack mobile SDK or deep links to your web checkout." },
      { question: "Deposit and milestones?", answer: projectDepositFaqAnswer() },
      { question: "Typical timeline?", answer: projectTimelineFaqAnswer("A single-platform app", "about 8–14 weeks") },
    ],
    related: [{ href: "/guides/flutter-mobile-apps-ghana", label: "Flutter apps" }],
    cta: {
      title: "Describe your app",
      body: "Platforms, login, payments, and offline needs.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "flutter-mobile-apps-ghana",
    title: "Flutter mobile apps in Ghana",
    metaTitle: "Flutter apps in Ghana | OceanCyber",
    description:
      "Flutter for iOS and Android from one codebase — when OceanCyber recommends it, pricing from GHS 12,000 per platform, and MoMo-ready flows.",
    dateModified: "2026-11-01",
    eyebrow: "Technology",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Flutter mobile UI mockups",
    intro:
      "Flutter delivers one UI codebase for iOS and Android with strong performance — we use it when the brief needs custom interfaces across both stores without maintaining two native teams.",
    sections: [
      {
        heading: "Fit for Ghana operations",
        paragraphs: [
          "Offline-tolerant forms, barcode or camera capture, and MoMo handoff to Paystack checkout are common scopes — we size them in the proposal.",
        ],
        links: [{ href: "/services/mobile-apps", label: "Mobile apps service" }],
      },
    ],
    faqs: [
      { question: "Price starting point?", answer: "From GHS 12,000 per platform — bundles on /pricing." },
      { question: "Flutter vs React Native?", answer: "Both are cross-platform options; we recommend one after discovery based on integrations and team maintenance plans." },
      { question: "Who owns the source?", answer: "Custom project code transfers after full payment per our terms — reusable OceanCyber components stay licensed to you for the delivered app." },
      { question: "Deposit?", answer: projectDepositFaqAnswer() },
      { question: "Maintenance?", answer: projectMaintenanceFaqAnswer() },
    ],
    related: [{ href: "/guides/react-native-mobile-apps-ghana", label: "React Native" }],
    cta: {
      title: "Get an app quote",
      body: "Tell us both stores, auth, and payments.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "laravel-web-development-ghana",
    title: "Laravel web development in Ghana",
    metaTitle: "Laravel development in Ghana | OceanCyber",
    description:
      "Laravel for admin portals, APIs, and internal tools when Next.js alone is not enough — custom software from GHS 14,500.",
    dateModified: "2026-11-01",
    eyebrow: "Technology",
    image: "/images/articles/shopify-woocommerce-custom.png",
    imageAlt: "Web application dashboard",
    intro:
      "Laravel fits authenticated portals, multi-role workflows, and API backends — often paired with a Next.js front end or mobile clients.",
    sections: [
      {
        heading: "Typical Laravel scopes",
        paragraphs: ["Internal ops tools, customer portals, and integration layers between MoMo, ERP, and field apps."],
        links: [
          { href: "/services/software-development", label: "Software development" },
          { href: "/services/web-development", label: "Web development" },
        ],
      },
    ],
    faqs: [
      { question: "Starting budget?", answer: "Custom software packages from GHS 14,500 on /pricing — Laravel scopes are quoted after discovery." },
      { question: "Hosting?", answer: "We can host on OceanCyber cPanel or deploy to your cloud — documented at handover." },
      { question: "Payments?", answer: "Paystack or Hubtel server-side integrations are scoped per project — see payment integration guides." },
      { question: "Deposit?", answer: projectDepositFaqAnswer() },
      { question: "Timeline?", answer: projectTimelineFaqAnswer("A focused Laravel portal", "about 6–12 weeks") },
    ],
    related: [{ href: "/guides/nextjs-website-development-ghana", label: "Next.js front ends" }],
    cta: {
      title: "Scope Laravel work",
      body: "Roles, integrations, and reporting needs.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "wordpress-website-ghana",
    title: "WordPress websites in Ghana",
    metaTitle: "WordPress sites in Ghana | OceanCyber",
    description:
      "When WordPress is the right fit for Ghana marketing sites — ownership, hosting, Paystack plugins, and OceanCyber packages from GHS 6,000.",
    dateModified: "2026-11-01",
    eyebrow: "Technology",
    image: "/images/articles/shopify-woocommerce-custom.png",
    imageAlt: "WordPress admin beside a Ghana business site",
    intro:
      "WordPress suits content-heavy marketing sites and some WooCommerce stores when your team wants familiar admin tools — we still recommend Next.js when performance, security, and custom checkout matter more.",
    sections: [
      {
        heading: "What you get",
        paragraphs: [
          "Theme setup or custom child theme, hardening, backups, and MoMo/Paystack plugin configuration when in scope.",
        ],
        links: [
          { href: "/compare/shopify-woocommerce-custom-ghana", label: "Shopify vs WooCommerce vs custom" },
          { href: "/services/ecommerce", label: "E-commerce builds" },
        ],
      },
    ],
    faqs: [
      { question: "WordPress vs custom Next.js?", answer: "WordPress when editors need wp-admin daily; Next.js when you want owned React code and tighter performance — we advise in discovery." },
      { question: "Cost?", answer: "Marketing sites from GHS 6,000; WooCommerce scopes from Professional tiers — /pricing." },
      { question: "Who hosts?", answer: "OceanCyber hosting from GHS 69/month or your provider — domain in your name when you register through us." },
      { question: "Deposit?", answer: projectDepositFaqAnswer() },
      { question: "Support after launch?", answer: projectMaintenanceFaqAnswer() },
    ],
    related: [{ href: "/guides/nextjs-website-development-ghana", label: "Next.js alternative" }],
    cta: {
      title: "Pick the right CMS",
      body: "Content workflow, store size, and budget.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "paystack-integration-websites-ghana",
    title: "Paystack integration for OceanCyber websites and apps",
    metaTitle: "Paystack integration Ghana | OceanCyber projects",
    description:
      "How OceanCyber connects Paystack to custom sites and apps — merchant setup, MoMo and cards, webhooks, and what is separate from DwumaPOS shop checkout.",
    dateModified: "2026-11-01",
    eyebrow: "Payments",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Paystack checkout on a Ghana website",
    intro:
      "For custom websites and apps, you create your own Paystack business account. OceanCyber wires checkout, webhooks, and reconciliation into your build — customer funds go to you, not to OceanCyber.",
    introParagraphs: [
      "DwumaPOS shops connect Paystack inside the POS product on dwumapos.com — this guide is for bespoke OceanCyber projects only.",
    ],
    sections: [
      {
        heading: "What we implement",
        paragraphs: [
          "Hosted checkout or inline flows, success/failure URLs, webhook handlers, and admin views for paid orders on scoped tiers.",
        ],
        links: [
          { href: "/guides/accept-mobile-money-paystack", label: "Mobile Money and Paystack overview" },
          { href: "/guides/hubtel-vs-paystack-ghana", label: "Hubtel vs Paystack" },
        ],
      },
    ],
    faqs: [
      { question: "Is Paystack included in GHS 6,000 sites?", answer: "Basic checkout integration is included on Startup; deeper reconciliation on Professional+ — see /pricing." },
      { question: "Who pays Paystack fees?", answer: "Paystack charges transaction fees on your account — separate from OceanCyber build invoices." },
      { question: "Can I use the same Paystack account as DwumaPOS?", answer: "You can use the same business identity, but DwumaPOS and a custom site are separate integrations — configure each product correctly." },
      { question: "Deposit for payment work?", answer: projectDepositFaqAnswer() },
      { question: "Testing MoMo live?", answer: "We recommend sub-GHS 2 test charges in your shop before marketing launch." },
    ],
    related: [{ href: "/services/ecommerce", label: "E-commerce service" }],
    cta: {
      title: "Add Paystack to your brief",
      body: "Catalogue size, refunds, and webhook targets.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "hubtel-integration-websites-ghana",
    title: "Hubtel integration for OceanCyber websites and apps",
    metaTitle: "Hubtel payments Ghana | OceanCyber projects",
    description:
      "When OceanCyber projects use Hubtel for MoMo, USSD, or SMS alongside web checkout — merchant account, fees, and scope.",
    dateModified: "2026-11-01",
    eyebrow: "Payments",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Hubtel payment flow on a phone",
    intro:
      "Hubtel suits some Ghana merchants who already use Hubtel SMS, USSD, or unified MoMo products. OceanCyber integrates Hubtel APIs into custom builds when your brief requires it.",
    sections: [
      {
        heading: "Hubtel vs Paystack on custom builds",
        paragraphs: [
          "Both can route MoMo and cards. Pick based on reconciliation tools, support, and existing merchant relationships — see our comparison guide.",
        ],
        links: [{ href: "/guides/hubtel-vs-paystack-ghana", label: "Hubtel vs Paystack comparison" }],
      },
    ],
    faqs: [
      { question: "Do you resell Hubtel?", answer: "No. You open and fund your Hubtel merchant account; we integrate it into your site or app." },
      { question: "Starting build price with Hubtel?", answer: "Same web and app packages on /pricing — payment integration depth depends on tier." },
      { question: "DwumaPOS and Hubtel?", answer: "Merchants connect Hubtel inside DwumaPOS on dwumapos.com — not via this custom-project guide." },
      { question: "Deposit?", answer: projectDepositFaqAnswer() },
      { question: "Maintenance?", answer: projectMaintenanceFaqAnswer() },
    ],
    related: [{ href: "/guides/paystack-integration-websites-ghana", label: "Paystack integration" }],
    cta: {
      title: "Specify Hubtel in your RFP",
      body: "Products, SMS needs, and checkout type.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
  {
    kind: "guide",
    slug: "mobile-money-checkout-ghana",
    title: "Mobile Money checkout on custom websites",
    metaTitle: "MoMo checkout for Ghana websites | OceanCyber",
    description:
      "MTN MoMo, Telecel Cash, and AT Money on OceanCyber-built stores — Paystack or Hubtel, customer experience, and fees.",
    dateModified: "2026-11-01",
    eyebrow: "Payments",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Mobile Money approval prompt",
    intro:
      "Ghana buyers expect MoMo at checkout. On custom sites we implement it through Paystack or Hubtel — live prompts, webhooks, and order status your staff can trust.",
    sections: [
      {
        heading: "Not the same as DwumaPOS",
        paragraphs: [
          "DwumaPOS merchants connect Paystack or Hubtel inside the POS product for shop and online shop sales. This guide covers bespoke ecommerce builds from OceanCyber.",
        ],
        links: [
          { href: "https://www.dwumapos.com/payments", label: "DwumaPOS payments (shops)" },
          { href: "/guides/accept-mobile-money-paystack", label: "Accept MoMo and Paystack" },
        ],
      },
    ],
    faqs: [
      { question: "Which wallets are supported?", answer: "Through Paystack or Hubtel: MTN MoMo, Telecel Cash, and AT Money — naming matches what customers see on their phones." },
      { question: "Does OceanCyber hold customer money?", answer: "No. Funds settle to your payment provider account." },
      { question: "Shop without custom code?", answer: "If you sell from live stock at shop scale, compare DwumaPOS on dwumapos.com before commissioning a custom store." },
      { question: "Deposit?", answer: projectDepositFaqAnswer() },
      { question: "Timeline to go live?", answer: projectTimelineFaqAnswer("MoMo checkout on a scoped store", "often 3–8 weeks with catalogue ready") },
    ],
    related: [
      { href: "/insights/pos-vs-ecommerce-ghana-2026", label: "POS vs ecommerce insight" },
      { href: "/services/ecommerce", label: "E-commerce builds" },
    ],
    cta: {
      title: "Plan MoMo checkout",
      body: "Provider choice, refunds, and order ops.",
      href: SITE_CTA.getStarted.href,
      label: SITE_CTA.getStarted.label,
    },
  },
];

export const stackAndPaymentsGuideSlugs = stackAndPaymentsGuides.map((p) => p.slug);
