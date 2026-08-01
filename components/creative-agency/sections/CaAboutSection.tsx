import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { aboutStats, aboutWorkPreview } from "@/lib/startup-agency/content";

/** Aeolla about = LIGHT cream band (not dark). */
export function CaAboutSection() {
  const photos = aboutWorkPreview.slice(0, 3);

  return (
    <section id="about" className="ae-band-light relative overflow-hidden py-16 md:py-24 lg:py-28">
      <p
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-0 right-0 select-none text-center font-heading text-[clamp(4rem,18vw,14rem)] font-extrabold uppercase leading-none tracking-tighter text-transparent"
        style={{ WebkitTextStroke: "1px rgba(255,153,0,0.45)" }}
      >
        oceancyber
      </p>

      <div className="relative z-10 mx-auto grid max-w-[1770px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-[75px]">
        <SaReveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg lg:max-w-none">
            <div className="absolute left-0 top-[8%] z-10 h-[58%] w-[62%] overflow-hidden rounded-[10px]">
              <Image src={photos[0].image} alt={photos[0].title} fill className="object-cover" sizes="(max-width:1024px) 80vw, 40vw" />
            </div>
            <div className="absolute bottom-[6%] right-0 z-20 h-[48%] w-[55%] overflow-hidden rounded-[10px] border-4 border-[var(--ae-light)] shadow-2xl">
              <Image src={photos[1].image} alt={photos[1].title} fill className="object-cover" sizes="(max-width:1024px) 60vw, 30vw" />
            </div>
            <div className="absolute right-[8%] top-0 z-0 h-[42%] w-[48%] overflow-hidden rounded-[10px] opacity-90">
              <Image src={photos[2].image} alt={photos[2].title} fill className="object-cover" sizes="(max-width:1024px) 50vw, 25vw" />
            </div>
            <Link
              href="/portfolio"
              className="sa-pressable absolute bottom-[22%] left-[18%] z-30 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[var(--ae-primary)] text-black md:h-[140px] md:w-[140px]"
              aria-label="View portfolio showreel"
            >
              <Play className="ml-1 h-8 w-8 fill-current md:h-10 md:w-10" aria-hidden />
            </Link>
          </div>
        </SaReveal>

        <SaReveal delay={0.12}>
          <p className="ae-eyebrow">About us</p>
          <h2 className="ae-title-light mt-5 text-[clamp(2rem,4vw,3.5rem)]">
            Design craft meets
            <br />
            engineering discipline
          </h2>
          <p className="ae-body-light mt-6 max-w-xl text-base leading-relaxed md:text-lg">
            OceanCyber is an Accra-based product studio. We partner with ambitious teams to
            shape brands, design intuitive experiences, and ship software that performs under
            real-world pressure — across Ghana, London, and global markets.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--ae-line-light)] pt-8 md:gap-8">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-[clamp(1.75rem,3vw,3rem)] font-extrabold leading-none text-[var(--ae-primary)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ae-ink-subtle)] md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="sa-pressable inline-flex min-h-12 items-center rounded-full bg-[var(--ae-primary)] px-7 text-sm font-bold uppercase tracking-wider text-black"
            >
              Our story
            </Link>
            <Link
              href="/contact"
              className="sa-pressable inline-flex min-h-12 items-center rounded-full border border-[var(--ae-ink)]/20 px-7 text-sm font-bold uppercase tracking-wider text-[var(--ae-ink)]"
            >
              Start a project
            </Link>
          </div>
        </SaReveal>
      </div>
    </section>
  );
}
