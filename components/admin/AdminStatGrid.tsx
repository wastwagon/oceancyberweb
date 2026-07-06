"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Users, CreditCard, Clock, Activity, MessageSquare, TrendingUp, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminStatAction =
  | "users"
  | "transactions"
  | "renewals"
  | "pending-payments"
  | "leads-week"
  | "calculator-leads";

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
  onStatAction?: (action: AdminStatAction) => void;
}

type StatDef = {
  key: string;
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  action?: AdminStatAction;
  hint?: string;
};

export function AdminStatGrid({ summary, itemVariants, onStatAction }: AdminStatGridProps) {
  const stats: StatDef[] = [
    {
      key: "users",
      label: "Active Nodes",
      value: summary.userCount,
      icon: Users,
      color: "text-sa-primary",
      action: "users",
      hint: "View user registry",
    },
    {
      key: "tx24h",
      label: "24h Volume",
      value: summary.transactions24h,
      icon: CreditCard,
      color: "text-emerald-400",
      action: "transactions",
      hint: "Recent transactions",
    },
    {
      key: "past-due",
      label: "Late Nodes",
      value: summary.pastDueCount,
      icon: Clock,
      color: "text-orange-400",
      action: "renewals",
      hint: "Renewal issues",
    },
    {
      key: "suspended",
      label: "Suspended",
      value: summary.suspendedCount,
      icon: XCircle,
      color: "text-rose-400",
      action: "renewals",
      hint: "Renewal issues",
    },
    {
      key: "pending",
      label: "Pending",
      value: summary.pendingPayments,
      icon: Activity,
      color: "text-sa-muted",
      action: "pending-payments",
      hint: "Pending payments",
    },
    {
      key: "leads-week",
      label: "Wk Leads",
      value: summary.contacts7d,
      icon: MessageSquare,
      color: "text-sa-primary",
      action: "leads-week",
      hint: "Leads — last 7 days",
    },
    {
      key: "calc-leads",
      label: "Calculations",
      value: summary.projectCalculatorLeads7d,
      icon: TrendingUp,
      color: "text-emerald-400",
      action: "calculator-leads",
      hint: "Project calculator leads",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
    >
      {stats.map(({ key, label, value, icon: Icon, color, action, hint }) => {
        const clickable = Boolean(action && onStatAction);
        const Wrapper = clickable ? "button" : "div";

        return (
          <motion.div key={key} variants={itemVariants}>
            <Wrapper
              type={clickable ? "button" : undefined}
              onClick={clickable ? () => onStatAction!(action!) : undefined}
              title={hint}
              className={cn(
                "sa-card block w-full p-5 text-left transition-all",
                clickable && "cursor-pointer hover:border-sa-primary/30 hover:bg-sa-surface/80",
              )}
            >
              <div className="flex items-center justify-between">
                <Icon size={16} className={cn("opacity-40 transition-opacity group-hover:opacity-100", color)} />
                <span className="text-[10px] font-black tracking-widest text-sa-muted/30">
                  {clickable ? "VIEW" : "OPERATIONAL"}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-sa-muted/60">{label}</p>
              <p className="mt-1 text-3xl font-bold font-heading tabular-nums text-white">{value}</p>
            </Wrapper>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
