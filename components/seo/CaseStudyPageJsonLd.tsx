import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import {
  CONCEPT_PORTFOLIO_BADGE,
  CONCEPT_PORTFOLIO_JSON_LD_ABSTRACT,
  CONCEPT_PORTFOLIO_JSON_LD_GENRE,
} from "@/lib/marketing/concept-portfolio-copy";
import { getConceptPortfolioNarrative } from "@/lib/marketing/concept-portfolio-narrative";
import { isConceptPortfolio } from "@/lib/portfolio/portfolio-seo-metadata";
import { absoluteSiteImageUrl } from "@/lib/seo/image-geo";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

type Narrative = {
  challenge?: string;
  solution?: string;
  impact?: string;
} | null;

type Props = {
  project: PortfolioCaseStudy;
  narrative?: Narrative;
};

export function CaseStudyPageJsonLd({ project, narrative }: Props) {
  const pageUrl = `${site}/portfolio/${project.slug}`;
  const conceptWork = isConceptPortfolio(project);
  const conceptNarrative = getConceptPortfolioNarrative(project.slug);
  const description = conceptWork
    ? (conceptNarrative?.labelling ?? CONCEPT_PORTFOLIO_JSON_LD_ABSTRACT)
    : narrative?.impact ?? project.results ?? project.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": pageUrl,
    name: project.title,
    headline: conceptWork
      ? `${project.title} — OceanCyber ${CONCEPT_PORTFOLIO_BADGE.toLowerCase()}`
      : `${project.title} — OceanCyber client case study`,
    description,
    image: absoluteSiteImageUrl(project.image),
    datePublished: project.year ? `${project.year}-01-01` : undefined,
    author: {
      "@type": "Organization",
      name: "OceanCyber",
      url: site,
    },
    publisher: {
      "@type": "Organization",
      name: "OceanCyber",
      url: site,
      logo: {
        "@type": "ImageObject",
        url: absoluteSiteImageUrl("/images/oceancyber-logo.webp"),
      },
    },
    ...(conceptWork
      ? {
          genre: CONCEPT_PORTFOLIO_JSON_LD_GENRE,
          abstract: CONCEPT_PORTFOLIO_JSON_LD_ABSTRACT,
        }
      : {
          about: {
            "@type": "Organization",
            name: project.client,
          },
        }),
    keywords: conceptWork
      ? ["in-house concept", "illustrative UI", "not client delivery", project.category].join(", ")
      : [project.category, ...project.tech].join(", "),
    url: pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
