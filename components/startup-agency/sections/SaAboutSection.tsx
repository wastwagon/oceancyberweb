import Image from "next/image";
import { SaReveal } from "@/components/startup-agency/SaReveal";

export function SaAboutSection() {
  return (
    <section
      id="about"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32 bg-sa-bg"
    >
      <div className="sa-container">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center text-center">
            <SaReveal>
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sa-primary animate-pulse" />
                <span className="sa-eyebrow">Our Agency</span>
              </div>
            </SaReveal>

            <SaReveal delay={0.2} className="relative w-full max-w-4xl mx-auto mt-8">
              <div className="relative aspect-video overflow-hidden rounded-[40px] border border-sa-border bg-sa-surface shadow-2xl">
                <Image
                  src="/images/agency-about.png"
                  alt="OceanCyber Team Discussion"
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sa-bg/60 via-transparent to-transparent" />
              </div>
            </SaReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
