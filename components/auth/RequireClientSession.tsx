"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAdminSummary } from "@/lib/auth-client";

type Props = {
  children: React.ReactNode;
  /** When true, verifies the session can call admin APIs (`role === "admin"` or `ADMIN_EMAILS` on the server). */
  requireAdmin?: boolean;
};

/**
 * `/dashboard` is already gated by middleware + HttpOnly cookie. This component only blocks `/admin` until
 * `getAdminSummary` succeeds (mirrors server-side admin rules).
 */
export function RequireClientSession({ children, requireAdmin }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(!requireAdmin);

  useEffect(() => {
    if (!requireAdmin) return;
    let cancelled = false;
    void (async () => {
      try {
        await getAdminSummary();
        if (!cancelled) setReady(true);
      } catch {
        router.replace("/dashboard");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, requireAdmin]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-sa-muted">
        <Loader2 className="h-8 w-8 animate-spin text-sa-primary" aria-hidden />
        <p className="text-sm">Verifying administrator access…</p>
      </div>
    );
  }

  return <>{children}</>;
}
