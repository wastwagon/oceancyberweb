import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { WebsiteToAppQuoteForm } from "@/components/services/WebsiteToAppQuoteForm";
import { ServicePageHeroBanner } from "@/components/services/ServicePageHeroBanner";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { ServicePricingStrip } from "@/components/services/ServicePricingStrip";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

function ConversionClipart() {
  return (
    <svg viewBox="0 0 220 140" className="h-auto w-full max-w-[320px] opacity-80" fill="none" aria-hidden>
      <rect x="8" y="18" width="94" height="64" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <rect x="20" y="30" width="70" height="8" rx="4" fill="#334155" />
      <rect x="20" y="44" width="54" height="6" rx="3" fill="#475569" />
      <rect x="20" y="56" width="62" height="6" rx="3" fill="#38bdf8" fillOpacity="0.85" />
      <rect x="124" y="12" width="86" height="116" rx="16" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.2" />
      <rect x="146" y="24" width="40" height="4" rx="2" fill="#1e293b" />
      <rect x="134" y="36" width="62" height="64" rx="8" fill="#1e293b" stroke="#38bdf8" strokeOpacity="0.3" />
      <circle cx="167" cy="112" r="6" fill="#0ea5e9" />
      <path d="M104 50h14" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <path d="M112 42l8 8-8 8" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WebsiteToMobileAppPage() {
  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-hero">
        <ServicePageHeroBanner image={serviceImages.mobileApps} />
        <div className="sa-page-hero-body !items-stretch !text-left md:!items-center">
          <div className="sa-container w-full pb-0">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="sa-card sa-pressable p-8 md:p-10 border-sa-border">
              <span className="sa-eyebrow inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Website to mobile app
              </span>
              <h1 className="sa-title !text-left mt-5 text-3xl md:text-4xl lg:text-5xl">
                Convert your existing website into a <span className="text-sa-primary">production-ready app</span>
              </h1>
              <p className="sa-subtitle !text-left mt-4 max-w-2xl">
                Bring your live website, user flows, and priorities. We assess technical fit,
                propose architecture, and send a practical quote with timeline and milestones.
              </p>
              <div className="mt-8 rounded-3xl border border-sa-primary/20 bg-sa-primary/5 p-6 flex justify-center backdrop-blur-sm">
                <ConversionClipart />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-sa-border bg-sa-surface p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">What we review</p>
                  <p className="mt-2 text-sm text-sa-muted/80">Current website stack, API readiness, key user journeys, and backend integrations.</p>
                </div>
                <div className="rounded-2xl border border-sa-border bg-sa-surface p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">What you receive</p>
                  <p className="mt-2 text-sm text-sa-muted/80">Scope recommendation, platform path, estimated budget band, and staged delivery plan.</p>
                </div>
              </div>

              <Link
                href="/services/mobile-apps"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary hover:text-white transition-colors"
              >
                See our mobile engineering capabilities
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="sa-card p-8 md:p-10 border-sa-border h-fit lg:sticky lg:top-32">
              <h2 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
                Request your conversion quote
              </h2>
              <p className="mt-2 text-sm text-sa-muted/70 mb-8">
                Fill this once. Our team reviews and responds with a tailored quote.
              </p>
              <WebsiteToAppQuoteForm />
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="grid gap-4 rounded-3xl border border-sa-border bg-sa-surface/50 p-6 sm:grid-cols-3 md:p-8">
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 text-7xl font-black text-sa-primary/[0.03] group-hover:text-sa-primary/[0.05] transition-colors pointer-events-none">01</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">Step 01</p>
              <p className="mt-2 text-sm font-bold text-white relative z-10">Audit your existing website</p>
            </div>
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 text-7xl font-black text-sa-primary/[0.03] group-hover:text-sa-primary/[0.05] transition-colors pointer-events-none">02</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">Step 02</p>
              <p className="mt-2 text-sm font-bold text-white relative z-10">Define mobile feature scope</p>
            </div>
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 text-7xl font-black text-sa-primary/[0.03] group-hover:text-sa-primary/[0.05] transition-colors pointer-events-none">03</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">Step 03</p>
              <p className="mt-2 text-sm font-bold text-white relative z-10">Receive quote and milestones</p>
            </div>
          </div>
        </div>
      </section>

      <ServicePricingStrip content={servicePricingHints.websiteToMobile} />
    </main>
  );
}
