export type SecurityQuestion = {
  id: string;
  label: string;
  /** 0 = not in place, 1 = partial, 2 = fully in place */
  maxScore: 2;
};

export type SecurityDomain = {
  id: string;
  title: string;
  description: string;
  questions: SecurityQuestion[];
};

export const SECURITY_DOMAINS: SecurityDomain[] = [
  {
    id: "identity",
    title: "Identity & access",
    description: "Who can access your systems, and how credentials are protected.",
    questions: [
      { id: "mfa-admin", label: "MFA enforced on admin, email, and cloud console accounts", maxScore: 2 },
      { id: "password-policy", label: "Password manager or SSO policy for staff", maxScore: 2 },
      { id: "access-reviews", label: "Quarterly access reviews for privileged accounts", maxScore: 2 },
    ],
  },
  {
    id: "data",
    title: "Data protection",
    description: "How customer and business data is stored, shared, and retained.",
    questions: [
      { id: "encryption-transit", label: "TLS everywhere; no plain HTTP on public apps", maxScore: 2 },
      { id: "encryption-rest", label: "Sensitive data encrypted at rest (DB, backups, files)", maxScore: 2 },
      { id: "retention", label: "Documented retention and deletion for personal data", maxScore: 2 },
    ],
  },
  {
    id: "operations",
    title: "Monitoring & patching",
    description: "Visibility into production systems and timely updates.",
    questions: [
      { id: "logging", label: "Centralised logs for auth, payments, and admin actions", maxScore: 2 },
      { id: "patching", label: "Dependency and OS patching within 30 days of critical CVEs", maxScore: 2 },
      { id: "backups", label: "Tested backups with off-site or immutable copies", maxScore: 2 },
    ],
  },
  {
    id: "incident",
    title: "Incident readiness",
    description: "Preparedness when something goes wrong.",
    questions: [
      { id: "playbook", label: "Written incident response playbook with named contacts", maxScore: 2 },
      { id: "phishing", label: "Phishing awareness or simulations for staff", maxScore: 2 },
      { id: "breach-notify", label: "Process to notify customers/regulators if data is exposed", maxScore: 2 },
    ],
  },
  {
    id: "vendors",
    title: "Vendors & payments",
    description: "Third parties that touch your data or money movement.",
    questions: [
      { id: "vendor-inventory", label: "Inventory of subprocessors (cloud, PSP, telco APIs)", maxScore: 2 },
      { id: "payment-callbacks", label: "Verified payment webhooks / idempotent MoMo or card flows", maxScore: 2 },
      { id: "dpa-contracts", label: "Data-processing terms with key vendors", maxScore: 2 },
    ],
  },
];

export type MaturityTier = {
  id: string;
  label: string;
  minPercent: number;
  summary: string;
  recommendations: string[];
};

export const MATURITY_TIERS: MaturityTier[] = [
  {
    id: "emerging",
    label: "Emerging",
    minPercent: 0,
    summary:
      "Foundational gaps remain. Prioritise MFA, backups, and logging before scaling traffic or regulated data.",
    recommendations: [
      "Enable MFA on email and all admin consoles this week",
      "Document who has production access and remove unused accounts",
      "Schedule tested backups before the next product release",
    ],
  },
  {
    id: "developing",
    label: "Developing",
    minPercent: 41,
    summary:
      "Basics are appearing but coverage is uneven. Focus on incident playbooks and vendor oversight.",
    recommendations: [
      "Publish a one-page incident contact list and escalation path",
      "Map payment and cloud vendors with data-flow notes",
      "Patch critical dependencies on a fixed weekly cadence",
    ],
  },
  {
    id: "managed",
    label: "Managed",
    minPercent: 66,
    summary:
      "Solid posture for many Ghanaian SMEs. Tune monitoring, retention policies, and board-ready reporting.",
    recommendations: [
      "Add alerting on failed admin logins and payment anomalies",
      "Align privacy notices with Ghana DPA expectations",
      "Run a tabletop incident exercise with leadership",
    ],
  },
  {
    id: "optimised",
    label: "Optimised",
    minPercent: 86,
    summary:
      "Strong programme maturity. Maintain evidence for audits and keep third-party reviews on calendar.",
    recommendations: [
      "Annual third-party penetration test on public apps",
      "Automate access reviews and dependency scanning in CI",
      "Share quarterly security metrics with executives",
    ],
  },
];

export function getAllQuestionIds(): string[] {
  return SECURITY_DOMAINS.flatMap((d) => d.questions.map((q) => q.id));
}

export const MAX_ASSESSMENT_SCORE = SECURITY_DOMAINS.reduce(
  (sum, domain) =>
    sum + domain.questions.reduce((inner, q) => inner + q.maxScore, 0),
  0,
);
