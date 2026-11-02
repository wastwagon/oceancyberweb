"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Boxes, ExternalLink, Store } from "lucide-react";
import Link from "next/link";
import { DwumaPosSeoLinkSentence } from "@/components/marketing/DwumaPosSeoLinkSentence";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import {
  DWUMAPOS_ONE_LINE_PITCH,
  DWUMAPOS_PRICING_URL,
  DWUMAPOS_RELATIONSHIP_LINE,
  DWUMAPOS_SIGNUP_URL,
  OCEANCYBER_CUSTOM_SITE_PITCH,
} from "@/lib/marketing/company-identity";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

const products = [
  {
    href: "/domains",
    title: "Domains",
    price: "From GHS 120/yr",
    body: "Search availability and register in cedis with Paystack — see our domain prices in Ghana guide for list prices.",
    action: "Search a domain",
  },
  {
    href: "/ssl",
    title: "SSL certificates",
    price: "From GHS 45/yr",
    body: "PositiveSSL, Wildcard, and EV. Renews at the same list price.",
    action: "See certificates",
  },
  {
    href: "/hosting",
    title: "Web hosting",
    price: "From GHS 69/mo",
    body: "cPanel hosting with Accra support.",
    action: "See hosting plans",
  },
] as const;

const dwumaPlans = [
  { name: "Starter", price: "GHS 149/mo", branches: "1 branch · 3 logins" },
  { name: "Business", price: "GHS 249/mo", branches: "Up to 3 branches · 10 logins" },
  { name: "Scale", price: "GHS 399/mo", branches: "Up to 10 branches · 25 logins" },
] as const;

export function ProductsHubPage() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />

      <section className="sa-page-hero">
        <div className="sa-page-hero-body">
          <motion.div initial="hidden" animate="visible" variants={heroMotion.container}>
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Boxes className="h-4 w-4" aria-hidden />
              Products
            </motion.span>
            <motion.h1 variants={heroMotion.item} className="sa-title-lg mx-auto max-w-4xl">
              Domains, hosting, and{" "}
              <span className="text-sa-primary">DwumaPOS</span>
            </motion.h1>
            <motion.div variants={heroMotion.item} className="mx-auto mt-3 max-w-2xl">
              <DwumaPosSeoLinkSentence className="sa-lead text-center" />
              <p className="mt-3 text-center text-sm text-sa-muted/85">
                Buy domains, SSL, and cPanel hosting in Ghana cedis on OceanCyber.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader
              eyebrow="Flagship product"
              title="DwumaPOS (POS software for Ghana)"
              subtitle={DWUMAPOS_ONE_LINE_PITCH}
            />
          </motion.div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={revealViewport}
            className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-sa-muted/85"
          >
            {DWUMAPOS_RELATIONSHIP_LINE} {OCEANCYBER_CUSTOM_SITE_PITCH}
          </motion.p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {dwumaPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="sa-card p-6"
              >
                <p className="text-sm font-medium text-sa-primary">{plan.price}</p>
                <h2 className="mt-2 font-heading text-xl font-bold text-white">{plan.name}</h2>
                <p className="mt-2 text-sm text-sa-muted/80">{plan.branches}</p>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-sa-muted/70">
            30-day free trial on Starter, Business, or Scale. Customer MoMo and card payments go to
            the Paystack or Hubtel account you connect — DwumaPOS never holds buyer money.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={DWUMAPOS_SIGNUP_URL}
              className="sa-btn-primary inline-flex min-h-11 items-center gap-2 px-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Store className="h-4 w-4" aria-hidden />
              Start free trial
            </Link>
            <Link
              href={DWUMAPOS_PRICING_URL}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pricing on dwumapos.com
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/guides/dwumapos-for-ghana-shops"
              className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              Short summary guide
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border bg-sa-surface/20">
        <div className="sa-container">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader
              eyebrow="Available now"
              title="What you can buy on OceanCyber"
              subtitle="Domain registration, SSL, and cPanel hosting. Pay in GHS with Paystack."
            />
          </motion.div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.article
                key={product.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.08)}
                className="sa-card sa-pressable group p-5 md:p-8"
              >
                <p className="text-sm font-medium text-sa-primary">{product.price}</p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-white">{product.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">{product.body}</p>
                <Link
                  href={product.href}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
                >
                  {product.action}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
