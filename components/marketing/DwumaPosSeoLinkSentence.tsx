import Link from "next/link";
import { DWUMAPOS_SEO_LINK_SENTENCE_SUFFIX, DWUMAPOS_SITE_URL } from "@/lib/marketing/company-identity";

type Props = {
  className?: string;
  linkClassName?: string;
};

/** Plain product link + mandated sentence for home and products hub. */
export function DwumaPosSeoLinkSentence({ className, linkClassName }: Props) {
  return (
    <p className={className}>
      <Link
        href={DWUMAPOS_SITE_URL}
        className={linkClassName ?? "sa-text-link font-medium underline-offset-4 hover:underline"}
        target="_blank"
        rel="noopener noreferrer"
      >
        DwumaPOS
      </Link>
      {DWUMAPOS_SEO_LINK_SENTENCE_SUFFIX}
    </p>
  );
}
