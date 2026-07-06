"use client";

import { useState } from "react";
import {
  patchAdminSiteTestimonial,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";

export function QuoteEditor({
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
    <div className="space-y-3 rounded-xl border border-sa-primary/20 bg-sa-primary/10/40 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-sa-muted/80">
          Name
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="text-xs text-sa-muted/80">
          Company
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="text-xs text-sa-muted/80">
          Role
          <input
            className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
        Quote
        <textarea
          className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-4">
        <label className="text-xs text-sa-muted/80">
          Rating
          <input
            className="mt-1 w-16 rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label className="text-xs text-sa-muted/80">
          Initials
          <input
            className="mt-1 w-16 rounded-lg border border-sa-border px-2 py-1.5 text-sm"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
          />
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
          className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
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
        <button type="button" className="rounded-lg border border-sa-border px-4 py-2 text-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
