import { siteImagePaths } from "@/lib/seo/site-image-paths";

/** Live client deliveries — cards link out; no fabricated case studies. */
export type FeaturedClientWork = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  liveUrl: string;
};

export const featuredClientWork: FeaturedClientWork[] = [
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    category: "Advisory & Consultancy",
    summary:
      "Institutional advisory platform for governments, corporates, and investors — services, insights, and sector practices.",
    image: siteImagePaths.portfolio.fitchAdvisory,
    liveUrl: "https://www.fitchadvisory.com/",
  },
  {
    slug: "fitch-attorneys",
    title: "Fitch Attorneys",
    category: "Legal Services",
    summary:
      "Full-service corporate law firm site covering practice areas, sectors, and international affiliations.",
    image: siteImagePaths.portfolio.fitchAttorneys,
    liveUrl: "https://www.fitchattorneys.com/",
  },
  {
    slug: "africa-governance-centre",
    title: "Africa Governance Centre",
    category: "Governance & Policy",
    summary:
      "Continental governance centre platform for programmes, research, events, and policy engagement.",
    image: siteImagePaths.portfolio.africaGovernanceCentre,
    liveUrl: "https://www.africagovernancecentre.org/",
  },
  {
    slug: "thinq-shopping",
    title: "ThinQ Shopping",
    category: "E-Commerce & Services",
    summary:
      "E-commerce and services app experience — product discovery, checkout flows, and mobile-first retail.",
    image: siteImagePaths.portfolio.thinqShopping,
    liveUrl: "https://thinqshopping.app/",
  },
];

export function getFeaturedClientBySlug(slug: string): FeaturedClientWork | undefined {
  return featuredClientWork.find((item) => item.slug === slug);
}

export const featuredClientSlugs = featuredClientWork.map((item) => item.slug);
