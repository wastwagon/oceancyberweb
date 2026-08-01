import Image from "next/image";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { aboutWorkPreview, processSteps } from "@/lib/startup-agency/content";

/** Aeolla process cards with watermark numbers — OC processSteps + work images. */
export function CaProcessSection() {
  return (
    <section id="process" className="ae-band-dark relative overflow-hidden py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1770px] px-4 sm:px-8 lg:px-[75px]">
        <SaReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="ae-eyebrow">Work process</p>
            <h2 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.1] tracking-tight text-white">
              From brief to launch
            </h2>
          </div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            Steps <span className="text-[var(--ae-primary)]">01–04</span>
          </p>
        </SaReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {processSteps.map((step, i) => {
            const image = aboutWorkPreview[i % aboutWorkPreview.length].image;
            return (
              <SaReveal key={step.step} delay={i * 0.08}>
                <article className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#111]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width:1024px) 50vw, 25vw"
                    />
                    <span
                      aria-hidden
                      className="absolute -bottom-4 right-3 font-heading text-[7rem] font-extrabold leading-none text-white/15"
                    >
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{step.body}</p>
                    <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-xs text-white/55">
                          <span className="text-[var(--ae-primary)]">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </SaReveal>
            );
          })}
        </div>

        <SaReveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/how-we-work"
            className="sa-pressable inline-flex min-h-12 items-center rounded-full border border-white/25 px-8 text-sm font-bold uppercase tracking-wider text-white"
          >
            See how we work
          </Link>
        </SaReveal>
      </div>
    </section>
  );
}
