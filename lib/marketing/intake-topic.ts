import { pricingPlans } from "@/lib/startup-agency/pricing";

function readSingleParam(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value[0]) return value[0];
  return undefined;
}

/** Merge `?plan=` and `?topic=` into wizard goals prefill. */
export function resolveIntakeInitialTopic(params?: {
  topic?: string | string[];
  plan?: string | string[];
}): string | undefined {
  const topic = readSingleParam(params?.topic)?.trim();
  const planId = readSingleParam(params?.plan)?.trim();
  const plan = planId ? pricingPlans.find((p) => p.id === planId) : undefined;

  const planLine = plan
    ? `Interested in the ${plan.name} package (from GHS ${plan.priceGhs.toLocaleString("en-GH")}).`
    : planId
      ? `Interested in package: ${planId}.`
      : undefined;

  if (planLine && topic) return `${planLine} ${topic}`;
  return planLine ?? topic ?? undefined;
}
