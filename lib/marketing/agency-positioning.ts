/**
 * Canonical company identity — use for user-facing and SEO copy.
 * Maps/GBP may still say “web design company” for local search; we are not a “studio” brand.
 */
export const AGENCY_WHAT_WE_ARE = "Website and mobile application development agency";

export const AGENCY_IDENTITY_ACCRA = "Accra website and mobile app development agency";

export const AGENCY_IDENTITY_GHANA = `${AGENCY_IDENTITY_ACCRA}, Ghana`;

export const AGENCY_NOT_A_STUDIO_NOTE =
  "Design, engineering, hosting, and security consulting in one Accra team — not a creative or design studio.";

/** Visible homepage H1 stays Maps-optimised in ghana-local-market — this is for `<title>` / OG where appropriate. */
export const MAPS_SEO_HOME_TITLE_SUFFIX = "Best web design company in Accra, Ghana";

export const SITE_DEFAULT_TITLE = `${AGENCY_IDENTITY_GHANA} | OceanCyber`;

export const SITE_HOME_TITLE_ABSOLUTE = `${AGENCY_WHAT_WE_ARE} in Accra, Ghana | OceanCyber`;

export type SiteMetaContext = {
  reviewsOnly: string;
  teamSize: number;
  street: string;
};

/** Root layout + homepage meta description — agency first, Maps hook second. */
export function buildSiteMetaDescription(ctx: SiteMetaContext): string {
  return (
    `${AGENCY_IDENTITY_GHANA}. Websites from GHS 6,000, mobile apps from GHS 12,000, cybersecurity from GHS 4,500. ` +
    `Also discoverable as a ${MAPS_SEO_HOME_TITLE_SUFFIX.toLowerCase()} on Google Maps. ` +
    `${ctx.teamSize} people at ${ctx.street}. ${ctx.reviewsOnly}.`
  );
}

export const ABOUT_PAGE_TITLE = "About our Accra development agency";

export function aboutPageMetaDescription(ctx: SiteMetaContext & { foundedYear: number }): string {
  return (
    `${AGENCY_WHAT_WE_ARE} in Accra since ${ctx.foundedYear}. ${ctx.teamSize} people at ${ctx.street} — web, mobile apps, ecommerce, hosting, and security consulting. ${ctx.reviewsOnly}.`
  );
}

export const CONTACT_PAGE_TITLE = "Contact our Accra website & mobile app agency";

export function contactPageMetaDescription(): string {
  return (
    `Talk to OceanCyber — ${AGENCY_IDENTITY_GHANA} at 47 Nii Kwashiefio Avenue. Web, mobile, ecommerce, and security from GHS 6,000.`
  );
}

export function factsPageMetaDescription(reviewsOnly: string): string {
  return `Verifiable OceanCyber facts: ${AGENCY_WHAT_WE_ARE.toLowerCase()}, Accra office, GHS packages, hosting, domains, ownership. ${reviewsOnly}.`;
}

export function footerTagline(teamSize: number, foundedYear: number): string {
  return (
    `${AGENCY_IDENTITY_GHANA}. A team of ${teamSize}, in business since ${foundedYear} — ` +
    `also listed on Google Maps as a web design and website development company.`
  );
}

/** Default social share image (app/opengraph-image.tsx). */
export const OG_IMAGE_ALT = `OceanCyber — ${AGENCY_IDENTITY_GHANA}`;

export const OG_IMAGE_HEADLINE = "Website & mobile app development agency";

export const OG_IMAGE_SUBLINE =
  "Accra, Ghana · websites, mobile apps, cybersecurity · Maps: web design company";

/** Portfolio hub — title + meta (indexable). */
export const PORTFOLIO_PAGE_TITLE = "Client portfolio — websites & mobile apps";

export function portfolioPageMetaDescription(): string {
  return `Live client websites and mobile apps plus labelled in-house concept UI from OceanCyber, an ${AGENCY_IDENTITY_GHANA}.`;
}

/** Legacy /creative-hub redirect — brief meta before redirect. */
export const CREATIVE_HUB_LEGACY_TITLE = "In-house concept work";

export function creativeHubLegacyMetaDescription(): string {
  return `Illustrative in-house UI samples from OceanCyber (${AGENCY_IDENTITY_ACCRA}). Browse on the portfolio Creative Hub tab — not live client deployments.`;
}
