import { serviceImages } from "@/lib/startup-agency/service-images";

export type ServicePageSeoEntry = {
  path: string;
  name: string;
  description: string;
  image: string;
};

export const servicePageSeoEntries: ServicePageSeoEntry[] = [
  {
    path: "/services/ui-ux-design",
    name: "UI/UX & brand design",
    description:
      "Interfaces and brand systems that convert — researched with real users, prototyped in Figma, and handed off ready for engineering.",
    image: serviceImages.uiUxBrand,
  },
  {
    path: "/services/web-development",
    name: "Web development",
    description:
      "Fast, accessible marketing sites and robust web products, with performance budgets, SEO foundations, and maintainable systems your team can extend.",
    image: serviceImages.webDevelopment,
  },
  {
    path: "/services/mobile-apps",
    name: "Mobile apps",
    description:
      "Native-quality iOS and Android experiences with offline resilience, push notifications, and analytics wired for product iteration.",
    image: serviceImages.mobileApps,
  },
  {
    path: "/services/ecommerce",
    name: "E-commerce",
    description:
      "Stores and marketplaces built for conversion, inventory truth, and payment flows your finance team can reconcile.",
    image: serviceImages.ecommerce,
  },
  {
    path: "/services/cybersecurity",
    name: "Cybersecurity",
    description:
      "Protect digital assets with assessments, hardening, monitoring alignment, and response readiness: practical controls, not checkbox theater.",
    image: serviceImages.cyberSecurity,
  },
  {
    path: "/services/website-to-mobile-app",
    name: "Website to mobile app",
    description:
      "Convert your existing website into a polished mobile app with shared content, push-ready architecture, and store submission support.",
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
