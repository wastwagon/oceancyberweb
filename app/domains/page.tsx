import Link from "next/link";
import { Globe2 } from "lucide-react";
import { DomainSearchPanel, RegistrarValueProps } from "@/components/domains/DomainSearchPanel";
import { CommerceStackBundle } from "@/components/commerce/CommerceStackBundle";

/**
 * Server-rendered commerce page: static H1 for LCP, client islands for search/cart.
 */
export default function DomainsPage() {
  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <section className="sa-page-intro relative z-10 overflow-hidden">
        <div className="sa-container relative z-10 text-center">
          <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
            <Globe2 className="h-4 w-4" aria-hidden />
            Domains & Security
          </span>
          <h1 className="sa-title-lg mx-auto max-w-4xl text-balance">
            Register a domain
            <span className="text-sa-primary"> in Ghana</span>
          </h1>
          <p className="sa-lead mx-auto mt-3">
            Search availability, then add SSL or hosting. Checkout in Ghana cedis
            with Paystack — Accra support when you need it.
          </p>

          <div className="mx-auto mt-12 max-w-3xl">
            <DomainSearchPanel />
          </div>

          <p className="mx-auto mt-8 max-w-xl text-xs text-sa-muted/70">
            Live checks use the Namecheap API from your server only. Pricing and
            checkout are handled securely with GHS via Paystack.
          </p>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="sa-eyebrow">Why register here</p>
            <h2 className="sa-title mt-4">Domains in cedis, support in Accra</h2>
            <p className="sa-subtitle mx-auto">
              Domain search, SSL, and hosting in one place — pay with Paystack
              and talk to a local team when DNS gets messy.
            </p>
          </div>
          <RegistrarValueProps />

          <div className="sa-card mt-16 flex flex-col items-center justify-between gap-6 p-8 md:flex-row md:p-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="font-heading text-xl font-bold text-white">
                Need a home for that domain?
              </h3>
              <p className="mt-2 text-sm text-sa-muted/70">
                cPanel & WHM hosting on our premium stack—competitive launch, grow,
                and scale plans with local support.
              </p>
            </div>
            <Link href="/hosting" className="sa-btn-primary w-full shrink-0 md:w-auto">
              View hosting packages
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <CommerceStackBundle current="domain" />
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-4xl text-center">
          <p className="sa-eyebrow">Next</p>
          <h2 className="sa-title mt-4">Ready to secure your brand?</h2>
          <p className="sa-subtitle mx-auto mt-6">
            Registration, SSL issuance, and renewals are handled with professional
            oversight. Tell us your target domains and we wire the full flow.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/ssl" className="sa-btn-primary w-full sm:w-auto">
              Add SSL
            </Link>
            <Link href="/contact" className="sa-btn-outline w-full sm:w-auto">
              Talk to our team
            </Link>
            <Link
              href="/guides/domain-prices-in-ghana"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-sa-primary underline underline-offset-4"
            >
              Domain price guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
