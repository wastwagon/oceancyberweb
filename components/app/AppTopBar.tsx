"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Shield } from "lucide-react";
import { getBrowserSession, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function AppTopBar() {
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
  }, [pathname]);

  const onDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const onAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <header className="sticky top-0 z-40 border-b border-sa-border/80 bg-sa-workspace/95 backdrop-blur-md">
      <div className="sa-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/oceancyber-logo.webp" alt="OceanCyber" width={140} height={36} className="h-8 w-auto" priority />
        </Link>

        <nav aria-label="App portal" className="flex items-center gap-2">
          {!onDashboard ? (
            <Link
              href="/dashboard"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-sa-border bg-sa-surface px-4 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:border-sa-primary hover:text-white"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Portal
            </Link>
          ) : null}
          {isAdmin && !onAdmin ? (
            <Link
              href="/admin"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-sa-primary/30 bg-sa-primary/10 px-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition hover:bg-sa-primary hover:text-sa-bg"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => void signOut()}
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[10px] font-bold uppercase tracking-widest transition",
              "border-rose-500/20 bg-rose-500/5 text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10",
            )}
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
