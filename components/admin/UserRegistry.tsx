"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UserRegistryProps {
  users: any[];
}

export function UserRegistry({ users }: UserRegistryProps) {
  return (
    <section className="sa-card overflow-hidden">
       <div className="p-6 md:p-8 border-b border-sa-border">
          <h2 className="font-heading text-xl font-bold text-white">Global User Registry</h2>
       </div>
       <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left whitespace-nowrap">
             <thead className="bg-sa-surface/30 text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
                <tr>
                   <th className="px-8 py-4">User Identity</th>
                   <th className="px-6 py-4">Access Level</th>
                   <th className="px-6 py-4">Wallet Bal.</th>
                   <th className="px-8 py-4 text-right">Join Date</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-sa-border/20">
                {(users ?? []).slice(0, 10).map(u => (
                   <tr key={u.id} className="hover:bg-sa-surface/10 transition-colors">
                      <td className="px-8 py-4 font-bold text-white text-sm">{u.email}</td>
                      <td className="px-6 py-4">
                         <span className={cn(
                           "px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border",
                           u.role === "admin" ? "border-sa-primary/40 text-sa-primary bg-sa-primary/5" : "border-sa-border text-sa-muted"
                         )}>
                           {u.role}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-heading font-bold text-white italic">₵{(Number(u.walletBalanceMinor) / 100).toFixed(2)}</td>
                      <td className="px-8 py-4 text-right text-[10px] font-medium text-sa-muted/60">{new Date(u.createdAt).toLocaleDateString()}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </section>
  );
}
