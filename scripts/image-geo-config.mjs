/**
 * Descriptive SEO filenames for marketing images.
 * Pattern: oceancyber-accra-{topic}-{context}-ghana.webp
 */
import path from "path";

export const business = {
  name: "OceanCyber",
  street: "47 Nii Kwashiefio Avenue",
  locality: "Accra",
  country: "Ghana",
  countryCode: "GH",
  latitude: 5.6173486,
  longitude: -0.2252809,
};

export const baseKeywords = ["OceanCyber", "Accra", "Ghana"];

export const siteImageCatalog = [
  {
    slug: "future-cybersecurity-africa",
    path: "insights/oceancyber-accra-cybersecurity-africa-insights-ghana.webp",
    title: "Cybersecurity insights for African businesses",
    description:
      "OceanCyber editorial on cybersecurity trends across Africa — Accra, Ghana.",
    keywords: [...baseKeywords, "cybersecurity", "Africa"],
    gbpCategory: "At work",
  },
  {
    slug: "digital-transformation-ghana",
    path: "insights/oceancyber-accra-digital-transformation-ghana-insights.webp",
    title: "Digital transformation in Ghana",
    description:
      "How Ghanaian businesses adopt digital platforms — OceanCyber, Accra.",
    keywords: [...baseKeywords, "digital transformation"],
    gbpCategory: "At work",
  },
  {
    slug: "fintech-banking-unbanked",
    path: "insights/oceancyber-accra-fintech-banking-unbanked-insights-ghana.webp",
    title: "Fintech and financial inclusion in Africa",
    description: "Fintech product insights from OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "fintech", "banking"],
    gbpCategory: "At work",
  },
  {
    slug: "ecommerce-emerging-markets",
    path: "insights/oceancyber-accra-ecommerce-emerging-markets-insights-ghana.webp",
    title: "E-commerce growth in emerging markets",
    description:
      "E-commerce strategy insights from OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "e-commerce"],
    gbpCategory: "At work",
  },
  {
    slug: "ai-ml-practical",
    path: "insights/oceancyber-accra-ai-machine-learning-insights-ghana.webp",
    title: "Practical AI and machine learning applications",
    description: "AI and ML product insights from OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "AI", "machine learning"],
    gbpCategory: "At work",
  },
  {
    slug: "ghana-momo-economy",
    path: "insights/oceancyber-accra-mobile-money-ghana-insights.webp",
    title: "Ghana mobile money economy insights",
    description:
      "Mobile money and fintech insights from OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "mobile money", "MoMo"],
    gbpCategory: "At work",
  },
  {
    slug: "ghana-cybersecurity-trends",
    path: "insights/oceancyber-accra-cybersecurity-trends-ghana-insights.webp",
    title: "Cybersecurity trends for Ghanaian businesses",
    description:
      "Threat trends and controls for Ghana SMEs — OceanCyber, Accra.",
    keywords: [...baseKeywords, "cybersecurity", "SME"],
    gbpCategory: "At work",
  },
  {
    slug: "ecommerce-growth-ghana",
    path: "insights/oceancyber-accra-ecommerce-growth-ghana-insights.webp",
    title: "Ghana e-commerce growth outlook",
    description:
      "E-commerce growth insights for Ghana merchants — OceanCyber, Accra.",
    keywords: [...baseKeywords, "e-commerce", "retail"],
    gbpCategory: "At work",
  },
  {
    slug: "data-privacy-compliance",
    path: "insights/oceancyber-accra-data-privacy-compliance-insights-ghana.webp",
    title: "Data privacy and compliance insights",
    description: "Data protection guidance from OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "data privacy", "compliance"],
    gbpCategory: "At work",
  },
  {
    path: "hero-services/oceancyber-accra-ui-ux-brand-design-services-ghana.webp",
    title: "UI/UX and brand design services in Accra",
    description:
      "OceanCyber UI/UX and brand design for web and mobile products — Accra, Ghana.",
    keywords: [...baseKeywords, "UI/UX", "brand design"],
    gbpCategory: "Services",
  },
  {
    path: "hero-services/oceancyber-accra-web-development-services-ghana.webp",
    title: "Web development services in Accra",
    description:
      "Custom websites and web applications by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "web development", "website"],
    gbpCategory: "Services",
  },
  {
    path: "hero-services/oceancyber-accra-mobile-app-development-services-ghana.webp",
    title: "Mobile app development in Accra",
    description:
      "iOS and Android app development by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "mobile apps", "iOS", "Android"],
    gbpCategory: "Services",
  },
  {
    path: "hero-services/oceancyber-accra-ecommerce-development-services-ghana.webp",
    title: "E-commerce development in Accra",
    description:
      "Online stores and marketplace builds by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "e-commerce", "online store"],
    gbpCategory: "Services",
  },
  {
    path: "hero-services/oceancyber-accra-cybersecurity-services-ghana.webp",
    title: "Security consulting in Accra",
    description:
      "Security assessments and hardened builds by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "cybersecurity", "security"],
    gbpCategory: "Services",
  },
  {
    path: "hero-services/oceancyber-accra-cloud-hosting-services-ghana.webp",
    title: "Cloud hosting and managed infrastructure in Accra",
    description:
      "Cloud hosting and managed ICT services by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "cloud hosting", "managed services"],
    gbpCategory: "Services",
  },
  {
    path: "portfolio-showcase/oceancyber-accra-portfolio-creative-hub-ghana.webp",
    title: "OceanCyber Creative Hub — studio concept",
    description:
      "Illustrative in-house dashboard UI used in OceanCyber design proposals — studio concept, not a live client deployment. Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "UI/UX", "studio concept"],
    gbpCategory: "At work",
  },
  {
    path: "portfolio-showcase/oceancyber-accra-portfolio-egp-ghana-fintech.webp",
    title: "EGP Ghana — fintech web platform",
    description:
      "Financial services platform built by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "fintech", "banking"],
    gbpCategory: "At work",
  },
  {
    path: "portfolio-showcase/oceancyber-accra-portfolio-juelle-hair-ecommerce.webp",
    title: "Juelle Hair — e-commerce platform",
    description:
      "E-commerce store built by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "e-commerce"],
    gbpCategory: "At work",
  },
  {
    path: "portfolio-showcase/oceancyber-accra-portfolio-tour-world-tourism.webp",
    title: "Tour World Tourism — booking platform",
    description:
      "Travel booking platform built by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "travel", "booking"],
    gbpCategory: "At work",
  },
  {
    path: "portfolio-showcase/oceancyber-accra-portfolio-fitch-advisory-ghana.webp",
    title: "Fitch Advisory — consulting website",
    description:
      "Financial advisory website built by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "consulting"],
    gbpCategory: "At work",
  },
  {
    path: "portfolio-showcase/oceancyber-accra-portfolio-fitch-attorneys-ghana.webp",
    title: "Fitch Attorneys — legal services platform",
    description:
      "Law firm website and portal built by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "legal"],
    gbpCategory: "At work",
  },
  {
    path: "oceancyber-accra-portfolio-africa-trade-awards-ghana.webp",
    title: "Africa Trade Awards — event platform",
    description:
      "Award ceremony and voting platform built by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "portfolio", "events"],
    gbpCategory: "At work",
  },
  {
    path: "agency-bento/oceancyber-accra-fintech-dashboard-work-ghana.webp",
    title: "Financial services dashboard — OceanCyber work",
    description:
      "Fintech dashboard design and development by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "fintech", "dashboard"],
    gbpCategory: "At work",
  },
  {
    path: "agency-bento/oceancyber-accra-mobile-commerce-work-ghana.webp",
    title: "Mobile commerce experience — OceanCyber work",
    description:
      "Mobile commerce product by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "mobile commerce", "e-commerce"],
    gbpCategory: "At work",
  },
  {
    path: "agency-bento/oceancyber-accra-brand-design-system-work-ghana.webp",
    title: "Brand and design system — OceanCyber work",
    description:
      "Brand identity and design system by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "brand", "design system"],
    gbpCategory: "At work",
  },
  {
    path: "agency-bento/oceancyber-accra-travel-platform-work-ghana.webp",
    title: "Travel booking platform — OceanCyber work",
    description:
      "Hospitality booking platform by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "travel", "booking"],
    gbpCategory: "At work",
  },
  {
    path: "agency-bento/oceancyber-accra-cybersecurity-platform-work-ghana.webp",
    title: "Secure enterprise portal — OceanCyber work",
    description:
      "Cybersecurity-focused web platform by OceanCyber — Accra, Ghana.",
    keywords: [...baseKeywords, "cybersecurity", "enterprise"],
    gbpCategory: "At work",
  },
];

