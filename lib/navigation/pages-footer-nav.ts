/**
 * Footer + startup “Pages” menu — human labels; geo SEO titles stay on owner URLs only.
 */
import {
  servicesCapabilityMenuItems,
  servicesLocalGuideMenuItems,
} from "@/lib/navigation/services-geo-nav";

export type NavLabelLink = { readonly label: string; readonly href: string };

export function buildFooterServiceLinks(): NavLabelLink[] {
  return [
    { label: "All services", href: "/services" },
    ...servicesCapabilityMenuItems.map((item) => ({
      label: item.heading,
      href: item.link,
    })),
    ...servicesLocalGuideMenuItems.map((item) => ({
      label: item.heading,
      href: item.link,
    })),
    { label: "More local guides", href: "/services#local-guides" },
    { label: "Hosting", href: "/hosting" },
  ];
}

export function buildStartupPagesMenu(): NavLabelLink[] {
  return [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Pricing", href: "/pricing" },
    { label: "Project cost calculator", href: "/tools/project-cost" },
    { label: "Contact", href: "/contact" },
    { label: "Services", href: "/services" },
    ...servicesLocalGuideMenuItems.map((item) => ({
      label: item.heading,
      href: item.link,
    })),
    { label: "Local guides on services hub", href: "/services#local-guides" },
    { label: "Company facts", href: "/facts" },
    { label: "Products", href: "/products" },
    { label: "Insights", href: "/insights" },
    { label: "Reviews", href: "/reviews" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Domains", href: "/domains" },
    { label: "SSL certificates", href: "/ssl" },
    { label: "Hosting", href: "/hosting" },
    { label: "Checkout", href: "/checkout/cart" },
  ];
}
