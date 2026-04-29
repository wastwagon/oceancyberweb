import { SaReveal } from "@/components/startup-agency/SaReveal";
import { processSteps } from "@/lib/startup-agency/content";

export function SaProcessSection() {
  return (
    <section className="border-b border-sa-border py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal className="mb-12 max-w-3xl">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
            Process
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Our delivery rhythm
          </h2>
          <p className="mt-4 text-sa-muted">
            Four repeatable phases — transparent checkpoints, no black‑box delivery.
          </p>
        </SaReveal>
        <div className="grid gap-6 md:grid-cols-2">
          {processSteps.map((p, i) => (
            <SaReveal key={p.step} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-sa-border bg-gradient-to-br from-sa-surface/90 to-black/80 p-6 md:p-8">
                <div className="mb-4 flex items-baseline gap-3 font-heading text-sa-primary">
                  <span className="text-4xl font-bold leading-none">{p.step}</span>
                  <span className="text-sm uppercase tracking-widest text-sa-muted">/ 4</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted">{p.body}</p>
                <ul className="mt-4 space-y-2 border-t border-sa-border pt-4 text-sm text-sa-muted">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