/** Short insight filenames → slug (target path comes from siteImageCatalog). */
export const legacyInsightSourcesBySlug = {
  "future-cybersecurity-africa": "insights/future-cybersecurity-africa.webp",
  "digital-transformation-ghana": "insights/digital-transformation-ghana.webp",
  "fintech-banking-unbanked": "insights/fintech-banking-unbanked.webp",
  "ecommerce-emerging-markets": "insights/ecommerce-emerging-markets.webp",
  "ai-ml-practical": "insights/ai-ml-practical.webp",
  "ghana-momo-economy": "insights/ghana-momo-economy.webp",
  "ghana-cybersecurity-trends": "insights/ghana-cybersecurity-trends.webp",
  "ecommerce-growth-ghana": "insights/ecommerce-growth-ghana.webp",
  "data-privacy-compliance": "insights/data-privacy-compliance.webp",
};

/**
 * Explicit [from, to] paths relative to public/images/.
 * Sources may already be deleted after migration — rename script skips missing files.
 */
export const legacySourceRenames = [
  // Service hero short names
  ["hero-services/hero-ui-ux-brand.webp", "hero-services/oceancyber-accra-ui-ux-brand-design-services-ghana.webp"],
  ["hero-services/hero-web-development.webp", "hero-services/oceancyber-accra-web-development-services-ghana.webp"],
  ["hero-services/hero-mobile-apps.webp", "hero-services/oceancyber-accra-mobile-app-development-services-ghana.webp"],
  ["hero-services/hero-ecommerce.webp", "hero-services/oceancyber-accra-ecommerce-development-services-ghana.webp"],
  ["hero-services/hero-cyber-security.webp", "hero-services/oceancyber-accra-cybersecurity-services-ghana.webp"],
  ["hero-services/hero-cloud-hosting.webp", "hero-services/oceancyber-accra-cloud-hosting-services-ghana.webp"],
  // Portfolio short showcase names
  ["portfolio-showcase/portfolio-creative-hub.webp", "portfolio-showcase/oceancyber-accra-portfolio-creative-hub-ghana.webp"],
  ["portfolio-showcase/portfolio-egp-ghana.webp", "portfolio-showcase/oceancyber-accra-portfolio-egp-ghana-fintech.webp"],
  ["portfolio-showcase/portfolio-juelle-hair.webp", "portfolio-showcase/oceancyber-accra-portfolio-juelle-hair-ecommerce.webp"],
  ["portfolio-showcase/portfolio-tour-world.webp", "portfolio-showcase/oceancyber-accra-portfolio-tour-world-tourism.webp"],
  ["portfolio-showcase/portfolio-fitch-advisory.webp", "portfolio-showcase/oceancyber-accra-portfolio-fitch-advisory-ghana.webp"],
  ["portfolio-showcase/portfolio-fitch-attorneys.webp", "portfolio-showcase/oceancyber-accra-portfolio-fitch-attorneys-ghana.webp"],
  // Legacy root filenames (spaces / old marketing names)
  ["Africa Trade Chamber.webp", "oceancyber-accra-portfolio-africa-trade-awards-ghana.webp"],
  ["EGP Ghana.webp", "portfolio-showcase/oceancyber-accra-portfolio-egp-ghana-fintech.webp"],
  ["Juelle Hair.webp", "portfolio-showcase/oceancyber-accra-portfolio-juelle-hair-ecommerce.webp"],
  ["Tour World Tourism.webp", "portfolio-showcase/oceancyber-accra-portfolio-tour-world-tourism.webp"],
  ["Fitch Advisory.webp", "portfolio-showcase/oceancyber-accra-portfolio-fitch-advisory-ghana.webp"],
  ["Fitch Attorney.webp", "portfolio-showcase/oceancyber-accra-portfolio-fitch-attorneys-ghana.webp"],
  ["creative-template.png", "portfolio-showcase/oceancyber-accra-portfolio-creative-hub-ghana.webp"],
  // Agency bento short names
  ["agency-bento/agency-bento-fintech-dashboard.webp", "agency-bento/oceancyber-accra-fintech-dashboard-work-ghana.webp"],
  ["agency-bento/agency-bento-mobile-commerce.webp", "agency-bento/oceancyber-accra-mobile-commerce-work-ghana.webp"],
  ["agency-bento/agency-bento-brand-system.webp", "agency-bento/oceancyber-accra-brand-design-system-work-ghana.webp"],
  ["agency-bento/agency-bento-travel-platform.webp", "agency-bento/oceancyber-accra-travel-platform-work-ghana.webp"],
  ["agency-bento/agency-bento-cybersecurity-platform.webp", "agency-bento/oceancyber-accra-cybersecurity-platform-work-ghana.webp"],
];

