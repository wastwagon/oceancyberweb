"use client";

import { motion } from "framer-motion";
import { Zap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeUpSoft } from "@/lib/scroll-reveal";

export function SaPromoSection() {
  return (
    <section className="relative z-10 border-y border-sa-primary/20 bg-sa-primary/5 py-16">
      <div className="sa-container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div {...fadeUpSoft} className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sa-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              <Zap className="h-3 w-3" />
              Limited Offer
            </div>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Launch your MVP in <span className="text-sa-primary">4 Weeks</span>
            </h2>
            <p className="mt-4 max-w-xl text-sa-muted/80">
              Get a battle-tested, security-hardened digital product ready for users. 
              We are currently offering a priority launch package for new Q3 partners.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex shrink-0 flex-col items-center gap-6 rounded-3xl border border-sa-primary/30 bg-sa-bg p-8 text-center shadow-2xl"
          >
            <div className="flex items-center gap-2 text-sa-primary">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Offer expires soon</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-sa-muted/60 line-through">GHS 8,500</div>
              <div className="text-4xl font-black text-white">GHS 6,000</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">Special Q3 Pricing</div>
            </div>
            <Link href="/contact?promo=mvp-4-weeks" className="sa-btn-primary group w-full">
              Claim Offer
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
