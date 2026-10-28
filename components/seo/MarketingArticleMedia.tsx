import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";

const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const MARKDOWN_IMAGE_ONLY_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function MarketingArticleFigure({ src, alt }: { src: string; alt: string }) {
  const external = isExternalHref(src);
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-sa-border">
      <div className="relative aspect-[16/10] w-full bg-sa-surface/40">
        {external ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        )}
      </div>
      {alt ? (
        <figcaption className="border-t border-sa-border px-4 py-3 text-sm text-sa-muted/70">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderMarkdownInline(text: string, keyPrefix: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let linkIndex = 0;
  const re = new RegExp(MARKDOWN_LINK_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link key={`${keyPrefix}-md-${linkIndex}`} href={match[2]} className="sa-text-link">
        {match[1]}
      </Link>,
    );
    linkIndex += 1;
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length === 1 ? parts[0] : parts;
}

export function MarketingArticleParagraph({
  text,
  id,
}: {
  text: string;
  id: string;
}) {
  const trimmed = text.trim();
  const imageMatch = trimmed.match(MARKDOWN_IMAGE_ONLY_RE);
  if (imageMatch) {
    return <MarketingArticleFigure src={imageMatch[2]} alt={imageMatch[1] || ""} />;
  }
  return <p>{renderMarkdownInline(text, id)}</p>;
}
