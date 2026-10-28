import type { GooglePlaceStats } from "@/lib/google-places-stats";
import {
  buildGbpProfileDescription,
  gbpReviewPromptIdeas,
  gbpSuggestedQna,
  gbpSuggestedServiceNames,
} from "@/lib/seo/ghana-local-market";

type Props = {
  stats: GooglePlaceStats;
};

function CopyBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-white">{label}</p>
      <textarea
        readOnly
        aria-label={label}
        className="mt-2 w-full resize-y rounded-xl border border-sa-border bg-sa-surface/60 p-4 font-mono text-xs leading-relaxed text-sa-muted"
        rows={Math.min(12, Math.max(4, Math.ceil(text.length / 72)))}
        value={text}
      />
      <p className="mt-1 text-xs text-sa-muted/70">Select all and copy into Google Business Profile.</p>
    </div>
  );
}

export function GbpCopyKit({ stats }: Props) {
  const description = buildGbpProfileDescription(stats);
  const servicesList = gbpSuggestedServiceNames.join("\n");
  const qnaBlock = gbpSuggestedQna
    .map((row) => `Q: ${row.question}\nA: ${row.answer}`)
    .join("\n\n");
  const reviewBlock = gbpReviewPromptIdeas.map((line) => `- ${line}`).join("\n");

  return (
    <div className="sa-card border-sa-border p-6 md:p-8">
      <p className="sa-eyebrow">Maps listing kit</p>
      <h2 className="sa-title-md mt-2 text-white">Copy for Google Business Profile</h2>
      <p className="mt-2 text-sm text-sa-muted/90">
        Aligned with Accra peer searches (best web design, website developers, development
        company). Update the live listing — do not change your legal business name to keyword
        spam.
      </p>

      <CopyBlock label="Business description" text={description} />
      <CopyBlock label="Services (one per line)" text={servicesList} />
      <CopyBlock label="Suggested Q&amp;A" text={qnaBlock} />
      <CopyBlock label="Review ask (send to clients)" text={reviewBlock} />
    </div>
  );
}
