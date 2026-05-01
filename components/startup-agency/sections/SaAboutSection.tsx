import Image from "next/image";
import { SaReveal } from "@/components/startup-agency/SaReveal";

export function SaAboutSection() {
  return (
    <section
      id="about"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32 bg-sa-bg"
    >
      <div className="sa-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <SaReveal>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sa-primary animate-pulse" />
              <span className="sa-eyebrow">Our Agency</span>
            </div>
            <h2 className="sa-title text-4xl md:text-5xl lg:text-6xl">
              Crafting reliable digital products for modern teams
            </h2>
            <p className="sa-subtitle mt-8 text-lg leading-relaxed md:text-xl">
              At the intersection of vision and execution, we bring disciplined delivery,
              transparent communication, and engineering practices that scale — from first
              launch to long‑term support.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="sa-card p-6 border-l-2 border-l-sa-primary bg-sa-surface/30">
                <h3 className="font-heading text-lg font-bold text-white">Our mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted">
                  Help Ghana‑based and regional teams ship trustworthy software and web experiences
                  without surprises.
                </p>
              </div>
              <div className="sa-card p-6 border-l-2 border-l-sa-primary bg-sa-surface/30">
                <h3 className="font-heading text-lg font-bold text-white">Our vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted">
                  Be the partner teams recommend when quality, clarity, and pace matter.
                </p>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-sa-border bg-black/40 px-6 py-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-sa-bg bg-sa-surface flex items-center justify-center text-[10px] font-bold text-sa-primary">
                    GH
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-white">
                <span className="text-sa-primary font-bold">5.0</span> Satisfaction Score
              </p>
            </div>
          </SaReveal>

          <SaReveal delay={0.2} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] border border-sa-border bg-sa-surface shadow-2xl">
              <Image
                src="/images/agency-about.png"
                alt="OceanCyber Team Discussion"
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sa-bg/60 via-transparent to-transparent" />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-3xl border border-sa-primary/20 bg-sa-primary/5 backdrop-blur-xl md:h-48 md:w-48" />
          </SaReveal>
        </div>
      </div>
    </section>
  );
}
