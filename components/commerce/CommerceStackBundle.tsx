import Link from "next/link";
import { Check } from "lucide-react";
import { HERO_TLD_PRICING } from "@/lib/domain-tld-pricing";
import { HOSTING_PACKAGES } from "@/lib/hosting-packages";
import { SSL_PACKAGES } from "@/lib/ssl-packages";

const comPrice =
  HERO_TLD_PRICING.find((row) => row.tld === ".com")?.priceAnnualGhs ?? 120;
const launch = HOSTING_PACKAGES.find((row) => row.id === "launch")!;
const positiveSsl = SSL_PACKAGES.find((row) => row.id === "positivessl")!;

const stackLines = [
  {
    step: "1",
    title: "Domain",
    detail: `.com from GHS ${comPrice}/yr`,
    href: "/domains",
    cta: "Search domains",
  },
  {
    step: "2",
    title: "Hosting",
    detail: `${launch.name} from GHS ${launch.priceMonthlyGhs}/mo`,
    href: "/hosting",
    cta: "Compare hosting",
  },
  {
    step: "3",
    title: "SSL",
    detail: `${positiveSsl.name} from GHS ${positiveSsl.priceAnnualGhs}/yr (Let’s Encrypt free on our hosting)`,
    href: "/ssl",
    cta: "View SSL",
  },
] as const;

type Props = {
  /** Highlight the step that matches the current page */
  current?: "domain" | "hosting" | "ssl";
  className?: string;
};

export function CommerceStackBundle({ current, className }: Props) {
  const yearOneRough =
    comPrice + launch.priceMonthlyGhs * 12 + positiveSsl.priceAnnualGhs;

  return (
    <section
      className={className}
      aria-labelledby="commerce-stack-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="sa-eyebrow">Launch stack</p>
        <h2 id="commerce-stack-heading" className="sa-title mt-4">
          Domain → hosting → SSL
        </h2>
        <p className="sa-subtitle mx-auto mt-4">
          Buy the pieces in order, or pick what you need. Indicative first year for
          a .com + Launch + PositiveSSL is about GHS {yearOneRough.toLocaleString("en-GH")}{" "}
          (hosting billed monthly). Let’s Encrypt stays free on OceanCyber hosting if
          you do not need a commercial cert.
        </p>
      </div>

      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {stackLines.map((line) => {
          const active =
            (current === "domain" && line.step === "1") ||
            (current === "hosting" && line.step === "2") ||
            (current === "ssl" && line.step === "3");
          return (
            <li
              key={line.step}
              className={`sa-card flex flex-col p-6 ${
                active ? "border-sa-primary/60" : ""
              }`}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sa-border bg-sa-surface text-sm font-semibold text-sa-primary">
                {line.step}
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-white">
                {line.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sa-muted/75">
                {line.detail}
              </p>
              <Link
                href={line.href}
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-sa-primary underline underline-offset-4 hover:text-white"
              >
                {line.cta}
              </Link>
            </li>
          );
        })}
      </ol>

      <ul className="mx-auto mt-10 max-w-xl space-y-2 text-sm text-sa-muted/70">
        <li className="flex gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
          Pay in Ghana cedis with Paystack (card and Mobile Money).
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
          Accra support for DNS, install, and renewals.
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
          <Link href="/guides/domain-prices-in-ghana" className="sa-text-link">
            Domain price guide
          </Link>
          {" · "}
          <Link href="/guides/web-hosting-cost-in-ghana" className="sa-text-link">
            Hosting cost guide
          </Link>
        </li>
      </ul>
    </section>
  );
}
