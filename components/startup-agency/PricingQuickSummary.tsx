import Link from "next/link";
import { corePackageSummary } from "@/lib/startup-agency/pricing";

export function PricingQuickSummary() {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border bg-sa-surface/20">
      <div className="sa-container">
        <div className="mb-8 text-center">
          <p className="sa-eyebrow">Investment</p>
          <h2 className="sa-title mt-4">Core delivery packages</h2>
          <p className="sa-subtitle mx-auto">
            Indicative starting tiers in Ghana cedis for web and product work. Service-specific ranges
            (mobile, security, commerce) are detailed on each service page.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {corePackageSummary.map((plan) => (
            <Link
              key={plan.id}
              href={`/pricing#${plan.id}`}
              className="sa-card sa-pressable group flex flex-col p-6 transition-colors hover:border-sa-primary/40 md:p-8"
            >
              <h3 className="font-heading text-lg font-bold text-white group-hover:text-sa-primary">
                {plan.name}
              </h3>
              <p className="mt-3 font-heading text-2xl font-black text-sa-primary">
                From GHS {plan.priceGhs.toLocaleString("en-GH")}
              </p>
              <p className="mt-3 flex-1 text-sm text-sa-muted">{plan.desc}</p>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-sa-primary">
                Compare inclusions →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/pricing" className="sa-btn-primary min-h-[44px] px-6 text-xs">
            Full feature comparison
          </Link>
          <Link href="/tools/project-cost" className="sa-btn-outline min-h-[44px] px-6 text-xs">
            Estimate your project
          </Link>
        </div>
      </div>
    </section>
  );
}
