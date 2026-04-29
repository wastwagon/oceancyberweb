import Link from "next/link";
import Image from "next/image";

const footerCompany = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const footerExplore = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/insights" },
  { label: "Project calculator", href: "/tools/project-cost" },
  { label: "Get started", href: "/get-started" },
] as const;

export function StartupAgencyFooter() {
  return (
    <footer className="border-t border-sa-border bg-gradient-to-b from-sa-bg to-sa-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Image
              src="/images/oceancyber logo.webp"
              alt="OceanCyber"
              width={160}
              height={48}
              className="mb-6 h-9 w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-sa-muted">
              Ready to elevate your digital presence? Contact us to discuss your project and how we
              can ship with clear milestones and Ghana‑based support.
            </p>
            <p className="mt-6 text-xs text-sa-muted/80">
              © {new Date().getFullYear()} OceanCyber · Accra, Ghana
            </p>
          </div>
          <div className="flex flex-wrap gap-10 md:gap-14">
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
                Company
              </p>
              <ul className="space-y-2">
                {footerCompany.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-sa-muted transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
                Explore
              </p>
              <ul className="space-y-2">
                {footerExplore.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-sa-muted transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
                Legal
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-sa-muted hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-sa-muted hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
