import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export type GeoCity = "accra" | "ghana";

/**
 * One topic = one Accra page + one Ghana page.
 * website-development redirects to web-development (avoids cannibalization).
 */
export type GeoProofKey = "fitch-advisory" | "fitch-attorneys" | "thinq-shopping";

export type GeoServiceTopic = {
  key: string;
  /** H1 noun: "web development" */
  label: string;
  serviceHref: string;
  image: string;
  startingPriceGhs: number;
  priceBandNote?: string;
  serviceTypes: string[];
  /** Accra-specific angle (meetings, office, Greater Accra) */
  accraFocus: string;
  /** Ghana-wide angle (cities served, remote delivery) */
  ghanaFocus: string;
  /** What you get — unique bullets per topic */
  deliverables: string[];
  /** Why pick OceanCyber over Accra rivals for this service */
  whyUs: string[];
  /** Portfolio proof to feature on this topic (avoids identical lists on every geo URL) */
  proofKeys: readonly GeoProofKey[];
  /** Secondary queries answered in FAQ only (not phrase grids) */
  secondaryQueries: string[];
};

const p = googleBusinessProfile;

function formatGhs(amount: number): string {
  return `GHS ${amount.toLocaleString("en-GH")}`;
}

export const geoServiceTopics: readonly GeoServiceTopic[] = [
  {
    key: "web-development",
    label: "web development",
    serviceHref: "/services/web-development",
    image: serviceImages.webDevelopment,
    startingPriceGhs: 6000,
    serviceTypes: ["Web development", "Website development", "Web applications"],
    accraFocus:
      "Company websites and web apps for Accra teams that want design and build in one office visit at 47 Nii Kwashiefio Avenue — SEO, speed, and Paystack or MoMo when checkout is required.",
    ghanaFocus:
      "Website and web app builds for teams across Ghana. The Accra office runs discovery; delivery covers Kumasi, Tema, Takoradi, and remote clients with the same GHS packages.",
    deliverables: [
      "Marketing sites and company portals from five pages up",
      "Paystack or Mobile Money checkout when the brief needs it",
      "On-page search setup, performance budget, and 30–90 days of defect support by package",
    ],
    whyUs: [
      `${p.rating} from ${p.reviewCount} Google reviews and published Accra client results`,
      "Fixed-price packages in cedis — Startup from GHS 6,000",
      "One Accra team for design, engineering, and launch — not a freelancers marketplace",
    ],
    proofKeys: ["fitch-advisory", "fitch-attorneys"],
    secondaryQueries: [
      "best web development agency in Accra Ghana",
      "best website development company in Accra",
      "web developer in Accra Ghana",
      "website developer in Accra Ghana",
    ],
  },
  {
    key: "software-development",
    label: "software development",
    serviceHref: "/services/software-development",
    image: serviceImages.webDevelopment,
    startingPriceGhs: 14500,
    priceBandNote: "Typical custom tools and platforms from GHS 14,500; larger ERP or SaaS scoped after discovery",
    serviceTypes: ["Custom software", "Internal tools", "Web applications"],
    accraFocus:
      "Custom software for Accra operations: staff logins, workflows, finance reconciliation, and integrations that match how Ghanaian teams actually work.",
    ghanaFocus:
      "Custom software and internal platforms for Ghana SMEs and enterprises. Built in Accra for MoMo-aware payments, patchy connectivity, and multi-branch ops.",
    deliverables: [
      "Scoped discovery with a written build plan before engineering starts",
      "Staff roles, audit trails, and APIs to the tools you already use",
      "Hosting, SSL, and handover documentation included in the project plan",
    ],
    whyUs: [
      "Professional package floor at GHS 14,500 with milestone billing",
      "Same Accra engineers who shipped ThinQ Shopping and client portals you can open",
      "Ghana Data Protection and security review options on Enterprise scopes",
    ],
    proofKeys: ["fitch-advisory", "fitch-attorneys", "thinq-shopping"],
    secondaryQueries: [
      "best software development agency in Accra Ghana",
      "software development company in Accra",
      "software developer in Accra Ghana",
    ],
  },
  {
    key: "mobile-app-development",
    label: "mobile app development",
    serviceHref: "/services/mobile-apps",
    image: serviceImages.mobileApps,
    startingPriceGhs: 12000,
    priceBandNote: "From GHS 12,000 per platform; cross-platform MVPs scoped after discovery",
    serviceTypes: ["Mobile apps", "iOS", "Android", "Mobile application development"],
    accraFocus:
      "iOS and Android apps for Accra product teams — offline-aware flows, push, and store release from the Accra office.",
    ghanaFocus:
      "Mobile apps for Ghana users on mid-range Android and variable data. Accra engineering, store submission help, and MoMo or Paystack when payments matter.",
    deliverables: [
      "Native or cross-platform path chosen against your audience and budget",
      "API design so the app shares login and data with your website",
      "Play Store and App Store listing support for the first submission",
    ],
    whyUs: [
      "Starting from GHS 12,000 per platform — published upfront like Accra rivals",
      "Built for Ghana phones and networks, not demo-day Wi-Fi only",
      `${p.teamSize}-person Accra team with live commerce apps in portfolio`,
    ],
    proofKeys: ["thinq-shopping"],
    secondaryQueries: [
      "best mobile app development company in Accra Ghana",
      "best mobile application development agency in Accra",
      "mobile app developer in Accra Ghana",
    ],
  },
  {
    key: "ecommerce-development",
    label: "ecommerce development",
    serviceHref: "/services/ecommerce",
    image: serviceImages.ecommerce,
    startingPriceGhs: 6000,
    serviceTypes: ["E-commerce", "Online stores", "Checkout"],
    accraFocus:
      "Online stores for Accra retailers: catalog, Paystack and Mobile Money checkout, and delivery rules that match Greater Accra logistics.",
    ghanaFocus:
      "Ecommerce builds for Ghana shops selling nationwide. MoMo and cards, order desk workflows, and hosting sized for a real catalog — not a template demo.",
    deliverables: [
      "Product catalog, cart, and checkout with Paystack or MoMo",
      "Order notifications your team can run from phone or desk",
      "SEO for category and product pages where the platform allows it",
    ],
    whyUs: [
      "Stores from GHS 6,000 with clear upgrade path to Professional at GHS 14,500",
      "ThinQ Shopping-style mobile conversion proof in the portfolio",
      "Local Accra support when checkout or delivery rules break",
    ],
    proofKeys: ["thinq-shopping"],
    secondaryQueries: [
      "best ecommerce development company in Accra Ghana",
      "online store development agency in Accra",
      "ecommerce developer in Accra Ghana",
    ],
  },
  {
    key: "cybersecurity",
    label: "cybersecurity",
    serviceHref: "/services/cybersecurity",
    image: serviceImages.cyberSecurity,
    startingPriceGhs: 4500,
    serviceTypes: ["Cybersecurity", "Security assessments", "Hardening"],
    accraFocus:
      "Security assessments and hardening for Accra businesses — baseline reviews from GHS 4,500 with a team you can meet on Nii Kwashiefio Avenue.",
    ghanaFocus:
      "Security reviews for Ghana organisations: assessments, hardening, and readiness with evidence your board can read. Delivered from Accra nationwide.",
    deliverables: [
      "Scoped assessment with written findings and priority fixes",
      "Hardening for sites, apps, and cloud accounts you already run",
      "Path to ongoing monitoring or a longer Enterprise security retainer",
    ],
    whyUs: [
      "Baseline reviews from GHS 4,500 — transparent Accra pricing",
      "Same firm that builds the product can secure it",
      "Ghana Data Protection Act awareness on website and app scopes",
    ],
    proofKeys: ["fitch-advisory"],
    secondaryQueries: [
      "best cybersecurity company in Accra Ghana",
      "cybersecurity agency in Accra",
      "cyber security company in Ghana",
    ],
  },
  {
    key: "ui-ux-design",
    label: "UI UX design",
    serviceHref: "/services/ui-ux-design",
    image: serviceImages.uiUxBrand,
    startingPriceGhs: 3500,
    serviceTypes: ["UI/UX design", "Brand design", "Figma prototypes"],
    accraFocus:
      "UI/UX and brand design for Accra product teams — Figma prototypes and engineering handoff from the same studio that builds the release.",
    ghanaFocus:
      "Product and brand design for Ghana startups and SMEs. Research, wireframes, and design systems that Accra engineers can ship without rework.",
    deliverables: [
      "Brand UX packages from GHS 3,500",
      "Figma prototypes your team can click before build",
      "Design-to-engineering handoff in one delivery thread",
    ],
    whyUs: [
      "Design and build under one Accra contract when you want both",
      "Portfolio brands and portals you can open live",
      "No offshore handoff gap between mockups and code",
    ],
    proofKeys: ["fitch-advisory", "fitch-attorneys"],
    secondaryQueries: [
      "best UI UX design company in Accra Ghana",
      "best product design agency in Accra",
      "UI UX designer in Accra Ghana",
    ],
  },
] as const;

