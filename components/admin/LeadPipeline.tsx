"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, MessageSquare, Rocket, Construction, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  patchAdminContact, 
  downloadAdminContactsCsv, 
  createAdminClientProject,
  AdminContactRow
} from "@/lib/auth-client";

interface LeadPipelineProps {
  contacts: AdminContactRow[];
  leadLoading: boolean;
  leadStatusFilter: string;
  setLeadStatusFilter: (s: string) => void;
  leadSourceFilter: string;
  setLeadSourceFilter: (s: string) => void;
  leadSearch: string;
  setLeadSearch: (s: string) => void;
  leadDateRange: string;
  setLeadDateRange: (s: string) => void;
  leadSort: string;
  activePresetId: string | null;
  setActivePresetId: (s: string | null) => void;
  presetCounts: any;
  load: () => Promise<void>;
  setToast: (t: any) => void;
  setProjectBusy: (b: boolean) => void;
  setProjectSearch: (s: string) => void;
  LEAD_FILTER_PRESETS: any;
}

function projectCalcMidGhs(metadata: unknown): number | null {
  if (metadata == null || typeof metadata !== "object" || !("totalMidGhs" in metadata)) {
    return null;
  }
  const n = (metadata as { totalMidGhs?: unknown }).totalMidGhs;
  if (typeof n === "number" && Number.isFinite(n) && n > 0) {
    return Math.round(n);
  }
  return null;
}

function websiteToAppBudgetSuggestion(metadata: unknown): number | null {
  if (metadata == null || typeof metadata !== "object" || !("budgetBand" in metadata)) {
    return null;
  }
  const band = (metadata as { budgetBand?: unknown }).budgetBand;
  if (typeof band !== "string") return null;
  if (band.includes("60,000+")) return 60000;
  if (band.includes("30,000 - 60,000")) return 45000;
  if (band.includes("15,000 - 30,000")) return 22500;
  if (band.includes("Below GHS 15,000")) return 12000;
  return null;
}

function sourceLabel(s: string | null) {
  if (s === "contact_form") return "Contact form";
  if (s === "project_calculator") return "Project calculator";
  if (s === "chat") return "Chat";
  if (s === "intake_wizard") return "Interactive intake";
  if (s === "proposal_request") return "Proposal request";
  if (s === "help_center_feedback") return "Help center feedback";
  if (s === "namecheap_unified_checkout") return "Namecheap unified checkout";
  if (s === "website_to_app_quote") return "Website-to-Mobile App Conversion Quote";
  if (s == null || s === "") return "—";
  return s;
}

function ContactNotesField({
  contactId,
  initial,
  disabled,
  onSaved,
}: {
  contactId: string;
  initial: string | null;
  disabled?: boolean;
  onSaved: () => Promise<void>;
}) {
  const [text, setText] = useState(initial ?? "");
  const [saving, setSaving] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        disabled={disabled}
        className="w-full min-w-[140px] rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-xs text-white"
        placeholder="Internal note…"
        aria-label="Team note"
      />
      <button
        type="button"
        disabled={saving || disabled}
        onClick={async () => {
          setSaving(true);
          try {
            await patchAdminContact(contactId, { notes: text });
            await onSaved();
          } finally {
            setSaving(false);
          }
        }}
        className="self-start rounded-md bg-sa-surface px-2 py-1 text-[11px] font-semibold text-white hover:bg-sa-border"
      >
        {saving ? "Saving…" : "Save note"}
      </button>
    </div>
  );
}

