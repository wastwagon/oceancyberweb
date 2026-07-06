"use client";

import { motion } from "framer-motion";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { DomainSearchPanel, TldPriceChips } from "@/components/domains/DomainSearchPanel";
import { fadeUpSoft } from "@/lib/scroll-reveal";

export function SaDomainSearchSection() {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg py-20 md:py-32">
      {/* Ambient background for this section */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(187,243,64,0.15),transparent_70%)]" />
      </div>

      <div className="sa-container relative z-10">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUpSoft}>
            <SaSectionHeader
              eyebrow="Global Registrations"
              title={
                <>
                  Find your perfect
                  <span className="text-sa-primary"> domain name</span>
                </>
              }
              subtitle="Search live availability for .com, .net, .org and more. Professional GHS billing, managed DNS setup, and integrated SSL certificates."
              subtitleClassName="mb-12"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <DomainSearchPanel variant="hero" className="mb-10" />
            <TldPriceChips />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
