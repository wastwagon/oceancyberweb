/** Sales content for /how-we-work — full delivery methodology. */

export const deliveryPhases = [
  {
    step: 1,
    title: "Discovery & scoping",
    body: "We align stakeholders on goals, users, constraints, and success metrics before design or code. You leave with a shared scope document and a realistic timeline — not a vague estimate.",
    bullets: [
      "Stakeholder workshops and user journey mapping",
      "Technical feasibility and integration inventory",
      "Milestone plan with phased billing",
    ],
  },
  {
    step: 2,
    title: "Design & prototyping",
    body: "When design is in scope, we wireframe and prototype in Figma so you approve structure and flows before engineering commits. Brand, UX, and handoff specs stay in one thread.",
    bullets: [
      "Wireframes and clickable Figma prototypes",
      "Design tokens and component library",
      "Engineering-ready redlines and assets",
    ],
  },
  {
    step: 3,
    title: "Build & integrate",
    body: "We ship in agreed phases with demo checkpoints — web, mobile, payments, APIs, and hosting connected to the tools your team already uses. You see working software every sprint, not slides.",
    bullets: [
      "Phased delivery with staging previews",
      "MoMo, Paystack, and third-party integrations",
      "Code review, CI, and documentation as we go",
    ],
  },
  {
    step: 4,
    title: "QA, security & go-live",
    body: "We test on real devices, tune performance, apply security hardening where required, and deploy with runbooks your team can operate after handover.",
    bullets: [
      "QA, accessibility, and performance tuning",
      "Security review for regulated workloads",
      "Launch support and knowledge transfer",
    ],
  },
] as const;

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
    fit: "Ideal for enterprise, regulated, or multi-stakeholder programmes.",
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