/** Old overlapping URL → canonical web-development geo page */
export const geoServiceRedirects: ReadonlyArray<{ source: string; destination: string }> = [
  {
    source: "/services/website-development-in-accra",
    destination: "/services/web-development-in-accra",
  },
  {
    source: "/services/website-development-in-ghana",
    destination: "/services/web-development-in-ghana",
  },
];

export type GeoServicePage = {
  slug: string;
  path: string;
  city: GeoCity;
  topicKey: string;
  /** Document title (may include from GHS) */
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  focus: string;
  deliverables: string[];
  whyUs: string[];
  proofKeys: readonly GeoProofKey[];
  serviceHref: string;
  siblingHref: string;
  siblingLabel: string;
  image: string;
  startingPriceGhs: number;
  priceLabel: string;
  serviceTypes: string[];
  faqs: Array<{ question: string; answer: string }>;
};

function placeLabel(city: GeoCity): string {
  return city === "accra" ? "Accra" : "Ghana";
}

function buildGeoPage(topic: GeoServiceTopic, city: GeoCity): GeoServicePage {
  const place = placeLabel(city);
  const slug = `${topic.key}-in-${city}`;
  const path = `/services/${slug}`;
  const siblingCity: GeoCity = city === "accra" ? "ghana" : "accra";
  const siblingHref = `/services/${topic.key}-in-${siblingCity}`;
  /** Visible cross-link — keep “Best …” on H1/meta owners only */
  const siblingLabel = `${topic.label} in ${placeLabel(siblingCity)}`;
  const price = formatGhs(topic.startingPriceGhs);
  const focus = city === "accra" ? topic.accraFocus : topic.ghanaFocus;

  const h1 = `Best ${topic.label} company in ${place}`;
  // KayTech/Devarps pattern: price in the title for commercial CTR
  const title = `${h1}, from ${price}`;

  const description = `${h1}. ${focus} From ${price}.`;

  const intro =
    city === "accra"
      ? `${focus} Packages from ${price}. Office at ${p.address.street} — ${p.rating} from ${p.reviewCount} Google reviews.`
      : `${focus} Packages from ${price}. Accra office, nationwide delivery — ${p.rating} from ${p.reviewCount} Google reviews.`;

  const faqs =
    city === "accra"
      ? [
          {
            question: `Who is the best ${topic.label} company in Accra?`,
            answer: `OceanCyber at ${p.address.street}, Accra — founded ${p.foundedYear}, ${p.teamSize} people, ${p.rating} from ${p.reviewCount} Google reviews. ${focus}`,
          },
          {
            question: `How much does ${topic.label} cost in Accra?`,
            answer:
              topic.priceBandNote ??
              `Packages start from ${price}. Scope is confirmed in discovery with fixed-price milestones in Ghana cedis.`,
          },
          {
            question: `Can we meet before we hire for ${topic.label}?`,
            answer: `Yes. Book a visit at ${p.address.street}, Accra, or start on WhatsApp with ${p.phoneDisplay}. Most Accra clients meet once before kickoff.`,
          },
          {
            question: "Do you only work with Accra companies?",
            answer: `No. Accra is the office; we also deliver nationwide. Prefer the Ghana hire page if your team is outside Greater Accra.`,
          },
        ]
      : [
          {
            question: `Who is the best ${topic.label} company in Ghana?`,
            answer: `OceanCyber works from Accra for teams across Ghana — Kumasi, Tema, Takoradi, Tamale, and remote. ${p.rating} from ${p.reviewCount} Google reviews. ${focus}`,
          },
          {
            question: `How much does ${topic.label} cost in Ghana?`,
            answer:
              topic.priceBandNote ??
              `The same GHS packages as Accra — from ${price}. Domain, hosting, and care are separate lines.`,
          },
          {
            question: `Can a team outside Accra hire OceanCyber for ${topic.label}?`,
            answer: `Yes. Discovery can be remote or at ${p.address.street}, Accra. Delivery and support run on the same Accra engineering channel.`,
          },
          {
            question: "Where is the office?",
            answer: `The only office is at ${p.address.street}, Accra, Ghana. Call ${p.phoneDisplay}.`,
          },
        ];

  return {
    slug,
    path,
    city,
    topicKey: topic.key,
    title,
    description,
    h1,
    eyebrow: city === "accra" ? `Accra · from ${price}` : `Ghana · from ${price}`,
    intro,
    focus,
    deliverables: [...topic.deliverables],
    whyUs: [...topic.whyUs],
    proofKeys: topic.proofKeys,
    serviceHref: topic.serviceHref,
    siblingHref,
    siblingLabel,
    image: topic.image,
    startingPriceGhs: topic.startingPriceGhs,
    priceLabel: price,
    serviceTypes: topic.serviceTypes,
    faqs,
  };
}

