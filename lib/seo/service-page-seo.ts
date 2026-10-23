import { cybersecurityPublicScopeLine } from "@/lib/marketing/cyber-licence";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { geoServicePages } from "@/lib/seo/geo-service-pages";

export type ServicePageSeoEntry = {
  path: string;
  name: string;
  description: string;
  image: string;
  /** Published “from” price in GHS for JSON-LD Offer — must match on-page copy. */
  offerPriceGhs?: number;
};

export const servicePageSeoEntries: ServicePageSeoEntry[] = [
  {
    path: "/services/web-design",
    name: "Web design services in Ghana",
    description:
      "Web design for Ghana businesses — company sites, stores, and landing pages from GHS 6,000. Mobile-first UX, SEO-ready builds, Paystack and MoMo when you sell online. {{REVIEWS}}",
    image: serviceImages.webDevelopment,
    offerPriceGhs: 6000,
  },
  {
    path: "/services/web-design-in-ghana",
    name: "Best web design company in Ghana, from GHS 6,000",
    description:
      "Best web design company in Ghana. Company websites, online stores, and web apps from Accra — packages from GHS 6,000. {{REVIEWS}}",
    image: serviceImages.webDevelopment,
    offerPriceGhs: 6000,
  },
  {
    path: "/services/web-design-in-accra",
    name: "Best web design company in Accra, from GHS 6,000",
    description:
      "Best web design company in Accra for company websites and web apps. From GHS 6,000. OceanCyber at 47 Nii Kwashiefio Avenue — {{REVIEWS_LOWER}}.",
    image: serviceImages.webDevelopment,
    offerPriceGhs: 6000,
  },
  {
    path: "/services/ui-ux-design",
    name: "UI/UX & brand design",
    description:
      "Interfaces and brand systems for Ghana teams — from GHS 3,500 for brand UX to full design-and-build bundles. Figma prototypes and engineering handoff included.",
    image: serviceImages.uiUxBrand,
    offerPriceGhs: 3500,
  },
  {
    path: "/services/web-development",
    name: "Web development services",
    description:
      "Marketing sites and web apps from GHS 6,000 — SEO, speed, and Accra engineering. Also see web development in Accra for local hire searches.",
    image: serviceImages.webDevelopment,
    offerPriceGhs: 6000,
  },
  {
    path: "/services/software-development",
    name: "Software development services",
    description:
      "Custom software and internal platforms from GHS 14,500 — Accra engineering for Ghana operations.",
    image: serviceImages.webDevelopment,
    offerPriceGhs: 14500,
  },
  {
    path: "/services/mobile-apps",
    name: "Mobile app development services",
    description:
      "iOS and Android apps from GHS 12,000 per platform — offline-aware flows and store-ready releases from Accra.",
    image: serviceImages.mobileApps,
    offerPriceGhs: 12000,
  },
  {
    path: "/services/ecommerce",
    name: "Ecommerce development services",
    description:
      "Online stores from GHS 6,000 with Paystack and Mobile Money checkout for Ghana buyers.",
    image: serviceImages.ecommerce,
    offerPriceGhs: 6000,
  },
  {
    path: "/services/cybersecurity",
    name: "Security consulting (cyber assessments)",
    description:
      `${cybersecurityPublicScopeLine()} From GHS 4,500 — same Accra team that builds and hosts your site.`,
    image: serviceImages.cyberSecurity,
    offerPriceGhs: 4500,
  },
  {
    path: "/services/website-to-mobile-app",
    name: "Website to mobile app",
    description:
      "Convert your website into an App Store and Play Store release — from GHS 8,000 for store-ready wrappers to full native shells at GHS 12,000+.",
    image: serviceImages.mobileApps,
  },
  {
    path: "/hosting",
    name: "Web hosting in Ghana, from GHS 69/mo",
    description:
      "cPanel hosting with SSL, backups, and Accra support. Launch from GHS 69 a month. Pay in cedis with Paystack.",
    image: serviceImages.cloudHosting,
    offerPriceGhs: 69,
  },
  {
    path: "/ssl",
    name: "Buy SSL certificates in Ghana, from GHS 45/yr",
    description:
      "PositiveSSL from GHS 45 a year — renews at the same list price. Wildcard and EV options. Pay in GHS with Paystack.",
    image: serviceImages.cloudHosting,
  },
  {
    path: "/domains",
    name: "Buy a domain name in Ghana",
    description:
      "Register a domain in Ghana. Search availability, add SSL or hosting, and pay in GHS with Paystack.",
    image: serviceImages.cloudHosting,
  },
  ...geoServicePages.map((page) => ({
    path: page.path,
    name: page.h1,
    description: page.description,
    image: page.image,
  })),
];

export function getServicePageSeo(path: string): ServicePageSeoEntry | undefined {
  return servicePageSeoEntries.find((entry) => entry.path === path);
}
