/**
 * `Contact.source` values. Keep in sync with API routes that create Contact rows.
 */
export const CONTACT_SOURCE = {
  contactForm: "contact_form",
  projectCalculator: "project_calculator",
  chat: "chat",
  intakeWizard: "intake_wizard",
  proposalRequest: "proposal_request",
  helpCenterFeedback: "help_center_feedback",
} as const;

/** `Contact.status` for triage (admin + reporting). */
export const CONTACT_LEAD_STATUS = {
  new: "new",
  contacted: "contacted",
  won: "won",
  lost: "lost",
} as const;

export type ContactLeadStatus = (typeof CONTACT_LEAD_STATUS)[keyof typeof CONTACT_LEAD_STATUS];

export type ContactSource = (typeof CONTACT_SOURCE)[keyof typeof CONTACT_SOURCE];

export const PROJECT_CALCULATOR_METADATA_VERSION = 1 as const;

/** Stored in `Contact.metadata` for `project_calculator` rows. */
export type ProjectCalculatorContactMetadata = {
  v: typeof PROJECT_CALCULATOR_METADATA_VERSION;
  event: "proforma_download" | "print_summary" | null;
  platformId: string;
  designId: string;
  complexityId: string;
  timeline: string;
  featureIds: string[];
  rangeLowGhs: number;
  rangeHighGhs: number;
  totalMidGhs: number;
  totalHours: number;
};

export const INTAKE_WIZARD_METADATA_VERSION = 1 as const;

/** Stored in `Contact.metadata` for `intake_wizard` rows. */
export type IntakeWizardContactMetadata = {
  v: typeof INTAKE_WIZARD_METADATA_VERSION;
  company: string | null;
  serviceNeeds: string[];
  goals: string;
  budgetBand: string;
  timelineBand: string;
  hasExistingSite: boolean;
  contactMethod: "email" | "phone" | "whatsapp";
  meetingType: "discovery_call" | "proposal_walkthrough" | "asynchronous_quote";
  preferredDate: string | null;
};

export const PROPOSAL_REQUEST_METADATA_VERSION = 1 as const;

/** Stored in `Contact.metadata` for `proposal_request` rows. */
export type ProposalRequestContactMetadata = {
  v: typeof PROPOSAL_REQUEST_METADATA_VERSION;
  company: string | null;
  projectType: "website" | "mobile_app" | "ecommerce" | "security" | "support" | "other";
  currentSituation: string;
  requiredScope: string[];
  budgetBand: string;
  timelineBand: string;
  decisionDeadline: string | null;
  needsNda: boolean;
  wantsProposalWalkthrough: boolean;
};

export const HELP_CENTER_FEEDBACK_METADATA_VERSION = 1 as const;

/** Stored in `Contact.metadata` for `help_center_feedback` rows. */
export type HelpCenterFeedbackMetadata = {
  v: typeof HELP_CENTER_FEEDBACK_METADATA_VERSION;
  articleId: string;
  helpful: boolean;
  issue: string | null;
  query: string | null;
};
