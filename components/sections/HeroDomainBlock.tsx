"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  DomainSearchPanel,
} from "@/components/domains/DomainSearchPanel";
import { Sparkles } from "lucide-react";

export function HeroDomainBlock() {
  return (
    <motion.div
      className="mx-auto mt-12 w-full max-w-5xl text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_32px_64px_-20px_rgba(15,23,42,0.15)] ring-1 ring-slate-200/40 backdrop-blur-md sm:p-6 md:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ocean-700">
            <Sparkles
              className="mr-1.5 inline-block h-3.5 w-3.5 text-amber-500"
              aria-hidden
            />
            Register domains &amp; SSL
          </p>
          <Link
            href="/domains"
            className="text-xs font-semibold text-ocean-600 underline decoration-ocean-200 underline-offset-4 transition hover:text-ocean-800"
          >
            Full domain center →
          </Link>
        </div>
        <h2 className="text-balance text-lg font-bold text-slate-900 sm:text-xl">
          Search a domain in seconds
        </h2>
        <p className="mb-4 mt-1.5 text-sm text-slate-600">
          Check availability against popular extensions—then we complete registration
          and DNS for you.
        </p>
        <div className="mt-5">
          <DomainSearchPanel variant="hero" className="!max-w-none" />
        </div>
      </div>
    </motion.div>
  );
}