/** @deprecated Use legacySourceRenames + legacyInsightSourcesBySlug. Kept for one release of external docs. */
export const legacyImagePaths = {
  insights: legacyInsightSourcesBySlug,
  services: {
    uiUxBrand: legacySourceRenames[0][0],
    webDevelopment: legacySourceRenames[1][0],
    mobileApps: legacySourceRenames[2][0],
    ecommerce: legacySourceRenames[3][0],
    cyberSecurity: legacySourceRenames[4][0],
    cloudHosting: legacySourceRenames[5][0],
  },
  portfolio: {
    creativeHub: legacySourceRenames[6][0],
    egpGhana: legacySourceRenames[7][0],
    juelleHair: legacySourceRenames[8][0],
    tourWorld: legacySourceRenames[9][0],
    fitchAdvisory: legacySourceRenames[10][0],
    fitchAttorneys: legacySourceRenames[11][0],
    africaTradeAwards: legacySourceRenames[12][0],
  },
  work: {
    fintechDashboard: legacySourceRenames[19][0],
    mobileCommerce: legacySourceRenames[20][0],
    brandSystem: legacySourceRenames[21][0],
    travelPlatform: legacySourceRenames[22][0],
    cybersecurityPlatform: legacySourceRenames[23][0],
  },
};

export function buildLegacyRenamePairs() {
  const insightPairs = Object.entries(legacyInsightSourcesBySlug)
    .map(([slug, fromRel]) => {
      const to = siteImageCatalog.find((item) => item.slug === slug)?.path;
      return to && fromRel !== to ? [fromRel, to] : null;
    })
    .filter(Boolean);

  const explicit = legacySourceRenames.filter(([from, to]) => from !== to);
  return [...insightPairs, ...explicit];
}

export const gbpCatalogs = {
  insights: siteImageCatalog.filter((item) => item.path.startsWith("insights/")),
  services: siteImageCatalog.filter((item) =>
    item.path.startsWith("hero-services/"),
  ),
  portfolio: siteImageCatalog.filter(
    (item) =>
      item.path.startsWith("portfolio-showcase/") ||
      item.path.startsWith("oceancyber-accra-portfolio-"),
  ),
  work: siteImageCatalog.filter((item) => item.path.startsWith("agency-bento/")),
};

export function publicImagePath(relativePath) {
  return `/images/${relativePath}`;
}

export function gbpJpegBaseName(item) {
  return path.basename(item.path, path.extname(item.path));
}
