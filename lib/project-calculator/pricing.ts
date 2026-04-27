import {
  COMPLEXITY_OPTIONS,
  DESIGN_OPTIONS,
  HOURLY_RATE_GHS,
  ESTIMATE_VARIANCE,
  PLATFORM_OPTIONS,
  PROJECT_FEATURES,
  getRushLabourMultiplier,
  type ComplexityId,
  type DesignId,
  type PlatformId,
} from "./config";

export type LineItem = {
  id: string;
  label: string;
  hours: number;
  amountGhs: number;
};

export type PricingResult = {
  totalHours: number;
  /** Midpoint (nominal) total in GHS before range band */
  totalMidGhs: number;
  rangeLowGhs: number;
  rangeHighGhs: number;
  /** Overall multiplier (complexity) */
  complexityMultiplier: number;
  /** Delivery timeline premium or discount (labour) */
  rushLabourMultiplier: number;
  lineItems: LineItem[];
  hourlyRateGhs: number;
};

function getComplexityMultiplier(id: ComplexityId): number {
  const c = COMPLEXITY_OPTIONS.find((o) => o.id === id);
  return c?.multiplier ?? 1;
}

export function computeProjectPricing(
  platformId: PlatformId,
  designId: DesignId,
  featureIds: Set<string>,
  complexityId: ComplexityId,
  options?: { timelineId?: string | null },
): PricingResult {
  const mult = getComplexityMultiplier(complexityId);
  const rush = getRushLabourMultiplier(options?.timelineId ?? null);
  const platform = PLATFORM_OPTIONS.find((p) => p.id === platformId)!;
  const design = DESIGN_OPTIONS.find((d) => d.id === designId)!;

  const lineItems: LineItem[] = [
    {
      id: "platform",
      label: `Platform: ${platform.label}`,
      hours: platform.baseHours,
      amountGhs: platform.baseHours * HOURLY_RATE_GHS * mult * rush,
    },
    {
      id: "design",
      label: `Design: ${design.label}`,
      hours: design.addHours,
      amountGhs: design.addHours * HOURLY_RATE_GHS * mult * rush,
    },
  ];

  for (const f of PROJECT_FEATURES) {
    if (!featureIds.has(f.id)) continue;
    lineItems.push({
      id: f.id,
      label: f.label,
      hours: f.hours,
      amountGhs: f.hours * HOURLY_RATE_GHS * mult * rush,
    });
  }

  const totalHours = lineItems.reduce((s, l) => s + l.hours, 0);
  const totalMidGhs = lineItems.reduce((s, l) => s + l.amountGhs, 0);
  const rangeLowGhs = totalMidGhs * (1 - ESTIMATE_VARIANCE);
  const rangeHighGhs = totalMidGhs * (1 + ESTIMATE_VARIANCE);

  return {
    totalHours,
    totalMidGhs,
    rangeLowGhs,
    rangeHighGhs,
    complexityMultiplier: mult,
    rushLabourMultiplier: rush,
    lineItems,
    hourlyRateGhs: HOURLY_RATE_GHS,
  };
}

export function formatGhs(n: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(n);
}
