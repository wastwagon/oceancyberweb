import { posProductImages } from "@/lib/seo/product-image-paths";
import { posSignupUrl } from "@/lib/pos/pos-app-url";

export type ProductFeature = { title: string; description: string };
export type ProductMockup = { src: string; alt: string; caption: string };
export type ProductIndustry = { title: string; href: string; useCase: string };
export type ProductFaq = { question: string; answer: string };

export type ProductCatalogEntry = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  heroImage: string;
  pricingFrom: string;
  pricingNote: string;
  pills: string[];
  saasHighlights: string[];
  features: ProductFeature[];
  mockups: ProductMockup[];
  industries: ProductIndustry[];
  faqs: ProductFaq[];
  caseStudySlug?: string;
  trialSignupHref: string;
};

export const POS_CONTACT_TOPIC = "OceanCyber POS — Book a demo";
export const POS_PROPOSAL_TOPIC = "OceanCyber POS";

export const posProduct: ProductCatalogEntry = {
  slug: "pos",
  name: "OceanCyber POS",
  tagline: "Ghana-ready point of sale — sign up, connect your MoMo, or sell offline from day one.",
  shortDescription:
    "Full SaaS POS for Ghanaian retailers and hospitality operators. Create your account, configure your own Paystack or Hubtel keys—or start with cash and manual MoMo only. The live app runs on a separate OceanCyber POS platform; this page is product information and signup.",
  heroImage: posProductImages.heroCheckout,
  pricingFrom: "From GHS 99/mo",
  pricingNote:
    "14-day Starter trial available. You pay OceanCyber for the software subscription. In-store customer payments use your own payment accounts when you connect them.",
  pills: ["Self-serve signup", "Your Paystack/Hubtel", "Offline & manual MoMo", "Multi-branch"],
  saasHighlights: [
    "Register online — no waiting for manual provisioning",
    "Connect your own Paystack or Hubtel for automated MoMo",
    "Or skip API setup and use cash + manual MoMo recording",
    "Optional OceanCyber-assisted onboarding for multi-branch & Enterprise",
  ],
  features: [
    {
      title: "Complete SaaS signup",
      description:
        "Create your business account, verify email, and finish a guided onboarding wizard—branch setup, plan selection, and payment configuration at your pace.",
    },
    {
      title: "Your payment keys, your money",
      description:
        "Connect your Paystack or Hubtel credentials for automated MoMo. Funds flow to your merchant accounts—OceanCyber bills you separately for the software subscription.",
    },
    {
      title: "Offline-first when it matters",
      description:
        "Keep selling when connectivity drops. Cash and manual MoMo recording work offline; sales sync when you're back online.",
    },
    {
      title: "Manual MoMo without API",
      description:
        "Not ready for Paystack? Record MTN or Telecel payments manually with reference numbers—ideal for markets where customers pay on their phones first.",
    },
    {
      title: "Inventory & multi-branch",
      description:
        "SKU management, branch transfers, and roll-up dashboards on Growth and Multi-branch plans—built for chains, not just single counters.",
    },
    {
      title: "Premium support when you need it",
      description:
        "Self-serve for most merchants; book a demo for Enterprise rollout, catalog import, staff training, and launch-week support from the OceanCyber team.",
    },
  ],
  mockups: [
    {
      src: posProductImages.heroCheckout,
      alt: "OceanCyber POS checkout with MoMo and cash payment options",
      caption: "Checkout — cash, automated MoMo, or manual MoMo",
    },
    {
      src: posProductImages.dashboard,
      alt: "OceanCyber POS sales analytics dashboard",
      caption: "Branch analytics and payment mix",
    },
    {
      src: posProductImages.inventory,
      alt: "OceanCyber POS inventory management",
      caption: "Inventory grid with low-stock alerts",
    },
    {
      src: posProductImages.multiBranch,
      alt: "OceanCyber POS multi-branch overview",
      caption: "Compare performance across branches",
    },
    {
      src: posProductImages.restaurant,
      alt: "OceanCyber POS restaurant table management",
      caption: "Tables, kitchen tickets, split bills",
    },
    {
      src: posProductImages.mobileReceipt,
      alt: "OceanCyber POS mobile receipt",
      caption: "SMS receipts and supervisor approvals",
    },
  ],
  industries: [
    { title: "Retail", href: "/industries/retail", useCase: "Supermarkets, boutiques, chains" },
    { title: "Tourism & hospitality", href: "/industries/tourism", useCase: "Hotels, restaurants, tours" },
    { title: "Healthcare", href: "/industries/healthcare", useCase: "Pharmacies, dispensaries" },
    { title: "Financial services", href: "/industries/financial-services", useCase: "Agency banking outlets" },
    { title: "Agriculture", href: "/industries/agriculture", useCase: "Agro-dealers, cooperatives" },
    { title: "Logistics", href: "/industries/logistics", useCase: "Depot counters, hubs" },
    { title: "Real estate", href: "/industries/real-estate", useCase: "Facility retail, fees" },
    { title: "Media & entertainment", href: "/industries/media-entertainment", useCase: "Box office, merch" },
  ],
  faqs: [
    {
      question: "Where do I sign up and use the POS?",
      answer:
        "The live product runs at app.pos.oceancyber.net (separate from this marketing website). Click Start free trial to register, or Book a demo if you want OceanCyber to walk you through setup.",
    },
    {
      question: "Do I use OceanCyber's MoMo account for sales?",
      answer:
        "No. You connect your own Paystack or Hubtel keys for automated MoMo, or use cash and manual MoMo recording without any API. OceanCyber only charges you the monthly software subscription.",
    },
    {
      question: "Can I start without connecting payments?",
      answer:
        "Yes. Skip payment setup during onboarding and start with cash plus manual MoMo. Add Paystack or Hubtel later in Settings when you're ready.",
    },
    {
      question: "Does it work offline?",
      answer:
        "Yes. Cash and manual MoMo sales continue offline and sync when connectivity returns. Automated MoMo requires an online connection.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Plans start from GHS 99 per month. Starter includes a 14-day trial. Growth and Multi-branch add inventory, transfers, and HQ dashboards—see pricing on signup.",
    },
    {
      question: "Is this the same as a custom OceanCyber build?",
      answer:
        "OceanCyber POS is subscription software. If you need a fully bespoke platform, use our project intake for custom web and mobile delivery—we can still integrate with your operations team.",
    },
  ],
  caseStudySlug: "thinq-shopping",
  trialSignupHref: posSignupUrl({ utmCampaign: "products_pos" }),
};

export const productCatalog = [posProduct] as const;

export const productSitemapPaths = [
  "/products",
  ...productCatalog.map((p) => `/products/${p.slug}`),
];
