import { marqueeTags } from "@/lib/startup-agency/content";

export function SaMarqueeSection() {
  return (
    <section
      id="highlights"
      className="border-b border-sa-border bg-sa-bg"
      aria-hidden="true"
    >
      {/* Dark Row */}
      <div className="relative overflow-hidden py-5 md:py-6 border-b border-sa-border/50">
        <div className="flex w-max animate-sa-marquee gap-10 px-5 font-heading text-lg font-semibold uppercase tracking-[0.16em] text-white/90 md:gap-14 md:px-6 md:text-2xl">
          {[...marqueeTags, ...marqueeTags].map((t, i) => (
            <span key={`${t}-${i}`} className="whitespace-nowrap">
              {t}
              <span className="mx-6 inline-block h-2 w-2 rounded-full bg-sa-primary md:mx-10" />
            </span>
          ))}
        </div>
      </div>

      {/* Primary Green Row */}
      <div className="relative overflow-hidden bg-sa-primary py-5 md:py-6">
        <div className="flex w-max animate-sa-marquee-reverse gap-10 px-5 font-heading text-lg font-bold uppercase tracking-[0.16em] text-black md:gap-14 md:px-6 md:text-2xl">
          {[...marqueeTags, ...marqueeTags].map((t, i) => (
            <span key={`green-${t}-${i}`} className="whitespace-nowrap">
              {t}
              <span className="mx-6 inline-block h-2 w-2 rounded-full bg-black md:mx-10" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
