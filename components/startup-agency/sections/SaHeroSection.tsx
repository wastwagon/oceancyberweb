import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroServiceSlides } from "@/lib/startup-agency/content";

export function SaHeroSection() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-28 overflow-hidden md:scroll-mt-32"
      aria-label="Featured services"
    >
        <div
          className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Service highlights"
        >
          {heroServiceSlides.map((slide) => (
            <Link
              key={slide.title}
              href={slide.href}
              className="relative flex min-h-[min(85vh,720px)] w-[min(100vw,100%)] shrink-0 snap-start flex-col justify-end p-6 sm:p-10 md:min-h-[min(88vh,780px)] md:p-14 lg:w-[85vw] lg:max-w-5xl"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 85vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10 max-w-3xl">
                <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-sa-primary">
                  Services
                </p>
                <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                  {slide.title}
                </h2>
                <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-sa-primary">
                  Explore
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative border-y border-sa-border bg-black/60 py-10 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,243,64,0.08)_0%,transparent_65%)]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p
              className="font-heading text-[clamp(2.5rem,10vw,7rem)] font-bold uppercase leading-none tracking-tight text-transparent [text-shadow:none] [-webkit-text-stroke:1.2px_rgba(255,255,255,0.35)]"
              aria-hidden="true"
            >
              OceanCyber
            </p>
          </div>
        </div>
    </section>
  );
}
