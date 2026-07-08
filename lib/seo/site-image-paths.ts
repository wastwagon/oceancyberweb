/** Descriptive public image paths — keep aligned with scripts/image-geo-config.mjs */
export const siteImagePaths = {
  insights: {
    "future-cybersecurity-africa":
      "/images/insights/oceancyber-accra-cybersecurity-africa-insights-ghana.webp",
    "digital-transformation-ghana":
      "/images/insights/oceancyber-accra-digital-transformation-ghana-insights.webp",
    "fintech-banking-unbanked":
      "/images/insights/oceancyber-accra-fintech-banking-unbanked-insights-ghana.webp",
    "ecommerce-emerging-markets":
      "/images/insights/oceancyber-accra-ecommerce-emerging-markets-insights-ghana.webp",
    "ai-ml-practical":
      "/images/insights/oceancyber-accra-ai-machine-learning-insights-ghana.webp",
    "ghana-momo-economy":
      "/images/insights/oceancyber-accra-mobile-money-ghana-insights.webp",
    "ghana-cybersecurity-trends":
      "/images/insights/oceancyber-accra-cybersecurity-trends-ghana-insights.webp",
    "ecommerce-growth-ghana":
      "/images/insights/oceancyber-accra-ecommerce-growth-ghana-insights.webp",
    "data-privacy-compliance":
      "/images/insights/oceancyber-accra-data-privacy-compliance-insights-ghana.webp",
    "ghana-data-protection-act-2026":
      "/images/insights/oceancyber-accra-data-privacy-compliance-insights-ghana.webp",
    "ghana-payment-rails-comparison":
      "/images/insights/oceancyber-accra-mobile-money-ghana-insights.webp",
    "agency-vs-hire-ghana":
      "/images/insights/oceancyber-accra-digital-transformation-ghana-insights.webp",
    "ghana-sme-cybersecurity-baseline":
      "/images/insights/oceancyber-accra-cybersecurity-trends-ghana-insights.webp",
  },
  services: {
    uiUxBrand:
      "/images/hero-services/oceancyber-accra-ui-ux-brand-design-services-ghana.webp",
    webDevelopment:
      "/images/hero-services/oceancyber-accra-web-development-services-ghana.webp",
    mobileApps:
      "/images/hero-services/oceancyber-accra-mobile-app-development-services-ghana.webp",
    ecommerce:
      "/images/hero-services/oceancyber-accra-ecommerce-development-services-ghana.webp",
    cyberSecurity:
      "/images/hero-services/oceancyber-accra-cybersecurity-services-ghana.webp",
    cloudHosting:
      "/images/hero-services/oceancyber-accra-cloud-hosting-services-ghana.webp",
  },
  portfolio: {
    creativeHub:
      "/images/portfolio-showcase/oceancyber-accra-portfolio-creative-hub-ghana.webp",
    egpGhana:
      "/images/portfolio-showcase/oceancyber-accra-portfolio-egp-ghana-fintech.webp",
    juelleHair:
      "/images/portfolio-showcase/oceancyber-accra-portfolio-juelle-hair-ecommerce.webp",
    tourWorld:
      "/images/portfolio-showcase/oceancyber-accra-portfolio-tour-world-tourism.webp",
    fitchAdvisory:
      "/images/portfolio-showcase/oceancyber-accra-portfolio-fitch-advisory-ghana.webp",
    fitchAttorneys:
      "/images/portfolio-showcase/oceancyber-accra-portfolio-fitch-attorneys-ghana.webp",
    africaGovernanceCentre: "/images/industries/government.png",
    thinqShopping: "/images/agency-bento/oceancyber-accra-mobile-commerce-work-ghana.webp",
    africaTradeAwards:
      "/images/oceancyber-accra-portfolio-africa-trade-awards-ghana.webp",
  },
  /** Screenshots captured from live client URLs — run npm run capture:live-previews */
  portfolioLive: {
    fitchAdvisory: "/images/portfolio-live/fitch-advisory.webp",
    fitchAttorneys: "/images/portfolio-live/fitch-attorneys.webp",
    africaGovernanceCentre: "/images/portfolio-live/africa-governance-centre.webp",
    thinqShopping: "/images/portfolio-live/thinq-shopping.webp",
  },
  work: {
    fintechDashboard:
      "/images/agency-bento/oceancyber-accra-fintech-dashboard-work-ghana.webp",
    mobileCommerce:
      "/images/agency-bento/oceancyber-accra-mobile-commerce-work-ghana.webp",
    brandSystem:
      "/images/agency-bento/oceancyber-accra-brand-design-system-work-ghana.webp",
    travelPlatform:
      "/images/agency-bento/oceancyber-accra-travel-platform-work-ghana.webp",
    cybersecurityPlatform:
      "/images/agency-bento/oceancyber-accra-cybersecurity-platform-work-ghana.webp",
  },
} as const;

export type InsightSlug = keyof typeof siteImagePaths.insights;

export function insightCoverPath(slug: string): string {
  const mapped = siteImagePaths.insights[slug as InsightSlug];
  return mapped ?? `/images/insights/${slug}.webp`;
}
