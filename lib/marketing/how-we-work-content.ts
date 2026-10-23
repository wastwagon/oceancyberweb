/** Sales content for /how-we-work — full delivery methodology. */

export { deliveryPhases } from "@/lib/marketing/delivery-phases";

export const designPhases = [
  {
    title: "Discover",
    body: "Stakeholder interviews, user journeys, and success metrics before pixels.",
  },
  {
    title: "Wireframe",
    body: "Low-fidelity flows that validate structure and reduce rework in build.",
  },
  {
    title: "Prototype",
    body: "Clickable Figma demos for usability tests and stakeholder sign-off.",
  },
  {
    title: "Design system",
    body: "Tokens, components, and specs your engineering team can ship at scale.",
  },
  {
    title: "Handoff & QA",
    body: "Redlines, assets, and design QA through launch.",
  },
] as const;

export const engagementModels = [
  {
    title: "Fixed milestone delivery",
    body: "Best for defined products with clear scope — websites, portals, apps with agreed phases and acceptance criteria.",
    fit: "Ideal when you need a launch date and board-visible milestones.",
    priceHint: "Packages from GHS 6,000",
  },
  {
    title: "Discovery → proposal",
    body: "Start with a paid or complimentary discovery block, then a formal proposal with GHS breakdown, team, and timeline.",
    fit: "Ideal for enterprise, regulated, or multi-team projects.",
    priceHint: "Enterprise from GHS 30,000",
  },
  {
    title: "Retainer & evolution",
    body: "Ongoing product, security, and infrastructure support after launch — tuned to your roadmap.",
    fit: "Ideal when you want a long-term partner, not a one-off vendor.",
    priceHint: "Care retainers from GHS 850/mo",
  },
] as const;

export const clientCommitments = [
  {
    title: "Named delivery lead",
    body: "One accountable lead coordinates design, engineering, and client communication — you are never lost in a ticket queue.",
  },
  {
    title: "Weekly visibility",
    body: "Demo checkpoints, written status, and direct access during active build phases.",
  },
  {
    title: "Security as standard",
    body: "Identity, logging, and resilience treated as product requirements — especially for legal, fintech, and public-sector work.",
  },
  {
    title: "Honest scoping",
    body: "We use the project calculator and intake process to filter mismatches early — premium delivery, not lowball bait-and-switch.",
  },
] as const;

export const proofLinks = [
  {
    slug: "fitch-attorneys",
    title: "Fitch Attorneys",
    metric: "180%",
    metricLabel: "Case efficiency",
    sector: "Legal",
  },
  {
    slug: "africa-governance-centre",
    title: "Africa Governance Centre",
    metric: "220%",
    metricLabel: "Programme visibility",
    sector: "Governance",
  },
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    metric: "250%",
    metricLabel: "Client engagement",
    sector: "Advisory",
  },
  {
    slug: "thinq-shopping",
    title: "ThinQ Shopping",
    metric: "165%",
    metricLabel: "Mobile conversions",
    sector: "Commerce",
  },
] as const;
