import type { TestimonialCard } from "@/lib/types/testimonial-card";

type SaFeaturedQuotesStripProps = {
  cards: TestimonialCard[];
};

export function SaFeaturedQuotesStrip({ cards }: SaFeaturedQuotesStripProps) {
  const featured = cards.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <div className="mt-10 hidden border-t border-sa-border/60 pt-10 md:mt-14 md:block md:pt-12">
      <p className="mb-6 text-center text-sm font-medium text-sa-muted/70 md:mb-8">
        Featured client quotes
      </p>
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {featured.map((quote, index) => (
          <blockquote
            key={quote.id}
            className={`sa-card flex h-full flex-col justify-between p-5 md:p-7 ${index > 0 ? "hidden md:flex" : ""}`}
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
              <p className="mt-1 text-sm text-sa-muted/70">
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
