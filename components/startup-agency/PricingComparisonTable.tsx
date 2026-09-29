import { Check, Minus } from "lucide-react";
import {
  pricingComparisonCategories,
  pricingPlans,
  type PricingComparisonValue,
} from "@/lib/startup-agency/pricing";

function ComparisonCell({ value }: { value: PricingComparisonValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center text-sa-primary" aria-label="Included">
        <Check className="h-4 w-4 stroke-[3]" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-sa-muted/40" aria-label="Not included">
        <Minus className="h-4 w-4" />
      </span>
    );
  }

  return <span className="text-sm leading-snug text-sa-muted">{value}</span>;
}

export function PricingComparisonTable() {
  return (
    <>
      <div className="space-y-4 md:hidden">
        {pricingPlans.map((plan) => (
          <article
            key={plan.id}
            className={`rounded-2xl border p-5 ${
              plan.featured ? "border-sa-primary bg-sa-surface" : "border-sa-border bg-sa-surface/40"
            }`}
          >
            <h3 className="font-heading text-lg font-bold text-white">{plan.name}</h3>
            <p className="mt-1 text-sm text-sa-primary">
              From GHS {plan.priceGhs.toLocaleString("en-GH")}
            </p>
            <dl className="mt-4">
              {pricingComparisonCategories.map((category) => (
                <div
                  key={category.key}
                  className="flex items-start justify-between gap-4 border-t border-white/10 py-3"
                >
                  <dt className="text-sm text-white/70">{category.label}</dt>
                  <dd className="max-w-[58%] text-right text-sm text-white">
                    <ComparisonCell value={plan.comparison[category.key]} />
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-sa-border md:block">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-sa-border bg-sa-surface/60">
            <th
              scope="col"
              className="sticky left-0 z-10 bg-sa-surface/95 px-5 py-4 text-sm font-medium text-sa-muted"
            >
              What you get
            </th>
            {pricingPlans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className={`px-5 py-4 font-heading text-sm font-bold ${
                  plan.featured ? "text-sa-primary" : "text-white"
                }`}
              >
                {plan.name}
                <div className="mt-1 text-xs font-normal text-sa-muted">
                  From GHS {plan.priceGhs.toLocaleString("en-GH")}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingComparisonCategories.map((category, rowIndex) => (
            <tr
              key={category.key}
              className={rowIndex % 2 === 0 ? "bg-sa-bg/40" : "bg-transparent"}
            >
              <th
                scope="row"
                className="sticky left-0 z-10 border-t border-sa-border bg-inherit px-5 py-4 text-sm font-medium text-white"
              >
                {category.label}
              </th>
              {pricingPlans.map((plan) => (
                <td
                  key={`${plan.id}-${category.key}`}
                  className="border-t border-sa-border px-5 py-4 text-center align-middle"
                >
                  <ComparisonCell value={plan.comparison[category.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
