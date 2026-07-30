"use client";

import {
  createAdminSiteTestimonial,
  deleteAdminSiteTestimonial,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";
import { QuoteEditor } from "@/components/admin/content/QuoteEditor";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";

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
              <SaField id="new-quote-name" label="Name" labelTone="cms">
                <SaInput
                  id="new-quote-name"
                  density="micro"
                  value={newQuote.name}
                  onChange={(e) => setNewQuote((s) => ({ ...s, name: e.target.value }))}
                />
              </SaField>
              <SaField id="new-quote-company" label="Company" labelTone="cms">
                <SaInput
                  id="new-quote-company"
                  density="micro"
                  value={newQuote.company}
                  onChange={(e) => setNewQuote((s) => ({ ...s, company: e.target.value }))}
                />
              </SaField>
              <SaField id="new-quote-role" label="Role" labelTone="cms">
                <SaInput
                  id="new-quote-role"
                  density="micro"
                  value={newQuote.role}
                  onChange={(e) => setNewQuote((s) => ({ ...s, role: e.target.value }))}
                />
              </SaField>
              <SaField id="new-quote-sort" label="Sort order" labelTone="cms">
                <SaInput
                  id="new-quote-sort"
                  density="micro"
                  value={newQuote.sortOrder}
                  onChange={(e) => setNewQuote((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </SaField>
            </div>
            <SaField id="new-quote-content" label="Quote" labelTone="cms">
              <SaTextarea
                id="new-quote-content"
                density="micro"
                rows={3}
                value={newQuote.content}
                onChange={(e) => setNewQuote((s) => ({ ...s, content: e.target.value }))}
              />
            </SaField>
            <div className="flex flex-wrap gap-4">
              <SaField id="new-quote-rating" label="Rating (1–5)" labelTone="cms">
                <SaInput
                  id="new-quote-rating"
                  density="micro"
                  className="w-20"
                  value={newQuote.rating}
                  onChange={(e) => setNewQuote((s) => ({ ...s, rating: e.target.value }))}
                />
              </SaField>
              <SaField id="new-quote-initials" label="Initials (optional)" labelTone="cms">
                <SaInput
                  id="new-quote-initials"
                  density="micro"
                  className="w-20"
                  value={newQuote.initials}
                  onChange={(e) => setNewQuote((s) => ({ ...s, initials: e.target.value }))}
                />
              </SaField>
              <label className="flex items-center gap-2 self-end text-sm text-sa-muted">
                <input
                  type="checkbox"
                  checked={newQuote.featured}
                  onChange={(e) => setNewQuote((s) => ({ ...s, featured: e.target.checked }))}
                />
                Featured on homepage
              </label>
            </div>
            <SaButton
              type="button"
              size="sm"
              className="rounded-lg normal-case tracking-normal"
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
            </SaButton>
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
                        <SaButton
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="rounded-lg px-3 py-1 text-xs normal-case tracking-normal"
                          onClick={() => setEditQuote(row)}
                        >
                          Edit
                        </SaButton>
                        <button
                          type="button"
                          className="rounded-lg border border-sa-danger/40 px-3 py-1 text-xs font-semibold text-sa-danger"
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
