/**
 * Single-owner keyword map — prevents Accra/Ghana hire terms from being
 * claimed by homepage, hubs, and capability pages at once (cannibalization /
 * doorway risk).
 *
 * Rule: only the owner URL should use the exact “Best … company in Accra|Ghana”
 * string in title/H1. Other pages may link to the owner; they must not compete
 * for the same exact head term.
 */
export type KeywordOwner = {
  phrase: string;
  ownerPath: string;
  role: "homepage" | "geo-hire" | "capability" | "commerce" | "intent";
};

export const keywordOwners: readonly KeywordOwner[] = [
  {
    phrase: "best web design company in accra and ghana",
    ownerPath: "/",
    role: "homepage",
  },
  {
    phrase: "best web design company in accra",
    ownerPath: "/services/web-design-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best web design company in ghana",
    ownerPath: "/services/web-design-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "best web development company in accra",
    ownerPath: "/services/web-development-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best web development company in ghana",
    ownerPath: "/services/web-development-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "best software development company in accra",
    ownerPath: "/services/software-development-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best software development company in ghana",
    ownerPath: "/services/software-development-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "best mobile app development company in accra",
    ownerPath: "/services/mobile-app-development-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best mobile app development company in ghana",
    ownerPath: "/services/mobile-app-development-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "best ecommerce development company in accra",
    ownerPath: "/services/ecommerce-development-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best ecommerce development company in ghana",
    ownerPath: "/services/ecommerce-development-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "best cybersecurity company in accra",
    ownerPath: "/services/cybersecurity-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best cybersecurity company in ghana",
    ownerPath: "/services/cybersecurity-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "best ui ux design company in accra",
    ownerPath: "/services/ui-ux-design-in-accra",
    role: "geo-hire",
  },
  {
    phrase: "best ui ux design company in ghana",
    ownerPath: "/services/ui-ux-design-in-ghana",
    role: "geo-hire",
  },
  {
    phrase: "web development services",
    ownerPath: "/services/web-development",
    role: "capability",
  },
  {
    phrase: "software development services",
    ownerPath: "/services/software-development",
    role: "capability",
  },
  {
    phrase: "mobile app development services",
    ownerPath: "/services/mobile-apps",
    role: "capability",
  },
  {
    phrase: "domain names in ghana",
    ownerPath: "/domains",
    role: "commerce",
  },
  {
    phrase: "web hosting in ghana",
    ownerPath: "/hosting",
    role: "commerce",
  },
  {
    phrase: "ssl certificates in ghana",
    ownerPath: "/ssl",
    role: "commerce",
  },
  {
    phrase: "website cost in ghana",
    ownerPath: "/guides/website-cost-in-ghana",
    role: "intent",
  },
  {
    phrase: "domain prices in ghana",
    ownerPath: "/guides/domain-prices-in-ghana",
    role: "intent",
  },
  {
    phrase: "web hosting cost in ghana",
    ownerPath: "/guides/web-hosting-cost-in-ghana",
    role: "intent",
  },
] as const;

/** Paths that must never use “Best … company in Accra|Ghana” in title/description. */
export const capabilityPathsForbiddenBestHire: readonly string[] = [
  "/services/web-development",
  "/services/software-development",
  "/services/mobile-apps",
  "/services/ecommerce",
  "/services/cybersecurity",
  "/services/ui-ux-design",
  "/services/website-to-mobile-app",
  "/hosting",
  "/domains",
  "/ssl",
];

export function normalizePhrase(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function ownerForPhrase(phrase: string): KeywordOwner | undefined {
  const needle = normalizePhrase(phrase);
  return keywordOwners.find((row) => row.phrase === needle);
}
