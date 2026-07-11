"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import type { ServicePricingStripContent } from "@/lib/startup-agency/pricing";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

type Props = {
  content: ServicePricingStripContent;
};

export function ServicePricingStrip({ content }: Props) {
  return (
    <section className="sa-section relative z-10 border-b border-sa-border bg-sa-surface/20">
      <div className="sa-container">
        <motion.div {...fadeUpProps} className="mb-10">
          <SaSectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
          />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {content.tiers.map((tier, index) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={staggerDelay(index, 0.06)}
              className="sa-card flex flex-col p-6 md:p-8"
            >
              <h3 className="font-heading text-lg font-bold text-white">{tier.label}</h3>
              <p className="mt-4 font-heading text-2xl font-black text-sa-primary">
                From GHS {tier.priceGhs.toLocaleString("en-GH")}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-sa-muted">{tier.note}</p>
              {tier.planId ? (
                <Link
                  href={`/pricing#${tier.planId}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sa-primary transition-colors hover:text-white"
                >
                  View package details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/pricing" className="sa-btn-outline min-h-[44px] px-6 text-xs">
            Compare all packages
          </Link>
          <Link href="/tools/project-cost" className="sa-btn-outline min-h-[44px] px-6 text-xs">
            Estimate in GHS
          </Link>
        </div>
      </div>
    </section>
  );
}
