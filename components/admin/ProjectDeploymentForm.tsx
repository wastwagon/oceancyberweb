"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { createAdminClientProject } from "@/lib/auth-client";

interface ProjectDeploymentFormProps {
  load: () => Promise<void>;
  setToast: (t: { kind: "success" | "error"; text: string } | null) => void;
}

export function ProjectDeploymentForm({ load, setToast }: ProjectDeploymentFormProps) {
  const [projectForm, setProjectForm] = useState({
    userEmail: "",
    title: "",
    description: "",
    totalAmountGhs: "",
  });
  const [projectBusy, setProjectBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setProjectBusy(true);
      await createAdminClientProject({
        userEmail: projectForm.userEmail.trim(),
        title: projectForm.title.trim(),
        description: projectForm.description.trim() || undefined,
        totalAmountGhs: Number(projectForm.totalAmountGhs),
        kickoffPercent: 30,
        buildPercent: 30,
        launchPercent: 40,
      });
      setProjectForm({ userEmail: "", title: "", description: "", totalAmountGhs: "" });
      setToast({ kind: "success", text: "Project deployed with 30/30/40 milestones." });
      await load();
    } catch (x) {
      const m = x instanceof Error ? x.message : "Deployment failed";
      setToast({ kind: "error", text: m });
    } finally {
      setProjectBusy(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sa-card p-6 md:p-8"
    >
      <form
        className="grid gap-4 sm:grid-cols-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 px-1">Identity</label>
          <input
            value={projectForm.userEmail}
            onChange={(e) => setProjectForm((p) => ({ ...p, userEmail: e.target.value }))}
            placeholder="Client Email"
            type="email"
            required
            className="w-full rounded-xl border border-sa-border bg-sa-bg px-4 py-3 text-sm text-white focus:border-sa-primary focus:ring-0 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 px-1">Objective</label>
          <input
            value={projectForm.title}
            onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Project Title"
            required
            className="w-full rounded-xl border border-sa-border bg-sa-bg px-4 py-3 text-sm text-white focus:border-sa-primary focus:ring-0 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 px-1">Capital (GHS)</label>
          <input
            value={projectForm.totalAmountGhs}
            onChange={(e) => setProjectForm((p) => ({ ...p, totalAmountGhs: e.target.value }))}
            placeholder="Total GHS"
            type="number"
            min={100}
            required
            className="w-full rounded-xl border border-sa-border bg-sa-bg px-4 py-3 text-sm text-white focus:border-sa-primary focus:ring-0 transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={projectBusy}
            className="sa-btn-primary w-full min-h-[48px] px-6 text-[10px]"
          >
            <Plus size={16} className={projectBusy ? "animate-spin" : ""} />
            {projectBusy ? "DEPLOYING..." : "DEPLOY PROJECT"}
          </button>
        </div>
        <div className="sm:col-span-4 space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 px-1">Scope Documentation</label>
          <input
            value={projectForm.description}
            onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Primary project objectives and scope constraints..."
            className="w-full rounded-xl border border-sa-border bg-sa-bg px-4 py-3 text-sm text-white focus:border-sa-primary focus:ring-0 transition-all"
          />
        </div>
      </form>
    </motion.div>
  );
}
