import type { InsightPost } from "@/lib/insights/content";
import { insightArticlePath } from "@/lib/insights/content";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

type Props = { post: InsightPost };

export function InsightArticleJsonLd({ post }: Props) {
  const pageUrl = `${site}${insightArticlePath(post.slug)}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${site}${post.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "OceanCyber",
      url: site,
      logo: {
        "@type": "ImageObject",
        url: `${site}/images/og-image.jpg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
