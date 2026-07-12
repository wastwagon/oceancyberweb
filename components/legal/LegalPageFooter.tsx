import Link from "next/link";

type LegalPage = "privacy" | "terms" | "cookies";

const legalLinks: { href: string; label: string; page: LegalPage }[] = [
  { href: "/privacy", label: "Privacy Policy", page: "privacy" },
  { href: "/terms", label: "Terms of Service", page: "terms" },
  { href: "/cookies", label: "Cookie Policy", page: "cookies" },
];

type LegalPageFooterProps = {
  current: LegalPage;
  contactLabel?: string;
  contactHref?: string;
};

export function LegalPageFooter({
  current,
  contactLabel = "privacy@oceancyber.net",
  contactHref = "mailto:privacy@oceancyber.net",
}: LegalPageFooterProps) {
  return (
    <footer className="mt-20 space-y-8">
      <div className="rounded-3xl border border-sa-border bg-sa-surface/50 p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sa-muted/60">
          Related policies
        </p>
        <nav className="mt-4 flex flex-wrap gap-3">
          {legalLinks
            .filter((link) => link.page !== current)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-sa-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sa-muted transition hover:border-sa-primary hover:text-white"
              >
                {link.label}
              </Link>
            ))}
        </nav>
        <p className="mt-6 text-sm leading-relaxed text-sa-muted/70">
          This page provides general information about how OceanCyber operates
          and is not legal advice. For matters affecting your organisation,
          consult qualified legal counsel. Where a signed proposal, order, or
          service agreement exists, that document governs your specific
          engagement.
        </p>
      </div>

      <div className="rounded-3xl border border-sa-border bg-sa-surface p-10 text-center">
        <p className="text-sa-muted/60 text-xs uppercase tracking-widest font-bold">
          Questions
        </p>
        <p className="mt-4 text-white">
          Contact us at{" "}
          <a
            href={contactHref}
            className="text-sa-primary font-bold hover:underline underline-offset-4"
          >
            {contactLabel}
          </a>
        </p>
      </div>
    </footer>
  );
}
