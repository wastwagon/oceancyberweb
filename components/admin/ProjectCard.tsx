"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronDown, 
  MessageSquare, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  unlockAdminClientProjectMilestone, 
  updateAdminClientProjectStatus, 
  addAdminClientProjectActivity 
} from "@/lib/auth-client";

interface ProjectCardProps {
  project: any;
  projectBusy: boolean;
  setProjectBusy: (b: boolean) => void;
  setToast: (t: { kind: "success" | "error"; text: string } | null) => void;
  load: () => Promise<void>;
  PROJECT_ACTIVITY_CATEGORIES: any;
}

export function ProjectCard({ 
  project: p, 
  projectBusy, 
  setProjectBusy, 
  setToast, 
  load,
  PROJECT_ACTIVITY_CATEGORIES
}: ProjectCardProps) {
  const [activityDraft, setActivityDraft] = useState("");
  const [activityCategoryDraft, setActivityCategoryDraft] = useState("general");
  const [activityFilter, setActivityFilter] = useState("all");

  const projectHasOpenBlocker = (activities: any[]) => {
    if (!activities || activities.length === 0) return false;
    const sorted = [...activities].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    for (const a of sorted) {
      const note = (a.note || "").toLowerCase();
      if (note.startsWith("blocker resolved:")) return false;
      if (activityCategory(a) === "blocker") return true;
    }
    return false;
  };

  const activityCategory = (activity: any) => {
    const raw = activity.metadata?.category;
    return typeof raw === "string" && raw.trim() ? raw : "general";
  };

  const hasBlocker = projectHasOpenBlocker(p.activities);
  const completedPercentage = p.milestones.reduce((acc: number, m: any) => m.status === "paid" ? acc + m.percentage : acc, 0);

  return (
    <motion.div
      id={`project-card-${p.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "sa-card group relative overflow-hidden transition-all",
        hasBlocker ? "border-rose-500/40 bg-rose-500/5 shadow-[0_0_30px_rgba(244,63,94,0.1)]" : "hover:border-sa-primary/40 hover:bg-sa-surface/30"
      )}
    >
      <div className="p-6 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-heading font-bold text-white text-2xl">{p.title}</h3>
                <span className={cn(
                  "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] border",
                  hasBlocker ? "border-rose-500/30 bg-rose-500/10 text-rose-400 animate-pulse" : "border-sa-primary/20 bg-sa-primary/5 text-sa-primary"
                )}>
                  {p.status.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold text-sa-muted/50 uppercase tracking-widest">
                <span className="text-sa-muted/80">{p.user.email}</span>
                <span className="h-1 w-1 rounded-full bg-sa-border" />
                <span className="text-white font-heading">₵{(Number(p.totalAmountMinor) / 100).toLocaleString()} GHS</span>
                <span className="h-1 w-1 rounded-full bg-sa-border" />
                <span className="font-mono text-sa-muted/30">{p.id}</span>
              </div>
            </div>

            {/* Milestone Visual Progress */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sa-muted/60">Node Progression</p>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sa-primary">{completedPercentage}% Capitalized</p>
              </div>
              <div className="relative h-2 w-full rounded-full bg-sa-border/30 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completedPercentage}%` }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="absolute inset-y-0 left-0 bg-sa-primary shadow-[0_0_15px_rgba(187,243,64,0.5)]"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {p.milestones.map((m: any) => (
                  <div key={m.id} className={cn(
                    "flex flex-col gap-1.5 p-3 rounded-xl border transition-all",
                    m.status === "paid" ? "border-sa-primary/30 bg-sa-primary/5" : "border-sa-border bg-sa-bg"
                  )}>
                     <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-sa-muted/60">{m.title}</p>
                        {m.status === "paid" && <CheckCircle2 size={10} className="text-sa-primary" />}
                     </div>
                     <p className="text-xs font-bold text-white uppercase tracking-tighter">{m.percentage}%</p>
                     
                     {m.status === "locked" ? (
                       <button
                         type="button"
                         disabled={projectBusy}
                         onClick={async () => {
                           try {
                             setProjectBusy(true);
                             await unlockAdminClientProjectMilestone(p.id, m.id);
                             setToast({ kind: "success", text: `${m.title} authorized.` });
                             await load();
                           } catch (x) {
                             setToast({ kind: "error", text: x instanceof Error ? x.message : "Auth failed" });
                           } finally {
                             setProjectBusy(false);
                           }
                         }}
                         className="mt-2 rounded-lg border border-sa-primary/30 bg-sa-primary/10 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-sa-primary hover:bg-sa-primary hover:text-black transition-all disabled:opacity-50"
                       >
                         Authorize
                       </button>
                     ) : (
                       <span className="mt-2 text-[9px] font-black uppercase tracking-widest text-sa-muted/40 italic">{m.status}</span>
                     )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[240px] lg:items-end">
             <div className="space-y-1.5 w-full">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 px-1">Phase Control</label>
                <div className="relative">
                  <select
                    value={p.status}
                    className="w-full appearance-none rounded-xl border border-sa-border bg-sa-bg px-4 py-3 text-xs font-bold uppercase tracking-widest text-white focus:border-sa-primary focus:ring-0 transition-all cursor-pointer"
                    onChange={async (e) => {
                      try {
                        setProjectBusy(true);
                        await updateAdminClientProjectStatus(p.id, { status: e.target.value });
                        setToast({ kind: "success", text: "Phase updated." });
                        await load();
                      } catch (x) {
                        setToast({ kind: "error", text: x instanceof Error ? x.message : "Update failed" });
                      } finally {
                        setProjectBusy(false);
                      }
                    }}
                  >
                    {["planning", "active", "in_review", "ready_for_launch", "launched", "on_hold", "cancelled"].map((s) => (
                      <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-sa-muted/40 pointer-events-none" />
                </div>
             </div>

             <div className="flex gap-2 w-full">
               {hasBlocker ? (
                 <button
                   type="button"
                   disabled={projectBusy}
                   onClick={async () => {
                     const details = window.prompt("Resolution Note", "Issue resolved. Deployment resuming.")?.trim() || "Issue resolved.";
                     try {
                       setProjectBusy(true);
                       await addAdminClientProjectActivity(p.id, `Blocker resolved: ${details}`, "approval");
                       setToast({ kind: "success", text: "Blocker resolved." });
                       await load();
                     } catch (x) {
                       setToast({ kind: "error", text: "Resolution failed" });
                     } finally {
                       setProjectBusy(false);
                     }
                   }}
                   className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                 >
                   Resolve Blocker
                 </button>
               ) : (
                 <button
                   type="button"
                   disabled={projectBusy}
                   onClick={async () => {
                     const details = window.prompt("Blocker Details", "Regression detected during QA.")?.trim() || "Regression detected.";
                     try {
                       setProjectBusy(true);
                       await addAdminClientProjectActivity(p.id, details, "blocker");
                       setToast({ kind: "success", text: "Blocker activated." });
                       await load();
                     } catch (x) {
                       setToast({ kind: "error", text: "Activation failed" });
                     } finally {
                       setProjectBusy(false);
                     }
                   }}
                   className="flex-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                 >
                   Activate Blocker
                 </button>
               )}
             </div>
          </div>
        </div>

        {/* Project Notes & History */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 pt-10 border-t border-sa-border/50">
           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-sa-muted/60 flex items-center gap-2">
                  <MessageSquare size={12} /> Communication Hub
                </h4>
              </div>
              <div className="flex gap-2">
                <select
                  value={activityCategoryDraft}
                  onChange={(e) => setActivityCategoryDraft(e.target.value)}
                  className="rounded-xl border border-sa-border bg-sa-bg px-3 text-[11px] font-bold text-white focus:ring-0"
                >
                  {PROJECT_ACTIVITY_CATEGORIES.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <input
                  value={activityDraft}
                  onChange={(e) => setActivityDraft(e.target.value)}
                  placeholder="Add secure system note..."
                  className="flex-1 rounded-xl border border-sa-border bg-sa-bg px-4 py-3 text-xs text-white focus:border-sa-primary/50 focus:ring-0"
                />
                <button
                  type="button"
                  disabled={projectBusy || !activityDraft.trim()}
                  onClick={async () => {
                    const note = activityDraft.trim();
                    if (!note) return;
                    try {
                      setProjectBusy(true);
                      await addAdminClientProjectActivity(p.id, note, activityCategoryDraft as any);
                      setActivityDraft("");
                      setToast({ kind: "success", text: "Note archived." });
                      await load();
                    } catch (x) {
                      setToast({ kind: "error", text: "Save failed" });
                    } finally {
                      setProjectBusy(false);
                    }
                  }}
                  className="sa-btn-primary min-h-[44px] px-5 text-[10px]"
                >
                  Post
                </button>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-sa-muted/60 flex items-center gap-2">
                  <Clock size={12} /> Node History
                </h4>
                <select
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  className="bg-transparent border-none text-[9px] font-black uppercase tracking-widest text-sa-primary cursor-pointer focus:ring-0"
                >
                  <option value="all">ALL_EVENTS</option>
                  {PROJECT_ACTIVITY_CATEGORIES.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.label.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="max-h-[160px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {p.activities?.length ? (
                  p.activities
                    .filter((a: any) => activityFilter === "all" || activityCategory(a) === activityFilter)
                    .map((a: any) => (
                      <div key={a.id} className="p-3 rounded-xl border border-sa-border bg-sa-bg flex items-start gap-3 transition-colors hover:border-sa-primary/20">
                        <div className={cn(
                          "mt-1 h-2 w-2 rounded-full shrink-0",
                          activityCategory(a) === "blocker" ? "bg-rose-500" : activityCategory(a) === "approval" ? "bg-emerald-500" : "bg-sa-primary/40"
                        )} />
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-[10px] font-bold text-white uppercase tracking-tight truncate">{a.action.replace(/_/g, " ")}</p>
                            <span className="text-[9px] font-medium text-sa-muted/40 whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString()}</span>
                          </div>
                          {a.note && <p className="text-[11px] text-sa-muted/80 leading-relaxed italic">&quot;{a.note}&quot;</p>}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-sa-muted/20">No audit events.</p>
                )}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
