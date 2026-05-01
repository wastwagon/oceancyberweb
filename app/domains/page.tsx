"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Globe2, ShieldCheck, ArrowRight } from "lucide-react";
import { DomainSearchPanel, RegistrarValueProps } from "@/components/domains/DomainSearchPanel";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";

export default function DomainsPage() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      {/* Hero */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Globe2 className="h-4 w-4" aria-hidden />
              Domains & Security
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              Find your identity
              <span className="text-sa-primary"> on the web</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-6"
            >
              Search domain availability, compare options, and secure
              SSL and hosting add-ons with confidence and clarity.
            </motion.p>

            <motion.div variants={heroMotion.item} className="mx-auto mt-12 max-w-3xl">
              <DomainSearchPanel />
            </motion.div>

            <motion.p variants={heroMotion.item} className="mx-auto mt-8 max-w-xl text-xs text-sa-muted/40">
              Live checks use the Namecheap API from your server only. Pricing and
              checkout are handled securely with GHS via Paystack.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust Points / Value Props */}
      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mx-auto mb-14 max-w-2xl text-center">
            <p className="sa-eyebrow">The OceanCyber standard</p>
            <h2 className="sa-title mt-4">Built for a global audience</h2>
            <p className="sa-subtitle mx-auto">
              Same product pillars as world-class registrars: fast discovery,
              transparent availability, and integrated security.
            </p>
          </motion.div>
          <RegistrarValueProps />

          <motion.div
            {...fadeUpProps}
            className="sa-card mt-16 flex flex-col items-center justify-between gap-6 p-8 md:flex-row md:p-10"
          >
            <div className="max-w-xl text-center md:text-left">
              <h3 className="font-heading text-xl font-bold text-white">Need a home for that domain?</h3>
              <p className="mt-2 text-sm text-sa-muted/70">
                cPanel & WHM hosting on our premium stack—competitive
                launch, grow, and scale plans with local support.
              </p>
            </div>
            <Link
              href="/hosting"
              className="sa-btn-primary shrink-0"
            >
              View hosting packages
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-4xl text-center">
          <motion.div {...fadeUpProps}>
            <p className="sa-eyebrow">Support</p>
            <h2 className="sa-title mt-4">Ready to secure your brand?</h2>
            <p className="sa-subtitle mx-auto mt-6">
              Registration, SSL issuance, and renewals are handled with professional
              oversight. Tell us your target domains and we wire the full flow.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="sa-btn-primary"
              >
                Talk to our team
              </Link>
              <Link
                href="/services/website-to-mobile-app"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sa-border px-8 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:border-sa-primary hover:text-white"
              >
                Convert site to app
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <StartupAgencyMobileQuickBar />
    </main>
  );
}
iv>
  );
}
