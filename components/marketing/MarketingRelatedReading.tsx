import Link from "next/link";
import type { RelatedReadingLink } from "@/lib/marketing/related-reading-presets";

type Props = {
  links: RelatedReadingLink[];
  className?: string;
};

export function MarketingRelatedReading({ links, className }: Props) {
  if (links.length === 0) return null;

  return (
    <nav
      className={className ?? "mt-14 border-t border-sa-border pt-10"}
      aria-label="Related reading"
    >
      <h2 className="font-heading text-xl font-semibold text-white">Related reading</h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="sa-text-link text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
