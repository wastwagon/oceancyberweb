import Link from "next/link";
import Image from "next/image";

const footerCompany = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

const footerExplore = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Projects", href: "/projects" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Domains & SSL", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Checkout", href: "/checkout/cart" },
  { label: "Insights", href: "/insights" },
  { label: "Project calculator", href: "/tools/project-cost" },
  { label: "Get started", href: "/get-started" },
] as const;

export function StartupAgencyFooter() {
  return (
    <footer className="border-t border-sa-border bg-gradient-to-b from-sa-bg to-sa-surface">
      <div className="sa-container py-16">
        <div className="grid gap-12 border-b border-sa-border/70 pb-12 lg:grid-cols-[1.25fr_2fr]">
          <div className="max-w-md">
            <Image
              src="/images/oceancyber logo.webp"
              alt="OceanCyber"
              width={160}
              height={48}
              className="mb-6 h-8 w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-sa-muted/95">
              Ready to elevate your digital presence? Contact us to discuss your project and how we
              can ship with clear milestones and Ghana‑based support.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12">
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-sa-primary">
                Company
              </p>
              <ul className="space-y-2.5">
                {footerCompany.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-sa-muted transition duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-sa-primary">
                Explore
              </p>
              <ul className="space-y-2.5">
                {footerExplore.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-sa-muted transition duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-sa-primary">
                Legal
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-sa-muted transition duration-300 hover:text-white"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-sa-muted transition duration-300 hover:text-white"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="pt-6 text-xs text-sa-muted/80">
          © {new Date().getFullYear()} OceanCyber · Accra, Ghana
        </p>
      </div>
    </footer>
  );
}
