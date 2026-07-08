"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import {
  type HeaderDropdownKey,
} from "@/lib/navigation/menu";
import { useNavigationConfig } from "@/lib/navigation/useNavigationConfig";
import { cn } from "@/lib/utils";
import { getBrowserSession } from "@/lib/auth-client";

const navLinkClass =
  "group relative inline-flex min-h-[42px] items-center gap-1 px-3 py-2 font-heading text-[13px] font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:text-sa-primary";

export function StartupAgencyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<HeaderDropdownKey | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<HeaderDropdownKey | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { mainHeaderNav, mainHeaderDropdownContent } = useNavigationConfig();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const session = await getBrowserSession();
      if (!cancelled) {
        setIsLoggedIn(session.ok);
        setIsAdmin(session.isAdmin);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

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

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobileSection(null);
  }, [pathname]);

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

  function closeMobileMenu() {
    setMobileOpen(false);
    setExpandedMobileSection(null);
  }

  return (
    <>
      <header
        className="fixed left-0 right-0 top-[max(0.75rem,env(safe-area-inset-top))] z-[100] px-3 sm:px-4 md:px-6"
        role="banner"
        data-app-print-hide-chrome
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-[#1c1c1e]/82 px-4 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150 md:px-6">
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

                  {item.dropdownKey && activeDropdown === item.dropdownKey && mainHeaderDropdownContent[item.dropdownKey] && (
                    item.dropdownKey === "industries" ? (
                      <div
                        className="absolute left-1/2 top-[calc(100%+12px)] z-[120] w-[min(780px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-sa-border bg-[#131317]/95 shadow-[0_24px_54px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300"
                        role="menu"
                      >
                        <div className="border-b border-sa-border px-5 py-4">
                          <p className="font-heading text-sm font-semibold text-white">
                            {mainHeaderDropdownContent.industries.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-sa-muted/75">
                            {mainHeaderDropdownContent.industries.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-1 p-2">
                          {mainHeaderDropdownContent.industries.items.map((subItem) => (
                            <Link
                              key={subItem.link}
                              href={subItem.link}
                              className="group/link flex flex-col justify-center rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-sa-border hover:bg-black/40"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <p className="font-heading text-[12px] font-semibold leading-snug text-white transition-colors group-hover/link:text-sa-primary">
                                {subItem.heading}
                              </p>
                              {subItem.description && (
                                <p className="mt-1 text-[10px] leading-relaxed text-sa-muted/75 line-clamp-2">
                                  {subItem.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-sa-border px-5 py-3">
                          <Link
                            href="/industries"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sa-primary transition-colors hover:text-white"
                            onClick={() => setActiveDropdown(null)}
                          >
                            View all industries
                            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="absolute left-0 top-[calc(100%+12px)] z-[120] w-[280px] rounded-2xl border border-sa-border bg-[#131317]/95 p-2 shadow-[0_24px_54px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300"
                        role="menu"
                      >
                        <div className="flex flex-col gap-1">
                          {mainHeaderDropdownContent[item.dropdownKey].items.map((subItem) => (
                            <Link
                              key={subItem.link}
                              href={subItem.link}
                              className="group/link flex flex-col justify-center rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-sa-border hover:bg-black/40"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <p className="font-heading text-[13px] font-semibold text-white transition-colors group-hover/link:text-sa-primary">
                                {subItem.heading}
                              </p>
                              {subItem.description && (
                                <p className="mt-1 text-[11px] text-sa-muted/80 line-clamp-2 leading-relaxed">
                                  {subItem.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 z-10">
            <button
              type="button"
              className="sa-pressable rounded-xl border border-white/10 p-2.5 text-white transition duration-300 hover:border-sa-primary hover:text-sa-primary"
              aria-expanded={searchOpen}
              aria-label="Toggle search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-1 sm:flex">
              {isLoggedIn ? (
                <>
                  {isAdmin ? (
                    <Link
                      href="/admin"
                      className="px-3 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sa-primary transition duration-300 hover:text-white"
                    >
                      Admin
                    </Link>
                  ) : null}
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sa-muted transition duration-300 hover:text-sa-primary"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/signin"
                  className="px-3 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sa-muted transition duration-300 hover:text-white"
                >
                  Client login
                </Link>
              )}
            </div>

            <Link
              href="/get-started"
              className="hidden min-h-[42px] items-center rounded-xl border border-sa-primary bg-sa-primary px-4 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-sa-bg transition duration-300 hover:bg-sa-primary/90 sm:inline-flex"
            >
              Get started
            </Link>

            <button
              type="button"
              className="sa-pressable inline-flex touch-target items-center justify-center rounded-xl border border-white/10 p-2.5 text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {searchOpen ? (
          <div className="mx-auto mt-2 max-w-xl px-3 sm:px-4">
            <form action="/insights" className="flex overflow-hidden rounded-2xl border border-white/10 bg-[#1c1c1e]/95 shadow-lg backdrop-blur-xl" method="get">
              <input
                type="search"
                name="q"
                placeholder="Search insights…"
                className="min-h-[48px] flex-1 bg-transparent px-4 text-base text-white placeholder:text-sa-muted/70 focus:outline-none"
              />
              <button type="submit" className="sa-pressable bg-sa-primary px-5 text-sm font-semibold text-sa-bg">
                Search
              </button>
            </form>
          </div>
        ) : null}
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[190] bg-black/45 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="fixed inset-x-0 bottom-0 z-[200] flex max-h-[min(88dvh,720px)] flex-col overflow-hidden rounded-t-[20px] border-t border-white/10 bg-[#1c1c1e]/95 shadow-[0_-24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 380 }}
            >
              <div className="flex shrink-0 justify-center pt-2.5 pb-1">
                <div className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                <p className="px-1 pb-3 text-[13px] font-semibold uppercase tracking-wide text-sa-muted/60">
                  Menu
                </p>

                <div className="sa-ios-group divide-y divide-white/[0.06]">
                  {mainHeaderNav.map((item) => {
                    const hasChildren =
                      item.dropdownKey && mainHeaderDropdownContent[item.dropdownKey];
                    const expanded = expandedMobileSection === item.dropdownKey;

                    return (
                      <div key={item.href}>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            className="sa-ios-row sa-pressable flex-1 font-medium"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                          {hasChildren ? (
                            <button
                              type="button"
                              className="sa-pressable mr-1 flex h-11 w-11 items-center justify-center rounded-xl text-sa-muted"
                              aria-expanded={expanded}
                              aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                              onClick={() =>
                                setExpandedMobileSection((current) =>
                                  current === item.dropdownKey ? null : item.dropdownKey ?? null,
                                )
                              }
                            >
                              <ChevronRight
                                className={cn("h-5 w-5 transition-transform", expanded && "rotate-90")}
                              />
                            </button>
                          ) : null}
                        </div>

                        {hasChildren && expanded ? (
                          <div className="border-t border-white/[0.06] bg-black/20 px-2 py-1">
                            {mainHeaderDropdownContent[item.dropdownKey!].items.map((subItem) => (
                              <Link
                                key={subItem.link}
                                href={subItem.link}
                                className="sa-pressable block rounded-xl px-3 py-3 text-[15px] text-sa-muted active:bg-white/[0.06]"
                                onClick={closeMobileMenu}
                              >
                                {subItem.heading}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-3">
                  {isLoggedIn ? (
                    <>
                      {isAdmin ? (
                        <Link
                          href="/admin"
                          className="sa-btn-primary flex w-full"
                          onClick={closeMobileMenu}
                        >
                          Admin
                        </Link>
                      ) : null}
                      <Link
                        href="/dashboard"
                        className="sa-btn-outline flex w-full"
                        onClick={closeMobileMenu}
                      >
                        Dashboard
                      </Link>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/signin"
                        className="sa-btn-outline flex w-full justify-center px-4"
                        onClick={closeMobileMenu}
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/signup"
                        className="sa-btn-outline flex w-full justify-center px-4"
                        onClick={closeMobileMenu}
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                  <Link
                    href="/get-started"
                    className="sa-btn-primary flex w-full"
                    onClick={closeMobileMenu}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
