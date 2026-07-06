import Link from "next/link";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";

export function PortfolioPageHero({
  projectCount,
  categoryCount,
}: {
  projectCount: number;
  categoryCount: number;
}) {
  return (
    <header className="sa-section relative overflow-hidden border-b border-sa-border">
      <div className="sa-container relative z-10 pt-28 text-center md:pt-32">
        <p className="sa-eyebrow inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Selected work
        </p>
        <h1 className="sa-title-lg mt-6">
          Digital products with measurable impact
        </h1>
        <p className="sa-lead mx-auto mt-3 max-w-2xl">
          From fintech and e-commerce to events and professional services—each
          build is designed for performance, security, and growth. Every project
          is delivered with local partnership from Accra, with a global
          product-grade standard.
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <li className="sa-card px-6 py-4 text-center border-sa-border/50">
            <p className="text-3xl font-heading font-bold text-white">
              {projectCount}+
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">launches featured</p>
          </li>
          <li className="sa-card px-6 py-4 text-center border-sa-border/50">
            <p className="text-3xl font-heading font-bold text-white">
              {categoryCount}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">industry verticals</p>
          </li>
          <li className="sa-card px-6 py-4 text-center border-sa-border/50">
            <p className="text-3xl font-heading font-bold text-white">5★</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">client ratings</p>
          </li>
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact?topic=New%20project%20%E2%80%94%20from%20portfolio"
            className="sa-btn-primary gap-2"
          >
            Start a similar project
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-sa-border bg-sa-surface px-6 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
          >
            <Layers className="h-4 w-4" aria-hidden />
            Portfolio
          </Link>
        </div>
        <p className="mt-8 text-center text-[10px] tracking-wide text-sa-muted/40 uppercase">
          Invoices and deposits in GHS via Paystack when ready.
        </p>
      </div>
    </header>
  );
}
