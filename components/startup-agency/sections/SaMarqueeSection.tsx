import { marqueeTags } from "@/lib/startup-agency/content";

export function SaMarqueeSection() {
  return (
    <section
      id="highlights"
      className="border-b border-sa-border bg-sa-bg py-5 md:py-6"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-sa-marquee gap-10 px-5 font-heading text-lg font-semibold uppercase tracking-[0.16em] text-white/90 md:gap-14 md:px-6 md:text-2xl">
          {[...marqueeTags, ...marqueeTags].map((t, i) => (
            <span key={`${t}-${i}`} className="whitespace-nowrap">
              {t}
              <span className="mx-6 inline-block h-2 w-2 rounded-full bg-sa-primary md:mx-10" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
