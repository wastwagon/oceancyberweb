"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Server, Shield, Wrench } from "lucide-react";
import { FxPrice } from "@/components/currency/FxPrice";
import { HOSTING_PACKAGES } from "@/lib/hosting-packages";
import { fadeUpSoft, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

const highlights = [
  {
    icon: Server,
    title: "WHM-managed reseller stack",
    body: "We provision and isolate accounts from WHM with practical quotas and clean cPanel handover.",
  },
  {
    icon: Wrench,
    title: "cPanel operations support",
    body: "Email setup, SSL issuance, DNS help, backups, and migration assistance from one team.",
  },
  {
    icon: Shield,
    title: "Security-first hosting baseline",
    body: "Hardening and monitoring practices aligned for business websites and compliance-aware projects.",
  },
] as const;

const included = [
  "GHS pricing with Paystack checkout",
  "Monthly and annual billing options",
  "Local support with global-grade workflow",
] as const;

const STARTING_PRICE_GHS = Math.min(
  ...HOSTING_PACKAGES.map((pkg) => pkg.priceMonthlyGhs),
);

export function HostingHighlight() {
  return (
    <section
      id="hosting-highlight"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-50/35 via-transparent to-white" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <motion.div {...fadeUpSoft} className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-ocean-600">
            Hosting Infrastructure
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Reliable hosting for real business growth
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Namecheap reseller infrastructure operated through WHM and cPanel, tuned for Ghana market pricing and global delivery standards.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Plans from{" "}
            <FxPrice
              amountGhs={STARTING_PRICE_GHS}
              suffix="/mo"
              className="font-semibold text-ocean-700"
            />{" "}
            billed in GHS.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.08)}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 ring-1 ring-ocean-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:mt-10 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">What you get immediately</p>
            <ul className="mt-2 space-y-1.5">
              {included.map((line) => (
                <li key={line} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/hosting"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
            >
              Explore hosting plans
            </Link>
            <Link
              href="/contact?topic=Hosting%20consultation"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Talk to hosting team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
