import { serviceImages } from "@/lib/startup-agency/service-images";

export type ServicePageSeoEntry = {
  path: string;
  name: string;
  description: string;
  image: string;
};

export const servicePageSeoEntries: ServicePageSeoEntry[] = [
  {
    path: "/services/web-design-in-ghana",
    name: "Best web design company in Ghana",
    description:
      "Best web design company in Ghana. Company websites, online stores, and web apps from 47 Nii Kwashiefio Avenue, Accra. Rated 4.9 from 54 Google reviews.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/web-design-in-accra",
    name: "Best web design company in Accra",
    description:
      "Best web design company in Accra for company websites and web apps. OceanCyber at 47 Nii Kwashiefio Avenue, rated 4.9 from 54 Google reviews.",
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
    name: "Web development in Accra and Ghana",
    description:
      "Best web development company in Accra and Ghana. Marketing sites and web apps from GHS 6,000, with SEO, speed, and a team of 25 at 47 Nii Kwashiefio Avenue.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/mobile-apps",
    name: "Mobile apps",
    description:
      "Native-quality iOS and Android apps for Ghana teams — from GHS 12,000 per platform. Offline resilience, push notifications, and analytics wired for product iteration.",
    image: serviceImages.mobileApps,
  },
  {
    path: "/services/ecommerce",
    name: "E-commerce",
    description:
      "Ghana-ready online stores from GHS 6,000 — Paystack and MoMo checkout, catalog management, and ops tooling sized from launch to scale.",
    image: serviceImages.ecommerce,
  },
  {
    path: "/services/cybersecurity",
    name: "Cybersecurity",
    description:
      "Security assessments and hardening for Ghana businesses — from GHS 4,500 for baseline reviews to enterprise programmes with SLA options.",
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
    name: "Cloud hosting",
    description:
      "Managed cloud hosting, SSL, backups, and uptime monitoring for websites and applications built by OceanCyber.",
    image: serviceImages.cloudHosting,
  },
];

export function getServicePageSeo(path: string): ServicePageSeoEntry | undefined {
  return servicePageSeoEntries.find((entry) => entry.path === path);
}
