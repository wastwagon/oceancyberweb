"use client";

import {
  createAdminSiteTestimonial,
  deleteAdminSiteTestimonial,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";
import { QuoteEditor } from "@/components/admin/content/QuoteEditor";

export type NewQuoteForm = {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: string;
  featured: boolean;
  initials: string;
  sortOrder: string;
};

type TestimonialsSectionProps = {
  loading: boolean;
  quotes: AdminSiteTestimonialRow[];
  newQuote: NewQuoteForm;
  setNewQuote: React.Dispatch<React.SetStateAction<NewQuoteForm>>;
  editQuote: AdminSiteTestimonialRow | null;
  setEditQuote: React.Dispatch<React.SetStateAction<AdminSiteTestimonialRow | null>>;
  onToast: (message: string) => void;
  onError: (message: string | null) => void;
  onReload: () => Promise<void>;
};

export function TestimonialsSection({
  loading,
  quotes,
  newQuote,
  setNewQuote,
  editQuote,
  setEditQuote,
  onToast,
  onError,
  onReload,
}: TestimonialsSectionProps) {
  return (
        <section className="rounded-2xl border border-sa-border bg-sa-surface p-6 ">
          <h2 className="text-lg font-bold text-white">Testimonials</h2>
          <p className="mt-1 text-sm text-sa-muted/80">
            Featured quotes appear on the homepage below Google reviews. Tune sort order for display sequence.
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-dashed border-sa-border bg-sa-bg/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sa-muted/60">Add testimonial</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-sa-muted/80">
                Name
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newQuote.name}
                  onChange={(e) => setNewQuote((s) => ({ ...s, name: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Company
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newQuote.company}
                  onChange={(e) => setNewQuote((s) => ({ ...s, company: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Role
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newQuote.role}
                  onChange={(e) => setNewQuote((s) => ({ ...s, role: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Sort order
                <input
                  className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newQuote.sortOrder}
                  onChange={(e) => setNewQuote((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-xs text-sa-muted/80">
              Quote
              <textarea
                className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                rows={3}
                value={newQuote.content}
                onChange={(e) => setNewQuote((s) => ({ ...s, content: e.target.value }))}
              />
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="text-xs text-sa-muted/80">
                Rating (1–5)
                <input
                  className="mt-1 w-20 rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newQuote.rating}
                  onChange={(e) => setNewQuote((s) => ({ ...s, rating: e.target.value }))}
                />
              </label>
              <label className="text-xs text-sa-muted/80">
                Initials (optional)
                <input
                  className="mt-1 w-20 rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                  value={newQuote.initials}
                  onChange={(e) => setNewQuote((s) => ({ ...s, initials: e.target.value }))}
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-sa-muted">
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
              className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-white hover:bg-sa-primary/80"
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
                  onToast("Testimonial created.");
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
                  await onReload();
                  onError(null);
                } catch (e: unknown) {
                  onError(e instanceof Error ? e.message : "Create failed");
                }
              }}
            >
              Create testimonial
            </button>
          </div>

          {!loading ? (
            <ul className="mt-6 divide-y divide-sa-border">
              {quotes.map((row) => (
                <li key={row.id} className="py-4">
                  {editQuote?.id === row.id ? (
                    <QuoteEditor
                      row={row}
                      onCancel={() => setEditQuote(null)}
                      onSaved={async () => {
                        setEditQuote(null);
                        onToast("Testimonial updated.");
                        await onReload();
                        onError(null);
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{row.name}</p>
                        <p className="text-xs text-sa-muted/60">
                          {row.role}, {row.company} · ★{row.rating}
                          {row.featured ? " · featured" : ""} · order {row.sortOrder}
                        </p>
                        <p className="mt-2 max-w-prose text-sm text-sa-muted/80 line-clamp-3">{row.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-sa-border px-3 py-1 text-xs font-semibold text-white"
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
                              onToast("Testimonial deleted.");
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
          ) : null}
        </section>
  );
}
