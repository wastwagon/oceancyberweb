/**
 * OceanCyber cybersecurity is consultation only — assessments, hardening, and
 * remediation. Not a licensed MSSP or 24/7 monitoring provider.
 */

export const cyberServiceMode = "consultation" as const;

/** @deprecated Use cyberServiceMode — kept for llms/facts labels */
export const cyberLicenceStatus = cyberServiceMode;

/** Hero and meta for /services/cybersecurity and geo cyber pages. */
export function cybersecurityPublicScopeLine(): string {
  return "Security consulting for Ghana sites and apps — assessments, hardening, and remediation from our Accra engineering team. Not regulated monitoring or managed security services.";
}

/** Short banner on cyber hub and geo pages. */
export function cybersecurityDisclosureShort(): string {
  return "Consultation only — we deliver technical security reviews and fix sprints. We are not a licensed managed security or 24/7 monitoring provider.";
}
