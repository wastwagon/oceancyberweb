"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import {
  startupMegaLinks,
  startupNav,
  type StartupNavLink,
} from "@/lib/startup-agency/content";
import { cn } from "@/lib/utils";

const navLinkClass =
  "group relative px-3 py-2 font-heading text-sm font-medium uppercase tracking-wide text-white transition hover:text-sa-primary";

function NavItem({
  item,
  onNavigate,
  className,
}: {
  item: StartupNavLink;
  onNavigate?: () => void;
  /** Extra classes (e.g. mobile drawer block layout). */
  className?: string;
}) {
  const pathname = usePathname();
  const merged = cn(navLinkClass, className);
  const underline = (
    <span className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-sa-primary transition group-hover:scale-x-100" />
  );

  if ("href" in item) {
    return (
      <Link href={item.href} className={merged} onClick={onNavigate}>
        {item.label}
        {underline}
      </Link>
    );
  }

  const { sectionId, label } = item;
  if (pathname === "/") {
    return (
      <a href={`#${sectionId}`} className={merged} onClick={onNavigate}>
        {label}
        {underline}
      </a>
    );
  }

  return (
    <Link href={`/#${sectionId}`} className={merged} onClick={onNavigate}>
      {label}
      {underline}
    </Link>
  );
}

export function StartupAgencyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
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

  return (
    <header
      className="fixed left-0 right-0 top-2 z-[100] px-3 sm:px-4 md:top-3 md:px-6"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-sa-border bg-black/75 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-md md:px-6">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
          <Image
            src="/images/oceancyber logo.webp"
            alt="OceanCyber"
            width={140}
            height={42}
            className="h-8 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {startupNav.map((item) => (
            <NavItem
              key={"href" in item ? item.href : item.sectionId}
              item={item}
            />
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-2 font-heading text-sm font-medium uppercase tracking-wide text-white transition hover:text-sa-primary"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              aria-controls="startup-mega-panel"
              id="startup-mega-trigger"
              onClick={() => setMegaOpen((v) => !v)}
            >
              Pages
              <ChevronDown className={cn("h-4 w-4 transition", megaOpen && "rotate-180")} />
            </button>
            {megaOpen ? (
              <div
                id="startup-mega-panel"
                role="menu"
                aria-labelledby="startup-mega-trigger"
                className="absolute left-1/2 top-full z-[120] mt-2 w-[min(92vw,520px)] -translate-x-1/2 rounded-xl border border-sa-border bg-sa-surface/95 p-5 shadow-2xl backdrop-blur-md"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sa-muted">
                  Navigate
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {startupMegaLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className="rounded-lg border border-transparent px-3 py-2 text-sm text-sa-muted transition hover:border-sa-border hover:bg-black/40 hover:text-white"
                      onClick={() => setMegaOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-sa-border p-2 text-white transition hover:border-sa-primary hover:text-sa-primary"
            aria-expanded={searchOpen}
            aria-controls="startup-search-panel"
            aria-label={searchOpen ? "Close search" : "Search insights"}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/get-started"
            className="hidden rounded-lg border border-sa-border px-3 py-2 font-heading text-xs font-semibold uppercase tracking-wide text-white transition hover:border-sa-primary hover:text-sa-primary sm:inline-flex"
          >
            Get started
          </Link>
          <Link
            href="/contact"
            className="hidden min-h-[40px] items-center rounded-full border-2 border-sa-primary bg-sa-primary px-4 font-heading text-xs font-bold uppercase tracking-wide text-sa-bg transition hover:bg-transparent hover:text-sa-primary md:inline-flex"
          >
            Contact
          </Link>

          <button
            type="button"
            className="inline-flex rounded-lg border border-sa-border p-2 text-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="startup-mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div
          id="startup-search-panel"
          className="mx-auto mt-2 max-w-xl px-3 sm:px-4"
        >
          <form
            action="/insights"
            className="flex overflow-hidden rounded-xl border border-sa-border bg-sa-surface shadow-lg"
            method="get"
            role="search"
          >
            <label htmlFor="startup-nav-search" className="sr-only">
              Search insights
            </label>
            <input
              id="startup-nav-search"
              type="search"
              name="q"
              placeholder="Search insights…"
              className="min-h-[48px] flex-1 bg-transparent px-4 text-sm text-white placeholder:text-sa-muted/70 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-sa-primary px-4 font-heading text-sm font-semibold uppercase tracking-wide text-sa-bg"
            >
              Go
            </button>
          </form>
        </div>
      ) : null}

      <div
        id="startup-mobile-nav"
        hidden={!mobileOpen}
        className="mx-auto mt-3 max-w-7xl rounded-2xl border border-sa-border bg-sa-surface/98 p-4 shadow-xl lg:hidden"
      >
        <form
          action="/insights"
          method="get"
          className="mb-4 flex overflow-hidden rounded-xl border border-sa-border bg-black/30"
          role="search"
          onSubmit={() => setMobileOpen(false)}
        >
          <label htmlFor="startup-mobile-search" className="sr-only">
            Search insights
          </label>
          <input
            id="startup-mobile-search"
            name="q"
            type="search"
            placeholder="Search insights…"
            className="min-h-[44px] flex-1 bg-transparent px-3 text-sm text-white placeholder:text-sa-muted/70 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-sa-primary px-3 font-heading text-xs font-semibold uppercase text-sa-bg"
          >
            Go
          </button>
        </form>

        <div className="flex flex-col gap-1">
          {startupNav.map((item) => (
            <NavItem
              key={"href" in item ? item.href : item.sectionId}
              item={item}
              className="block w-full rounded-lg px-3 py-3"
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
          <p className="mt-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sa-muted">
            Pages
          </p>
          {startupMegaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-sa-muted"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-sa-border pt-4">
            <Link
              href="/get-started"
              className="rounded-lg border border-sa-border px-3 py-3 text-center font-heading text-sm font-semibold uppercase tracking-wide text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get started
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-sa-primary bg-sa-primary py-3 text-center font-heading text-sm font-bold uppercase tracking-wide text-sa-bg"
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
