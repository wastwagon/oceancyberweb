/** Sales content for /how-we-work — full delivery methodology. */

export { deliveryPhases } from "@/lib/marketing/delivery-phases";

export const designPhases = [
  {
    title: "Discover",
    body: "Talk to your team, map how people use the product, and agree what success looks like before design starts.",
  },
  {
    title: "Wireframe",
    body: "Low-fidelity flows that validate structure and reduce rework in build.",
  },
  {
    title: "Prototype",
    body: "Clickable Figma screens you can tap through on a phone before we write code.",
  },
  {
    title: "Design system",
    body: "Colours, buttons, and layout rules so build stays consistent page to page.",
  },
  {
    title: "Build support and QA",
    body: "We stay with engineering through launch and check screens match the approved design.",
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
    body: "Review checkpoints, written status, and direct access during active build phases.",
  },
  {
    title: "Security as standard",
    body: "Identity, logging, and resilience treated as product requirements — especially for legal, fintech, and public-sector work.",
  },
  {
    title: "Honest scoping",
    body: "We use the project cost estimator and Get started intake to filter mismatches early — scoped delivery with clear milestones, not lowball bait-and-switch.",
  },
] as const;

export const proofLinks = [
  {
    slug: "fitch-attorneys",
    title: "Fitch Attorneys",
    metric: "Live platform",
    metricLabel: "Case pages and client updates",
    sector: "Legal",
  },
  {
    slug: "africa-governance-centre",
    title: "Africa Governance Centre",
    metric: "Live site",
    metricLabel: "Programmes and events in one place",
    sector: "Governance",
  },
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    metric: "Live portal",
    metricLabel: "Booking and file sharing online",
    sector: "Advisory",
  },
  {
    slug: "thinq-shopping",
    title: "ThinQ Shopping",
    metric: "Live app",
    metricLabel: "MoMo and Paystack checkout",
    sector: "Commerce",
  },
] as const;
