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
          <div className="mt-4 flex w-full max-w-xs flex-col items-stretch gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
            <Link
              href="/domains"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-sa-muted transition duration-300 hover:border-sa-primary hover:text-sa-primary sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[10px]"
            >
              Domain search
            </Link>
            <Link
              href="/hosting"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-sa-muted transition duration-300 hover:border-sa-primary hover:text-sa-primary sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[10px]"
            >
              Hosting plans
            </Link>
            <Link
              href="/checkout/cart"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-sa-muted transition duration-300 hover:border-sa-primary hover:text-sa-primary sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[10px]"
            >
              Checkout cart
            </Link>
          </div>
        </div>
        <Link
          href="/contact"
          className="sa-btn-outline shrink-0"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
