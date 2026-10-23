import type { IntentPage } from "@/lib/seo/intent-pages";
import { formatComGhListPriceLabel } from "@/lib/domain-tld-pricing";

/** Additional guides referenced by the oceancyber.net build brief. */
export const extraIntentGuidePages: readonly IntentPage[] = [
  {
    kind: "guide",
    slug: "app-development-cost-in-ghana",
    title: "How much does app development cost in Ghana?",
    description:
      "Mobile app development cost in Ghana in 2026: from GHS 12,000 per platform (iOS or Android), web + mobile bundles, and what changes the price.",
    eyebrow: "App pricing guide",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Mobile app wireframes and cedis on a desk in Accra",
    intro:
      "A single native platform (iOS or Android) starts at GHS 12,000. Pairing a Professional web package with one mobile platform starts at GHS 26,500. Enterprise scopes cross-platform or multi-role apps from GHS 30,000. These are build prices — App Store fees, hosting, and Paystack are separate.",
    sections: [
      {
        heading: "Published starting points",
        paragraphs: [
          "OceanCyber lists the same numbers on /pricing and /services/mobile-apps. We confirm features in discovery before locking milestones.",
        ],
        table: {
          caption: "Indicative mobile app tiers (GHS)",
          columns: ["Scope", "From (GHS)", "Typical timeline"],
          rows: [
            ["One platform (iOS or Android)", "12,000", "8–14 weeks depending on features"],
            ["Professional web + one mobile platform", "26,500", "10–16 weeks"],
            ["Enterprise (native or cross-platform in scope)", "30,000", "Scoped in statement of work"],
            ["Website-to-app conversion", "8,000", "4–8 weeks after audit"],
          ],
        },
        links: [
          { href: "/pricing", label: "Compare web and mobile packages" },
          { href: "/services/mobile-apps", label: "Mobile app services" },
        ],
      },
      {
        heading: "What moves the price",
        paragraphs: [
          "Apps cost more than brochure sites when they store accounts, sync offline, or integrate payments.",
        ],
        bullets: [
          "Login, roles, and admin panels",
          "Offline-first data sync on poor mobile networks",
          "Paystack or MoMo with verified webhooks",
          "Push notifications and analytics",
          "App Store and Play Store submission plus store assets",
          "Ongoing care after the support window",
        ],
      },
      {
        heading: "How this compares to website-only work",
        paragraphs: [
          "A five-page marketing site starts at GHS 6,000. If you only need a mobile-friendly website, start with /guides/website-cost-in-ghana.",
          "Choose an app when users need installable access, device features, or repeat sessions — not when a fast website plus WhatsApp is enough.",
        ],
        links: [{ href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" }],
      },
    ],
    faqs: [
      {
        question: "Do you build both iOS and Android?",
        answer:
          "Yes. Each platform is scoped separately from GHS 12,000, or together under Enterprise once we map shared backend work.",
      },
      {
        question: "Is Paystack included?",
        answer:
          "Payment flows are scoped like web projects — basic checkout on lower tiers, reconciliation on Professional and above. Paystack’s own transaction fees are not part of the build price.",
      },
      {
        question: "Can you convert my existing website to an app?",
        answer:
          "Yes — see /services/website-to-mobile-app. Store-ready wrappers start around GHS 8,000 after we audit your site.",
      },
    ],
    related: [
      { href: "/services/mobile-app-development-in-ghana", label: "Mobile apps in Ghana" },
      { href: "/guides/accept-mobile-money-paystack", label: "Paystack and MoMo integration" },
    ],
    cta: {
      title: "Describe the app in one paragraph",
      body: "Tell us the platforms, login needs, and whether you take payment in-app.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "guide",
    slug: "com-gh-domain-registration-guide",
    title: ".com.gh domain registration guide (Ghana)",
    description:
      "How Ghana businesses register a .com.gh domain: documents, DNS, and how OceanCyber search shows live cedis pricing before Paystack checkout.",
    eyebrow: ".com.gh guide",
    image: "/images/articles/website-cost-ghana.png",
    imageAlt: "Domain registration checklist beside cedis in Accra",
    intro:
      `A .com.gh domain is Ghana’s commercial ccTLD. Marketing list price is ${formatComGhListPriceLabel()} — the domain search still shows the live registrar total before Paystack. Other extensions (.com, .org, .africa) are on /guides/domain-prices-in-ghana.`,
    sections: [
      {
        heading: "When to choose .com.gh",
        paragraphs: [
          "Use .com.gh when your customers expect a Ghana commercial domain, especially alongside local trust signals and Mobile Money checkout.",
          "Many SMEs still launch on .com (GHS 120/year on our list) when global email compatibility matters more than the ccTLD.",
        ],
        links: [{ href: "/guides/domain-prices-in-ghana", label: "Compare .com and other TLDs" }],
      },
      {
        heading: "Registration steps on OceanCyber",
        paragraphs: [
          "Search the domain on /domains, add privacy if required, and complete Paystack checkout in cedis.",
          "After registration we help you point DNS to OceanCyber hosting or an external provider.",
        ],
        steps: [
          "Search yourbusiness.com.gh on the domain page",
          "Confirm the live annual total in the cart (GHS)",
          "Pay with Paystack (card or Mobile Money)",
          "Set DNS A/AAAA or nameservers to your host",
          "Add SSL — Let’s Encrypt is free on OceanCyber hosting",
        ],
        links: [{ href: "/domains", label: "Start domain search" }],
      },
      {
        heading: "What is not included",
        paragraphs: [
          "The domain fee covers registration and renewal. Website build, hosting, and commercial SSL are separate lines — see /guides/website-cost-in-ghana.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does .com.gh cost per year?",
        answer:
          `Marketing list price is ${formatComGhListPriceLabel()}. Search on /domains for the live GHS total before checkout. Other extensions are on /guides/domain-prices-in-ghana.`,
      },
      {
        question: "Can you move an existing .com.gh to OceanCyber?",
        answer:
          "Yes. We guide transfers once you have the auth code from your current registrar.",
      },
      {
        question: "Do you bill in cedis?",
        answer: "Yes — domain checkout uses Paystack in Ghana cedis.",
      },
    ],
    related: [
      { href: "/domains", label: "Buy a domain" },
      { href: "/hosting", label: "Hosting from GHS 69/mo" },
    ],
    cta: {
      title: "Check your .com.gh name",
      body: "Search availability, then add hosting if you still need a site built.",
      href: "/domains",
      label: "Open domain search",
    },
  },
  {
    kind: "guide",
    slug: "hubtel-vs-paystack-ghana",
    title: "Hubtel vs Paystack for Ghana websites and shops",
    description:
      "When Ghana businesses pick Hubtel or Paystack for MoMo and card checkout — speed to launch, fees, reconciliation, and what your developer must build.",
    eyebrow: "Payments guide",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "Mobile Money prompt on a phone beside a Ghana shop counter",
    intro:
      "Paystack and Hubtel both route MTN MoMo, Telecel Cash, and cards into a Ghana business account. The right choice depends on who owns reconciliation, how custom your checkout is, and whether you need Hubtel’s SMS or USSD products alongside payments.",
    sections: [
      {
        heading: "Paystack — default for custom sites we build",
        paragraphs: [
          "Most OceanCyber storefronts use Paystack because the API, webhooks, and dashboard are built for engineering-led checkout. You get test keys, event logs, and a morning list finance can match to orders.",
          "Paystack fits when you need a bespoke cart, subscriptions, or multiple products on one Ghana domain.",
        ],
        links: [
          { href: "/guides/accept-mobile-money-paystack", label: "MoMo + Paystack integration guide" },
          { href: "/services/ecommerce", label: "E-commerce development" },
        ],
      },
      {
        heading: "Hubtel — aggregators and omnichannel retail",
        paragraphs: [
          "Hubtel is strong when you want payments bundled with SMS, USSD, or retail tooling, or when your operations team already runs on Hubtel dashboards.",
          "Custom websites can still integrate Hubtel, but scope the same webhook and reconciliation work as Paystack — a button that redirects without server confirmation is not a finished shop.",
        ],
        links: [{ href: "/insights/ghana-momo-economy", label: "Designing for Ghana MoMo behaviour" }],
      },
      {
        heading: "What to decide before you sign",
        paragraphs: [
          "Write these down before you compare quotes — they matter more than the logo on the payment button.",
        ],
        bullets: [
          "Who reconciles MoMo against orders every morning",
          "Whether checkout must stay on your domain or can use a hosted page",
          "Transaction fees at your average order value",
          "Whether you need telco-direct APIs later at higher volume",
        ],
        links: [{ href: "/pricing", label: "See which package includes payments" }],
      },
    ],
    faqs: [
      {
        question: "Can we use both Hubtel and Paystack?",
        answer:
          "Usually you pick one primary gateway per storefront to keep reconciliation simple. Enterprise scopes can document exceptions in the statement of work.",
      },
      {
        question: "Does OceanCyber resell either gateway?",
        answer:
          "No. You open the merchant account; we integrate the gateway you choose and test live MoMo before launch.",
      },
      {
        question: "Which is faster to launch?",
        answer:
          "Whichever account is approved first. Start KYC while we design — missing business documents delay both providers equally.",
      },
    ],
    related: [
      { href: "/guides/accept-mobile-money-paystack", label: "Accept Mobile Money and Paystack" },
      { href: "/compare/shopify-woocommerce-custom-ghana", label: "Shopify, WooCommerce, or custom" },
    ],
    cta: {
      title: "Tell us which gateway you prefer",
      body: "Share your catalog, wallets, and whether finance needs a daily export.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "guide",
    slug: "domains-hosting-and-ssl-ghana",
    title: "Domains, hosting, and SSL in Ghana (one stack)",
    description:
      "How Ghana businesses buy a .com or .com.gh domain, add SSL, and host on cPanel — list prices in GHS and what OceanCyber sells today.",
    eyebrow: "Infrastructure guide",
    image: "/images/articles/website-cost-ghana.png",
    imageAlt: "Laptop showing domain search and cPanel hosting options",
    intro:
      "Your public site needs three lines: the domain, hosting that serves pages, and TLS so browsers trust the connection. OceanCyber sells all three in cedis via Paystack — separate from website build packages on /pricing.",
    sections: [
      {
        heading: "Domains",
        paragraphs: [
          "Search on /domains. Global TLDs (.com from GHS 120/year) and .com.gh (marketing list on /facts) show annual cedis pricing before checkout.",
        ],
        links: [
          { href: "/guides/domain-prices-in-ghana", label: "Domain price list" },
          { href: "/guides/com-gh-domain-registration-guide", label: ".com.gh registration steps" },
        ],
      },
      {
        heading: "Hosting",
        paragraphs: [
          "cPanel hosting from GHS 69/month includes Let’s Encrypt SSL on OceanCyber nameservers. Use this when you already have HTML or WordPress; custom Next.js apps may need a different host — ask in discovery.",
        ],
        links: [
          { href: "/guides/web-hosting-cost-in-ghana", label: "Hosting cost breakdown" },
          { href: "/hosting", label: "Hosting plans" },
        ],
      },
      {
        heading: "Commercial SSL",
        paragraphs: [
          "Let’s Encrypt is free on our hosting. Buy PositiveSSL from GHS 45/year when you need a warranty-backed certificate or non-cPanel servers.",
        ],
        links: [{ href: "/ssl", label: "SSL certificates" }],
      },
    ],
    faqs: [
      {
        question: "Can you move my domain and site to OceanCyber?",
        answer:
          "Yes. We help with auth codes, DNS cutover, and a short maintenance window so email keeps working.",
      },
      {
        question: "Is hosting included in website packages?",
        answer:
          "Build packages cover design and engineering. Domain, hosting, and SSL are separate annual or monthly lines unless your proposal says otherwise.",
      },
    ],
    related: [
      { href: "/products", label: "Products hub" },
      { href: "/guides/website-cost-in-ghana", label: "Full website cost in Ghana" },
    ],
    cta: {
      title: "Start with a domain search",
      body: "Register the name, then add hosting or talk to us about a custom build.",
      href: "/domains",
      label: "Search domains",
    },
  },
];
