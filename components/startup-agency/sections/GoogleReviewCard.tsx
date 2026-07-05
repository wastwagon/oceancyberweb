import Link from "next/link";
import { Star } from "lucide-react";
import type { GooglePlaceReview } from "@/lib/google-places-stats";

type Props = {
  review: GooglePlaceReview;
  className?: string;
};

export function GoogleReviewCard({ review, className = "" }: Props) {
  const fullStars = Math.floor(review.rating);
  const hasHalf = review.rating - fullStars >= 0.5;

  const footer = (
    <footer className="mt-6 flex items-center gap-4 border-t border-sa-border/60 pt-4">
      {review.profilePhotoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={review.profilePhotoUrl}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-black">
          {review.initials}
        </div>
      )}
      <div>
        {review.authorUrl ? (
          <Link
            href={review.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-white transition hover:text-sa-primary"
          >
            {review.name}
          </Link>
        ) : (
          <p className="text-sm font-bold text-white">{review.name}</p>
        )}
        <p className="text-xs text-sa-muted">{review.role}</p>
      </div>
    </footer>
  );

  return (
    <article className={`rounded-3xl border border-sa-border bg-sa-surface/30 p-6 ${className}`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars || (i === fullStars && hasHalf)
                ? "fill-sa-primary text-sa-primary"
                : "fill-sa-muted/20 text-sa-muted/30"
            }`}
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-sa-muted">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      {footer}
    </article>
  );
}
