"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, ChevronRight } from "lucide-react";
import type { ClientProjectRow } from "@/lib/auth-client";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface ProjectOverviewCardProps {
  projects: ClientProjectRow[];
}

export function ProjectOverviewCard({ projects }: ProjectOverviewCardProps) {
  if (projects.length === 0) return null;

  const active = projects.filter((p) =>
    ["active", "in_review", "ready_for_launch", "planning"].includes(p.status),
  ).length;
  const dueInvoices = projects
    .flatMap((p) => p.invoices)
    .filter((i) => i.status === "issued").length;

  return (
    <motion.section variants={itemVariants} className="sa-card overflow-hidden">
      <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sa-primary/10 text-sa-primary">
            <FolderKanban size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sa-muted/60">
              Client projects
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white">
              {projects.length} project{projects.length === 1 ? "" : "s"} on record
            </h2>
            <p className="mt-2 text-sm font-medium text-sa-muted/70">
              {active} in pipeline
              {dueInvoices > 0 ? (
                <>
                  {" "}
                  ·{" "}
                  <span className="text-sa-primary">
                    {dueInvoices} invoice{dueInvoices === 1 ? "" : "s"} ready to pay
                  </span>
                </>
              ) : null}
            </p>
          </div>
        </div>
        <Link
          href={
            dueInvoices > 0
              ? "/dashboard/projects"
              : projects[0]
                ? `/dashboard/projects#project-${projects[0].id}`
                : "/dashboard/projects"
          }
          className="sa-btn-primary group inline-flex min-h-[48px] items-center gap-2 px-8 text-[11px]"
        >
          {dueInvoices > 0 ? "Pay milestones" : "View projects"}
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.section>
  );
}
