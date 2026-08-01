"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { HeaderDropdownKey } from "@/lib/navigation/menu";

export type NavDropdownItem = {
  heading: string;
  description: string;
  link: string;
};

export type NavDropdownPanel = {
  title: string;
  description: string;
  items: NavDropdownItem[];
};

/** Menus with this many items (or more) use the Industries-style mega panel. */
export const MEGA_MENU_MIN_ITEMS = 5;

const VIEW_ALL_BY_KEY: Partial<
  Record<HeaderDropdownKey, { href: string; label: string }>
> = {
  industries: { href: "/industries", label: "View all industries" },
  services: { href: "/services", label: "View all services" },
  resources: { href: "/insights", label: "Explore resources" },
  support: { href: "/help-center", label: "Visit help center" },
  company: { href: "/about", label: "About OceanCyber" },
};

export function shouldUseMegaMenu(itemCount: number) {
  return itemCount >= MEGA_MENU_MIN_ITEMS;
}

type Props = {
  dropdownKey: HeaderDropdownKey;
  panel: NavDropdownPanel;
  onNavigate: () => void;
};

/** Wide 3-column mega menu matching the Industries dropdown. */
export function NavMegaMenu({ dropdownKey, panel, onNavigate }: Props) {
  const viewAll = VIEW_ALL_BY_KEY[dropdownKey];

  return (
    <div
      className="absolute left-1/2 top-[calc(100%+12px)] z-[120] w-[min(780px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-sa-border bg-[#131317]/95 shadow-[0_24px_54px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300"
      role="menu"
    >
      <div className="border-b border-sa-border px-5 py-4">
        <p className="font-heading text-sm font-semibold text-white">{panel.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-sa-muted/75">{panel.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-1 p-2 md:grid-cols-3">
        {panel.items.map((subItem) => (
          <Link
            key={subItem.link}
            href={subItem.link}
            className="group/link flex flex-col justify-center rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-sa-border hover:bg-black/40"
            onClick={onNavigate}
            role="menuitem"
          >
            <p className="font-heading text-[12px] font-semibold leading-snug text-white transition-colors group-hover/link:text-sa-primary">
              {subItem.heading}
            </p>
            {subItem.description ? (
              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-sa-muted/75">
                {subItem.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
      {viewAll ? (
        <div className="border-t border-sa-border px-5 py-3">
          <Link
            href={viewAll.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sa-primary transition-colors hover:text-white"
            onClick={onNavigate}
          >
            {viewAll.label}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/** Compact single-column panel for short menus (e.g. Products). */
export function NavCompactMenu({ panel, onNavigate }: Omit<Props, "dropdownKey">) {
  return (
    <div
      className="absolute left-0 top-[calc(100%+12px)] z-[120] w-[280px] rounded-2xl border border-sa-border bg-[#131317]/95 p-2 shadow-[0_24px_54px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300"
      role="menu"
    >
      <div className="flex flex-col gap-1">
        {panel.items.map((subItem) => (
          <Link
            key={subItem.link}
            href={subItem.link}
            className="group/link flex flex-col justify-center rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-sa-border hover:bg-black/40"
            onClick={onNavigate}
            role="menuitem"
          >
            <p className="font-heading text-[13px] font-semibold text-white transition-colors group-hover/link:text-sa-primary">
              {subItem.heading}
            </p>
            {subItem.description ? (
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-sa-muted/80">
                {subItem.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
