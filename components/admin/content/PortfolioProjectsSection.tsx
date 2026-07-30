"use client";

import {
  createAdminSiteProject,
  deleteAdminSiteProject,
  type AdminSiteProjectRow,
} from "@/lib/auth-client";
import { ProjectEditor } from "@/components/admin/content/ProjectEditor";
import { techSplit } from "@/lib/admin/content-form-utils";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";

export type NewProjectForm = {
  title: string;
  slug: string;
  category: string;
  description: string;
  tech: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: string;
  detailsJson: string;
};

type PortfolioProjectsSectionProps = {
  loading: boolean;
  projects: AdminSiteProjectRow[];
  newProj: NewProjectForm;
  setNewProj: React.Dispatch<React.SetStateAction<NewProjectForm>>;
  editProj: AdminSiteProjectRow | null;
  setEditProj: React.Dispatch<React.SetStateAction<AdminSiteProjectRow | null>>;
  onToast: (message: string) => void;
  onError: (message: string | null) => void;
  onReload: () => Promise<void>;
};

export function PortfolioProjectsSection({
  loading,
  projects,
  newProj,
  setNewProj,
  editProj,
  setEditProj,
  onToast,
  onError,
  onReload,
}: PortfolioProjectsSectionProps) {
  return (
        <section className="rounded-2xl border border-sa-border bg-sa-surface p-6 ">
          <h2 className="text-lg font-bold text-white">Portfolio projects</h2>
          <p className="mt-1 text-sm text-sa-muted/80">
            Powers <code className="rounded bg-sa-surface px-1">/portfolio</code>. Use structured
            fields when editing a project, or optional raw JSON (
            <code className="rounded bg-sa-surface px-1">details.v === 1</code>).
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-dashed border-sa-border bg-sa-bg/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">Add project</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <SaField id="new-proj-title" label="Title" labelTone="cms">
                <SaInput
                  id="new-proj-title"
                  density="micro"
                  value={newProj.title}
                  onChange={(e) => setNewProj((s) => ({ ...s, title: e.target.value }))}
                />
              </SaField>
              <SaField id="new-proj-slug" label="Slug (URL)" labelTone="cms">
                <SaInput
                  id="new-proj-slug"
                  density="micro"
                  placeholder="my-case-study"
                  value={newProj.slug}
                  onChange={(e) => setNewProj((s) => ({ ...s, slug: e.target.value }))}
                />
              </SaField>
              <SaField id="new-proj-cat" label="Category" labelTone="cms">
                <SaInput
                  id="new-proj-cat"
                  density="micro"
                  value={newProj.category}
                  onChange={(e) => setNewProj((s) => ({ ...s, category: e.target.value }))}
                />
              </SaField>
              <SaField id="new-proj-sort" label="Sort order" labelTone="cms">
                <SaInput
                  id="new-proj-sort"
                  density="micro"
                  value={newProj.sortOrder}
                  onChange={(e) => setNewProj((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </SaField>
            </div>
            <SaField id="new-proj-desc" label="Short description" labelTone="cms">
              <SaTextarea
                id="new-proj-desc"
                density="micro"
                rows={2}
                value={newProj.description}
                onChange={(e) => setNewProj((s) => ({ ...s, description: e.target.value }))}
              />
            </SaField>
            <SaField id="new-proj-tech" label="Tech stack (comma-separated)" labelTone="cms">
              <SaInput
                id="new-proj-tech"
                density="micro"
                placeholder="Next.js, PostgreSQL"
                value={newProj.tech}
                onChange={(e) => setNewProj((s) => ({ ...s, tech: e.target.value }))}
              />
            </SaField>
            <SaField id="new-proj-image" label="Image URL (optional)" labelTone="cms">
              <SaInput
                id="new-proj-image"
                density="micro"
                value={newProj.imageUrl}
                onChange={(e) => setNewProj((s) => ({ ...s, imageUrl: e.target.value }))}
              />
            </SaField>
            <SaField
              id="new-proj-json"
              label="Details JSON (optional — or configure after create in the editor)"
              labelTone="cms"
            >
              <SaTextarea
                id="new-proj-json"
                density="micro"
                className="font-mono text-xs"
                rows={4}
                placeholder='{"v":1,"image":"/images/...","projectType":"hybrid","designArtifacts":[]}'
                value={newProj.detailsJson}
                onChange={(e) => setNewProj((s) => ({ ...s, detailsJson: e.target.value }))}
              />
            </SaField>
            <label className="flex items-center gap-2 text-sm text-sa-muted">
              <input
                type="checkbox"
                checked={newProj.featured}
                onChange={(e) => setNewProj((s) => ({ ...s, featured: e.target.checked }))}
              />
              Featured
            </label>
            <SaButton
              type="button"
              size="sm"
              className="rounded-lg normal-case tracking-normal"
              onClick={async () => {
                let details: Record<string, unknown> | undefined;
                if (newProj.detailsJson.trim()) {
                  try {
                    details = JSON.parse(newProj.detailsJson) as Record<string, unknown>;
                  } catch {
                    onError("Details JSON is invalid.");
                    return;
                  }
                }
                try {
                  await createAdminSiteProject({
                    title: newProj.title.trim(),
                    slug: newProj.slug.trim(),
                    category: newProj.category.trim(),
                    description: newProj.description.trim(),
                    techStack: techSplit(newProj.tech),
                    imageUrl: newProj.imageUrl.trim() || null,
                    featured: newProj.featured,
                    sortOrder: Number.parseInt(newProj.sortOrder, 10) || 0,
                    details,
                  });
                  onToast("Project created.");
                  setNewProj({
                    title: "",
                    slug: "",
                    category: "",
                    description: "",
                    tech: "",
                    imageUrl: "",
                    featured: false,
                    sortOrder: "0",
                    detailsJson: "",
                  });
                  await onReload();
                  onError(null);
                } catch (e: unknown) {
                  onError(e instanceof Error ? e.message : "Create failed");
                }
              }}
            >
              Create project
            </SaButton>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-sa-muted/80">Loading projects…</p>
          ) : (
            <ul className="mt-6 divide-y divide-sa-border">
              {projects.map((row) => (
                <li key={row.id} className="py-4">
                  {editProj?.id === row.id ? (
                    <ProjectEditor
                      row={row}
                      onCancel={() => setEditProj(null)}
                      onSaved={async () => {
                        setEditProj(null);
                        onToast("Project updated.");
                        await onReload();
                        onError(null);
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{row.title}</p>
                        <p className="text-xs text-sa-muted/60">
                          /portfolio/{row.slug} · order {row.sortOrder}
                          {row.featured ? " · featured" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <SaButton
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="rounded-lg px-3 py-1 text-xs normal-case tracking-normal"
                          onClick={() => setEditProj(row)}
                        >
                          Edit
                        </SaButton>
                        <button
                          type="button"
                          className="rounded-lg border border-sa-danger/40 px-3 py-1 text-xs font-semibold text-sa-danger"
                          onClick={async () => {
                            if (!confirm(`Delete “${row.title}”?`)) return;
                            try {
                              await deleteAdminSiteProject(row.id);
                              onToast("Project deleted.");
                              await onReload();
                              onError(null);
                            } catch (e: unknown) {
                              onError(e instanceof Error ? e.message : "Delete failed");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
  );
}
