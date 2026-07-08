# OceanCyber POS — Development Guide (v5.0)

**Complete multi-tenant SaaS** — self-register, BYOK payments, offline/manual MoMo, subscription billing.

**PDF:** `docs/OceanCyber-POS-Development-Guide.pdf` — `npm run docs:pos-pdf`

| Source file | Contents |
| ----------- | -------- |
| `pos-guide-sections.mjs` | Core product spec (§1–28) |
| `pos-guide-sections-saas.mjs` | SaaS model (§A–O) |
| `pos-guide-sections-extended.mjs` | Tax, RBAC, hardware, DR (§29–65) |
| `pos-guide-sections-v5.mjs` | **Wireframes, Prisma, OpenAPI, sprint plan (§P–Y)** |

## v5.0 additions

- **Wireframes:** signup, onboarding (incl. payment step), settings/payments, POS checkout drawer
- **Prisma schema:** Tenant, User, TenantPaymentProvider, Payment capture types
- **OpenAPI:** auth, onboarding, billing, payment settings, checkout
- **JSON samples:** register, Paystack BYOK, manual MoMo
- **Tenant lifecycle** state machine (trial → active → past_due → suspended)
- **Email templates** list
- **16-week delivery plan** with story points
- **Full env vars** + SaaS QA checklist

---

*July 2026*
