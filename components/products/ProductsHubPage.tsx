"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Boxes } from "lucide-react";
import Link from "next/link";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

const products = [
  {
    href: "/domains",
    title: "Domains",
    price: "From GHS 120/yr",
    body: "Search availability and register in cedis with Paystack.",
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
              Domains, certificates, and{" "}
              <span className="text-sa-primary">hosting</span>
            </motion.h1>
            <motion.p variants={heroMotion.item} className="sa-lead mx-auto mt-3 max-w-2xl">
              Register a name, protect it, and host the site. Prices are in Ghana cedis.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader
              eyebrow="Available now"
              title="What you can buy today"
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

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl text-center">
          <motion.div {...fadeUpProps} className="sa-card p-10 md:p-12">
            <SaSectionHeader
              title="Need a custom platform instead?"
              subtitle="OceanCyber still designs and builds custom websites, apps, and security work from Accra."
            />
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
                Get started
              </Link>
              <Link
                href="/tools/project-cost"
                className="inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
              >
                Estimate in cedis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
