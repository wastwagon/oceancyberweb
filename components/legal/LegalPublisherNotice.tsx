import Link from "next/link";
import {
  COMPANY_CONTACT_EMAIL,
  DWUMAPOS_RELATIONSHIP_LINE,
  DWUMAPOS_SITE_URL,
  LEGAL_COMPANY_NAME,
  TRADING_NAME,
} from "@/lib/marketing/company-identity";
import { formatDpcRegistrationLine } from "@/lib/marketing/data-protection-registration";

/** Publisher block for Terms, Privacy, Cookie, and future DPA pages. */
export function LegalPublisherNotice() {
  const dpcLine = formatDpcRegistrationLine();
  return (
    <aside
      className="mb-12 rounded-2xl border border-sa-border bg-sa-surface/40 p-6 text-sm leading-relaxed text-sa-muted/85"
      aria-label="Publisher"
    >
      <p className="font-heading font-semibold text-white">Publisher</p>
      <p className="mt-2">
        This website is operated by{" "}
        <strong className="text-white">{LEGAL_COMPANY_NAME}</strong> (trading as{" "}
        {TRADING_NAME}), Accra, Ghana. Contact:{" "}
        <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="sa-text-link">
          {COMPANY_CONTACT_EMAIL}
        </a>
        .
      </p>
      <p className="mt-3">{DWUMAPOS_RELATIONSHIP_LINE}</p>
      <p className="mt-3">
        Subscription terms for DwumaPOS (POS software for Ghana) are on{" "}
        <Link
          href={`${DWUMAPOS_SITE_URL}/terms`}
          className="sa-text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          dwumapos.com/terms
        </Link>
        . OceanCyber project and hosting terms are on this site.
      </p>
      {dpcLine ? (
        <p className="mt-3 text-xs text-sa-muted/60">{dpcLine}</p>
      ) : null}
    </aside>
  );
}
