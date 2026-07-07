import Link from "next/link";

export function SaCtaStripSection() {
  return (
    <section
      id="contact-cta"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            Need a fast response?
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-sa-muted md:text-base">
            Email or WhatsApp us — we route emergencies to the right lead the same day when possible.
          </p>
          <div className="mt-4 flex w-full flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
            <Link
              href="/domains"
              className="sa-pressable inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-sa-muted transition active:bg-white/[0.08] md:rounded-full md:text-xs md:font-semibold md:uppercase md:tracking-[0.14em]"
            >
              Domain search
            </Link>
            <Link
              href="/hosting"
              className="sa-pressable inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-sa-muted transition active:bg-white/[0.08] md:rounded-full md:text-xs md:font-semibold md:uppercase md:tracking-[0.14em]"
            >
              Hosting plans
            </Link>
            <Link
              href="/checkout/cart"
              className="sa-pressable inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-sa-muted transition active:bg-white/[0.08] md:rounded-full md:text-xs md:font-semibold md:uppercase md:tracking-[0.14em]"
            >
              Checkout cart
            </Link>
          </div>
        </div>
        <Link
          href="/contact"
          className="sa-btn-outline w-full shrink-0 sm:w-auto"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
