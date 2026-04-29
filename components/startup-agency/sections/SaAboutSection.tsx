import { SaReveal } from "@/components/startup-agency/SaReveal";

export function SaAboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-b border-sa-border py-16 md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sa-primary" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
                  About us
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Crafting reliable digital products for modern teams
              </h2>
              <p className="mt-6 text-base leading-relaxed text-sa-muted md:text-lg">
                At the intersection of vision and execution, we bring disciplined delivery,
                transparent communication, and engineering practices that scale — from first
                launch to long‑term support.
              </p>
            </div>
            <div className="space-y-6 rounded-2xl border border-sa-border bg-sa-surface/60 p-8">
              <div>
                <h3 className="font-heading text-lg font-semibold text-sa-primary">Our mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted">
                  Help Ghana‑based and regional teams ship trustworthy software and web experiences
                  without surprises.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-sa-primary">Our vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted">
                  Be the partner teams recommend when quality, clarity, and pace matter.
                </p>
              </div>
              <p className="rounded-xl border border-sa-border bg-black/40 px-4 py-3 text-sm text-white">
                <span className="font-semibold text-sa-primary">5.0</span> average satisfaction from
                delivery reviews — we align incentives with outcomes.
              </p>
            </div>
          </div>
        </SaReveal>
      </div>
    </section>
  );
}
