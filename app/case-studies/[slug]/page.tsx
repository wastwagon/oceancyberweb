import { permanentRedirect } from "next/navigation";

interface Props {
  params: { slug: string };
}

/** Case study detail URLs consolidated under `/portfolio/[slug]`. */
export default function CaseStudySlugRedirectPage({ params }: Props) {
  permanentRedirect(`/portfolio/${encodeURIComponent(params.slug)}`);
}
