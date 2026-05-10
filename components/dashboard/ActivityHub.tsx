"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingLedgerEntry, BillingTransaction } from "@/lib/auth-client";

interface ActivityHubProps {
  ledger: BillingLedgerEntry[];
  transactions: BillingTransaction[];
  itemVariants: any;
}

export function ActivityHub({ ledger, transactions, itemVariants }: ActivityHubProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {/* Wallet Activity */}
      <motion.div variants={itemVariants} className="sa-card overflow-hidden">
        <div className="p-8 md:p-10 border-b border-sa-border/50">
           <div className="flex items-center justify-between">
             <h2 className="font-heading text-xl font-bold text-white">Recent Activity</h2>
             <Link href="/dashboard/statements" className="text-[10px] font-bold uppercase tracking-[0.2em] text-sa-primary hover:underline underline-offset-8">
               View Statements
             </Link>
           </div>
        </div>
        
        <div className="p-8 md:p-10 pt-4">
          {!ledger?.length ? (
            <p className="py-10 text-center text-sm text-sa-muted/40 font-medium">No recent ledger events.</p>
          ) : (
            <ul className="divide-y divide-sa-border/50">
              {ledger.map((e) => (
                <li key={e.id} className="group flex justify-between items-center py-4 transition-colors hover:bg-sa-surface/10 rounded-lg px-2 -mx-2">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white uppercase tracking-tight">{e.description || e.type}</p>
                    <p className="text-[10px] font-medium text-sa-muted/60">{new Date(e.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={cn(
                    "font-heading font-black text-lg",
                    e.type === "debit" ? "text-white" : "text-sa-primary"
                  )}>
                    {e.type === "debit" ? "−" : "+"}₵{(Number(e.amountMinor) / 100).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div variants={itemVariants} className="sa-card overflow-hidden">
         <div className="p-8 md:p-10 border-b border-sa-border/50">
            <h2 className="font-heading text-xl font-bold text-white">Transactions</h2>
         </div>
         
         <div className="p-8 md:p-10 pt-4 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
               <thead className="text-sa-muted/40 border-b border-sa-border/30">
                  <tr>
                    <th className="py-4 pr-4">Node Type</th>
                    <th className="py-4 pr-4">Status</th>
                    <th className="py-4 text-right">Amount</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-sa-border/20">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-20 text-center text-sa-muted/40 lowercase">No transaction records.</td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.id} className="group hover:bg-sa-surface/10 transition-colors">
                        <td className="py-4 pr-4 text-white font-black">{tx.type}</td>
                        <td className="py-4 pr-4">
                          <span className={cn(
                            "px-2 py-1 rounded-md text-[9px] border",
                            tx.status === "success" ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-sa-border text-sa-muted"
                          )}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 text-right font-heading text-white text-base">₵{(Number(tx.amountMinor) / 100).toFixed(2)}</td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </motion.div>
    </section>
  );
}
