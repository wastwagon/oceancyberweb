import type { Metadata } from "next";
import Link from "next/link";
import { Server, Shield, Wrench } from "lucide-react";
import { HostingPackagesSection } from "@/components/hosting/HostingPackagesSection";
import { HOSTING_TRUST_POINTS } from "@/lib/hosting-packages";

export const metadata: Metadata = {
  title: "cPanel & WHM hosting",
  description:
    "cPanel hosting in Ghana cedis on our Namecheap reseller + WHM stack—optional currency preview, Paystack checkout in GHS, local support from Accra.",
};

export default function HostingPage({
  searchParams,
}: {
  searchParams?: { billing?: string };
}) {
  const initialBillingCycle =
    searchParams?.billing?.toLowerCase() === "annual" ? "annual" : "monthly";

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-50">
        <div className="container mx-auto max-w-4xl px-4 pb-12 pt-28 text-center md:px-6 md:pb-16 md:pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">
            Reseller · WHM · cPanel
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Hosting that matches your domains
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We operate a{" "}
            <strong className="text-slate-800">Namecheap reseller</strong>{" "}
            environment and use <strong className="text-slate-800">WHM</strong> to
            spin up <strong className="text-slate-800">cPanel</strong> accounts
            with the same kind of packages customers expect from global
            providers—priced in{" "}
            <strong className="text-slate-800">Ghana cedis</strong> with optional
            currency preview. Card and mobile-money checkout is handled in{" "}
            <strong className="text-slate-800">GHS via Paystack</strong>.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
            Pricing is benchmarked for the Ghana market against major global hosts,
            while keeping local onboarding and support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#packages"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110"
            >
              Compare packages
            </Link>
            <Link
              href="/domains"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-ocean-200"
            >
              Search a domain
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-xl font-bold text-slate-900 md:text-2xl">
            How we run your hosting
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Server,
                title: "WHM control plane",
                body: "We create and manage cPanel users from WHM so each client gets proper quotas, security, and isolation.",
              },
              {
                icon: Wrench,
                title: "cPanel you already know",
                body: "File manager, MySQL, email, SSL, cron jobs, and DNS zones—with support for migrations and account cleanup.",
              },
              {
                icon: Shield,
                title: "Security & SSL",
                body: "Let’s Encrypt and hardening best practices. Optional advanced protection on higher tiers where licensed.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
              >
                <span className="inline-flex rounded-xl bg-ocean-50 p-2.5 text-ocean-600 ring-1 ring-ocean-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HostingPackagesSection
        id="packages"
        initialBillingCycle={initialBillingCycle}
      />

      <section className="border-t border-slate-200 bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-xl font-bold text-slate-900 md:text-2xl">
            Quick package comparison
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold">Launch</th>
                  <th className="px-4 py-3 font-semibold">Grow</th>
                  <th className="px-4 py-3 font-semibold">Scale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800">Best for</td>
                  <td className="px-4 py-3">New business sites</td>
                  <td className="px-4 py-3">Growing traffic stores</td>
                  <td className="px-4 py-3">High-demand workloads</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800">Billing options</td>
                  <td className="px-4 py-3">Monthly / Annual</td>
                  <td className="px-4 py-3">Monthly / Annual</td>
                  <td className="px-4 py-3">Monthly / Annual</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800">Onboarding support</td>
                  <td className="px-4 py-3">Included</td>
                  <td className="px-4 py-3">Included</td>
                  <td className="px-4 py-3">Priority onboarding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-xl font-bold text-slate-900 md:text-2xl">
            Included hosting operations features
          </h2>
          <ul className="mt-8 grid gap-4 text-sm text-slate-700 md:grid-cols-2 lg:grid-cols-4">
            {[
              "WHM account provisioning and quota management",
              "cPanel account isolation and site-level ownership",
              "Domain + DNS assistance for launch and migrations",
              "SSL issuance and renewal support",
              "Daily/weekly backups by plan with assisted restore",
              "PHP and database tuning guidance",
              "Email setup support (SPF, DKIM, routing checks)",
              "Performance and uptime health checks",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Why book with OceanCyber
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {HOSTING_TRUST_POINTS.map(({ title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center"
              >
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-16 text-center md:px-6">
        <h2 className="text-2xl font-bold text-slate-900">Not sure which tier?</h2>
        <p className="mt-3 text-slate-600">
          Send traffic expectations, number of sites, and any compliance needs. We
          will recommend a package—or a custom pool on WHM—before you pay.
        </p>
        <Link
          href="/contact?topic=cPanel%20%2F%20WHM%20hosting%20advice"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110"
        >
          Talk to the team
        </Link>
      </section>
    </div>
  );
}
