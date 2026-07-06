export type LeadPresetCounts = {
  all?: number;
  newOnly?: number;
  projectCalculator?: number;
  chat?: number;
  namecheapCheckout?: number;
  websiteToAppQuote?: number;
};

export const LEAD_FILTER_PRESETS = [
  { id: "all", label: "All leads", status: "all", source: "all", q: "", dateRange: "all" },
  { id: "new", label: "New only", status: "new", source: "all", q: "", dateRange: "all" },
  {
    id: "project-calc",
    label: "Project calculator",
    status: "all",
    source: "project_calculator",
    q: "",
    dateRange: "all",
  },
  { id: "chat", label: "Chat follow-ups", status: "all", source: "chat", q: "", dateRange: "all" },
  {
    id: "namecheap-checkout",
    label: "Namecheap checkout",
    status: "all",
    source: "namecheap_unified_checkout",
    q: "",
    dateRange: "all",
  },
  {
    id: "website-to-app",
    label: "Website-to-app quote",
    status: "all",
    source: "website_to_app_quote",
    q: "",
    dateRange: "all",
  },
] as const;

export const LEAD_STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
] as const;

export const LEAD_SOURCE_OPTIONS = [
  { value: "all", label: "All sources" },
  { value: "contact_form", label: "Contact form" },
  { value: "intake_wizard", label: "Interactive intake" },
  { value: "proposal_request", label: "Proposal request" },
  { value: "project_calculator", label: "Project calculator" },
  { value: "chat", label: "Chat" },
  { value: "help_center_feedback", label: "Help center feedback" },
  { value: "website_to_app_quote", label: "Website-to-app quote" },
  { value: "namecheap_unified_checkout", label: "Infrastructure checkout" },
] as const;

export const LEAD_DATE_RANGE_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
] as const;

export const LEAD_SORT_OPTIONS = [
  { value: "created_desc", label: "Newest first" },
  { value: "created_asc", label: "Oldest first" },
  { value: "status", label: "By status" },
  { value: "source", label: "By source" },
] as const;

export function leadPresetCount(
  presetId: string,
  counts: LeadPresetCounts | null | undefined,
): number | string {
  if (!counts) return "•";
  switch (presetId) {
    case "all":
      return counts.all ?? 0;
    case "new":
      return counts.newOnly ?? 0;
    case "project-calc":
      return counts.projectCalculator ?? 0;
    case "chat":
      return counts.chat ?? 0;
    case "namecheap-checkout":
      return counts.namecheapCheckout ?? 0;
    case "website-to-app":
      return counts.websiteToAppQuote ?? 0;
    default:
      return "•";
  }
}
