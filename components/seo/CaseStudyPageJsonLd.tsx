import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
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
  const description =
    narrative?.impact ?? project.results ?? project.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": pageUrl,
    name: project.title,
    headline: `${project.title} — OceanCyber Case Study`,
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
    about: {
      "@type": "Organization",
      name: project.client,
    },
    keywords: [project.category, ...project.tech].join(", "),
    url: pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
