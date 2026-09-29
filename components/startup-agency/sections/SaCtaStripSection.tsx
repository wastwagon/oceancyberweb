import Link from "next/link";

/** End-of-home conversion strip — one primary action, one secondary. */
export function SaCtaStripSection() {
  return (
    <section
      id="contact-cta"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container flex flex-col items-start gap-6 text-left md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="sa-title">Ready to start your project?</h2>
          <p className="sa-subtitle mt-2">
            Share your goals and timeline in a short intake, or talk to the team if you want a call first.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-3 sm:w-auto">
          <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
            Get started
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </section>
  );
}
