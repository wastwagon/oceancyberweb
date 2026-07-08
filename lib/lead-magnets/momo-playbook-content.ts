export const MOMO_PLAYBOOK_TITLE = "MoMo Integration Playbook for Ghana Teams";

export const MOMO_PLAYBOOK_SECTIONS = [
  {
    heading: "1. Choose your rail early",
    body:
      "Aggregators (Paystack, Hubtel) reduce time-to-market. Direct telco APIs can lower per-transaction cost at volume but need dedicated payments engineering and ops playbooks.",
  },
  {
    heading: "2. Design for idempotency",
    body:
      "Every charge attempt needs a unique reference. Callbacks may arrive twice — your ledger must reconcile without double-settling or duplicate fulfilment.",
  },
  {
    heading: "3. Disclose fees before confirmation",
    body:
      "Ghana buyers expect transparent MoMo fees and delivery charges. Surprises at OTP stage are the fastest way to lose trust and conversion.",
  },
  {
    heading: "4. Build dispute flows upfront",
    body:
      "Map how support ties a customer complaint to telco statements, aggregator dashboards, and your order ID. Disputes spike before marketing does.",
  },
  {
    heading: "5. Log every payment event",
    body:
      "Store request payload hashes, callback timestamps, and settlement references. Finance and engineering should share one source of truth.",
  },
  {
    heading: "6. Test on real devices and networks",
    body:
      "Simulators miss shared-phone habits, intermittent connectivity, and carrier timeouts. Run checkout QA on mid-tier Android hardware on 3G.",
  },
  {
    heading: "7. Contract settlement timing",
    body:
      "Clarify T+ settlement, chargeback windows, and who owns reconciliation when an aggregator or telco API changes behaviour.",
  },
] as const;
