/** Format minor currency units (e.g. pesewas) for display. */
export function formatMoney(amountMinor: string, currency: string): string {
  return `${currency} ${(Number(amountMinor) / 100).toFixed(2)}`;
}

/** Ghana cedis from minor units. */
export function formatGhs(amountMinor: string): string {
  return `₵${(Number(amountMinor) / 100).toFixed(2)}`;
}

/** Human-readable lead / request source label (shared by dashboard + admin). */
export function sourceLabel(source: string | null | undefined): string {
  if (source === "contact_form") return "Contact form";
  if (source === "project_calculator") return "Project calculator";
  if (source === "chat") return "Chat";
  if (source === "intake_wizard") return "Interactive intake";
  if (source === "proposal_request") return "Proposal request";
  if (source === "help_center_feedback") return "Help center feedback";
  if (source === "namecheap_unified_checkout") return "Namecheap unified checkout";
  if (source === "website_to_app_quote") return "Website-to-Mobile App Conversion Quote";
  if (source === "security_assessment") return "Security self-assessment";
  if (source === "newsletter_signup") return "Newsletter signup";
  if (source == null || source === "") return "—";
  return source;
}
