"use client";

import { cn } from "@/lib/utils";

type AdminUserRow = {
  id: string;
  email: string;
  role: string;
  walletBalanceMinor: string;
  createdAt: string;
};

interface UserRegistryProps {
  users: AdminUserRow[] | null;
  onViewProjects?: (email: string) => void;
}

export function UserRegistry({ users, onViewProjects }: UserRegistryProps) {
  return (
    <section className="sa-card overflow-hidden">
      <div className="border-b border-sa-border p-6 md:p-8">
        <h2 className="font-heading text-xl font-bold text-white">Global User Registry</h2>
        <p className="mt-2 text-sm text-sa-muted/60">
          Jump to client projects by email when managing deployments.
        </p>
      </div>
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left">
          <thead className="bg-sa-surface/30 text-[10px] font-black uppercase tracking-widest text-sa-muted/40">
            <tr>
              <th className="px-8 py-4">User Identity</th>
              <th className="px-6 py-4">Access Level</th>
              <th className="px-6 py-4">Wallet Bal.</th>
              <th className="px-8 py-4 text-right">Join Date</th>
              {onViewProjects ? <th className="px-8 py-4 text-right">Projects</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-sa-border/20">
            {(users ?? []).slice(0, 10).map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-sa-surface/10">
                <td className="px-8 py-4 text-sm font-bold text-white">{u.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "rounded-md border px-2 py-1 text-[9px] font-black uppercase tracking-widest",
                      u.role === "admin"
                        ? "border-sa-primary/40 bg-sa-primary/5 text-sa-primary"
                        : "border-sa-border text-sa-muted",
                    )}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 font-heading text-sm font-bold italic text-white">
                  ₵{(Number(u.walletBalanceMinor) / 100).toFixed(2)}
                </td>
                <td className="px-8 py-4 text-right text-[10px] font-medium text-sa-muted/60">
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
