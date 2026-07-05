"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBrowserSession, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Wallet", href: "/dashboard/wallet" },
  { label: "Statements", href: "/dashboard/statements" },
  { label: "Requests", href: "/dashboard/requests" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  /** Show a sign-out button on the right (defaults to true). */
  showSignOut?: boolean;
  className?: string;
};

export function DashboardNav({ showSignOut = true, className }: Props) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const session = await getBrowserSession();
      if (!cancelled) setIsAdmin(session.isAdmin);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <nav
        aria-label="Dashboard sections"
        className="flex flex-wrap gap-2 rounded-full border border-sa-border bg-sa-surface/30 p-1 backdrop-blur-sm"
      >
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                active
                  ? "bg-sa-primary text-black shadow-[0_0_20px_rgba(187,243,64,0.3)]"
                  : "text-sa-muted hover:bg-sa-surface hover:text-white",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {isAdmin ? (
        <Link
          href="/admin"
          className="inline-flex items-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-all hover:bg-sa-primary hover:text-black"
        >
          Admin
        </Link>
      ) : null}

      {showSignOut ? (
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/5 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-400 transition-all hover:border-rose-500 hover:bg-rose-500/10 hover:text-white"
        >
          Sign out
        </button>
      ) : null}
    </div>
  );
}
