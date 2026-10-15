import { Server, Shield, Wrench, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HostingPackagesSection } from "@/components/hosting/HostingPackagesSection";
import { CommerceStackBundle } from "@/components/commerce/CommerceStackBundle";
import { HOSTING_TRUST_POINTS } from "@/lib/hosting-packages";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { ServicePageHeroBanner } from "@/components/services/ServicePageHeroBanner";
import { serviceImages } from "@/lib/startup-agency/service-images";

/** Server-rendered hero for LCP; packages/cart remain client islands. */
export default function HostingPage({
  searchParams,
}: {
  searchParams?: { billing?: string };
}) {
  const initialBillingCycle =
    searchParams?.billing?.toLowerCase() === "annual" ? "annual" : "monthly";

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-hero">
        <ServicePageHeroBanner image={serviceImages.cloudHosting} />
        <div className="sa-page-hero-body">
          <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
            <Server className="h-4 w-4" aria-hidden />
            cPanel & WHM Hosting
          </span>
          <h1 className="sa-title-lg mx-auto max-w-4xl text-balance">
            Web hosting in Ghana,
            <span className="text-sa-primary"> from GHS 69/mo</span>
          </h1>
          <p className="sa-lead mx-auto mt-3">
            cPanel hosting with SSL, backups, and Accra support. WHM isolation,
            LiteSpeed performance, and Paystack billing in Ghana cedis.
          </p>
          <div className="mt-8">
            <Link href="#packages" className="sa-btn-primary w-full sm:w-auto">
              Compare packages
            </Link>
          </div>
        </div>
      </section>

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
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="sa-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted/70">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HostingPackagesSection
        id="packages"
        initialBillingCycle={initialBillingCycle}
      />

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <p className="sa-eyebrow">Operations</p>
            <h2 className="sa-title mt-4">Standard on all plans</h2>
            <p className="sa-subtitle mx-auto">
              Everything you need to launch and scale your digital presence in the Ghana market.
            </p>
          </div>
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
            ].map((item) => (
              <li
                key={item}
                className="sa-card flex items-center gap-3 px-5 py-4"
              >
                <Check className="h-4 w-4 text-sa-primary" aria-hidden />
                <span className="text-sm font-medium text-sa-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
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
                      <span className="text-xs font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-sa-muted/70">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sa-card overflow-hidden !rounded-3xl">
              <div className="relative aspect-square md:aspect-video lg:aspect-square">
                <Image
                  src="/images/hero-services/oceancyber-accra-cloud-hosting-services-ghana.webp"
                  alt="OceanCyber cloud hosting infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sa-bg via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-heading text-lg font-bold text-white">NVMe Powered Stack</p>
                  <p className="mt-2 text-sm text-sa-muted">
                    Provisioned on high-performance nodes with LiteSpeed and CloudLinux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <CommerceStackBundle current="hosting" />
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <div className="sa-card p-10 text-center md:p-14">
            <h2 className="sa-title">Need a custom VPS or Dedicated Server?</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted/80 md:text-base">
              For high-traffic applications, specialized databases, or strict
              compliance, we offer managed VPS and dedicated hardware solutions.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact?topic=Custom VPS and Dedicated Server"
                className="sa-btn-primary w-full sm:w-auto"
              >
                Talk to our team
              </Link>
              <Link
                href="/guides/web-hosting-cost-in-ghana"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-sa-primary underline underline-offset-4"
              >
                Hosting cost guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
