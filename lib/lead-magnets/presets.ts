import { COMPLIANCE_CHECKLIST_TITLE } from "./compliance-checklist-content";
import { MOMO_PLAYBOOK_TITLE } from "./momo-playbook-content";

export type LeadMagnetId = "momo_playbook" | "compliance_checklist";

export type LeadMagnetPreset = {
  title: string;
  description: string;
  successMessage: string;
  footer?: { label: string; href: string };
};

export const LEAD_MAGNET_PRESETS: Record<LeadMagnetId, LeadMagnetPreset> = {
  momo_playbook: {
    title: MOMO_PLAYBOOK_TITLE,
    description:
      "Seven practical steps for MoMo-ready checkout, reconciliation, and dispute handling — written for Ghana product and engineering teams.",
    successMessage: "Your playbook is downloading. Check your inbox for future editions.",
    footer: {
      label: "See our ThinQ Shopping case study",
      href: "/portfolio/thinq-shopping",
    },
  },
  compliance_checklist: {
    title: COMPLIANCE_CHECKLIST_TITLE,
    description:
      "Eight controls for law firms, advisory practices, and public programmes — data inventory, access, vendors, breach response, and audit trails under Ghana's DPA.",
    successMessage: "Your checklist is downloading. We only email when there is something worth reading.",
    footer: {
      label: "Take the free security self-assessment",
      href: "/tools/security-assessment",
    },
  },
};
