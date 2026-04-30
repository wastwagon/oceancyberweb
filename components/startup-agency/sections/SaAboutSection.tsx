import { SaReveal } from "@/components/startup-agency/SaReveal";

export function SaAboutSection() {
  return (
    <section
      id="about"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sa-primary" />
                <span className="sa-eyebrow">About us</span>
              </div>
              <h2 className="sa-title">
                Crafting reliable digital products for modern teams
              </h2>
              <p className="sa-subtitle mt-6 md:text-lg">
                At the intersection of vision and execution, we bring disciplined delivery,
                transparent communication, and engineering practices that scale — from first
                launch to long‑term support.
              </p>
            </div>
            <div className="sa-card space-y-6 p-8">
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
