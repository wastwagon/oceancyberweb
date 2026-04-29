import { marqueeTags } from "@/lib/startup-agency/content";

export function SaMarqueeSection() {
  return (
    <section
      id="highlights"
      className="border-b border-sa-border bg-sa-bg py-6"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-sa-marquee gap-12 px-6 font-heading text-xl font-semibold uppercase tracking-widest text-white/90 md:gap-16 md:text-2xl">
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
