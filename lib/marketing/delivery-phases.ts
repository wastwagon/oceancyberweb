/**
 * Single source for the four delivery phases — homepage (SaProcessSection),
 * creative theme (CaProcessSection), and /how-we-work.
 */
export type DeliveryPhase = {
  step: number;
  title: string;
  body: string;
  bullets: readonly string[];
};

export const deliveryPhases: readonly DeliveryPhase[] = [
  {
    step: 1,
    title: "Scope in cedis",
    body: "You share pages, payments, and your launch date. We match Startup, Professional, or Enterprise and list what is not included before you sign.",
    bullets: ["Written GHS quote", "Domain and hosting separate", "Milestone plan in Ghana cedis"],
  },
  {
    step: 2,
    title: "Mobile-first design",
    body: "When design is in scope, we prototype in Figma for phone-sized screens first — so Accra and nationwide users are not an afterthought.",
    bullets: ["Brand and UX", "Clickable review links", "Build-ready Figma files"],
  },
  {
    step: 3,
    title: "Build and integrate",
    body: "We deliver in phases with staging URLs you can share on WhatsApp. Paystack, MoMo, CRM, and hosting connect in the same Accra team.",
    bullets: ["Milestone demos", "Paystack / MoMo when needed", "Staging before DNS cutover"],
  },
  {
    step: 4,
    title: "Test and launch",
    body: "We test on real Android and iOS devices, fix launch blockers, and hand over access plus the support window in your package.",
    bullets: ["Device QA", "Search basics checked", "30–180 days support by tier"],
  },
];
