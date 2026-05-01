import { motion, useReducedMotion } from "framer-motion";
import { Server, Shield, Wrench, Check } from "lucide-react";
import { HostingPackagesSection } from "@/components/hosting/HostingPackagesSection";
import { HOSTING_TRUST_POINTS } from "@/lib/hosting-packages";
import { withCanonical } from "@/lib/seo/canonical";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeFromLeft,
  fadeFromRight,
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";

export const metadata: Metadata = withCanonical(
  {
    title: "cPanel & WHM hosting",
    description:
      "cPanel hosting in Ghana cedis on our Namecheap reseller + WHM stack—optional currency preview, Paystack checkout in GHS, local support from Accra.",
  },
  "/hosting",
);

export default function HostingPage({
  searchParams,
}: {
  searchParams?: { billing?: string };
}) {
  const initialBillingCycle =
    searchParams?.billing?.toLowerCase() === "annual" ? "annual" : "monthly";
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
              <Server className="h-4 w-4" aria-hidden />
              cPanel & WHM Hosting
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              High-performance
              <span className="text-sa-primary"> web hosting</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-6"
            >
              Built on a Namecheap reseller stack with WHM isolation, LiteSpeed
              performance, and local GHS billing via Paystack.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Server,
                title: "WHM control plane",
                body: "We manage accounts from WHM so each client gets proper quotas, security, and process isolation.",
              },
              {
                icon: Wrench,
                title: "cPanel powered",
                body: "MySQL, email, SSL, and DNS zones—the industry standard you already know, fully supported.",
              },
              {
                icon: Shield,
                title: "Secure by default",
                body: "Let's Encrypt SSL, hardened configurations, and daily backups to protect your business continuity.",
              },
            ].map(({ icon: Icon, title, body }, index) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.05)}
                className="sa-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted/70">{body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <HostingPackagesSection
        id="packages"
        initialBillingCycle={initialBillingCycle}
      />

      {/* Operations Features */}
      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <p className="sa-eyebrow">Operations</p>
            <h2 className="sa-title mt-4">Standard on all plans</h2>
            <p className="sa-subtitle mx-auto">
              Everything you need to launch and scale your digital presence in the Ghana market.
            </p>
          </motion.div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "WHM account provisioning",
              "Isolated cPanel accounts",
              "DNS assistance & launch",
              "SSL issuance & renewal",
              "Daily/weekly backups",
              "PHP & Database tuning",
              "Email setup (SPF/DKIM)",
              "99.9% uptime health checks",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.04)}
                className="sa-card flex items-center gap-3 px-5 py-4"
              >
                <Check className="h-4 w-4 text-sa-primary" />
                <span className="text-sm font-medium text-sa-muted">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust Points */}
      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeFromLeft}>
              <p className="sa-eyebrow">Local context</p>
              <h2 className="sa-title mt-4 text-left">Why host with OceanCyber?</h2>
              <p className="sa-subtitle mt-6 text-left">
                We combine global registrar standards with local operational reality.
                Pay in GHS, get local support, and enjoy the reliability of Namecheap-level infrastructure.
              </p>
              <div className="mt-10 space-y-4">
                {HOSTING_TRUST_POINTS.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sa-primary bg-sa-primary/10 text-sa-primary">
                      <span className="text-[10px] font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-sa-muted/70">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeFromRight} className="sa-card overflow-hidden !rounded-3xl">
              <div className="relative aspect-square md:aspect-video lg:aspect-square">
                <img
                  src="/images/oceancyber-setup.webp"
                  alt="OceanCyber hosting setup"
                  className="h-full w-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sa-bg via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-heading text-lg font-bold text-white">NVMe Powered Stack</p>
                  <p className="mt-2 text-sm text-sa-muted">
                    Provisioned on high-performance nodes with LiteSpeed and CloudLinux.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpProps}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="sa-title !text-2xl md:!text-3xl">
              Need a custom VPS or Dedicated Server?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted/80 md:text-base">
              For high-traffic applications, specialized databases, or strict
              compliance, we offer managed VPS and dedicated hardware solutions.
            </p>
            <div className="mt-8">
              <Link
                href="/contact?topic=Custom VPS and Dedicated Server"
                className="sa-btn-primary"
              >
                Talk to an architect
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <StartupAgencyMobileQuickBar />
    </main>
  );
}
  );
}
