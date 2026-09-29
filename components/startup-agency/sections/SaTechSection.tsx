import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { projectChips, techStack } from "@/lib/startup-agency/content";

export function SaTechSection() {
  return (
    <section
      id="tech"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-8">
          <SaSectionHeader eyebrow="Tech" title="Stack we ship with" />
        </SaReveal>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {techStack.map((t) => (
            <span
              key={t}
              className="sa-chip"
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="sa-card hidden overflow-hidden py-4 md:block"
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
