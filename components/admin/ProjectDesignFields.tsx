"use client";

import type { DesignArtifact } from "@/lib/data/case-study-design";
import {
  PORTFOLIO_PROJECT_TYPES,
  type PortfolioProjectType,
} from "@/lib/types/portfolio-project-type";
import { getProjectTypeLabel } from "@/lib/portfolio/project-type";
import {
  createEmptyDesignArtifact,
  type ProjectDetailsFormState,
} from "@/lib/admin/portfolio-details-form";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

const WIREFRAME_PRESETS = [
  { label: "Discovery wireframe", path: "/images/design/wireframe-discovery.svg" },
  { label: "Dashboard wireframe", path: "/images/design/wireframe-dashboard.svg" },
  { label: "Mobile wireframe", path: "/images/design/wireframe-mobile.svg" },
] as const;

export function ProjectDesignFields({
  projectType,
  designArtifacts,
  onProjectTypeChange,
  onArtifactsChange,
}: {
  projectType: PortfolioProjectType;
  designArtifacts: DesignArtifact[];
  onProjectTypeChange: (type: PortfolioProjectType) => void;
  onArtifactsChange: (artifacts: DesignArtifact[]) => void;
}) {
  function updateArtifact(index: number, patch: Partial<DesignArtifact>) {
    onArtifactsChange(
      designArtifacts.map((a, i) => (i === index ? { ...a, ...patch } : a)),
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-sa-border bg-sa-bg/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">
        Portfolio metadata
      </p>

      <label className="block text-xs text-sa-muted/80">
        Work type (portfolio filter)
        <select
          className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
          value={projectType}
          onChange={(e) => onProjectTypeChange(e.target.value as PortfolioProjectType)}
        >
          {PORTFOLIO_PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {getProjectTypeLabel(t)}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-sa-muted/80">Design process gallery</p>
          <button
            type="button"
            className="text-xs font-semibold text-sa-primary"
            onClick={() =>
              onArtifactsChange([
                ...designArtifacts,
                createEmptyDesignArtifact(designArtifacts.length),
              ])
            }
          >
            + Add phase
          </button>
        </div>

        {designArtifacts.map((artifact, index) => (
          <div
            key={`artifact-${index}`}
            className="space-y-2 rounded-lg border border-sa-border/80 bg-sa-surface/40 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">
                Phase {index + 1}
              </span>
              {designArtifacts.length > 1 ? (
                <button
                  type="button"
                  className="text-[10px] text-red-400"
                  onClick={() =>
                    onArtifactsChange(designArtifacts.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className="grid gap-2 sm:grid-cols-4">
              <input
                className="rounded border border-sa-border px-2 py-1 text-xs"
                placeholder="01"
                value={artifact.phase}
                onChange={(e) => updateArtifact(index, { phase: e.target.value })}
              />
              <input
                className="rounded border border-sa-border px-2 py-1 text-xs sm:col-span-3"
                placeholder="Phase title"
                value={artifact.title}
                onChange={(e) => updateArtifact(index, { title: e.target.value })}
              />
            </div>
            <textarea
              className="w-full rounded border border-sa-border px-2 py-1 text-xs"
              rows={2}
              placeholder="Description"
              value={artifact.description}
              onChange={(e) => updateArtifact(index, { description: e.target.value })}
            />
            <MediaUploadField
              label="Phase image"
              folder="design"
              value={artifact.image}
              onChange={(url) => updateArtifact(index, { image: url })}
            />
            <div className="flex flex-wrap gap-1">
              {WIREFRAME_PRESETS.map((preset) => (
                <button
                  key={preset.path}
                  type="button"
                  className="rounded border border-sa-border px-2 py-0.5 text-[10px] text-sa-muted hover:border-sa-primary hover:text-sa-primary"
                  onClick={() =>
                    updateArtifact(index, {
                      image: preset.path,
                      imageAlt: preset.label,
                    })
                  }
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type { ProjectDetailsFormState };
