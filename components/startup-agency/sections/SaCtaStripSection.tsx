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
