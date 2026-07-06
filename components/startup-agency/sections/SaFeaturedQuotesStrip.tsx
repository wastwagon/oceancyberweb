import type { TestimonialCard } from "@/lib/types/testimonial-card";

type SaFeaturedQuotesStripProps = {
  cards: TestimonialCard[];
};

export function SaFeaturedQuotesStrip({ cards }: SaFeaturedQuotesStripProps) {
  const featured = cards.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <div className="mt-14 border-t border-sa-border/60 pt-12">
      <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-sa-muted/50">
        Featured client quotes
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((quote) => (
          <blockquote
            key={quote.id}
            className="sa-card flex h-full flex-col justify-between p-6 md:p-7"
          >
            <div>
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < quote.rating ? "text-sa-primary" : "text-sa-muted/20"}
                    aria-hidden
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-sa-muted/90">&ldquo;{quote.content}&rdquo;</p>
            </div>
            <footer className="mt-6 border-t border-sa-border/50 pt-4">
              <p className="font-heading text-sm font-bold text-white">{quote.name}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-sa-muted/60">
                {quote.role}
                {quote.company ? ` · ${quote.company}` : ""}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
