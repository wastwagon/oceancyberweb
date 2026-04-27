import { CheckCircle2, Headphones, Rocket } from "lucide-react";

const items = [
  {
    icon: Rocket,
    title: "Ship faster",
    body: "From domain to deployment—we align branding, build, and launch in one plan.",
  },
  {
    icon: CheckCircle2,
    title: "Enterprise-ready security",
    body: "SSL, hardening, and best-practice review so you launch with confidence.",
  },
  {
    icon: Headphones,
    title: "Local team, global stack",
    body: "Accra-based delivery with the same tools and quality standards as top SaaS teams.",
  },
] as const;

export function MarketingLeadStrip() {
  return (
    <section
      className="border-y border-slate-200/80 bg-gradient-to-b from-slate-50/95 to-white py-10 md:py-12"
      aria-label="Why choose OceanCyber"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">
            Why teams work with us
          </p>
          <h2 className="mt-2 text-balance text-2xl font-bold text-slate-900 md:text-3xl">
            One partner for domains, apps, and the story you show the world
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm"
            >
              <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
