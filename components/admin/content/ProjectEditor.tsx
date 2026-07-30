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
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";

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
        <SaField id={`proj-title-${row.id}`} label="Title" labelTone="cms">
          <SaInput
            id={`proj-title-${row.id}`}
            density="micro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </SaField>
        <SaField id={`proj-slug-${row.id}`} label="Slug" labelTone="cms">
          <SaInput
            id={`proj-slug-${row.id}`}
            density="micro"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </SaField>
        <SaField id={`proj-cat-${row.id}`} label="Category" labelTone="cms">
          <SaInput
            id={`proj-cat-${row.id}`}
            density="micro"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </SaField>
        <SaField id={`proj-sort-${row.id}`} label="Sort order" labelTone="cms">
          <SaInput
            id={`proj-sort-${row.id}`}
            density="micro"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </SaField>
      </div>
      <SaField id={`proj-desc-${row.id}`} label="Description" labelTone="cms">
        <SaTextarea
          id={`proj-desc-${row.id}`}
          density="micro"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </SaField>
      <SaField id={`proj-tech-${row.id}`} label="Tech (comma-separated)" labelTone="cms">
        <SaInput
          id={`proj-tech-${row.id}`}
          density="micro"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
      </SaField>
      <div>
        <p className="sa-label-cms">Cover image</p>
        <div className="mt-1">
          <MediaUploadField
            label="Project cover"
            folder="uploads"
            value={imageUrl}
            onChange={setImageUrl}
          />
        </div>
      </div>

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
        <SaField id={`proj-json-${row.id}`} label="Details JSON" labelTone="cms">
          <SaTextarea
            id={`proj-json-${row.id}`}
            density="micro"
            className="font-mono text-xs"
            rows={5}
            value={detailsJson}
            onChange={(e) => setDetailsJson(e.target.value)}
          />
        </SaField>
      ) : null}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured
      </label>
      <div className="flex gap-2">
        <SaButton
          type="button"
          size="sm"
          disabled={saving}
          className="rounded-lg normal-case tracking-normal"
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
        </SaButton>
        <SaButton
          type="button"
          variant="secondary"
          size="sm"
          className="rounded-lg normal-case tracking-normal"
          onClick={onCancel}
        >
          Cancel
        </SaButton>
      </div>
    </div>
  );
}
