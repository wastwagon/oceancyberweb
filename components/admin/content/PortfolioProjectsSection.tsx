"use client";

import {
  createAdminSiteProject,
  deleteAdminSiteProject,
  type AdminSiteProjectRow,
} from "@/lib/auth-client";
import { ProjectEditor } from "@/components/admin/content/ProjectEditor";
import { techSplit } from "@/lib/admin/content-form-utils";

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
              <label className="text-xs text-sa-muted/80">
                Title
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newProj.title}
                  onChange={(e) => setNewProj((s) => ({ ...s, title: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Slug (URL)
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  placeholder="my-case-study"
                  value={newProj.slug}
                  onChange={(e) => setNewProj((s) => ({ ...s, slug: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Category
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newProj.category}
                  onChange={(e) => setNewProj((s) => ({ ...s, category: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Sort order
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newProj.sortOrder}
                  onChange={(e) => setNewProj((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-xs text-sa-muted/80">
              Short description
              <textarea
                className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                rows={2}
                value={newProj.description}
                onChange={(e) => setNewProj((s) => ({ ...s, description: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-sa-muted/80">
              Tech stack (comma-separated)
              <input
                className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                placeholder="Next.js, PostgreSQL"
                value={newProj.tech}
                onChange={(e) => setNewProj((s) => ({ ...s, tech: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-sa-muted/80">
              Image URL (optional)
              <input
                className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                value={newProj.imageUrl}
                onChange={(e) => setNewProj((s) => ({ ...s, imageUrl: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-sa-muted/80">
              Details JSON (optional — or configure after create in the editor)
              <textarea
                className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 font-mono text-xs"
                rows={4}
                placeholder='{"v":1,"image":"/images/...","projectType":"hybrid","designArtifacts":[]}'
                value={newProj.detailsJson}
                onChange={(e) => setNewProj((s) => ({ ...s, detailsJson: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-sa-muted">
              <input
                type="checkbox"
                checked={newProj.featured}
                onChange={(e) => setNewProj((s) => ({ ...s, featured: e.target.checked }))}
              />
              Featured
            </label>
            <button
              type="button"
              className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-white hover:bg-sa-primary/80"
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
            </button>
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
                        <button
                          type="button"
                          className="rounded-lg border border-sa-border px-3 py-1 text-xs font-semibold text-white"
                          onClick={() => setEditProj(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-800"
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
