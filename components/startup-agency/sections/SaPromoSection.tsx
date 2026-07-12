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
              Priority launch
            </div>
            <h2 className="sa-title mt-4">
              Launch your MVP in <span className="text-sa-primary">3–5 weeks</span>
            </h2>
            <p className="sa-subtitle mx-auto mt-3 max-w-xl text-center md:mx-0 md:text-left">
              Our Startup package scopes a professional, secure digital product for new partners —
              aligned to the timeline and deliverables on our pricing page.
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
              <span className="text-sm font-bold uppercase tracking-wider">Startup package</span>
            </div>
            <div className="space-y-1">
              <Link href="/pricing#startup" className="block transition-opacity hover:opacity-90">
                <div className="text-4xl font-black text-white">From GHS 6,000</div>
              </Link>
              <div className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                Up to 5 pages · 3–5 week delivery
              </div>
            </div>
            <Link href="/pricing#startup" className="sa-btn-outline w-full text-center text-xs">
              See what is included
            </Link>
            <Link href="/contact?promo=mvp-launch" className="sa-btn-primary group w-full">
              Start your project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
