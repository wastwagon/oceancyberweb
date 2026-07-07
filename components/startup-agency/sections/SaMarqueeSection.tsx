import { marqueeTags } from "@/lib/startup-agency/content";

export function SaMarqueeSection() {
  return (
    <section
      id="highlights"
      className="border-b border-sa-border bg-sa-bg overflow-hidden py-6 md:py-10"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-4 md:gap-12 md:[perspective:1000px]">
        {/* Dark Row */}
        <div className="relative overflow-hidden border-y border-sa-border/30 py-4 md:py-8 md:[transform:rotateX(10deg)_rotateZ(-1deg)]">
          <div className="flex w-max animate-sa-marquee gap-8 px-5 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white/90 md:gap-14 md:px-6 md:text-2xl">
            {[...marqueeTags, ...marqueeTags, ...marqueeTags].map((t, i) => (
              <span key={`${t}-${i}`} className="whitespace-nowrap flex items-center">
                {t}
                <span className="mx-6 inline-block h-2 w-2 rounded-full bg-sa-primary md:mx-10 shadow-[0_0_8px_rgba(187,243,64,0.6)]" />
              </span>
            ))}
          </div>
        </div>

        {/* Primary Green Row */}
        <div className="relative overflow-hidden bg-sa-primary py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:py-8 md:[transform:rotateX(-10deg)_rotateZ(1deg)]">
          <div className="flex w-max animate-sa-marquee-reverse gap-8 px-5 font-heading text-base font-bold uppercase tracking-[0.16em] text-black md:gap-14 md:px-6 md:text-2xl">
            {[...marqueeTags, ...marqueeTags, ...marqueeTags].map((t, i) => (
              <span key={`green-${t}-${i}`} className="whitespace-nowrap flex items-center">
                {t}
                <span className="mx-6 inline-block h-2 w-2 rounded-full bg-black md:mx-10" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
