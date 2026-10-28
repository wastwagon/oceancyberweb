import { serviceOwnershipBlock } from "@/lib/services/ownership-terms";
import type { ServiceFaqJsonLdItem } from "@/components/seo/ServicePageJsonLd";

const ownershipAnswer =
  `${serviceOwnershipBlock.bullets[0]} ${serviceOwnershipBlock.bullets[3]} Full terms are on our terms page.`;

export const serviceHubFaqs: Record<string, readonly ServiceFaqJsonLdItem[]> = {
  "/services/web-design": [
    {
      q: "How much does web design cost in Ghana?",
      a: "Company website packages start at GHS 6,000 (Startup), GHS 14,500 (Professional), and GHS 30,000 (Enterprise). See our pricing page and the website cost in Ghana guide.",
    },
    {
      q: "Do you design and build the website?",
      a: "Yes. One Accra team handles UX, visual design, and development — including Paystack or Mobile Money when you sell online.",
    },
    { q: "Who owns the website files?", a: ownershipAnswer },
  ],
  "/services/web-development": [
    {
      q: "What is included from GHS 6,000?",
      a: "Startup covers up to five responsive pages, forms, basic SEO, and one Paystack or MoMo flow. Timelines are typically 3–5 weeks once copy is ready.",
    },
    { q: "Who owns the code?", a: ownershipAnswer },
  ],
  "/services/mobile-apps": [
    {
      q: "How much does app development cost in Ghana?",
      a: "A single iOS or Android platform starts at GHS 12,000. Web plus one mobile platform bundles from GHS 26,500 on Professional. See our app development cost in Ghana guide.",
    },
    { q: "Do you submit to the App Store and Play Store?", a: "Yes — store-ready builds and submission support are part of scoped delivery." },
  ],
  "/services/ecommerce": [
    {
      q: "Can customers pay with Mobile Money?",
      a: "Yes. Stores include Paystack and MoMo checkout with webhook reconciliation on Professional packages and above.",
    },
    {
      q: "Starting price for an online store?",
      a: "Starter stores from GHS 6,000; growth stores from GHS 14,500. Compare packages on our pricing page.",
    },
  ],
  "/services/cybersecurity": [
    {
      q: "What do security assessments cover?",
      a: "Focused reviews of sites, apps, and hosting for misconfiguration, weak auth, and exposed admin — with a prioritised fix list.",
    },
    {
      q: "Are you a licensed cybersecurity or managed security services provider?",
      a: "No. We provide security consulting — assessments, hardening, and remediation sprints. We do not sell regulated monitoring or managed SOC services.",
    },
  ],
  "/services/ui-ux-design": [
    {
      q: "Can I hire design without a full build?",
      a: "Yes — brand and landing UX from GHS 3,500, product UI/UX from GHS 8,500, or design paired with Professional web delivery from GHS 14,500.",
    },
  ],
  "/services/software-development": [
    {
      q: "When is custom software the right fit?",
      a: "When off-the-shelf tools cannot match your workflow — internal portals, ops dashboards, or integrations. Professional delivery from GHS 14,500.",
    },
    { q: "Who owns bespoke code?", a: ownershipAnswer },
  ],
  "/hosting": [
    {
      q: "How much is hosting in Ghana cedis?",
      a: "Launch from GHS 69/month with SSL and backups. See our web hosting cost in Ghana guide.",
    },
  ],
  "/domains": [
    {
      q: "Which domain extensions can I register?",
      a: "Search on our domains page for .com, .net, .org, .africa, and other global TLDs with live GHS pricing before Paystack checkout. See our domain prices in Ghana guide for list prices.",
    },
    {
      q: "Is domain registration separate from website build?",
      a: "Yes. Website packages on our pricing page cover design and engineering. Domains renew annually — see our facts page for list prices.",
    },
  ],
  "/ssl": [
    {
      q: "Do I need a paid SSL certificate?",
      a: "OceanCyber hosting includes free Let’s Encrypt TLS. Buy PositiveSSL from GHS 45/yr when you need warranty-backed certs on other servers.",
    },
  ],
  "/services/website-to-mobile-app": [
    {
      q: "How much does website-to-app conversion cost?",
      a: "Store-ready wrappers from GHS 8,000 after we audit your site. Full native shells from GHS 12,000 per platform — see our pricing page.",
    },
    {
      q: "Will the app match my website?",
      a: "We map your existing pages, login, and checkout into mobile flows. Complex web apps may need a scoped rebuild — we say that in the quote.",
    },
    { q: "Who owns the app binaries?", a: ownershipAnswer },
  ],
};

export function getServiceHubFaqs(path: string): readonly ServiceFaqJsonLdItem[] | undefined {
  return serviceHubFaqs[path];
}
