import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { trustSignals } from "@/lib/startup-agency/content";

/** Aeolla why-choose = LIGHT cream band. */
export function CaWhyChooseSection() {
  return (
    <section id="why-us" className="ae-band-light relative overflow-hidden border-y border-[var(--ae-line-light)] py-16 md:py-24">
      <div className="mx-auto max-w-[1770px] px-4 sm:px-8 lg:px-[75px]">
        <SaReveal className="max-w-3xl">
          <p className="ae-eyebrow">Why choose us</p>
          <h2 className="ae-title-light mt-4 text-[clamp(2rem,4vw,3.25rem)]">
            Built for teams that need craft and delivery
          </h2>
        </SaReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {trustSignals.map((item, i) => (
            <SaReveal key={item.title} delay={i * 0.08}>
              <article className="flex h-full min-h-[280px] flex-col rounded-[10px] border border-[var(--ae-line-light)] bg-white/50 p-8 md:p-10">
                <p className="font-heading text-5xl font-extrabold text-[var(--ae-primary)] md:text-6xl">
                  {item.stat}
                </p>
                <h3 className="mt-6 font-heading text-xl font-bold uppercase tracking-wide text-[var(--ae-ink)]">
                  {item.title}
                </h3>
                <p className="ae-body-light mt-4 flex-1 text-sm leading-relaxed md:text-base">
                  {item.body}
                </p>
              </article>
            </SaReveal>
          ))}
        </div>

        <SaReveal delay={0.2} className="mt-10">
          <Link
            href="/how-we-work"
            className="sa-pressable inline-flex min-h-12 items-center rounded-full bg-[var(--ae-primary)] px-7 text-sm font-bold uppercase tracking-wider text-black"
          >
            How we work
          </Link>
        </SaReveal>
      </div>
    </section>
  );
}
