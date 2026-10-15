import { serviceImages } from "@/lib/startup-agency/service-images";
import { geoServicePages } from "@/lib/seo/geo-service-pages";

export type ServicePageSeoEntry = {
  path: string;
  name: string;
  description: string;
  image: string;
};

export const servicePageSeoEntries: ServicePageSeoEntry[] = [
  {
    path: "/services/web-design-in-ghana",
    name: "Best web design company in Ghana, from GHS 6,000",
    description:
      "Best web design company in Ghana. Company websites, online stores, and web apps from Accra — packages from GHS 6,000. Rated 4.9 from 54 Google reviews.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/web-design-in-accra",
    name: "Best web design company in Accra, from GHS 6,000",
    description:
      "Best web design company in Accra for company websites and web apps. From GHS 6,000. OceanCyber at 47 Nii Kwashiefio Avenue, rated 4.9 from 54 Google reviews.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/ui-ux-design",
    name: "UI/UX & brand design",
    description:
      "Interfaces and brand systems for Ghana teams — from GHS 3,500 for brand UX to full design-and-build bundles. Figma prototypes and engineering handoff included.",
    image: serviceImages.uiUxBrand,
  },
  {
    path: "/services/web-development",
    name: "Web development services",
    description:
      "Marketing sites and web apps from GHS 6,000 — SEO, speed, and Accra engineering. Hire-focused Accra page: /services/web-development-in-accra.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/software-development",
    name: "Software development services",
    description:
      "Custom software and internal platforms from GHS 14,500 — Accra engineering for Ghana ops. Hire-focused Accra page: /services/software-development-in-accra.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/mobile-apps",
    name: "Mobile app development services",
    description:
      "iOS and Android apps from GHS 12,000 per platform — offline-aware, store-ready. Hire-focused Accra page: /services/mobile-app-development-in-accra.",
    image: serviceImages.mobileApps,
  },
  {
    path: "/services/ecommerce",
    name: "Ecommerce development services",
    description:
      "Online stores from GHS 6,000 with Paystack and Mobile Money. Hire-focused Accra page: /services/ecommerce-development-in-accra.",
    image: serviceImages.ecommerce,
  },
  {
    path: "/services/cybersecurity",
    name: "Cybersecurity services",
    description:
      "Assessments and hardening from GHS 4,500 for Ghana businesses. Hire-focused Accra page: /services/cybersecurity-in-accra.",
    image: serviceImages.cyberSecurity,
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
