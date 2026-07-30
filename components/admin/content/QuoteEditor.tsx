"use client";

import { useState } from "react";
import {
  patchAdminSiteTestimonial,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";

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
        <SaField id={`quote-name-${row.id}`} label="Name" labelTone="cms">
          <SaInput
            id={`quote-name-${row.id}`}
            density="micro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </SaField>
        <SaField id={`quote-company-${row.id}`} label="Company" labelTone="cms">
          <SaInput
            id={`quote-company-${row.id}`}
            density="micro"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </SaField>
        <SaField id={`quote-role-${row.id}`} label="Role" labelTone="cms">
          <SaInput
            id={`quote-role-${row.id}`}
            density="micro"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </SaField>
        <SaField id={`quote-sort-${row.id}`} label="Sort order" labelTone="cms">
          <SaInput
            id={`quote-sort-${row.id}`}
            density="micro"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </SaField>
      </div>
      <SaField id={`quote-content-${row.id}`} label="Quote" labelTone="cms">
        <SaTextarea
          id={`quote-content-${row.id}`}
          density="micro"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </SaField>
      <div className="flex flex-wrap gap-4">
        <SaField id={`quote-rating-${row.id}`} label="Rating" labelTone="cms">
          <SaInput
            id={`quote-rating-${row.id}`}
            density="micro"
            className="w-16"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </SaField>
        <SaField id={`quote-initials-${row.id}`} label="Initials" labelTone="cms">
          <SaInput
            id={`quote-initials-${row.id}`}
            density="micro"
            className="w-16"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
          />
        </SaField>
        <label className="flex items-center gap-2 self-end text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured
        </label>
      </div>
      <div className="flex gap-2">
        <SaButton
          type="button"
          size="sm"
          disabled={saving}
          className="rounded-lg normal-case tracking-normal"
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