export const geoServicePages: readonly GeoServicePage[] = geoServiceTopics.flatMap((topic) => [
  buildGeoPage(topic, "accra"),
  buildGeoPage(topic, "ghana"),
]);

export function getGeoServicePage(slug: string): GeoServicePage | undefined {
  return geoServicePages.find((page) => page.slug === slug);
}

export function geoServiceSitemapPaths(): string[] {
  return geoServicePages.map((page) => page.path);
}

export function geoServicePageMetadata(slug: string): Metadata {
  const page = getGeoServicePage(slug);
  if (!page) return { title: "Page not found" };
  return withCanonical(
    {
      title: page.title,
      description: page.description,
      openGraph: {
        title: page.title,
        description: page.description,
        type: "website",
        url: page.path,
        images: [{ url: page.image, alt: page.h1 }],
      },
    },
    page.path,
  );
}

export function geoServiceHubCards(): Array<{
  title: string;
  description: string;
  href: string;
  image: string;
}> {
  return geoServicePages
    .filter((page) => page.city === "accra")
    .map((page) => ({
      // Neutral hub labels — keep “Best …” on owner H1s only
      title: page.h1.replace(/^Best\s+/i, "").replace(/\s+company\b/i, ""),
      description: page.description,
      href: page.path,
      image: page.image,
    }));
}
