"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { createAdminClientProject } from "@/lib/auth-client";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput } from "@/components/ui/SaInput";

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
        className="grid gap-sa-lg sm:grid-cols-4"
        onSubmit={handleSubmit}
      >
        <SaField id="deploy-email" label="Identity" labelTone="caps" required>
          <SaInput
            id="deploy-email"
            density="compact"
            value={projectForm.userEmail}
            onChange={(e) => setProjectForm((p) => ({ ...p, userEmail: e.target.value }))}
            placeholder="Client Email"
            type="email"
            required
            className="bg-sa-bg py-3"
          />
        </SaField>
        <SaField id="deploy-title" label="Objective" labelTone="caps" required>
          <SaInput
            id="deploy-title"
            density="compact"
            value={projectForm.title}
            onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Project Title"
            required
            className="bg-sa-bg py-3"
          />
        </SaField>
        <SaField id="deploy-capital" label="Capital (GHS)" labelTone="caps" required>
          <SaInput
            id="deploy-capital"
            density="compact"
            value={projectForm.totalAmountGhs}
            onChange={(e) => setProjectForm((p) => ({ ...p, totalAmountGhs: e.target.value }))}
            placeholder="Total GHS"
            type="number"
            min={100}
            required
            className="bg-sa-bg py-3"
          />
        </SaField>
        <div className="flex items-end">
          <SaButton
            type="submit"
            disabled={projectBusy}
            className="w-full gap-2 px-6 text-[10px]"
          >
            <Plus size={16} className={projectBusy ? "animate-spin" : ""} />
            {projectBusy ? "DEPLOYING..." : "DEPLOY PROJECT"}
          </SaButton>
        </div>
        <SaField
          id="deploy-scope"
          label="Scope Documentation"
          labelTone="caps"
          className="sm:col-span-4"
        >
          <SaInput
            id="deploy-scope"
            density="compact"
            value={projectForm.description}
            onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Primary project objectives and scope constraints..."
            className="bg-sa-bg py-3"
          />
        </SaField>
      </form>
    </motion.div>
  );
}
