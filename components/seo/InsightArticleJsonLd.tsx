import type { InsightPost } from "@/lib/insights/content";
import { insightArticlePath } from "@/lib/insights/content";
import {
  absoluteSiteImageUrl,
  geoTaggedImageObject,
  imageContentLocation,
} from "@/lib/seo/image-geo";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

type Props = { post: InsightPost };

export function InsightArticleJsonLd({ post }: Props) {
  const pageUrl = `${site}${insightArticlePath(post.slug)}`;
  const imageObject = geoTaggedImageObject(post.image, {
    name: post.title,
    description: post.excerpt,
    caption: post.excerpt,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [imageObject],
    contentLocation: imageContentLocation(),
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
        url: absoluteSiteImageUrl("/images/oceancyber-logo.webp"),
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
