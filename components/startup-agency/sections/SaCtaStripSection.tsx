import Link from "next/link";

export function SaCtaStripSection() {
  return (
    <section
      id="contact-cta"
      className="scroll-mt-28 border-b border-sa-border py-16 md:scroll-mt-32 md:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left md:px-8">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Need a fast response?
          </h3>
          <p className="mt-2 max-w-xl text-sa-muted">
            Email or WhatsApp us — we route emergencies to the right lead the same day when possible.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full border-2 border-white px-8 font-heading text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-sa-bg"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
