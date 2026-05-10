"use client";

import { motion } from "framer-motion";
import { Users, CreditCard, Clock, Activity, MessageSquare, TrendingUp, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatGridProps {
  summary: {
    userCount: number;
    transactions24h: number;
    pastDueCount: number;
    suspendedCount: number;
    pendingPayments: number;
    contacts7d: number;
    projectCalculatorLeads7d: number;
  };
  itemVariants: any;
}

export function AdminStatGrid({ summary, itemVariants }: AdminStatGridProps) {
  const stats = [
    { k: "Active Nodes", v: summary.userCount, i: Users, c: "text-sa-primary" },
    { k: "24h Volume", v: summary.transactions24h, i: CreditCard, c: "text-emerald-400" },
    { k: "Late Nodes", v: summary.pastDueCount, i: Clock, c: "text-orange-400" },
    { k: "Suspended", v: summary.suspendedCount, i: XCircle, c: "text-rose-400" },
    { k: "Pending", v: summary.pendingPayments, i: Activity, c: "text-sa-muted" },
    { k: "Wk Leads", v: summary.contacts7d, i: MessageSquare, c: "text-sa-primary" },
    { k: "Calculations", v: summary.projectCalculatorLeads7d, i: TrendingUp, c: "text-emerald-400" },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
    >
      {stats.map(({ k, v, i: Icon, c }) => (
        <motion.div
          key={k}
          variants={itemVariants}
          className="sa-card p-5 group transition-all hover:border-sa-primary/30"
        >
          <div className="flex items-center justify-between">
            <Icon size={16} className={cn("opacity-40 transition-opacity group-hover:opacity-100", c)} />
            <span className="text-[10px] font-black tracking-widest text-sa-muted/30">OPERATIONAL</span>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-sa-muted/60">{k}</p>
          <p className="mt-1 text-3xl font-bold font-heading tabular-nums text-white">{v}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}
