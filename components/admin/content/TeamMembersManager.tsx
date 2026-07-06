"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { AppAlert } from "@/components/ui/AppAlert";

const ACCENT_PRESETS = [
  "from-lime-300/30 to-emerald-500/20",
  "from-cyan-300/30 to-blue-500/20",
  "from-fuchsia-300/30 to-violet-500/20",
  "from-amber-300/30 to-orange-500/20",
  "from-sa-primary/20 to-sa-surface/40",
] as const;

export function TeamMembersManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/team", { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load team members");
      const data = (await res.json()) as { members: TeamMember[] };
      setMembers(data.members);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  function updateMember(index: number, patch: Partial<TeamMember>) {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setToast("Team members saved. Live on /team now.");
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-sa-border bg-sa-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Team members</h2>
          <p className="mt-1 text-sm text-sa-muted/80">
            Powers <code className="rounded bg-sa-bg px-1">/team</code>. Upload headshots and edit
            bios without code changes.
          </p>
        </div>
        <button
          type="button"
          disabled={saving || loading}
          onClick={() => void save()}
          className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save team"}
        </button>
      </div>

      {toast ? <AppAlert variant="success" className="mt-4">{toast}</AppAlert> : null}
      {error ? <AppAlert variant="error" className="mt-4">{error}</AppAlert> : null}

      {loading ? (
        <p className="mt-6 text-sm text-sa-muted/80">Loading team…</p>
      ) : (
        <div className="mt-6 space-y-6">
          {members.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="rounded-xl border border-sa-border bg-sa-bg/50 p-4 md:p-5"
            >
              <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
                <div className="space-y-3">
                  <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border border-sa-border bg-sa-surface">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="200px"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.accent}`}
                      >
                        <span className="font-heading text-3xl font-bold text-white">
                          {member.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <MediaUploadField
                    label="Headshot"
                    folder="team"
                    value={member.imageUrl ?? ""}
                    onChange={(url) => updateMember(index, { imageUrl: url || undefined })}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-xs text-sa-muted/80 sm:col-span-2">
                    Name
                    <input
                      className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      value={member.name}
                      onChange={(e) => updateMember(index, { name: e.target.value })}
                    />
                  </label>
                  <label className="text-xs text-sa-muted/80">
                    Role
                    <input
                      className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      value={member.role}
                      onChange={(e) => updateMember(index, { role: e.target.value })}
                    />
                  </label>
                  <label className="text-xs text-sa-muted/80">
                    Initials
                    <input
                      className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      value={member.initials}
                      maxLength={4}
                      onChange={(e) => updateMember(index, { initials: e.target.value.toUpperCase() })}
                    />
                  </label>
                  <label className="text-xs text-sa-muted/80 sm:col-span-2">
                    Card accent (Tailwind gradient)
                    <select
                      className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      value={member.accent}
                      onChange={(e) => updateMember(index, { accent: e.target.value })}
                    >
                      {ACCENT_PRESETS.map((accent) => (
                        <option key={accent} value={accent}>
                          {accent}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-sa-muted/80 sm:col-span-2">
                    Bio
                    <textarea
                      className="mt-1 w-full rounded-lg border border-sa-border bg-sa-surface px-2 py-1.5 text-sm text-white"
                      rows={3}
                      value={member.bio}
                      onChange={(e) => updateMember(index, { bio: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
