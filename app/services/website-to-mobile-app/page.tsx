import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { WebsiteToAppQuoteForm } from "@/components/services/WebsiteToAppQuoteForm";

function ConversionClipart() {
  return (
    <svg viewBox="0 0 220 140" className="h-auto w-full max-w-[320px]" fill="none" aria-hidden>
      <rect x="8" y="18" width="94" height="64" rx="10" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
      <rect x="20" y="30" width="70" height="8" rx="4" fill="#BAE6FD" />
      <rect x="20" y="44" width="54" height="6" rx="3" fill="#7DD3FC" />
      <rect x="20" y="56" width="62" height="6" rx="3" fill="#38BDF8" fillOpacity="0.85" />
      <rect x="124" y="12" width="86" height="116" rx="16" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
      <rect x="146" y="24" width="40" height="4" rx="2" fill="#60A5FA" />
      <rect x="134" y="36" width="62" height="64" rx="8" fill="#EFF6FF" stroke="#93C5FD" />
      <circle cx="167" cy="112" r="6" fill="#3B82F6" />
      <path d="M104 50h14" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
      <path d="M112 42l8 8-8 8" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WebsiteToMobileAppPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-20 pt-28 text-slate-900 md:pt-36">
      <section className="container mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/60 md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-800">
              <Smartphone className="h-3.5 w-3.5 text-ocean-600" />
              Website to mobile app
            </span>
            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Convert your existing website into a production-ready mobile app
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Bring your live website, user flows, and priorities. We assess technical fit,
              propose architecture, and send a practical quote with timeline and milestones.
            </p>
            <div className="mt-7 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-blue-50/60 to-white p-4 md:p-5">
              <ConversionClipart />
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">What we review</p>
                <p className="mt-1 text-sm text-slate-700">Current website stack, API readiness, key user journeys, and backend integrations.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">What you receive</p>
                <p className="mt-1 text-sm text-slate-700">Scope recommendation, platform path, estimated budget band, and staged delivery plan.</p>
              </div>
            </div>

            <Link
              href="/services/mobile-apps"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ocean-700 hover:text-ocean-900"
            >
              See our mobile engineering capabilities
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/60 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              Request your conversion quote
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Fill this once. Our team reviews and responds with a tailored quote.
            </p>
            <div className="mt-5">
              <WebsiteToAppQuoteForm />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-10 max-w-6xl px-6 md:px-8">
        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:grid-cols-3 md:p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Step 01</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Audit your existing website</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Step 02</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Define mobile feature scope</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Step 03</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Receive quote and milestones</p>
          </div>
        </div>
      </section>
    </main>
  );
}
