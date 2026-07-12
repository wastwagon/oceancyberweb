export type HelpArticleCategory =
  | "billing"
  | "renewals"
  | "websites"
  | "security"
  | "support";

export type HelpArticle = {
  id: string;
  title: string;
  category: HelpArticleCategory;
  audience?: "customers" | "everyone";
  body: string;
  actions: { label: string; href: string }[];
};

export const helpArticleCategories: HelpArticleCategory[] = [
  "billing",
  "renewals",
  "websites",
  "security",
  "support",
];

export const defaultHelpArticles: HelpArticle[] = [
  {
    id: "wallet-topup",
    title: "How to top up wallet and pay renewals",
    category: "billing",
    audience: "customers",
    body: "Go to Dashboard > Wallet, add funds with Paystack, then return to Dashboard and click Charge wallet on any due renewal.",
    actions: [
      { label: "Open wallet", href: "/dashboard/wallet" },
      { label: "Open renewals dashboard", href: "/dashboard" },
    ],
  },
  {
    id: "past-due",
    title: "What to do when a renewal is past due",
    category: "renewals",
    audience: "customers",
    body: "Past due means payment was not collected on schedule. Add funds and charge manually before grace ends to avoid suspension.",
    actions: [{ label: "Go to billing dashboard", href: "/dashboard" }],
  },
  {
    id: "intake-vs-proposal",
    title: "Intake request vs formal proposal request",
    category: "support",
    audience: "everyone",
    body: "Use interactive intake to describe needs quickly. Use formal proposal request when you want a structured scope, timeline, and cost sections.",
    actions: [
      { label: "Start interactive intake", href: "/get-started?topic=Need quote or proposal" },
      { label: "Request formal proposal", href: "/tools/proposal?topic=Need quote or proposal" },
    ],
  },
  {
    id: "project-estimate",
    title: "How to generate a project estimate in GHS",
    category: "websites",
    audience: "everyone",
    body: "Use the calculator to choose platform, design, scope, and timeline. It gives a rough range and lets you download a proforma PDF.",
    actions: [{ label: "Open project calculator", href: "/tools/project-cost" }],
  },
  {
    id: "secure-launch",
    title: "Security checks before website launch",
    category: "security",
    audience: "everyone",
    body: "Minimum launch checks: HTTPS enabled, strong admin passwords, role-based access, backups, and monitoring alerts.",
    actions: [{ label: "View security journey", href: "/security-journey" }],
  },
  {
    id: "choose-service",
    title: "Which service should I choose?",
    category: "websites",
    audience: "everyone",
    body:
      "Choose Web Development for websites and browser-based platforms, Mobile Apps for a new iOS or Android product, and Website to Mobile App when you already have a working website you want assessed for conversion.",
    actions: [
      { label: "Compare services", href: "/services" },
      { label: "Explain your project", href: "/get-started" },
    ],
  },
  {
    id: "project-start",
    title: "What happens after I submit a project request?",
    category: "support",
    audience: "everyone",
    body:
      "Our team reviews your goals, timeline, constraints, and contact details. We then respond with clarifying questions or recommend the most suitable discovery, estimate, or proposal path.",
    actions: [{ label: "Start a project request", href: "/get-started" }],
  },
  {
    id: "pricing-scope",
    title: "How packages, estimates, and proposals differ",
    category: "billing",
    audience: "everyone",
    body:
      "Packages show common starting scopes, the calculator gives a non-binding planning range, and a proposal confirms the tailored scope, assumptions, milestones, and fees for your engagement.",
    actions: [
      { label: "View package pricing", href: "/pricing" },
      { label: "Estimate project cost", href: "/tools/project-cost" },
    ],
  },
];
