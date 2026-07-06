"use client";

import { useState } from "react";
import {
  patchAdminSiteProject,
  type AdminSiteProjectRow,
} from "@/lib/auth-client";
import {
  mergeDetailsFromForm,
  parseProjectDetailsForm,
} from "@/lib/admin/portfolio-details-form";
import { techSplit } from "@/lib/admin/content-form-utils";
import { ProjectDesignFields } from "@/components/admin/ProjectDesignFields";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

export function ProjectEditor({
  row,
  onCancel,
  onSaved,
}: {
  row: AdminSiteProjectRow;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const initialDetails = parseProjectDetailsForm(row.details);
  const [title, setTitle] = useState(row.title);
  const [slug, setSlug] = useState(row.slug);
  const [category, setCategory] = useState(row.category);
  const [description, setDescription] = useState(row.description);
  const [tech, setTech] = useState(row.techStack.join(", "));
  const [imageUrl, setImageUrl] = useState(row.imageUrl ?? "");
  const [featured, setFeatured] = useState(row.featured);
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [projectType, setProjectType] = useState(initialDetails.projectType);
  const [designArtifacts, setDesignArtifacts] = useState(initialDetails.designArtifacts);
  const [detailsJson, setDetailsJson] = useState(initialDetails.detailsJson);
  const [showRawJson, setShowRawJson] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-3 rounded-xl border border-sa-primary/20 bg-sa-primary/10/40 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-sa-muted/80">
          Title
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="text-xs text-sa-muted/80">
          Slug
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </label>
        <label className="text-xs text-sa-muted/80">
          Category
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label className="text-xs text-sa-muted/80">
          Sort order
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </label>
      </div>
      <label className="block text-xs text-sa-muted/80">
        Description
        <textarea
          className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="block text-xs text-sa-muted/80">
        Tech (comma-separated)
        <input
          className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
      </label>
      <label className="block text-xs text-sa-muted/80">
        Cover image
        <div className="mt-1">
          <MediaUploadField
            label="Project cover"
            folder="uploads"
            value={imageUrl}
            onChange={setImageUrl}
          />
        </div>
      </label>

      <ProjectDesignFields
        projectType={projectType}
        designArtifacts={designArtifacts}
        onProjectTypeChange={setProjectType}
        onArtifactsChange={setDesignArtifacts}
      />

      <label className="flex items-center gap-2 text-sm text-sa-muted">
        <input type="checkbox" checked={showRawJson} onChange={(e) => setShowRawJson(e.target.checked)} />
        Edit raw details JSON
      </label>
      {showRawJson ? (
        <label className="block text-xs text-sa-muted/80">
          Details JSON
          <textarea
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 font-mono text-xs"
            rows={5}
            value={detailsJson}
            onChange={(e) => setDetailsJson(e.target.value)}
          />
        </label>
      ) : null}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={saving}
          className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          onClick={async () => {
            let details: Record<string, unknown>;
            if (showRawJson && detailsJson.trim()) {
              try {
                details = JSON.parse(detailsJson) as Record<string, unknown>;
              } catch {
                window.alert("Invalid JSON in details");
                return;
              }
            } else {
              details = mergeDetailsFromForm(
                row.details,
                { projectType, designArtifacts },
                imageUrl.trim() || "/images/oceancyber-logo.webp",
              ) as Record<string, unknown>;
            }
            setSaving(true);
            try {
              await patchAdminSiteProject(row.id, {
                title: title.trim(),
                slug: slug.trim(),
                category: category.trim(),
                description: description.trim(),
                techStack: techSplit(tech),
                imageUrl: imageUrl.trim() || null,
                featured,
                sortOrder: Number.parseInt(sortOrder, 10) || 0,
                details,
              });
              await onSaved();
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" className="rounded-lg border border-sa-border px-4 py-2 text-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
