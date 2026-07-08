export const COMPLIANCE_CHECKLIST_TITLE =
  "Ghana Data & Compliance Checklist for Professional Teams";

export const COMPLIANCE_CHECKLIST_SECTIONS = [
  {
    heading: "1. Know what data you hold",
    body:
      "Inventory personal data by system: CRM, email, payments, support tickets, and backups. Record why you collect it and who can access it.",
  },
  {
    heading: "2. Lawful basis and consent",
    body:
      "Match each data use to a lawful basis under Ghana's Data Protection Act. Marketing and non-essential cookies need clear, documented consent.",
  },
  {
    heading: "3. Privacy notices that match reality",
    body:
      "Publish notices that reflect actual flows — subprocessors, retention, cross-border transfers, and contact for data subject requests.",
  },
  {
    heading: "4. Access control and MFA",
    body:
      "Enforce MFA on email, admin consoles, and production tools. Review privileged access quarterly and remove leavers same-day.",
  },
  {
    heading: "5. Vendor and subprocessor oversight",
    body:
      "List cloud hosts, PSPs, telco APIs, and analytics tools. Contract data-processing terms and know where data is stored.",
  },
  {
    heading: "6. Retention and deletion",
    body:
      "Define how long you keep client, employee, and transaction records — and automate deletion where possible.",
  },
  {
    heading: "7. Breach response playbook",
    body:
      "Named contacts, containment steps, notification timelines, and evidence preservation — before an incident, not during.",
  },
  {
    heading: "8. Audit trails for sensitive actions",
    body:
      "Log who viewed or changed client records, matter files, and financial transactions. Logs should be searchable for investigations.",
  },
] as const;
