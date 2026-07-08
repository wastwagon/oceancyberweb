import { event } from "@/lib/analytics";

export type LeadConversionAction =
  | "contact_form"
  | "intake_wizard"
  | "proposal_request"
  | "calculator_lead"
  | "newsletter_signup"
  | "website_to_app_quote"
  | "security_assessment";

/** Track a qualified lead or signup conversion in GA4 when configured. */
export function trackLeadConversion(action: LeadConversionAction, label?: string) {
  event({
    action: "generate_lead",
    category: "conversion",
    label: label ? `${action}:${label}` : action,
  });
}
