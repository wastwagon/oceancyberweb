import { SaReveal } from "@/components/startup-agency/SaReveal";
import { projectChips, techStack } from "@/lib/startup-agency/content";

export function SaTechSection() {
  return (
    <section
      id="tech"
      className="scroll-mt-28 border-b border-sa-border py-14 md:scroll-mt-32 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal className="mb-8 text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
            Tech
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
            Stack we ship with
          </h2>
        </SaReveal>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-sa-border bg-sa-surface px-4 py-2 font-heading text-sm font-medium text-white"
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="overflow-hidden rounded-2xl border border-sa-border bg-sa-surface/40 py-4"
          aria-hidden="true"
        >
          <div className="flex w-max animate-sa-marquee gap-6 px-4 font-heading text-sm font-medium text-sa-muted md:gap-10 md:text-base">
            {[...projectChips, ...projectChips].map((p, i) => (
              <span key={`${p}-${i}`} className="whitespace-nowrap text-white/80">
                {p}
                <span className="mx-4 text-sa-primary">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
