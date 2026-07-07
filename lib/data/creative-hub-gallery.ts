import { siteImagePaths } from "@/lib/seo/site-image-paths";

export type CreativeHubItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
};

/** Studio / concept visuals — illustrative, not live client deliveries. */
export const creativeHubGallery: CreativeHubItem[] = [
  {
    id: "creative-hub-dashboard",
    title: "Creative Hub Dashboard",
    category: "UI/UX Concept",
    image: siteImagePaths.portfolio.creativeHub,
    imageAlt: "OceanCyber creative hub dashboard concept",
  },
  {
    id: "design-system-template",
    title: "Design System Template",
    category: "Brand & UI",
    image: "/images/creative-template.png",
    imageAlt: "OceanCyber design system template concept",
  },
  {
    id: "fintech-dashboard",
    title: "Fintech Dashboard",
    category: "Product UI",
    image: siteImagePaths.work.fintechDashboard,
    imageAlt: "Fintech dashboard interface concept",
  },
  {
    id: "mobile-commerce",
    title: "Mobile Commerce",
    category: "E-Commerce UI",
    image: siteImagePaths.work.mobileCommerce,
    imageAlt: "Mobile commerce interface concept",
  },
  {
    id: "brand-system",
    title: "Brand Design System",
    category: "Brand & UI",
    image: siteImagePaths.work.brandSystem,
    imageAlt: "Brand and design system concept",
  },
  {
    id: "travel-platform",
    title: "Travel Platform",
    category: "Web App UI",
    image: siteImagePaths.work.travelPlatform,
    imageAlt: "Travel booking platform concept",
  },
  {
    id: "cybersecurity-platform",
    title: "Security Operations",
    category: "Cyber UI",
    image: siteImagePaths.work.cybersecurityPlatform,
    imageAlt: "Cybersecurity operations dashboard concept",
  },
  {
    id: "ui-ux-services",
    title: "UI/UX & Brand",
    category: "Service Visual",
    image: siteImagePaths.services.uiUxBrand,
    imageAlt: "UI/UX and brand design service visual",
  },
  {
    id: "web-development",
    title: "Web Development",
    category: "Service Visual",
    image: siteImagePaths.services.webDevelopment,
    imageAlt: "Web development service visual",
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    category: "Service Visual",
    image: siteImagePaths.services.mobileApps,
    imageAlt: "Mobile app development service visual",
  },
  {
    id: "ecommerce-services",
    title: "E-Commerce",
    category: "Service Visual",
    image: siteImagePaths.services.ecommerce,
    imageAlt: "E-commerce development service visual",
  },
  {
    id: "cybersecurity-services",
    title: "Cyber Security",
    category: "Service Visual",
    image: siteImagePaths.services.cyberSecurity,
    imageAlt: "Cybersecurity service visual",
  },
  {
    id: "cloud-hosting",
    title: "Cloud Hosting",
    category: "Service Visual",
    image: siteImagePaths.services.cloudHosting,
    imageAlt: "Cloud hosting service visual",
  },
  {
    id: "fitch-advisory-concept",
    title: "Fitch Advisory",
    category: "Concept UI",
    image: siteImagePaths.portfolio.fitchAdvisory,
    imageAlt: "Fitch Advisory platform concept visual",
  },
  {
    id: "fitch-attorneys-concept",
    title: "Fitch Attorneys",
    category: "Concept UI",
    image: siteImagePaths.portfolio.fitchAttorneys,
    imageAlt: "Fitch Attorneys platform concept visual",
  },
  {
    id: "egp-concept",
    title: "Financial Platform",
    category: "Concept UI",
    image: siteImagePaths.portfolio.egpGhana,
    imageAlt: "Financial services platform concept visual",
  },
  {
    id: "ecommerce-concept",
    title: "Retail Storefront",
    category: "Concept UI",
    image: siteImagePaths.portfolio.juelleHair,
    imageAlt: "E-commerce storefront concept visual",
  },
  {
    id: "tourism-concept",
    title: "Travel & Hospitality",
    category: "Concept UI",
    image: siteImagePaths.portfolio.tourWorld,
    imageAlt: "Travel and hospitality platform concept visual",
  },
];
