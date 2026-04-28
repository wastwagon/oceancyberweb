"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  clearAccessToken,
  createAdminSiteProject,
  createAdminSiteTestimonial,
  deleteAdminSiteProject,
  deleteAdminSiteTestimonial,
  getAdminSiteProjects,
  getAdminSiteTestimonials,
  getProfile,
  patchAdminSiteProject,
  patchAdminSiteTestimonial,
  type AdminSiteProjectRow,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";

function techJoin(tech: string[]) {
  return tech.join(", ");
}

function techSplit(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function AdminContentPage() {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [projects, setProjects] = useState<AdminSiteProjectRow[]>([]);
  const [quotes, setQuotes] = useState<AdminSiteTestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProj, setNewProj] = useState({
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

  const [newQuote, setNewQuote] = useState({
    name: "",
    company: "",
    role: "",
    content: "",
    rating: "5",
    featured: true,
    initials: "",
    sortOrder: "0",
  });

  const [editProj, setEditProj] = useState<AdminSiteProjectRow | null>(null);
  const [editQuote, setEditQuote] = useState<AdminSiteTestimonialRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [p, q] = await Promise.all([getAdminSiteProjects(), getAdminSiteTestimonials()]);
      setProjects(p);
      setQuotes(q);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not load content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        if (!p.isAdmin) {
          setAllowed(false);
          return;
        }
        setEmail(p.email);
        setAllowed(true);
        await load();
      } catch {
        setAllowed(false);
        setErr("Sign in as an admin user.");
      }
    })();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (allowed === null) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <p className="text-slate-600">Loading…</p>
      </main>
    );
  }

  if (allowed === false) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-lg font-bold text-slate-900">Not authorized</h1>
          <p className="mt-2 text-sm text-slate-600">{err || "Admin only."}</p>
          <Link href="/signin" className="mt-4 inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl space-y-10">
        {toast ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{toast}</div>
        ) : null}

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Marketing content</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Portfolio & testimonials</h1>
            <p className="mt-1 text-sm text-slate-600">{email}</p>
            <p className="mt-2 max-w-xl text-xs text-slate-500">
              Edits save to PostgreSQL. Set <code className="rounded bg-slate-100 px-1">REVALIDATE_SECRET</code> on both{" "}
              <code className="rounded bg-slate-100 px-1">web</code> and <code className="rounded bg-slate-100 px-1">backend</code>{" "}
              (see <code className="rounded bg-slate-100 px-1">.env.example</code>) so the API can refresh the homepage cache immediately; otherwise allow up to the ISR window (~5 minutes).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Reload
            </button>
            <Link
              href="/admin"
              className="rounded-xl border border-ocean-200 bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-900"
            >
              Admin overview
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAccessToken();
                window.location.href = "/signin";
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Sign out
            </button>
          </div>
        </header>

        {err ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</div> : null}

        {/* Projects */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Portfolio projects</h2>
          <p className="mt-1 text-sm text-slate-600">
            Powers <code className="rounded bg-slate-100 px-1">/portfolio</code>. Rich detail JSON is optional (
            <code className="rounded bg-slate-100 px-1">details.v === 1</code>).
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Add project</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-slate-600">
                Title
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newProj.title}
                  onChange={(e) => setNewProj((s) => ({ ...s, title: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Slug (URL)
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  placeholder="my-case-study"
                  value={newProj.slug}
                  onChange={(e) => setNewProj((s) => ({ ...s, slug: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Category
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newProj.category}
                  onChange={(e) => setNewProj((s) => ({ ...s, category: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Sort order
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newProj.sortOrder}
                  onChange={(e) => setNewProj((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-xs text-slate-600">
              Short description
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                rows={2}
                value={newProj.description}
                onChange={(e) => setNewProj((s) => ({ ...s, description: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-slate-600">
              Tech stack (comma-separated)
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                placeholder="Next.js, PostgreSQL"
                value={newProj.tech}
                onChange={(e) => setNewProj((s) => ({ ...s, tech: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-slate-600">
              Image URL (optional)
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                value={newProj.imageUrl}
                onChange={(e) => setNewProj((s) => ({ ...s, imageUrl: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-slate-600">
              Details JSON (optional)
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
                rows={4}
                placeholder='{"v":1,"image":"/images/..."}'
                value={newProj.detailsJson}
                onChange={(e) => setNewProj((s) => ({ ...s, detailsJson: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={newProj.featured}
                onChange={(e) => setNewProj((s) => ({ ...s, featured: e.target.checked }))}
              />
              Featured
            </label>
            <button
              type="button"
              className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-700"
              onClick={async () => {
                let details: Record<string, unknown> | undefined;
                if (newProj.detailsJson.trim()) {
                  try {
                    details = JSON.parse(newProj.detailsJson) as Record<string, unknown>;
                  } catch {
                    setErr("Details JSON is invalid.");
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
                  setToast("Project created.");
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
                  await load();
                  setErr(null);
                } catch (e: unknown) {
                  setErr(e instanceof Error ? e.message : "Create failed");
                }
              }}
            >
              Create project
            </button>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-slate-600">Loading projects…</p>
          ) : (
            <ul className="mt-6 divide-y divide-slate-100">
              {projects.map((row) => (
                <li key={row.id} className="py-4">
                  {editProj?.id === row.id ? (
                    <ProjectEditor
                      row={row}
                      onCancel={() => setEditProj(null)}
                      onSaved={async () => {
                        setEditProj(null);
                        setToast("Project updated.");
                        await load();
                        setErr(null);
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{row.title}</p>
                        <p className="text-xs text-slate-500">
                          /portfolio/{row.slug} · order {row.sortOrder}
                          {row.featured ? " · featured" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800"
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
                              setToast("Project deleted.");
                              await load();
                              setErr(null);
                            } catch (e: unknown) {
                              setErr(e instanceof Error ? e.message : "Delete failed");
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

        {/* Testimonials */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Testimonials</h2>
          <p className="mt-1 text-sm text-slate-600">
            Homepage pulls <strong>featured</strong> quotes first. Tune sort order for display sequence.
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Add testimonial</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-slate-600">
                Name
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.name}
                  onChange={(e) => setNewQuote((s) => ({ ...s, name: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Company
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.company}
                  onChange={(e) => setNewQuote((s) => ({ ...s, company: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Role
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.role}
                  onChange={(e) => setNewQuote((s) => ({ ...s, role: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Sort order
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.sortOrder}
                  onChange={(e) => setNewQuote((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-xs text-slate-600">
              Quote
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                rows={3}
                value={newQuote.content}
                onChange={(e) => setNewQuote((s) => ({ ...s, content: e.target.value }))}
              />
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="text-xs text-slate-600">
                Rating (1–5)
                <input
                  className="mt-1 w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.rating}
                  onChange={(e) => setNewQuote((s) => ({ ...s, rating: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Initials (optional)
                <input
                  className="mt-1 w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.initials}
                  onChange={(e) => setNewQuote((s) => ({ ...s, initials: e.target.value }))}
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={newQuote.featured}
                  onChange={(e) => setNewQuote((s) => ({ ...s, featured: e.target.checked }))}
                />
                Featured on homepage
              </label>
            </div>
            <button
              type="button"
              className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-700"
              onClick={async () => {
                try {
                  await createAdminSiteTestimonial({
                    name: newQuote.name.trim(),
                    company: newQuote.company.trim(),
                    role: newQuote.role.trim(),
                    content: newQuote.content.trim(),
                    rating: Number.parseInt(newQuote.rating, 10) || 5,
                    featured: newQuote.featured,
                    initials: newQuote.initials.trim() || null,
                    sortOrder: Number.parseInt(newQuote.sortOrder, 10) || 0,
                  });
                  setToast("Testimonial created.");
                  setNewQuote({
                    name: "",
                    company: "",
                    role: "",
                    content: "",
                    rating: "5",
                    featured: true,
                    initials: "",
                    sortOrder: "0",
                  });
                  await load();
                  setErr(null);
                } catch (e: unknown) {
                  setErr(e instanceof Error ? e.message : "Create failed");
                }
              }}
            >
              Create testimonial
            </button>
          </div>

          {!loading ? (
            <ul className="mt-6 divide-y divide-slate-100">
              {quotes.map((row) => (
                <li key={row.id} className="py-4">
                  {editQuote?.id === row.id ? (
                    <QuoteEditor
                      row={row}
                      onCancel={() => setEditQuote(null)}
                      onSaved={async () => {
                        setEditQuote(null);
                        setToast("Testimonial updated.");
                        await load();
                        setErr(null);
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{row.name}</p>
                        <p className="text-xs text-slate-500">
                          {row.role}, {row.company} · ★{row.rating}
                          {row.featured ? " · featured" : ""} · order {row.sortOrder}
                        </p>
                        <p className="mt-2 max-w-prose text-sm text-slate-600 line-clamp-3">{row.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800"
                          onClick={() => setEditQuote(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-800"
                          onClick={async () => {
                            if (!confirm(`Delete quote from ${row.name}?`)) return;
                            try {
                              await deleteAdminSiteTestimonial(row.id);
                              setToast("Testimonial deleted.");
                              await load();
                              setErr(null);
                            } catch (e: unknown) {
                              setErr(e instanceof Error ? e.message : "Delete failed");
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
          ) : null}
        </section>
      </div>
    </main>
  );
}

function ProjectEditor({
  row,
  onCancel,
  onSaved,
}: {
  row: AdminSiteProjectRow;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [title, setTitle] = useState(row.title);
  const [slug, setSlug] = useState(row.slug);
  const [category, setCategory] = useState(row.category);
  const [description, setDescription] = useState(row.description);
  const [tech, setTech] = useState(techJoin(row.techStack));
  const [imageUrl, setImageUrl] = useState(row.imageUrl ?? "");
  const [featured, setFeatured] = useState(row.featured);
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [detailsJson, setDetailsJson] = useState(
    row.details && typeof row.details === "object" ? JSON.stringify(row.details, null, 2) : "",
  );
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-xl border border-ocean-200 bg-ocean-50/40 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-600">
          Title
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Slug
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Category
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Sort order
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </label>
      </div>
      <label className="block text-xs text-slate-600">
        Description
        <textarea className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label className="block text-xs text-slate-600">
        Tech (comma-separated)
        <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={tech} onChange={(e) => setTech(e.target.value)} />
      </label>
      <label className="block text-xs text-slate-600">
        Image URL
        <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <label className="block text-xs text-slate-600">
        Details JSON
        <textarea className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs" rows={5} value={detailsJson} onChange={(e) => setDetailsJson(e.target.value)} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={saving}
          className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          onClick={async () => {
            let details: Record<string, unknown> | undefined;
            if (detailsJson.trim()) {
              try {
                details = JSON.parse(detailsJson) as Record<string, unknown>;
              } catch {
                window.alert("Invalid JSON in details");
                return;
              }
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
        <button type="button" className="rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function QuoteEditor({
  row,
  onCancel,
  onSaved,
}: {
  row: AdminSiteTestimonialRow;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [name, setName] = useState(row.name);
  const [company, setCompany] = useState(row.company);
  const [role, setRole] = useState(row.role);
  const [content, setContent] = useState(row.content);
  const [rating, setRating] = useState(String(row.rating));
  const [featured, setFeatured] = useState(row.featured);
  const [initials, setInitials] = useState(row.initials ?? "");
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-xl border border-ocean-200 bg-ocean-50/40 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-600">
          Name
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Company
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Role
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Sort order
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </label>
      </div>
      <label className="block text-xs text-slate-600">
        Quote
        <textarea className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <div className="flex flex-wrap gap-4">
        <label className="text-xs text-slate-600">
          Rating
          <input className="mt-1 w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Initials
          <input className="mt-1 w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={initials} onChange={(e) => setInitials(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={saving}
          className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          onClick={async () => {
            setSaving(true);
            try {
              await patchAdminSiteTestimonial(row.id, {
                name: name.trim(),
                company: company.trim(),
                role: role.trim(),
                content: content.trim(),
                rating: Number.parseInt(rating, 10) || 5,
                featured,
                initials: initials.trim() || null,
                sortOrder: Number.parseInt(sortOrder, 10) || 0,
              });
              await onSaved();
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" className="rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
