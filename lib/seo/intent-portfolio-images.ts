import { siteImagePaths } from "@/lib/seo/site-image-paths";

/** Cover images for portfolio links used in guide example callouts. */
const portfolioSlugToImage: Record<string, string> = {
  "fitch-advisory": siteImagePaths.portfolioLive.fitchAdvisory,
  "fitch-attorneys": siteImagePaths.portfolioLive.fitchAttorneys,
  "thinq-shopping": siteImagePaths.portfolioLive.thinqShopping,
  "africa-governance-centre": siteImagePaths.portfolioLive.africaGovernanceCentre,
};

export function portfolioImageFromHref(href: string): string | undefined {
  const match = href.match(/^\/portfolio\/([^/?#]+)/);
  if (!match) return undefined;
  return portfolioSlugToImage[match[1]];
}
