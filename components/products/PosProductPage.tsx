"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Package,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import {
  POS_CONTACT_TOPIC,
  POS_PROPOSAL_TOPIC,
  type ProductCatalogEntry,
} from "@/lib/data/products-catalog";
import { posSigninUrl } from "@/lib/pos/pos-app-url";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

const contactHref = `/contact?topic=${encodeURIComponent(POS_CONTACT_TOPIC)}`;
const proposalHref = `/tools/proposal?topic=${encodeURIComponent(POS_PROPOSAL_TOPIC)}`;

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sa-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-base font-semibold text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-sa-primary transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? <p className="pb-5 text-sm leading-relaxed text-sa-muted/80">{answer}</p> : null}
    </div>
  );
}

export function PosProductPage({ product }: { product: ProductCatalogEntry }) {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />

      <section className="sa-page-hero">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <Image
            src={product.heroImage}
            alt=""
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sa-bg/30 via-sa-bg/85 to-sa-bg" />
        </div>
        <div className="sa-page-hero-body relative z-10">
          <motion.div initial="hidden" animate="visible" variants={heroMotion.container}>
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Store className="h-4 w-4" aria-hidden />
              Software product
            </motion.span>
            <motion.h1 variants={heroMotion.item} className="sa-title-lg mx-auto max-w-4xl text-balance">
              <span className="text-sa-primary">{product.name}</span>
            </motion.h1>
            <motion.p variants={heroMotion.item} className="sa-lead mx-auto mt-3 max-w-2xl">
              {product.tagline}
            </motion.p>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-sa-muted/75"
            >
              {product.shortDescription}
            </motion.p>
            <motion.div
              variants={heroMotion.item}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {product.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-sa-primary/25 bg-sa-primary/10 px-3 py-1 text-xs font-semibold text-sa-primary"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
            <motion.div
              variants={heroMotion.item}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href={product.trialSignupHref}
                className="sa-btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start free trial
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
              <Link href={contactHref} className="sa-btn-outline w-full sm:w-auto">
                Book a demo
              </Link>
              <a
                href={posSigninUrl()}
                className="sa-ios-link text-sm font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign in to POS
              </a>
            </motion.div>
            <motion.p variants={heroMotion.item} className="mt-6 text-sm font-semibold text-white">
              {product.pricingFrom}
              <span className="font-normal text-sa-muted/70"> — 14-day Starter trial</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-4xl">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader
              eyebrow="SaaS"
              title="Sign up on the POS platform — sell on your terms"
              subtitle="The app lives at app.pos.oceancyber.net. This website is product information only."
            />
          </motion.div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {product.saasHighlights.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.05)}
                className="flex gap-3 text-sm text-sa-muted/85"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mx-auto max-w-3xl text-center">
            <SaSectionHeader
              eyebrow="Features"
              title="Built for Ghanaian operators"
              subtitle={product.pricingNote}
            />
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="sa-card p-6 md:p-8"
              >
                <CheckCircle2 className="h-5 w-5 text-sa-primary" aria-hidden />
                <h3 className="sa-card-title mt-4">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border bg-sa-surface/30">
        <div className="sa-container">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader
              eyebrow="Product screens"
              title="Clear UI for busy counters"
              subtitle="Illustrative mockups — live product on the POS SaaS platform."
            />
          </motion.div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {product.mockups.map((mockup, index) => (
              <motion.figure
                key={mockup.caption}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.08)}
                className="sa-card overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full bg-black/60">
                  <Image
                    src={mockup.src}
                    alt={mockup.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="border-t border-sa-border p-5 text-sm text-sa-muted/80">
                  {mockup.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader eyebrow="Industries" title="Verticals we support" />
          </motion.div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.05)}
              >
                <Link
                  href={industry.href}
                  className="sa-card sa-pressable block h-full p-5 hover:border-sa-primary/30"
                >
                  <Package className="h-4 w-4 text-sa-primary" aria-hidden />
                  <h3 className="mt-3 font-heading text-base font-bold text-white">{industry.title}</h3>
                  <p className="mt-2 text-sm text-sa-muted/75">{industry.useCase}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {product.caseStudySlug ? (
        <section className="sa-section relative z-10 border-t border-sa-border">
          <div className="sa-container max-w-4xl">
            <motion.div {...fadeUpProps} className="sa-card p-8 md:p-10">
              <SaSectionHeader
                eyebrow="Proof"
                title="Commerce experience from the ThinQ team"
                subtitle="OceanCyber POS productizes patterns we use in retail and MoMo-first builds."
              />
              <Link
                href={`/portfolio/${product.caseStudySlug}`}
                className="sa-ios-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary"
              >
                Read the ThinQ case study
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </section>
      ) : null}

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div {...fadeUpProps}>
            <SaSectionHeader eyebrow="FAQ" title="Common questions" />
          </motion.div>
          <motion.div {...fadeUpProps} className="mt-10">
            {product.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-4xl">
          <motion.div {...fadeUpProps} className="sa-card p-10 text-center md:p-14">
            <h2 className="sa-title-md">Ready to open your account?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sa-muted/80">
              Start a trial on the POS platform, or talk to us for Enterprise rollout and assisted
              onboarding.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={product.trialSignupHref}
                className="sa-btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start free trial
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
              <Link href={contactHref} className="sa-btn-outline w-full sm:w-auto">
                Book a demo
              </Link>
              <Link href={proposalHref} className="sa-btn-outline w-full sm:w-auto">
                Request proposal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