export function LeadPipeline({
  contacts,
  leadLoading,
  leadStatusFilter,
  setLeadStatusFilter,
  leadSourceFilter,
  setLeadSourceFilter,
  leadSearch,
  setLeadSearch,
  leadDateRange,
  setLeadDateRange,
  leadSort,
  activePresetId,
  setActivePresetId,
  presetCounts,
  load,
  setToast,
  setProjectBusy,
  setProjectSearch,
  LEAD_FILTER_PRESETS
}: LeadPipelineProps) {
  
  const linkedProjectIdFromNotes = (notes: string | null): string | null => {
    if (!notes) return null;
    const m = /Linked project:\s*([a-z0-9]+)/i.exec(notes);
    return m?.[1] ?? null;
  };

  return (
    <section className="space-y-6">
       <div>
          <h2 className="font-heading text-2xl font-bold text-white">Inbound Lead Flow <span className="text-sa-muted/30 text-sm ml-2">CONVERSION PIPELINE</span></h2>
          <p className="text-sm text-sa-muted/60 font-medium max-w-2xl">
            Archiving and processing inbound signals from the website, project calculator, and direct inquiries.
          </p>
       </div>

       <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sa-card overflow-hidden"
       >
          {/* Filter Header */}
          <div className="p-6 md:p-8 border-b border-sa-border bg-sa-surface/10">
             <div className="flex flex-wrap gap-2">
                {LEAD_FILTER_PRESETS.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    disabled={leadLoading}
                    onClick={() => {
                      setLeadStatusFilter(p.status);
                      setLeadSourceFilter(p.source);
                      setLeadSearch(p.q);
                      setLeadDateRange(p.dateRange);
                      setActivePresetId(p.id);
                    }}
                    className={cn(
                      "rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                      activePresetId === p.id
                        ? "bg-sa-primary text-black shadow-[0_0_15px_rgba(187,243,64,0.3)]"
                        : "border border-sa-border bg-sa-surface text-sa-muted hover:text-white hover:border-sa-primary/50"
                    )}
                  >
                    {p.label}
                    <span className={cn(
                      "ml-2 rounded-full px-2 py-0.5 text-[9px] font-black",
                      activePresetId === p.id ? "bg-black/10" : "bg-sa-surface/50 text-sa-primary"
                    )}>
                      {p.id === "all" ? (presetCounts?.all ?? 0) : p.id === "new" ? (presetCounts?.newOnly ?? 0) : p.id === "project-calc" ? (presetCounts?.projectCalculator ?? 0) : (presetCounts?.chat ?? "•")}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => downloadAdminContactsCsv({ take: 1000, status: leadStatusFilter, source: leadSourceFilter, q: leadSearch, dateRange: leadDateRange, sort: leadSort })}
                  className="ml-auto flex items-center gap-2 rounded-full border border-sa-primary/30 bg-sa-primary/5 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary hover:bg-sa-primary hover:text-black transition-all"
                >
                  <Download size={12} />
                  Export CSV
                </button>
             </div>

             <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-sa-muted/40 px-1">Phase</label>
                  <select
                    className="w-full rounded-xl border border-sa-border bg-sa-bg px-4 py-2.5 text-xs font-bold uppercase text-white focus:ring-0"
                    value={leadStatusFilter}
                    onChange={(e) => { setLeadStatusFilter(e.target.value); setActivePresetId(null); }}
                  >
                    <option value="all">All Statuses</option>
                    {["new", "contacted", "won", "lost"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5 lg:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-sa-muted/40 px-1">Source Node</label>
                  <select
                    className="w-full rounded-xl border border-sa-border bg-sa-bg px-4 py-2.5 text-xs font-bold uppercase text-white focus:ring-0"
                    value={leadSourceFilter}
                    onChange={(e) => { setLeadSourceFilter(e.target.value); setActivePresetId(null); }}
                  >
                    <option value="all">All Sources</option>
                    <option value="contact_form">Contact Form</option>
                    <option value="project_calculator">Project Calculator</option>
                    <option value="chat">Internal Chat</option>
                    <option value="website_to_app_quote">Website-to-App conversion</option>
                    <option value="namecheap_unified_checkout">Infrastructure Checkout</option>
                  </select>
                </div>
                <div className="space-y-1.5 lg:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-sa-muted/40 px-1">Identity Search</label>
                  <div className="relative">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-sa-muted/30" />
                    <input
                      value={leadSearch}
                      onChange={(e) => { setLeadSearch(e.target.value); setActivePresetId(null); }}
                      placeholder="Search identity or message..."
                      className="w-full rounded-xl border border-sa-border bg-sa-bg pl-10 pr-4 py-2.5 text-xs font-bold text-white focus:ring-0"
                    />
                  </div>
                </div>
             </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-sa-surface/30 text-[10px] font-black uppercase tracking-[0.2em] text-sa-muted/40">
                   <tr>
                      <th className="px-8 py-5">Identity & Timeline</th>
                      <th className="px-6 py-5">Signal Source</th>
                      <th className="px-6 py-5">Conversion State</th>
                      <th className="px-6 py-5">Operational Notes</th>
                      <th className="px-6 py-5 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-sa-border/20">
                   {contacts.map((c) => {
                      const midGhs = projectCalcMidGhs(c.metadata);
                      const linkedProjectId = linkedProjectIdFromNotes(c.notes);
                      
                      return (
                        <tr key={c.id} className="group hover:bg-sa-surface/10 transition-colors">
                           <td className="px-8 py-6">
                              <div className="space-y-1">
                                 <p className="text-sm font-bold text-white leading-none">{c.name}</p>
                                 <p className="text-[11px] font-bold text-sa-muted/60 lowercase">{c.email}</p>
                                 <p className="text-[9px] font-black text-sa-muted/30 tracking-widest">{new Date(c.createdAt).toLocaleString()}</p>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="space-y-1">
                                 <span className="inline-flex rounded-md bg-sa-surface px-2 py-1 text-[9px] font-black uppercase tracking-widest text-sa-muted">
                                   {sourceLabel(c.source)}
                                 </span>
                                 {midGhs && <p className="text-[11px] font-black text-sa-primary">₵{midGhs.toLocaleString()} GHS</p>}
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <select
                                className="rounded-lg border border-sa-border bg-sa-bg px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all focus:border-sa-primary"
                                value={c.status || "new"}
                                onChange={async (e) => {
                                  try {
                                    await patchAdminContact(c.id, { status: e.target.value });
                                    await load();
                                    setToast({ kind: "success", text: "State updated." });
                                  } catch (x) {
                                    setToast({ kind: "error", text: "Update failed" });
                                  }
                                }}
                              >
                                {["new", "contacted", "won", "lost"].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                           </td>
                           <td className="px-6 py-6 min-w-[300px]">
                              <ContactNotesField
                                key={`${c.id}-${c.updatedAt}`}
                                contactId={c.id}
                                initial={c.notes}
                                disabled={leadLoading}
                                onSaved={async () => {
                                  await load();
                                  setToast({ kind: "success", text: "Log archived." });
                                }}
                              />
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex justify-end gap-2">
                                 {linkedProjectId ? (
                                   <button
                                     onClick={() => { setProjectSearch(linkedProjectId); document.getElementById("admin-client-projects")?.scrollIntoView({ behavior: "smooth" }); }}
                                     className="flex h-9 w-9 items-center justify-center rounded-xl border border-sa-primary/30 bg-sa-primary/5 text-sa-primary transition-all hover:bg-sa-primary hover:text-black"
                                     title="Linked Project"
                                   >
                                     <Rocket size={14} />
                                   </button>
                                 ) : (c.source === "project_calculator" || c.source === "website_to_app_quote") && (
                                   <button
                                      onClick={async () => {
                                         const title = window.prompt("Deployment Title", `${c.name} Project`)?.trim();
                                         if (!title) return;
                                         const suggested = c.source === "website_to_app_quote" ? (websiteToAppBudgetSuggestion(c.metadata) ?? 0) : (midGhs ?? 0);
                                         const amount = window.prompt("Total Capital (GHS)", String(suggested))?.trim();
                                         if (!amount) return;
                                         try {
                                            setProjectBusy(true);
                                            const created = await createAdminClientProject({
                                               userEmail: c.email,
                                               title,
                                               totalAmountGhs: Number(amount),
                                               kickoffPercent: 30, buildPercent: 30, launchPercent: 40
                                            });
                                            await patchAdminContact(c.id, { notes: `${c.notes || ""}\nLinked project: ${created.id}`.trim() });
                                            setToast({ kind: "success", text: "Deployment initiated." });
                                            await load();
                                         } catch (x) {
                                            setToast({ kind: "error", text: "Deployment failed" });
                                         } finally {
                                            setProjectBusy(false);
                                         }
                                      }}
                                      className="flex items-center gap-2 rounded-xl border border-sa-primary/30 bg-sa-primary/5 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-sa-primary hover:bg-sa-primary hover:text-black transition-all"
                                   >
                                      <Construction size={14} />
                                      Convert
                                   </button>
                                 )}
                                 <button 
                                    onClick={() => window.alert(c.message)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-muted transition-all hover:text-white hover:border-sa-primary/50"
                                 >
                                    <ExternalLink size={14} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                      );
                   })}
                </tbody>
             </table>
             {(!contacts || contacts.length === 0) && (
               <div className="flex flex-col items-center justify-center py-20 bg-sa-surface/5">
                  <MessageSquare size={48} className="text-sa-muted/20" />
                  <p className="mt-4 text-xs font-black uppercase tracking-widest text-sa-muted/40">No incoming signals detected.</p>
               </div>
             )}
          </div>
       </motion.div>
    </section>
  );
}
