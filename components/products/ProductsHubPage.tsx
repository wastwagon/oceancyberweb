"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Boxes, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { productCatalog } from "@/lib/data/products-catalog";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

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
              Subscription software for{" "}
              <span className="text-sa-primary">African operators</span>
            </motion.h1>
            <motion.p variants={heroMotion.item} className="sa-lead mx-auto mt-3 max-w-2xl">
              OceanCyber POS is a self-serve SaaS platform — sign up, configure your payments, and
              go live. Custom agency builds remain available separately.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader
              eyebrow="Available now"
              title="Point of sale for Ghanaian commerce"
              subtitle="Sign up on the POS platform, connect Paystack or Hubtel, and go live — cash and manual MoMo work from day one."
            />
          </motion.div>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {productCatalog.map((product, index) => (
              <motion.article
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.08)}
                className="sa-card sa-pressable group overflow-hidden"
              >
                <div className="relative aspect-[16/9] w-full bg-black/50">
                  <Image
                    src={product.heroImage}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                    {product.pricingFrom} · 14-day trial
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">{product.tagline}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {product.pills.slice(0, 4).map((pill) => (
                      <li
                        key={pill}
                        className="rounded-full border border-sa-border px-3 py-1 text-xs text-sa-muted/80"
                      >
                        {pill}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/products/${product.slug}`}
                      className="sa-ios-link inline-flex items-center gap-2 text-sm font-semibold text-sa-primary"
                    >
                      View features
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <a
                      href={product.trialSignupHref}
                      className="sa-ios-link inline-flex items-center gap-2 text-sm font-semibold text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start free trial
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>
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
              subtitle="OceanCyber still designs and builds bespoke web, mobile, and security programmes."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
                Get started
              </Link>
              <Link href="/tools/project-cost" className="sa-btn-outline w-full sm:w-auto">
                Project calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
