"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletHeroProps {
  balanceLabel: string;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function WalletHero({ balanceLabel, className }: WalletHeroProps) {
  const [whole, decimal] = balanceLabel.split('.');

  return (
    <motion.div 
      variants={itemVariants} 
      className={cn("sa-card group relative flex flex-col justify-between overflow-hidden md:col-span-2", className)}
    >
      {/* Decorative Pattern */}
      <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/3 opacity-5">
        <Wallet size={300} />
      </div>

      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sa-primary/10 text-sa-primary">
            <Wallet size={20} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sa-muted/60">Wallet Capital</p>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row md:items-baseline md:gap-4">
          <h2 className="font-heading text-6xl font-bold tracking-tight text-white md:text-7xl">
            {whole}<span className="text-sa-muted/30 font-medium">.{decimal}</span>
          </h2>
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
            <ShieldCheck size={12} /> SECURE
          </div>
        </div>
        
        <p className="mt-6 max-w-md text-sm leading-relaxed text-sa-muted/80 font-medium">
          Automated billing is <span className="text-sa-primary">enabled</span>. Renewals are processed every 10 minutes when due.
        </p>
      </div>

      <div className="border-t border-sa-border bg-sa-surface/30 p-8 md:px-10 md:py-6">
        <Link
          href="/dashboard/wallet"
          className="sa-btn-primary group w-full sm:w-auto min-h-[48px] px-8 text-[11px]"
        >
          <span>Add Funds via Paystack</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </motion.div>
  );
}
