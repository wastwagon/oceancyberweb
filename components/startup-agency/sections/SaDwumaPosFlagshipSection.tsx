"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Store } from "lucide-react";
import Link from "next/link";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { DwumaPosSeoLinkSentence } from "@/components/marketing/DwumaPosSeoLinkSentence";
import {
  DWUMAPOS_ONE_LINE_PITCH,
  DWUMAPOS_PRICING_URL,
  DWUMAPOS_RELATIONSHIP_LINE,
  DWUMAPOS_SIGNUP_URL,
  DWUMAPOS_SITE_URL,
  OCEANCYBER_CUSTOM_SITE_PITCH,
} from "@/lib/marketing/company-identity";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

const plans = [
  { name: "Starter", price: "GHS 149/mo", detail: "1 branch · 3 staff logins" },
  { name: "Business", price: "GHS 249/mo", detail: "Up to 3 branches · 10 logins" },
  { name: "Scale", price: "GHS 399/mo", detail: "Up to 10 branches · 25 logins" },
] as const;

export function SaDwumaPosFlagshipSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="dwumapos"
      className="sa-section relative z-10 border-t border-sa-border bg-sa-surface/30"
    >
      <div className="sa-container">
        <motion.div {...fadeUpProps}>
          <SaSectionHeader
            eyebrow="Flagship product"
            title="DwumaPOS for shops that sell"
            subtitle={DWUMAPOS_ONE_LINE_PITCH}
          />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={revealViewport}
        >
          <DwumaPosSeoLinkSentence className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-sa-muted/90" />
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={revealViewport}
          className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-sa-muted/85"
        >
          {DWUMAPOS_RELATIONSHIP_LINE} {OCEANCYBER_CUSTOM_SITE_PITCH}
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={staggerDelay(index, 0.06)}
              className="sa-card border border-sa-border/80 p-6 text-center"
            >
              <p className="text-sm font-medium text-sa-primary">{plan.price}</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-sa-muted/80">{plan.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={revealViewport}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={DWUMAPOS_SIGNUP_URL}
            className="sa-btn-primary inline-flex min-h-11 items-center gap-2 px-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Store className="h-4 w-4" aria-hidden />
            Start 30-day free trial
          </Link>
          <Link
            href={DWUMAPOS_SITE_URL}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DwumaPOS
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={DWUMAPOS_PRICING_URL}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full pricing
          </Link>
        </motion.div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-sa-muted/60">
          Need a short summary on OceanCyber?{" "}
          <Link href="/guides/dwumapos-for-ghana-shops" className="sa-text-link">
            DwumaPOS guide
          </Link>{" "}
          ·{" "}
          <Link href="/products" className="sa-text-link">
            Products hub
          </Link>
        </p>
      </div>
    </section>
  );
}
