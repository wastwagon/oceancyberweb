"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import {
  type HeaderNavItem,
  type HeaderDropdownKey,
} from "@/lib/navigation/menu";
import { useNavigationConfig } from "@/lib/navigation/useNavigationConfig";
import { cn } from "@/lib/utils";

const navLinkClass =
  "group relative inline-flex min-h-[42px] items-center gap-1 px-3 py-2 font-heading text-[13px] font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:text-sa-primary";

export function StartupAgencyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<HeaderDropdownKey | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { mainHeaderNav, mainHeaderDropdownContent } = useNavigationConfig();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const handleMouseEnter = (key?: HeaderDropdownKey) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (key) setActiveDropdown(key);
    else setActiveDropdown(null);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="fixed left-0 right-0 top-3 z-[100] px-3 sm:px-4 md:px-6" role="banner">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-[18px] border border-sa-border bg-black/80 px-4 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-6">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
          <Image
            src="/images/oceancyber-logo.webp"
            alt="OceanCyber"
            width={140}
            height={42}
            className="h-7 w-auto object-contain brightness-0 invert md:h-8"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex" aria-label="Primary">
          {mainHeaderNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)) ||
              (item.activeMatch && item.activeMatch.some((match) => pathname.startsWith(match)));

            const isDropdownOpen = activeDropdown === item.dropdownKey;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.dropdownKey)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={navLinkClass}
                  aria-expanded={item.dropdownKey ? isDropdownOpen : undefined}
                >
                  <span className={isActive ? "text-sa-primary" : ""}>{item.label}</span>
                  {item.dropdownKey && (
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
                  )}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-px origin-left transition bg-sa-primary ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>

                {/* Desktop Mega Dropdown */}
                {item.dropdownKey && activeDropdown === item.dropdownKey && mainHeaderDropdownContent[item.dropdownKey] && (
                  <div
                    className="absolute left-1/2 top-[calc(100%+12px)] z-[120] w-[640px] -translate-x-1/2 rounded-2xl border border-sa-border bg-[#131317]/95 p-6 shadow-[0_24px_54px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                    role="menu"
                  >
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                      <div className="md:col-span-4">
                        <h3 className="font-heading text-lg font-bold text-white">
                          {mainHeaderDropdownContent[item.dropdownKey].title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-sa-muted">
                          {mainHeaderDropdownContent[item.dropdownKey].description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:col-span-8 md:grid-cols-2">
                        {mainHeaderDropdownContent[item.dropdownKey].items.map((subItem) => (
                          <Link
                            key={subItem.link}
                            href={subItem.link}
                            className="group/link block rounded-xl border border-transparent p-3 transition-colors hover:border-sa-border hover:bg-black/40"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <p className="font-heading text-sm font-semibold text-white transition-colors group-hover/link:text-sa-primary">
                              {subItem.heading}
                            </p>
                            <p className="mt-1 text-xs text-sa-muted">
                              {subItem.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 z-10">
          <button
            type="button"
            className="rounded-xl border border-sa-border p-2.5 text-white transition duration-300 hover:border-sa-primary hover:text-sa-primary"
            aria-expanded={searchOpen}
            aria-label="Toggle search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/get-started"
            className="hidden min-h-[42px] items-center rounded-xl border border-sa-border px-3.5 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:border-sa-primary hover:text-sa-primary sm:inline-flex"
          >
            Get started
          </Link>
          <Link
            href="/contact"
            className="hidden min-h-[42px] items-center rounded-full border-2 border-sa-primary bg-sa-primary px-5 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sa-bg transition duration-300 hover:bg-transparent hover:text-sa-primary md:inline-flex"
          >
            Contact
          </Link>

          <button
            type="button"
            className="inline-flex rounded-xl border border-sa-border p-2.5 text-white lg:hidden"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Search Panel */}
      {searchOpen ? (
        <div className="mx-auto mt-2 max-w-xl px-3 sm:px-4">
          <form action="/insights" className="flex overflow-hidden rounded-xl border border-sa-border bg-sa-surface shadow-lg" method="get">
            <input
              type="search"
              name="q"
              placeholder="Search insights…"
              className="min-h-[48px] flex-1 bg-transparent px-4 text-sm text-white placeholder:text-sa-muted/70 focus:outline-none"
            />
            <button type="submit" className="bg-sa-primary px-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-sa-bg">
              Go
            </button>
          </form>
        </div>
      ) : null}

      {/* Mobile Drawer */}
      <div
        hidden={!mobileOpen}
        className="mx-auto mt-3 max-w-7xl overflow-y-auto max-h-[85vh] rounded-2xl border border-sa-border bg-[#131317]/95 p-4 shadow-xl lg:hidden"
      >
        <div className="flex flex-col gap-1">
          {mainHeaderNav.map((item) => (
            <div key={item.href} className="border-b border-sa-border/50 py-2 last:border-0">
              <Link
                href={item.href}
                className="block w-full py-2 px-3 font-heading text-sm font-semibold uppercase tracking-widest text-white hover:text-sa-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.dropdownKey && mainHeaderDropdownContent[item.dropdownKey] && (
                <div className="mt-2 flex flex-col gap-2 pl-6">
                  {mainHeaderDropdownContent[item.dropdownKey].items.map((subItem) => (
                    <Link
                      key={subItem.link}
                      href={subItem.link}
                      className="block py-1.5 text-sm text-sa-muted hover:text-sa-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {subItem.heading}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/get-started"
              className="rounded-lg border border-sa-border px-3 py-3 text-center font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get started
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-sa-primary bg-sa-primary py-3 text-center font-heading text-sm font-bold uppercase tracking-[0.14em] text-sa-bg"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
