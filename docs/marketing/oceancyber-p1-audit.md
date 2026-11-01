# OceanCyber marketing audit (P1)

Last updated: 2026-11-01. Repo: `oceancyberweb-main`. Live checks: run after deploy against https://oceancyber.net.

## JSON-LD inventory

| Location | `@type` | Notes |
|----------|---------|--------|
| `app/layout.tsx` | Organization | `legalName`, `Brand` → DwumaPOS; **no** `aggregateRating` (removed duplicate) |
| `app/layout.tsx` | SoftwareApplication | DwumaPOS product; `publisher` → Organization; **no** review markup |
| `app/layout.tsx` | ProfessionalService | Local business graph; **keeps** `aggregateRating` from one GBP source |
| `app/layout.tsx` | WebSite | `publisher` → LocalBusiness |
| Service layouts | Service + FAQPage | Via `ServiceLayoutWithJsonLd` / hub sections |
| `/pricing` | Offers in GHS | `PricingPageJsonLd` |
| `/reviews` | AggregateRating + optional Review nodes | Only when Places excerpts sync — not on homepage product schema |
| `/guides/*`, `/compare/*` | Article + FAQPage | Dwuma summaries use `canonicalExternal` in HTML |
| `/insights/*` | Article + Person author + Organization publisher | `dateModified` = last reviewed |

### Recommended next (no code until Gilbert approves)

1. Validate Rich Results Test on `/`, `/products`, `/reviews`, one insight — confirm single rating graph.
2. Add `Service` + `Offer` in GHS on each service **hub** when package numbers are owner-confirmed.
3. Do **not** add DwumaPOS Google review count to OceanCyber `SoftwareApplication`.

## Review count (single source)

- Static: `lib/startup-agency/google-business.ts` → **56** @ **4.9**
- Live: `getGooglePlaceStats()` when `GOOGLE_MAPS_API_KEY` set
- Override: `OCEAN_GOOGLE_RATING` + `OCEAN_GOOGLE_REVIEW_COUNT`
- **Owner:** reconcile **55 vs 56** with live Google, then update one source only.

## Geo “Best X in Accra” duplicate content — merge **proposal only** (no 301s yet)

| Pair | Issue | Proposal |
|------|--------|----------|
| `/services/web-design-in-accra` vs `-in-ghana` | Accra vs nationwide framing | Keep both; differentiate intro (office visit vs remote Ghana teams) — already partially done |
| `/services/web-development-in-accra` vs `-in-ghana` | Same pattern | Same |
| `/services/software-development-in-accra` vs `-in-ghana` | Thin duplicate risk | **Propose:** Ghana page canonical to Accra + “Serving all Ghana from Accra” section, or merge to one URL with `areaServed` |
| `/services/mobile-app-development-in-*` | Same | Same as software |
| `/services/ecommerce-development-in-*` | Same | Same |
| `/services/ui-ux-design-in-*` | Same | Same |
| `/services/cybersecurity-in-*` | Same + licence scope | Merge only after CSA wording confirmed |
| Hub `/services/web-design` vs geo owners | Hub vs local SEO | Keep hub as primary; geo pages link up |

**Not proposed for merge:** capability hubs (`/services/web-development`, etc.) — distinct intent from geo URLs.

## Owner blockers (unchanged)

- CSA licence number and allowed claims
- Data protection registration #
- Performance claims 250% / 180% / 165%
- Service hub GHS ranges, deposit %, maintenance
- Entry hosting package + verified specs

## Cadence

- Insights: add `lastReviewed` when pricing or product facts change; target monthly review on commercial posts.
- DwumaPOS facts on OceanCyber: only in `lib/seo/dwumapos-ocean-guides.ts` + flagship components — not long duplicates.

## Added 2026-11-01 (P1 continue)

- **8 guides** in `lib/seo/stack-and-payments-guides.ts` (Next.js, React Native, Flutter, Laravel, WordPress, Paystack/Hubtel/MoMo for **custom** builds).
- **`/data-protection`** stub page (DPC reg # not published).
- Service hub FAQs: deposit + maintenance answers via `lib/marketing/project-delivery.ts` (no fixed deposit % until owner confirms).
- Insights loader normalizes author + last reviewed for all posts.
