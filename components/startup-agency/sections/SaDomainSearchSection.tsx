"use client";

import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
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
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...fadeUpSoft}>
            <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
              <Globe2 className="h-4 w-4" aria-hidden />
              Global Registrations
            </span>
            <h2 className="sa-title mb-6">
              Find your perfect
              <span className="text-sa-primary"> domain name</span>
            </h2>
            <p className="sa-subtitle mx-auto mb-12">
              Search live availability for .com, .net, .org and more. Professional GHS billing, 
              managed DNS setup, and integrated SSL certificates.
            </p>
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
