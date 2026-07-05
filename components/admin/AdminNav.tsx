"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview", href: "/admin" },
  { label: "Site content", href: "/admin/content" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  className?: string;
};

export function AdminNav({ className }: Props) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin sections"
      className={cn(
        "flex flex-wrap gap-2 rounded-full border border-sa-border bg-sa-surface/30 p-1 backdrop-blur-sm",
        className,
      )}
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
      <Link
        href="/dashboard"
        className="rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-all hover:bg-sa-surface hover:text-white"
      >
        Portal
      </Link>
    </nav>
  );
}
