import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SslPackagesSection } from "@/components/ssl/SslPackagesSection";
import { CommerceStackBundle } from "@/components/commerce/CommerceStackBundle";
import { SSL_TRUST_POINTS } from "@/lib/ssl-packages";

/** Server-rendered hero + client package cards. */
export default function SslPage() {
  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <section className="sa-page-intro relative z-10 overflow-hidden">
        <div className="sa-container relative z-10 text-center">
          <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            SSL certificates
          </span>
          <h1 className="sa-title-lg mx-auto max-w-4xl text-balance">
            Buy SSL in Ghana,
            <span className="text-sa-primary"> from GHS 45/yr</span>
          </h1>
          <p className="sa-lead mx-auto mt-3">
            PositiveSSL, Wildcard, and EV — renews at the same GHS list price.
            Checkout with Paystack. Accra help to install on our hosting or yours.
          </p>
          <div className="mt-8">
            <Link href="#packages" className="sa-btn-primary w-full sm:w-auto">
              Compare certificates
            </Link>
          </div>
        </div>
      </section>

      <SslPackagesSection />

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="sa-eyebrow">Why buy here</p>
            <h2 className="sa-title mt-4">Named certs, clear renewals</h2>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {SSL_TRUST_POINTS.map((item) => (
              <li key={item.title} className="sa-card p-6">
                <h3 className="font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted/70">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <CommerceStackBundle current="ssl" />
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl text-center">
          <h2 className="sa-title">Already have a domain?</h2>
          <p className="sa-subtitle mx-auto mt-4">
            Register or transfer with us, then add hosting and SSL in one checkout.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/domains" className="sa-btn-primary w-full sm:w-auto">
              Search domains
            </Link>
            <Link href="/hosting" className="sa-btn-outline w-full sm:w-auto">
              View hosting
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
