"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getAdminUsers, updateAdminUserRole } from "@/lib/auth-client";
import { formatMoney } from "@/lib/ops/format";
import { cn } from "@/lib/utils";
import { AppAlert } from "@/components/ui/AppAlert";

type AdminUserRow = {
  id: string;
  email: string;
  role: string;
  walletBalanceMinor: string;
  walletCurrency: string;
  createdAt: string;
};

interface UserRegistryProps {
  onViewProjects?: (email: string) => void;
}

const PAGE_SIZE = 10;

export function UserRegistry({ onViewProjects }: UserRegistryProps) {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleBusyId, setRoleBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setSearchDebounced(search), 300);
    return () => window.clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setSkip(0);
  }, [searchDebounced]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminUsers({
        take: PAGE_SIZE,
        skip,
        q: searchDebounced,
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load users");
    } finally {
      setLoading(false);
    }
  }, [searchDebounced, skip]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  async function toggleRole(user: AdminUserRow) {
    const nextRole = user.role === "admin" ? "user" : "admin";
    const label = nextRole === "admin" ? "grant admin access to" : "remove admin access from";
    if (!confirm(`Are you sure you want to ${label} ${user.email}?`)) return;

    setRoleBusyId(user.id);
    setError(null);
    try {
      await updateAdminUserRole(user.id, nextRole);
      setToast(`Role updated for ${user.email}.`);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Role update failed");
    } finally {
      setRoleBusyId(null);
    }
  }

  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : skip + 1;
  const rangeEnd = Math.min(skip + users.length, total);

  return (
    <section id="admin-user-registry" className="scroll-mt-28 sa-card overflow-hidden">
      <div className="border-b border-sa-border p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-white">Global User Registry</h2>
            <p className="mt-2 text-sm text-sa-muted/60">
              Search accounts, adjust roles, and jump to client projects by email.
            </p>
          </div>
          <div className="relative min-w-[220px] flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sa-muted/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search email or name…"
              className="w-full rounded-full border border-sa-border bg-sa-surface/50 py-2.5 pl-10 pr-4 text-sm text-white focus:border-sa-primary/50 focus:ring-0"
            />
          </div>
        </div>
      </div>

      {toast ? <AppAlert variant="success" className="m-6 mb-0">{toast}</AppAlert> : null}
      {error ? <AppAlert variant="error" className="m-6 mb-0">{error}</AppAlert> : null}

      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left">
          <thead className="bg-sa-surface/30 text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
            <tr>
              <th className="px-8 py-4">User Identity</th>
              <th className="px-6 py-4">Access Level</th>
              <th className="px-6 py-4">Wallet Bal.</th>
              <th className="px-8 py-4">Join Date</th>
              {onViewProjects ? <th className="px-8 py-4 text-right">Projects</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-sa-border/20">
            {loading ? (
              <tr>
                <td colSpan={onViewProjects ? 5 : 4} className="px-8 py-10 text-sm text-sa-muted/60">
                  Loading users…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={onViewProjects ? 5 : 4} className="px-8 py-10 text-sm text-sa-muted/60">
                  No users match this search.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-sa-surface/10">
                  <td className="px-8 py-4 text-sm font-bold text-white">{u.email}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      disabled={roleBusyId === u.id}
                      onClick={() => void toggleRole(u)}
                      className={cn(
                        "rounded-md border px-2 py-1 text-[9px] font-black uppercase tracking-widest transition-colors disabled:opacity-50",
                        u.role === "admin"
                          ? "border-sa-primary/40 bg-sa-primary/5 text-sa-primary hover:bg-sa-primary hover:text-black"
                          : "border-sa-border text-sa-muted hover:border-sa-primary/40 hover:text-white",
                      )}
                      title="Click to toggle admin access"
                    >
                      {roleBusyId === u.id ? "Saving…" : u.role}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-heading text-sm font-bold italic text-white">
                    {formatMoney(u.walletBalanceMinor, u.walletCurrency || "GHS")}
                  </td>
                  <td className="px-8 py-4 text-[10px] font-medium text-sa-muted/60">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  {onViewProjects ? (
                    <td className="px-8 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onViewProjects(u.email)}
                        className="rounded-full border border-sa-primary/30 bg-sa-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-all hover:bg-sa-primary hover:text-black"
                      >
                        View projects
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sa-border px-6 py-4 md:px-8">
        <p className="text-[11px] font-medium text-sa-muted/60">
          Showing {rangeStart}–{rangeEnd} of {total}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={skip === 0 || loading}
            onClick={() => setSkip((s) => Math.max(0, s - PAGE_SIZE))}
            className="flex items-center gap-1 rounded-full border border-sa-border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:text-white disabled:opacity-40"
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          <span className="px-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={skip + PAGE_SIZE >= total || loading}
            onClick={() => setSkip((s) => s + PAGE_SIZE)}
            className="flex items-center gap-1 rounded-full border border-sa-border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:text-white disabled:opacity-40"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
